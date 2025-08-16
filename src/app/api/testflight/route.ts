import {NextRequest, NextResponse} from "next/server";
import {Resend} from "resend";

// Ensure Node runtime (Resend needs Node, not Edge)
export const runtime = "nodejs";

const brand = {
    color: "#5f5ffd",           // primary
    text:  "#0b1220",           // heading/body
    mute:  "#545869",           // secondary text
    hair:  "#E8EAF0",           // divider
};
const logoUrl = process.env.LOGO_URL || ""; // optional: https://lessn.app/logo-email.png



// --- Simple in-memory rate limit (per server instance) ---
const hits = new Map<string, {count: number; ts: number}>();
const WINDOW_MS = 60_000; // 1 minute
const MAX = 5;

function rateCheck(ip: string) {
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

// --- Env + Resend setup ---
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const TESTFLIGHT_URL = process.env.TESTFLIGHT_URL || "";
const FROM_EMAIL = process.env.FROM_EMAIL || "Lessn <no-reply@lessn.app>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || ""; // optional

const resend = new Resend(RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        // Guard required env
        if (!RESEND_API_KEY || !TESTFLIGHT_URL) {
            return NextResponse.json(
                {error: "Server not configured (missing RESEND_API_KEY or TESTFLIGHT_URL)."},
                {status: 500}
            );
        }

        // Rate limit
        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
            req.headers.get("x-real-ip") ||
            "unknown";
        if (!rateCheck(ip)) {
            return NextResponse.json(
                {error: "Too many requests, try again in a minute."},
                {status: 429}
            );
        }

        // Parse + normalize input
        const body = await req.json();
        const firstName = (body.firstName || "").toString().trim();
        const lastName = (body.lastName || "").toString().trim();
        const email = (body.email || "").toString().trim();
        const isTeacher = (body.isTeacher || "").toString().trim(); // "yes" | "no"
        const gradeLevel = (body.gradeLevel || "").toString().trim();
        const subject = (body.subject || "").toString().trim();
        const botField = (body.botField || "").toString();

        // Honeypot
        if (botField) {
            return NextResponse.json({ok: true}, {status: 200});
        }

        // Basic validation
        const emailOk = /^\S+@\S+\.\S+$/.test(email);
        if (!firstName || !lastName || !emailOk || (isTeacher !== "yes" && isTeacher !== "no")) {
            return NextResponse.json({error: "Invalid form data"}, {status: 400});
        }

        // --- Premium minimalist HTML email ---
        const brandColor = "#5f5ffd";

        const html = `
  <!-- Preheader -->
  <div style="display:none!important;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;">
    Your Lessaro TestFlight invite is ready.
  </div>
  
  <!-- Email Container -->
  <div style="background:#f5f5f5;padding:20px;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center"
           style="width:100%;max-width:600px;background:#ffffff;
                  font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      
      <!-- Header with Logo -->
      <tr>
        <td style="padding:40px 40px 20px 40px;">
          ${logoUrl
            ? `<img src="${logoUrl}" width="120" height="30" alt="Lessaro" 
                 style="display:block;border:0;outline:0;text-decoration:none;"/>`
            : `<div style="font-weight:600;font-size:22px;color:#000000;">Lessaro</div>`}
        </td>
      </tr>
      
      <!-- Main Content -->
      <tr>
        <td style="padding:0 40px 40px 40px;">
          <p style="margin:0 0 20px 0;font-size:17px;line-height:1.5;color:#000000;">
            Hi ${escapeHtml(firstName)}, your TestFlight invite is ready.
          </p>
          
          <p style="margin:0 0 30px 0;font-size:17px;line-height:1.5;color:#000000;">
            <strong>Your access will be activated in 2 days unless you take action.</strong>
          </p>
          
          <!-- Warning Box -->
          <div style="background:#fff8e1;border-left:4px solid #ffc107;padding:20px;margin:0 0 30px 0;">
            <p style="margin:0 0 10px 0;font-size:16px;color:#000000;">
              <strong>⚠️ TestFlight Required:</strong> Only active testers can access the app.
            </p>
            <p style="margin:0;font-size:16px;color:#000000;">
              Download TestFlight to prevent losing access to your beta invitation.
            </p>
          </div>
          
          <p style="margin:0 0 20px 0;font-size:17px;line-height:1.5;color:#000000;font-weight:600;">
            How to join the beta:
          </p>
          
          <ul style="margin:0 0 30px 0;padding-left:20px;">
            <li style="margin:0 0 10px 0;font-size:17px;line-height:1.5;color:#000000;">
              Click the TestFlight link below
            </li>
            <li style="margin:0 0 10px 0;font-size:17px;line-height:1.5;color:#000000;">
              Install TestFlight if you don't have it
            </li>
            <li style="margin:0;font-size:17px;line-height:1.5;color:#000000;">
              Download Lessaro and start testing
            </li>
          </ul>
          
          <p style="margin:0 0 30px 0;font-size:17px;line-height:1.5;color:#000000;">
            With TestFlight access, you can test all features and provide valuable feedback before our App Store launch.
          </p>
          
          <p style="margin:0 0 30px 0;font-size:17px;line-height:1.5;color:#000000;">
            <strong>Don't worry about your data:</strong> All your lesson plans and worksheets will be preserved and accessible in your account at any time.
          </p>
          
          <!-- CTA Button -->
          <div style="text-align:center;">
            <a href="${TESTFLIGHT_URL}"
               style="display:inline-block;background:#000000;color:#ffffff;
                      padding:15px 30px;text-decoration:none;font-size:17px;
                      font-weight:600;border-radius:8px;">
              Join TestFlight →
            </a>
          </div>
        </td>
      </tr>
      
      <!-- User Info -->
      <tr>
        <td style="padding:20px 40px;background:#f8f9fa;border-top:1px solid #e9ecef;">
          <p style="margin:0;font-size:15px;color:#6c757d;">
            <strong style="color:#000000;">Application Details:</strong> 
            Teacher: ${escapeHtml(isTeacher)} • 
            Grade: ${escapeHtml(gradeLevel || "—")} • 
            Subject: ${escapeHtml(subject || "—")}
          </p>
        </td>
      </tr>
      
      <!-- Footer -->
      <tr>
        <td style="padding:30px 40px;background:#667eea;text-align:center;">
          <p style="margin:0 0 10px 0;font-size:16px;color:#ffffff;font-weight:600;">
            Lessaro by Brinl LLC
          </p>
          <p style="margin:0 0 15px 0;font-size:14px;color:rgba(255,255,255,0.9);">
            Transforming education through AI-powered lesson planning
          </p>
          <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.8);">
            © ${new Date().getFullYear()} Brinl LLC. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  </div>
`.trim();


        const text = [
            `Welcome to Lessn 🎉`,
            ``,
            `Hi ${firstName}, your TestFlight invite is ready.`,
            ``,
            `Open TestFlight: ${TESTFLIGHT_URL}`,
            ``,
            `Submitted details:`,
            `- Teacher: ${isTeacher}`,
            `- Grade Level: ${gradeLevel || "—"}`,
            `- Subject: ${subject || "—"}`
        ].join("\n");

        // Send to user
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

        // Optional: notify your team (simple clean HTML)
        if (ADMIN_EMAIL) {
            const adminHtml = `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0b1220;">
          <h3 style="margin:0 0 8px 0;font-size:18px;">New TestFlight signup</h3>
          <p style="margin:0 0 8px 0;font-size:14px;">
            ${escapeHtml(firstName)} ${escapeHtml(lastName)} &lt;${escapeHtml(email)}&gt;
          </p>
          <ul style="margin:0;padding-left:18px;font-size:14px;color:#545869;">
            <li>Teacher: ${escapeHtml(isTeacher)}</li>
            <li>Grade Level: ${escapeHtml(gradeLevel || "—")}</li>
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
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}

// tiny HTML escaper to avoid accidental HTML injection in emails
function escapeHtml(s: string) {
    return s
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
