import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";

export const runtime = "nodejs";

// Define types for better TypeScript compliance
interface RateLimitRecord {
    count: number;
    ts: number;
}

interface RequestBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    isTeacher?: string;
    gradeLevel?: string;
    subject?: string;
    botField?: string;
}

// in-memory rate limit
const hits = new Map<string, RateLimitRecord>();
const WINDOW_MS = 60_000;
const MAX = 5;

function rateCheck(ip: string): boolean {
    const now = Date.now();
    const rec = hits.get(ip);
    if (!rec || now - rec.ts > WINDOW_MS) {
        hits.set(ip, {count: 1, ts: now});
        return true;
    }
    if (rec.count >= MAX) return false;
    rec.count++;
    return true;
}

// env
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const TESTFLIGHT_URL = process.env.TESTFLIGHT_URL || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "Lessn <no-reply@lessn.app>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
const LOGO_URL = process.env.LOGO_URL || "";

const resend = new Resend(RESEND_API_KEY);

function escapeHtml(s: string): string {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        if (!RESEND_API_KEY || !TESTFLIGHT_URL) {
            return NextResponse.json(
                {error: "Server not configured (missing RESEND_API_KEY or TESTFLIGHT_URL)."},
                {status: 500}
            );
        }

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";
        if (!rateCheck(ip)) {
            return NextResponse.json({error: "Too many requests, try again in a minute."}, {status: 429});
        }

        const body = await req.json() as RequestBody;
        const firstName = (body.firstName || "").toString().trim();
        const lastName  = (body.lastName  || "").toString().trim();
        const email     = (body.email     || "").toString().trim();
        const isTeacher = (body.isTeacher || "").toString().trim(); // "yes" | "no"
        const gradeLevel= (body.gradeLevel|| "").toString().trim();
        const subject   = (body.subject   || "").toString().trim();
        const botField  = (body.botField  || "").toString();

        if (botField) return NextResponse.json({ok: true}, {status: 200});

        const emailOk = /^\S+@\S+\.\S+$/.test(email);
        if (!firstName || !lastName || !emailOk || (isTeacher !== "yes" && isTeacher !== "no")) {
            return NextResponse.json({error: "Invalid form data"}, {status: 400});
        }

        // minimalist HTML (white bg, no card)
        const primary = "#5f5ffd";
        const html = `
      <div style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">
        Your Lessn TestFlight invite is ready.
      </div>
      <div style="background:#ffffff;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"
               style="width:100%;max-width:640px;background:#ffffff;
                      font-family:'PPNikkeiJournal-Light', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                      color:#0b1220;">
          <tr>
            <td style="text-align:left;">
              ${LOGO_URL
            ? `<img src="${LOGO_URL}" width="112" height="28" alt="Lessn" style="display:block;border:0;outline:0;text-decoration:none;"/>`
            : `<div style="font-weight:700;font-size:20px;letter-spacing:.2px;">Lessn</div>`}
            </td>
          </tr>
          <tr>
            <td style="">
              <h1 style="margin:16px 0 10px 0;font-size:28px;line-height:1.3;font-weight:600;
                         font-family:'PPNikkeiJournal-Semibold', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                Welcome to Lessn
              </h1>
              <p style="margin:0 0 18px 0;font-size:16px;line-height:1.6;color:#545869;">
                Hi ${escapeHtml(firstName)}, your TestFlight invite is ready. Try your next unit with faster planning and clearer focus.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom: 22px">
              <a href="${TESTFLIGHT_URL}"
                 style="display:inline-block;background:${primary};color:#ffffff;
                        padding:12px 22px;border-radius:10px;
                        font-size:15px;font-weight:600;text-decoration:none;">
                Open TestFlight
              </a>
              <p style="margin:14px 0 0 0;font-size:13px;line-height:1.5;color:#545869;">
                Or copy this link:<br/>
                <a href="${TESTFLIGHT_URL}" style="color:${primary};text-decoration:none;word-break:break-all;">
                  ${TESTFLIGHT_URL}
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 0 0 28px;border-top:1px solid #E8EAF0;">
              <p style="margin:0;font-size:13px;color:#545869;">
                <strong style="color:#0b1220;">Submitted</strong> · Teacher: ${escapeHtml(isTeacher)} ·
                Grade: ${escapeHtml(gradeLevel || "—")} · Subject: ${escapeHtml(subject || "—")}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 0 28px;text-align:center;font-size:12px;color:#9aa0a6;">
              © ${new Date().getFullYear()} Lessn by Brinl, LLC. All rights reserved.
            </td>
            
            <td style="padding:20px 28px 0 28px;text-align:left;font-size:12px;color:#9aa0a6;">
            This email and any links contained within are provided solely for participation in the Brinl app TestFlight program. TestFlight access is offered at Brinl’s discretion and may be withdrawn at any time. Participation does not create any commercial, employment, or agency relationship between you and Brinl.
By clicking the TestFlight link, you acknowledge and agree that:
The Brinl app is provided on a beta/pre-release basis and may contain errors or limited functionality.
Brinl, LLC makes no warranties, express or implied, regarding the beta app, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
To the maximum extent permitted by law, Brinl, LLC shall not be liable for any damages or losses arising out of your participation in the beta program.
Your data is handled under our Privacy Policy and Terms of Service. If you do not wish to receive further communications about beta testing, you may unsubscribe at any time.
</td>
          </tr>
        </table>
      </div>
    `.trim();

        const text = [
            `Welcome to Lessn`,
            ``,
            `Hi ${firstName}`,
            ``,
            `Your TestFlight invite is ready.`,
            ``,
            `Open TestFlight: ${TESTFLIGHT_URL}`,
            ``,
            `Submitted: Teacher=${isTeacher}, Grade=${gradeLevel || "—"}, Subject=${subject || "—"}`
        ].join("\n");

        const userSend = await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: "Your Lessn TestFlight Invite",
            html,
            text
        });
        if (userSend.error) {
            return NextResponse.json({error: "Email send failed"}, {status: 502});
        }

        if (ADMIN_EMAIL) {
            const adminHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0b1220;">
          <h3 style="margin:0 0 8px 0;font-size:18px;">New TestFlight signup</h3>
          <p style="margin:0 0 8px 0;font-size:14px;">
            ${escapeHtml(firstName)} ${escapeHtml(lastName)} &lt;${escapeHtml(email)}&gt;
          </p>
          <ul style="margin:0;padding-left:18px;font-size:14px;color:#545869;">
            <li>Teacher: ${escapeHtml(isTeacher)}</li>
            <li>Grade: ${escapeHtml(gradeLevel || "—")}</li>
            <li>Subject: ${escapeHtml(subject || "—")}</li>
            <li>IP: ${escapeHtml(ip)}</li>
          </ul>
        </div>
      `.trim();

            await resend.emails.send({
                from: FROM_EMAIL,
                to: ADMIN_EMAIL,
                subject: "Lessn · New TestFlight signup",
                html: adminHtml,
                text: `${firstName} ${lastName} <${email}> — Teacher:${isTeacher}, Grade:${gradeLevel || "—"}, Subject:${subject || "—"} · IP:${ip}`
            });
        }

        return NextResponse.json({ok: true});
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown server error";
        console.error(err);
        return NextResponse.json({error: message}, {status: 500});
    }
}