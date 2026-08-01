// Vercel serverless function: push a purchase to the Helcim Smart Terminal.
// Configure in Vercel → Project → Settings → Environment Variables:
//   HELCIM_API_TOKEN   — Helcim account API token (Helcim dashboard → All Tools → Integrations → API Access)
//   HELCIM_DEVICE_CODE — 4-character device code of the Smart Terminal (registered for API use)
//   HELCIM_CURRENCY    — optional, defaults to USD
// Docs: https://devdocs.helcim.com/docs/overview-of-smart-terminal-api
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const token = process.env.HELCIM_API_TOKEN;
  const device = process.env.HELCIM_DEVICE_CODE;
  if (!token || !device) {
    // Front-end shows a "terminal not configured" fallback and lets staff record the card sale manually.
    res.status(501).json({ error: "not_configured" });
    return;
  }
  const { amount, invoiceNumber } = req.body || {};
  const amt = Number(amount);
  if (!amt || isNaN(amt) || amt <= 0) {
    res.status(400).json({ error: "invalid_amount" });
    return;
  }
  // 25-char alphanumeric idempotency key required by Helcim
  const idem = (Date.now().toString(36) + Math.random().toString(36).slice(2) + "xxxxxxxxxxxxxxxxxxxxxxxxx")
    .replace(/[^a-z0-9]/gi, "")
    .slice(0, 25);
  try {
    const r = await fetch(`https://api.helcim.com/v2/devices/${device}/payment/purchase`, {
      method: "POST",
      headers: {
        "api-token": token,
        "idempotency-key": idem,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        currency: process.env.HELCIM_CURRENCY || "USD",
        transactionAmount: Number(amt.toFixed(2)),
        ...(invoiceNumber ? { invoiceNumber } : {}),
      }),
    });
    const data = await r.json().catch(() => ({}));
    if (r.ok) {
      res.status(200).json({ ok: true, data });
    } else {
      res.status(502).json({ error: "helcim_error", status: r.status, data });
    }
  } catch (e) {
    res.status(502).json({ error: "network_error", detail: String(e) });
  }
}
