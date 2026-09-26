import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { incident, complainant, location } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        firNumber: "FIR-DEMO-2026-001",
        sections: [
          { section: "3(1)(r)", description: "Intentionally insults or intimidates with intent to humiliate a member of a Scheduled Caste or a Scheduled Tribe in any place within public view" },
          { section: "3(1)(s)", description: "Abuses any member of a Scheduled Caste or a Scheduled Tribe by caste name in any place within public view" }
        ],
        narrative: `Based on the provided incident description by ${complainant} at ${location}, this is a demo narrative outlining the alleged offenses under the SC/ST (Prevention of Atrocities) Act.`,
        confidence: 85
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are a legal AI for Indian courts. Generate a formal FIR under the SC/ST (Prevention of Atrocities) Act, 1989. Identify relevant sections (3(1)(r), 3(1)(s), 3(2)(va), Section 4, etc.) based on the incident. Provide: 1) FIR number, 2) Applicable sections with descriptions, 3) Formal legal narrative paragraph, 4) AI confidence score. Return well-structured JSON only.
Format: { "firNumber": string, "sections": Array<{section: string, description: string}>, "narrative": string, "confidence": number }`;

    const result = await model.generateContent(`${systemPrompt}\n\nComplainant: ${complainant}\nLocation: ${location}\nIncident: ${incident}`);
    const text = result.response.text();
    
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("eFIR API Error:", error);
    return NextResponse.json({
      firNumber: "FIR-ERROR-000",
      sections: [],
      narrative: "Error generating FIR. Please consult a legal professional.",
      confidence: 0
    });
  }
}
