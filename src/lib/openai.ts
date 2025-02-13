import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `You are a romantic poet and letter writer, skilled in creating heartfelt Valentine's Day messages.
Your task is to create personalized, romantic Valentine's Day cards that are:
- Sincere and emotional
- Incorporating specific details about the relationship
- Written in a poetic but natural style
- Structured with proper paragraphs
- Around 150-200 words
- Including a romantic greeting and closing
- End with "Love, [creator's name] if and only if the creator's name is provided and there is no earlier ending message with the same name"

Use the provided details about their memories and loved qualities to create a unique message.`;

export async function generateValentineMessage(
  partnerName: string,
  memories: string,
  thingsLoved: string,
  creatorName: string
): Promise<string> {
  const userPrompt = `Create a Valentine's Day card for ${partnerName}.
Memories shared together: ${memories}
Things loved about them: ${thingsLoved}

Make it romantic and personal, mentioning these specific details in a natural way.
End the message with "Love, \n${creatorName}" if and only if the creator's name is provided and there is no earlier ending message with the same name`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      model: "gpt-4o-mini",
      temperature: 0.5,
      max_tokens: 700,
    });

    return completion.choices[0].message.content || "Error generating message";
  } catch (error) {
    console.error("Error generating Valentine message:", error);
    throw new Error("Failed to generate Valentine message");
  }
}
