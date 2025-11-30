export async function POST(req) {
  try {
    const { question, farmDetails, completedTasks } = await req.json();

    if (!question) {
      return Response.json({ error: "No question provided" }, { status: 400 });
    }

    // Build context-aware prompt
    let contextPrompt = question;

    if (farmDetails) {
      contextPrompt += `\n\nফার্মের তথ্য:\n`;
      contextPrompt += `- নাম: ${farmDetails.name}\n`;
      contextPrompt += `- অবস্থান: ${farmDetails.location}\n`;
      contextPrompt += `- আকার: ${farmDetails.size} একর\n`;
      contextPrompt += `- ফসল: ${farmDetails.crop}\n`;

      if (farmDetails.variety) {
        contextPrompt += `- জাত: ${farmDetails.variety}\n`;
      }

      if (farmDetails.plantingDate) {
        contextPrompt += `- রোপণের তারিখ: ${new Date(farmDetails.plantingDate).toLocaleDateString('bn-BD')}\n`;
      }

      if (farmDetails.soilType) {
        contextPrompt += `- মাটির ধরন: ${farmDetails.soilType}\n`;
      }

      if (farmDetails.soilPH) {
        contextPrompt += `- মাটির pH: ${farmDetails.soilPH}\n`;
      }

      if (farmDetails.irrigationSource) {
        contextPrompt += `- সেচের উৎস: ${farmDetails.irrigationSource}\n`;
      }

      if (farmDetails.organicPractices !== undefined) {
        contextPrompt += `- অর্গানিক চাষ: ${farmDetails.organicPractices ? 'হ্যাঁ' : 'না'}\n`;
      }
    }

    if (completedTasks && completedTasks.length > 0) {
      contextPrompt += `\n\nসম্পন্ন কাজসমূহ:\n`;
      completedTasks.forEach((task, index) => {
        contextPrompt += `${index + 1}. ${task.title} - ${task.description} (${task.date})\n`;
      });
    }

    // OpenRouter API কল
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are AgriBot, a smart Bangla-speaking AI assistant for AgriSmart. You are an expert in Bangladesh agriculture. Help farmers by giving clear, practical, and useful farming advice in Bangla (Bengali language). When given farm details and completed tasks, provide specific suggestions based on that context. Consider the crop type, soil conditions, location, and completed activities to give personalized recommendations. Always respond in Bengali language.",
            },
            { role: "user", content: contextPrompt },
          ],
        }),
      }
    );

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
    console.log("data", data);
    const aiMessage =
      data.choices?.[0]?.message?.content ||
      "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।";

    return Response.json({ answer: aiMessage });
  } catch (error) {
    console.error("AI API Error:", error);
    return Response.json(
      { answer: "দুঃখিত, আমি এখন উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।" },
      { status: 500 }
    );
  }
}
