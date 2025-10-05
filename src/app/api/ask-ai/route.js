export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question) {
      return Response.json({ error: "No question provided" }, { status: 400 });
    }

    // OpenRouter API কল
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are AgriBot, a smart Bangla-speaking AI assistant for AgriSmart. Help farmers by giving clear, short, and useful farming advice in Bangla.",
          },
          { role: "user", content: question },
        ],
      }),
    });

    // যদি API ঠিকমতো কাজ না করে
    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenRouter Error:", errorText);
      return Response.json(
        { error: "AI server error. Please try again later." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices?.[0]?.message?.content || "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।";

    return Response.json({ answer: aiMessage });
  } catch (error) {
    console.error("AI API Error:", error);
    return Response.json(
      { answer: "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
