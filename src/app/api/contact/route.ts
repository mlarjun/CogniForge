import { NextRequest, NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  service?: string;
  description?: string;
  budget?: string;
  source?: "contact-page" | "chat-widget";
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, company, service, description, budget, source = "contact-page" } = body;

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }
    if (!email || !email.trim() || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (source === "contact-page" && (!description || !description.trim())) {
      return NextResponse.json({ error: "Project description is required." }, { status: 400 });
    }

    const recipientEmail = process.env.CONTACT_EMAIL || "arjun830063@gmail.com";
    const resendApiKey = process.env.RESEND_API_KEY;

    // Format readable service title
    const serviceTitles: Record<string, string> = {
      "rag-chatbot": "RAG Chatbot Development",
      "face-rec": "Face Recognition & Auth",
      "genai-app": "GenAI-Powered App",
      "ai-proctoring": "AI Proctoring Systems",
      "ml-model": "ML Model Development",
      "fullstack-ai": "Full-Stack AI Application",
      "other": "Other / Consultation",
    };

    const readableService = service ? serviceTitles[service] || service : "General Inquiry";
    const isChatLead = source === "chat-widget";
    const subject = isChatLead
      ? `💬 New Chat Lead: ${name} (${email})`
      : `🚀 New Project Inquiry: ${name} - ${readableService}`;

    const submissionTime = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d1117; color: #e6edf3; padding: 24px; margin: 0; }
    .card { background-color: #161b22; border: 1px solid #30363d; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #14b8a6, #3b82f6); padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; color: #ffffff; font-weight: 700; letter-spacing: -0.5px; }
    .header p { margin: 6px 0 0 0; color: rgba(255,255,255,0.85); font-size: 14px; }
    .content { padding: 28px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #8b949e; margin-bottom: 6px; font-weight: 600; }
    .value { font-size: 16px; color: #f0f6fc; font-weight: 500; word-break: break-word; }
    .box { background: #0d1117; border: 1px solid #30363d; border-radius: 8px; padding: 16px; font-size: 15px; line-height: 1.6; color: #e6edf3; white-space: pre-wrap; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background-color: rgba(20, 184, 166, 0.15); color: #2dd4bf; border: 1px solid rgba(20, 184, 166, 0.3); font-size: 13px; font-weight: 600; }
    .footer { border-top: 1px solid #30363d; padding: 18px 28px; text-align: center; font-size: 12px; color: #8b949e; background-color: #11151c; }
    .btn { display: inline-block; padding: 10px 20px; background-color: #2dd4bf; color: #0d1117; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; margin-top: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>${isChatLead ? "New AI Chat Lead" : "New Client Inquiry"}</h1>
      <p>CogniForge AI Portfolio</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">${escapeHtml(name)}</div>
      </div>

      <div class="field">
        <div class="label">Email Address</div>
        <div class="value">
          <a href="mailto:${escapeHtml(email)}" style="color: #2dd4bf; text-decoration: none;">${escapeHtml(email)}</a>
        </div>
      </div>

      ${company ? `
      <div class="field">
        <div class="label">Company / Organization</div>
        <div class="value">${escapeHtml(company)}</div>
      </div>` : ""}

      ${service ? `
      <div class="field">
        <div class="label">Service Requested</div>
        <div class="value"><span class="badge">${escapeHtml(readableService)}</span></div>
      </div>` : ""}

      ${budget ? `
      <div class="field">
        <div class="label">Budget Range</div>
        <div class="value"><span class="badge">${escapeHtml(budget)}</span></div>
      </div>` : ""}

      ${description ? `
      <div class="field">
        <div class="label">Project Description</div>
        <div class="box">${escapeHtml(description)}</div>
      </div>` : ""}

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${escapeHtml(email)}?subject=Re:%20Inquiry%20regarding%20${encodeURIComponent(readableService)}" class="btn">Reply to ${escapeHtml(name)}</a>
      </div>
    </div>
    <div class="footer">
      Received on ${submissionTime} IST &bull; Source: ${isChatLead ? "Chatbot Widget" : "Contact Page Form"}
    </div>
  </div>
</body>
</html>
    `.trim();

    // If Resend API Key is configured, dispatch email via Resend REST API
    if (resendApiKey) {
      const fromEmail = process.env.EMAIL_FROM || "CogniForge Contact <onboarding@resend.dev>";

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipientEmail],
          reply_to: email,
          subject: subject,
          html: htmlContent,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error("Resend API error:", errorData);
        return NextResponse.json(
          { error: errorData.message || "Failed to send email through email service." },
          { status: 502 }
        );
      }

      const resendResult = await resendResponse.json();
      return NextResponse.json({ success: true, id: resendResult.id });
    }

    // Fallback: If RESEND_API_KEY is not configured yet, log details to console
    // so no submission is dropped, and inform user in dev/demo mode.
    console.log("=== NEW INQUIRY RECEIVED (Set RESEND_API_KEY in .env.local to send email) ===");
    console.log({
      to: recipientEmail,
      subject,
      name,
      email,
      company,
      service: readableService,
      budget,
      description,
      source,
      time: submissionTime,
    });
    console.log("==========================================================================");

    return NextResponse.json({
      success: true,
      mode: "logged",
      message: "Inquiry received successfully.",
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed." }, { status: 405 });
}
