// Vercel serverless function: send booking confirmation by EMAIL with a
// Google-Calendar-compatible ICS invite attached (lands in Gmail; Gmail/Google
// Calendar show it as an event). No SMS / no calls — by design.
//
// Configure in Vercel → Project → Settings → Environment Variables:
//   RESEND_API_KEY — API key from https://resend.com (free tier is fine)
//   NOTIFY_FROM    — verified sender, e.g. "InStyle Nail Bar <bookings@instylebl.com>"
//                    (verify the instylebl.com domain in Resend first;
//                     "onboarding@resend.dev" works for testing)
// Until configured, this returns 501 and the app silently skips email —
// clients still get the "Add to Google Calendar" button in the portal.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    res.status(501).json({ error: "not_configured" });
    return;
  }
  const { email, name, service, date, time, durMin } = req.body || {};
  if (!email || !service || !date || !time) {
    res.status(400).json({ error: "missing_fields" });
    return;
  }
  const dur = Number(durMin) > 0 ? Number(durMin) : 60;
  const [h, m] = String(time).slice(0, 5).split(":").map(Number);
  const endM = h * 60 + m + dur;
  const pad = (n) => String(n).padStart(2, "0");
  const dt = String(date).replace(/-/g, "");
  const dtStart = `${dt}T${pad(h)}${pad(m)}00`;
  const dtEnd = `${dt}T${pad(Math.floor(endM / 60))}${pad(endM % 60)}00`;
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2)}@instylebl.com`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InStyle Nail Bar//Booking//EN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`,
    `DTSTART;TZID=America/New_York:${dtStart}`,
    `DTEND;TZID=America/New_York:${dtEnd}`,
    `SUMMARY:InStyle Nail Bar — ${service}`,
    "LOCATION:InStyle Nail Bar\\, 980 Maine Ave SW\\, Washington DC",
    `DESCRIPTION:Your ${service} appointment at InStyle Nail Bar. Questions? Call (571) 992-4006.`,
    "STATUS:CONFIRMED",
    "BEGIN:VALARM",
    "TRIGGER:-PT2H",
    "ACTION:DISPLAY",
    "DESCRIPTION:InStyle appointment reminder",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "InStyle Nail Bar — " + service
  )}&dates=${dtStart}/${dtEnd}&ctz=America/New_York&location=${encodeURIComponent(
    "InStyle Nail Bar, 980 Maine Ave SW, Washington DC"
  )}`;

  const html = `
  <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;background:#1A1814;border-radius:14px;padding:32px 28px;color:#fff">
    <div style="text-align:center;letter-spacing:0.3em;color:#D4AF37;font-size:20px">INSTYLE</div>
    <div style="text-align:center;letter-spacing:0.15em;color:rgba(255,255,255,0.4);font-size:9px;margin-bottom:24px">BEAUTY LOUNGE</div>
    <div style="background:#fff;color:#1A1814;border-radius:10px;padding:22px">
      <p style="margin:0 0 6px;font-size:15px">Hi ${name || "there"},</p>
      <p style="margin:0 0 14px;font-size:13px;color:#555">Your booking request has been received:</p>
      <p style="margin:0;font-size:16px;font-weight:bold">${service}</p>
      <p style="margin:4px 0 16px;font-size:13px;color:#555">${date} · ${time} (ET)</p>
      <a href="${gcal}" style="display:inline-block;background:#D4AF37;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-size:13px">📅 Add to Google Calendar</a>
      <p style="margin:16px 0 0;font-size:11px;color:#888">We'll confirm shortly. We never call or text — updates arrive by email. Questions? (571) 992-4006</p>
    </div>
  </div>`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.NOTIFY_FROM || "InStyle Nail Bar <onboarding@resend.dev>",
        to: [email],
        subject: `InStyle Nail Bar — ${service} on ${date}`,
        html,
        attachments: [
          {
            filename: "instyle-appointment.ics",
            content: Buffer.from(ics).toString("base64"),
            content_type: "text/calendar; method=REQUEST",
          },
        ],
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (r.ok) res.status(200).json({ ok: true, id: data.id });
    else res.status(502).json({ error: "send_failed", status: r.status, data });
  } catch (e) {
    res.status(502).json({ error: "network_error", detail: String(e) });
  }
}
