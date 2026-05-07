// Minimal Mailgun client. Uses the HTTP API directly so we don't ship the
// `mailgun.js` SDK just to call one endpoint. Auth: Basic `api:{API_KEY}`.

type SendResult = { ok: true; id?: string } | { ok: false; reason: string };

export type MailgunMessage = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

function getConfig() {
  const apiKey = process.env.MAILGUN_API_KEY ?? "";
  const domain = process.env.MAILGUN_DOMAIN ?? "";
  const fromEmail = process.env.MAILGUN_FROM_EMAIL ?? "";
  const fromName = process.env.MAILGUN_FROM_NAME ?? "";
  // EU customers must set MAILGUN_REGION=api.eu.mailgun.net
  const region = process.env.MAILGUN_REGION ?? "api.mailgun.net";
  return { apiKey, domain, fromEmail, fromName, region };
}

export function isMailgunConfigured(): boolean {
  const { apiKey, domain, fromEmail } = getConfig();
  return Boolean(apiKey && domain && fromEmail);
}

export async function sendMail(msg: MailgunMessage): Promise<SendResult> {
  const { apiKey, domain, fromEmail, fromName, region } = getConfig();
  if (!apiKey || !domain || !fromEmail) {
    return { ok: false, reason: "mailgun not configured" };
  }

  const from = fromName ? `${fromName} <${fromEmail}>` : fromEmail;
  const body = new URLSearchParams();
  body.set("from", from);
  const recipients = Array.isArray(msg.to) ? msg.to : [msg.to];
  for (const r of recipients) body.append("to", r);
  body.set("subject", msg.subject);
  body.set("text", msg.text);
  if (msg.html) body.set("html", msg.html);
  if (msg.replyTo) body.set("h:Reply-To", msg.replyTo);

  const url = `https://${region}/v3/${domain}/messages`;
  const auth = Buffer.from(`api:${apiKey}`).toString("base64");

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });
    if (!r.ok) {
      const text = await r.text().catch(() => "");
      return { ok: false, reason: `mailgun ${r.status}: ${text.slice(0, 200)}` };
    }
    const json = (await r.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: json.id };
  } catch (e) {
    return { ok: false, reason: e instanceof Error ? e.message : String(e) };
  }
}
