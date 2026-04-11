import { NextResponse } from 'next/server';
import { deductAICredit } from '@/src/app/actions/users';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Deduct credit before answering
    const chargeResult = await deductAICredit();
    if (!chargeResult.success) {
      return NextResponse.json({ error: "Insufficient AI credits" }, { status: 403 });
    }

    // NOTE: This is where you would call an actual AI model (e.g. OpenAI)
    // using the Vercel AI SDK or OpenAI client.
    // Example:
    // const response = await openai.chat.completions.create({ ... })
    // return Response.json({ text: response.choices[0].message.content })

    // For now, we simulate a response
    let responseContent = "I can definitely help with that! Based on what you're asking, I'd recommend checking out the events page and applying filters.";
    const lowerInput = prompt.toLowerCase();
    
    if (lowerInput.includes("hackathon") || lowerInput.includes("tech")) {
      responseContent = "If you're interested in tech and hackathons, I highly recommend 'Hackverse 3.0' happening at NSUT!";
    } else if (lowerInput.includes("dance") || lowerInput.includes("cultural")) {
      responseContent = "For cultural events and dance, you should look out for 'Rhythm 26' by Oorja (Hansraj College)!";
    }

    // Simulate API latency
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return NextResponse.json({ text: responseContent, remainingCredits: chargeResult.remaining });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
