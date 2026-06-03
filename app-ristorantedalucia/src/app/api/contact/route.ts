import { NextResponse, NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

// Handles POST requests to /api

export async function POST(request: NextRequest) {
  if (request.method !== 'POST') {
    return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
  } else {
    const formData = await request.formData();
    if (formData.get('recaptchaToken') === null) {
      return NextResponse.json({ message: "COULD NOT SEND MESSAGE (recaptcha token null)" }, { status: 500 });
    } else {
      const token = formData.get('recaptchaToken');
      const projectID = process.env.NEXT_RECAPTCHA_PROJECT_ID;
      const apiKey = process.env.NEXT_RECAPTCHA_API_KEY;
      const siteKey = process.env.NEXT_RECAPTCHA_SITE_KEY;

      const res = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://www.ristorantedalucia.it/',
        },
        body: JSON.stringify({
          event: {
            token: token,
            siteKey: siteKey,
            expectedAction: "form_submit",
          }
        }),
      });
      const data = await res.json();

      if (!data.tokenProperties || !data.tokenProperties.valid) {
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 });
      } else if (data.riskAnalysis && data.riskAnalysis.score < .5) {
        return NextResponse.json({ message: "COULD NOT SEND MESSAGE (score)" }, { status: 500 });
      } else {
        const username = process.env.SMTP_SERVER_USERNAME;
        const password = process.env.SMTP_SERVER_PASSWORD;
        const myEmail = process.env.SITE_MAIL_RECIEVER;
        const name = formData.get('name'),
          lastname = formData.get('lastname'),
          email = formData.get('email'),
          tel = formData.get('tel'),
          message = formData.get('message');

        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_SERVER_HOST,
          port: Number(process.env.SMTP_SERVER_PORT),
          secure: true,
          tls: {
            rejectUnauthorized: false,
          },

          auth: {
            user: username,
            pass: password
          }
        } as nodemailer.TransportOptions);
        try {
          transporter.sendMail({
            from: username,
            to: myEmail,
            replyTo: typeof email === 'string' ? email : undefined,
            subject: `Nuovo messaggio da ${email}`,
            html: `
              <p>Nome: ${name} ${lastname}</p>
              <p>Email: ${email} </p>
              <p>Tel: ${tel} </p>
              <p>Messaggio: ${message} </p>
              `,
          });
          return NextResponse.json({ message: "Success: email was sent" }, { status: 200 });
        } catch (error) {
          console.log(error)
          return NextResponse.json({ message: "COULD NOT SEND MESSAGE" }, { status: 500 })
        }
      }
    }
  }
}