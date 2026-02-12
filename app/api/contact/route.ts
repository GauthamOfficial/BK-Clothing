import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message, honeypot } = body;

    // Anti-spam: Reject if honeypot field is filled
    if (honeypot) {
      return NextResponse.json({ success: true }); // Silent reject
    }

    // Basic validation
    if (!name || !phone || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.CONTACT_TO_EMAIL;

    if (gmailUser && gmailAppPassword && toEmail) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailAppPassword,
        },
      });

      await transporter.sendMail({
        from: `"BK Clothing Website" <${gmailUser}>`,
        to: toEmail,
        replyTo: email,
        subject: `New Contact Form: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #000; border-bottom: 2px solid #ff003a; padding-bottom: 10px;">
              New Contact Form Submission
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Name:</td>
                <td style="padding: 8px 0; color: #555;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #555;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #555;">
                  <a href="mailto:${email}" style="color: #ff003a;">${email}</a>
                </td>
              </tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
              <p style="font-weight: bold; color: #333; margin: 0 0 8px 0;">Message:</p>
              <p style="color: #555; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              Sent from BK Clothing website contact form
            </p>
          </div>
        `,
      });
    } else {
      console.log("Contact form submission (Gmail not configured):", {
        name,
        phone,
        email,
        message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
