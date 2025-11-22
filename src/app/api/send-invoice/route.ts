import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { recipientEmail, pdfBase64, subject, body, companyName, invoiceNumber } = await request.json();

    // Validate required fields
    if (!recipientEmail || !pdfBase64 || !subject || !body) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Prepare filename
    const filename = `invoice-${companyName?.replace(/[^a-zA-Z0-9]/g, '-') || 'document'}-${invoiceNumber || Date.now()}.pdf`;

    // Send email
    const info = await transporter.sendMail({
      from: `"${companyName || 'Invoice Generator'}" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      subject,
      text: body,
      html: body.replace(/\n/g, '<br>'),
      attachments: [
        {
          filename,
          content: pdfBase64.split(',')[1], // Remove data:application/pdf;base64, prefix
          encoding: 'base64',
        },
      ],
    });

    return NextResponse.json({ 
      success: true, 
      messageId: info.messageId,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send email', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}
