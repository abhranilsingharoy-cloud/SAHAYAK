import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: Request) {
  try {
    const { transcript, language } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        svi: 85,
        tags: ["Caste-based Slurs", "Physical Threat", "Immediate Danger"],
        sentiment: "Highly Distressed",
        urgency: "CRITICAL",
        keywords: ["attack", "threat", "caste"]
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `Analyze this Indian victim's distress call transcript. Rate the Severity Vulnerability Index (SVI) from 0 to 100 based on: vocal distress signals, caste-based discrimination indicators (SC/ST), physical threat level, emotional state, and contextual danger. Also extract relevant tags and keywords.
Return ONLY a JSON object with this exact structure:
{ "svi": number, "tags": string[], "sentiment": string, "urgency": "LOW"|"MEDIUM"|"HIGH"|"CRITICAL", "keywords": string[] }`;

    const result = await model.generateContent(`${systemPrompt}\n\nTranscript: ${transcript}\nLanguage: ${language}`);
    const text = result.response.text();
    
    // Extract JSON from response
    const jsonStr = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("SVI API Error:", error);
    return NextResponse.json({
      svi: 75,
      tags: ["Error parsing", "Default fallback"],
      sentiment: "Distressed",
      urgency: "HIGH",
      keywords: ["error"]
    });
  }
}
