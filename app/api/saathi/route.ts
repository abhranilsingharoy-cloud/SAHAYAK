import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback
      return NextResponse.json({
        reply: "I am SAATHI (Demo Mode). I am here to help you understand your rights under the SC/ST Act. Please call 14566 immediately for emergency assistance.",
        suggestedActions: ["Call 14566", "Find nearest police station"]
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are SAATHI, an AI legal and safety assistant for the SAHAYAK-AI NHAA helpline in India. You help SC/ST atrocity victims understand their rights under the Protection of Civil Rights Act and the SC/ST (Prevention of Atrocities) Act 1989. You provide guidance on filing FIRs, legal aid from NALSA, and connecting with NGOs. Always respond in simple language. Always recommend calling 14566 for emergencies. Never provide advice that could endanger someone.`;

    const fullPrompt = `${systemPrompt}\n\nUser Context: ${context}\nUser: ${message}\nSAATHI:`;

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    return NextResponse.json({
      reply: text,
      suggestedActions: ["Call 14566", "File e-FIR"]
    });
  } catch (error) {
    console.error("SAATHI API Error:", error);
    return NextResponse.json({
      reply: "I am experiencing technical difficulties. Please call 14566 immediately for assistance.",
      suggestedActions: ["Call 14566"]
    }, { status: 500 });
  }
}
