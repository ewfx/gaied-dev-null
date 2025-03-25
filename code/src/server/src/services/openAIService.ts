import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENAI_API_KEY || "",
  defaultHeaders: {
    "HTTP-Referer": "<YOUR_SITE_URL>",
    "X-Title": "<YOUR_SITE_NAME>",
  },
});

export default async function ask(
  prompt: string,
  model: string = "deepseek/deepseek-r1-zero:free"
) {
  try {
    const completion = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = completion.choices[0]?.message?.content?.trim() ?? "";

    // Extract reasoning if present
    let reasoningText = "";
    if (
      typeof completion.choices[0]?.message === "object" &&
      "reasoning" in completion.choices[0]?.message
    ) {
      reasoningText = (completion.choices[0]?.message as any).reasoning;
    }

    console.log("Raw Response Text:", responseText);
    console.log("Reasoning:", reasoningText);

    let responseJSON = extractJSON(responseText);
    console.log("Parsed Response JSON:", responseJSON);

    return { responseJSON, reasoningText };
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    return { responseText: "", reasoningText: "" };
  }
}

function extractJSON(rawText: string) {
  const jsonMatch = rawText.match(/```json\s*([\s\S]*?)\s*```/);
  let structuredJSON = {};

  if (jsonMatch) {
    try {
      structuredJSON = JSON.parse(jsonMatch[1]);
    } catch (error) {
      console.error(
        "Error parsing JSON:",
        error,
        "\nExtracted JSON String:",
        jsonMatch[1]
      );
    }
  } else {
    console.warn("No structured JSON found in response.");
  }

  return structuredJSON;
}
