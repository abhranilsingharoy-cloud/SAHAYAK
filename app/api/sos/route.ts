import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { location, name, phone } = await req.json();
    
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    const sosAlertPhone = process.env.SOS_ALERT_PHONE;

    const messageBody = `EMERGENCY SOS from SAHAYAK-AI: ${name} needs help at ${location}. Call ${phone} immediately. Helpline: 14566`;

    if (accountSid && authToken && twilioPhone && sosAlertPhone) {
      // Send real SMS via Twilio REST API
      const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');
      const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          To: sosAlertPhone,
          From: twilioPhone,
          Body: messageBody
        })
      });

      if (!response.ok) {
        console.error("Twilio Error:", await response.text());
        throw new Error("Failed to send Twilio SMS");
      }
      
      return NextResponse.json({ success: true, message: "SOS sent successfully via SMS", demoMode: false });
    }

    // Demo mode
    console.log("DEMO SOS MODE (Twilio not configured)");
    console.log("Would have sent:", messageBody);
    
    return NextResponse.json({ success: true, message: "Demo SOS logged to console", demoMode: true });

  } catch (error) {
    console.error("SOS API Error:", error);
    return NextResponse.json({ success: false, message: "Failed to process SOS alert", demoMode: true }, { status: 500 });
  }
}
