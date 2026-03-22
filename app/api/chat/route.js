import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req) {
    try {
        const body = await req.json();
        const message = body?.message?.trim();

        if (!process.env.OPENROUTER_API_KEY) {
    return new Response(JSON.stringify({ reply }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
        }

        if (!message) {
            return new Response(
                JSON.stringify({ reply: "Message is required." }),
                { status: 400 }
            );
        }

        const client = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
            defaultHeaders: {
                "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
                "X-Title": "Startup Guru",
            },
        });

        const completion = await client.chat.completions.create({
            model: process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini",
            messages: [
                { role: "user", content: `Startup Idea: ${body.idea}\nUser Message: ${message}` }
            ],
        });

        const reply = completion.choices?.[0]?.message?.content;

        if (!reply) {
            return new Response(
                JSON.stringify({ reply: "Provider returned an empty response." }),
                { status: 502 }
            );
        }

        return new Response(JSON.stringify({ reply }), { status: 200 });

    } catch (err) {
        console.error(err);
        const status = Number(err?.status) || 500;
        const message = err?.message || "Unexpected server error";

        return new Response(
            JSON.stringify({ reply: message }),
            { status }
        );
    }
}