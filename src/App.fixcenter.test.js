import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import App from "./App";

// ── stub Supabase REST ──
let calls;
beforeEach(() => {
  calls = [];
  global.fetch = jest.fn((url, opts = {}) => {
    const method = opts.method || "GET";
    calls.push({ url: String(url), method, body: opts.body ? JSON.parse(opts.body) : null });
    const u = String(url);
    let data = [];
    if (method === "GET") {
      if (u.includes("/transactions"))
        data = [{ id: "tx-uuid-1", total: "56.00", payment_method: "Card", created_at: "2026-08-04T14:00:00Z", employee_id: "emp-uuid-alsu", employees: { name: "Alsu Baatar" } }];
      else if (u.includes("/earnings"))
        data = [{ id: "earn-uuid-9", employee_id: "emp-uuid-alsu", earned_date: "2026-08-04", service_name: "Classic Pedicure", amount: "46.00", tip: "10.00", source: "frontdesk", employees: { name: "Alsu Baatar" } }];
      else if (u.includes("/employees"))
        data = [{ id: "emp-uuid-alsu", name: "Alsu Baatar", role: "Nail Tech" }, { id: "emp-uuid-jenny", name: "Jenny T", role: "Nail Tech" }];
      else if (u.includes("/timeclock"))
        data = [{ id: "clk-uuid-5", employee_name: "Alsu Baatar", date: "2026-08-04", clock_in: "2026-08-04T09:00:00+00:00", clock_out: null }];
      else data = [];
    }
    return Promise.resolve({ ok: true, status: method === "GET" ? 200 : 201, json: () => Promise.resolve(data) });
  });
});

const login = async () => {
  render(<App />);
  fireEvent.change(screen.getByPlaceholderText("you@instylebl.com"), { target: { value: "frontdesk@instylebl.com" } });
  fireEvent.change(screen.getByPlaceholderText("Enter your password"), { target: { value: "desk2026" } });
  fireEvent.click(screen.getByText("Sign In →"));
  await waitFor(() => expect(screen.getAllByText("Front Desk").length).toBeGreaterThan(0), { timeout: 3000 });
};

const openFixCenter = async () => {
  fireEvent.click(screen.getAllByText("Fix Center")[0]);
  await waitFor(() => expect(screen.getByText(/RECENT TRANSACTIONS/)).toBeTruthy());
  await waitFor(() => expect(screen.getByText(/\$56\.00 · Card/)).toBeTruthy());
};

test("refund requires a reason, then writes reversal tx + reversal earnings + audit row", async () => {
  await login();
  await openFixCenter();

  fireEvent.click(screen.getByText(/\$56\.00 · Card/));
  await waitFor(() => expect(screen.getByText("REFUND / VOID THIS TRANSACTION")).toBeTruthy());

  // Helcim manual-return warning shows for card payments
  expect(screen.getByText(/Helcim dashboard/)).toBeTruthy();

  // 1) without reason → blocked, no POSTs
  fireEvent.click(screen.getByText("Record Refund"));
  await waitFor(() => expect(screen.getByText(/reason is saved to the audit log/i)).toBeTruthy());
  expect(calls.filter(c => c.method === "POST" && c.url.includes("/transactions")).length).toBe(0);

  // 2) with reason → reversal rows written
  fireEvent.change(screen.getByPlaceholderText(/Cashier charged the wrong/), { target: { value: "Wrong amount charged by staff" } });
  fireEvent.click(screen.getByText("Record Refund"));
  await waitFor(() => expect(screen.getByText(/Refund recorded/)).toBeTruthy());

  const txPost = calls.find(c => c.method === "POST" && c.url.includes("/transactions"));
  expect(txPost.body.total).toBe("-56.00");
  expect(txPost.body.payment_method).toMatch(/^Refund — Card/);
  expect(txPost.body.employee_id).toBe("emp-uuid-alsu");

  const earnPost = calls.find(c => c.method === "POST" && c.url.includes("/earnings"));
  expect(earnPost.body.amount).toBe("-56.00");
  expect(earnPost.body.employee_id).toBe("emp-uuid-alsu"); // uuid string, never Number()
  expect(earnPost.body.source).toBe("fixcenter");
  expect(earnPost.body.service_name).toMatch(/^REFUND: Wrong amount/);

  const auditPost = calls.find(c => c.method === "POST" && c.url.includes("/audit_log"));
  expect(auditPost.body.action).toBe("Refund");
  expect(auditPost.body.actor_role).toBe("FrontDesk");
  expect(auditPost.body.reason).toBe("Wrong amount charged by staff");
  expect(auditPost.body.target_table).toBe("transactions");
  expect(auditPost.body.target_id).toBe("tx-uuid-1");
});

