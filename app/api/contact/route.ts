import { NextResponse } from "next/server";

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

    // In production, you would send an email here using Resend, SendGrid, etc.
    // For now, log the submission
    console.log("Contact form submission:", {
      name,
      phone,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    // Example: If RESEND_API_KEY is set, send email
    // const resendKey = process.env.RESEND_API_KEY;
    // if (resendKey) {
    //   await fetch("https://api.resend.com/emails", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${resendKey}`,
    //     },
    //     body: JSON.stringify({
    //       from: "noreply@bkclothing.lk",
    //       to: process.env.CONTACT_TO_EMAIL,
    //       subject: `Contact Form: ${name}`,
    //       html: `<p><strong>Name:</strong> ${name}</p>
    //              <p><strong>Phone:</strong> ${phone}</p>
    //              <p><strong>Email:</strong> ${email}</p>
    //              <p><strong>Message:</strong> ${message}</p>`,
    //     }),
    //   });
    // }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
