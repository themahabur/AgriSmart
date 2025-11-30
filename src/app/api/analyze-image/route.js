import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { imageUrl, prompt } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Image URL is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://agrismart.com";
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "AgriSmart";
    const aiModel =
      process.env.OPENROUTER_MODEL || "qwen/qwen2.5-vl-32b-instruct:free";

    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenRouter API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": siteUrl,
          "X-Title": siteName,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: aiModel,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text:
                    prompt ||
                    "Analyze this agricultural image and provide detailed crop health assessment, disease identification, and treatment recommendations in Bengali language.",
                },
                {
                  type: "image_url",
                  image_url: {
                    url: imageUrl,
                  },
                },
              ],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("OpenRouter API error:", errorData);
      return NextResponse.json(
        { error: "Failed to analyze image", message: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      analysis: data.choices[0]?.message?.content || "Analysis not available",
      usage: data.usage,
    });
  } catch (error) {
    console.error("Image analysis error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