test("earnings fix PATCHes the row and logs before/after", async () => {
  await login();
  await openFixCenter();

  fireEvent.click(screen.getByText("Staff Earnings"));
  await waitFor(() => expect(screen.getByText(/Alsu Baatar · \$46\.00/)).toBeTruthy());
  fireEvent.click(screen.getByText(/Alsu Baatar · \$46\.00/));
  await waitFor(() => expect(screen.getByText("CORRECT THIS EARNING")).toBeTruthy());

  const panel = screen.getByText("CORRECT THIS EARNING").closest("div").parentElement;
  const selects = within(panel).getAllByRole("combobox");
  fireEvent.change(selects[0], { target: { value: "emp-uuid-jenny" } }); // reassign to Jenny T
  fireEvent.change(within(panel).getByPlaceholderText(/Cashier charged the wrong/), { target: { value: "Credited to wrong tech" } });
  fireEvent.click(within(panel).getByText("Save Fix"));
  await waitFor(() => expect(screen.getByText(/Earning corrected/)).toBeTruthy());

  const patch = calls.find(c => c.method === "PATCH" && c.url.includes("/earnings?id=eq.earn-uuid-9"));
  expect(patch.body.employee_id).toBe("emp-uuid-jenny");
  expect(patch.body.amount).toBe("46.00");

  const audit = calls.find(c => c.method === "POST" && c.url.includes("/audit_log"));
  expect(audit.body.action).toBe("EditEarning");
  expect(audit.body.details.before.employee_id).toBe("emp-uuid-alsu");
  expect(audit.body.details.after.employee_id).toBe("emp-uuid-jenny");
});

test("timeclock: correct an entry and add a missed one", async () => {
  await login();
  await openFixCenter();

  fireEvent.click(screen.getByText("Timeclock"));
  await waitFor(() => expect(screen.getByText(/still clocked in/)).toBeTruthy());

  // correct existing entry (forgot to clock out)
  fireEvent.click(screen.getByText(/still clocked in/));
  await waitFor(() => expect(screen.getByText("CORRECT TIME ENTRY")).toBeTruthy());
  const panel = screen.getByText("CORRECT TIME ENTRY").closest("div").parentElement;
  const inputs = within(panel).getAllByRole("textbox");
  fireEvent.change(inputs[1], { target: { value: "18:30" } }); // clock out
  fireEvent.change(within(panel).getByPlaceholderText(/Cashier charged the wrong/), { target: { value: "Forgot to clock out" } });
  fireEvent.click(within(panel).getByText("Save Fix"));
  await waitFor(() => expect(screen.getByText(/Time entry corrected/)).toBeTruthy());

  const patch = calls.find(c => c.method === "PATCH" && c.url.includes("/timeclock?id=eq.clk-uuid-5"));
  expect(patch.body.clock_out).toBe("2026-08-04T18:30:00+00:00"); // HH:MM rebuilt into stored timestamptz format
  expect(patch.body.clock_in).toBe("2026-08-04T09:00:00+00:00");
  const audit = calls.find(c => c.method === "POST" && c.url.includes("/audit_log") && c.body.action === "EditTimeclock");
  expect(audit.body.details.before.clock_out).toBe(null);
});

test("issue report logs an IssueReport audit row", async () => {
  await login();
  await openFixCenter();

  fireEvent.click(screen.getByText("Fix History"));
  await waitFor(() => expect(screen.getByText(/SOMETHING ELSE WRONG/)).toBeTruthy());
  fireEvent.change(screen.getByPlaceholderText("Describe the problem…"), { target: { value: "Gift card balance looks wrong" } });
  fireEvent.click(screen.getByText("Log Issue"));
  await waitFor(() => expect(screen.getByText(/Issue logged/)).toBeTruthy());

  const audit = calls.find(c => c.method === "POST" && c.url.includes("/audit_log"));
  expect(audit.body.action).toBe("IssueReport");
  expect(audit.body.reason).toBe("Gift card balance looks wrong");
});
