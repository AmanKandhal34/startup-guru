
"use client";
import { useState, useRef, useEffect } from "react";

type ChatMessage = {
    role: "bot" | "user";
    text: string;
};

export default function Home() {
    const [message, setMessage] = useState("");
    const [ideaMemory, setIdeaMemory] = useState("");
    const [chat, setChat] = useState<ChatMessage[]>([
        {
            role: "bot",
            text: "Welcome to Startup Guru.\nPitch your startup idea in 2-3 lines and I will score it, map risks, and give an MVP plan.",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chat]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = message;

        setChat((prev) => [...prev, { role: "user", text: userMessage }]);
        setMessage("");
        setLoading(true);
        setIdeaMemory(userMessage);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: userMessage,
                    idea: ideaMemory || userMessage,
                }),
            });

            let data: { reply?: string } = {};
            try {
                data = await res.json();
            } catch {
                data = {};
            }

            if (!res.ok) {
                setChat((prev) => [
                    ...prev,
                    {
                        role: "bot",
                        text: data.reply || "I hit a snag while analyzing that. Please try again in a moment.",
                    },
                ]);
                return;
            }

            setChat((prev) => [
                ...prev,
                { role: "bot", text: data.reply || "No response received." },
            ]);
        } catch (err) {
            setChat((prev) => [
                ...prev,
                {
                    role: "bot",
                    text: "Unable to reach server. Please check if the app is running and try again.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const resetChat = () => {
        setIdeaMemory("");
        setChat([
            {
                role: "bot",
                text: "New chat started. Share your startup idea and I will break it down like an investor memo.",
            },
        ]);
    };

    return (
        <div className="chat-shell">
            <aside className="chat-sidebar">
                <button onClick={resetChat} className="new-chat-btn">
                    + New chat
                </button>

                <div className="chat-history">
                    <p className="history-title">Recent</p>
                    <button className="history-item" type="button">Startup score breakdown</button>
                    <button className="history-item" type="button">Pricing strategy check</button>
                    <button className="history-item" type="button">MVP launch plan</button>
                </div>

                <p className="sidebar-footer">Startup Guru v1</p>
            </aside>

            <main className="chat-main">
                <header className="chat-topbar">
                    <div>
                        <p className="topbar-title">Startup Guru</p>
                        <p className="topbar-subtitle">Advisor mode</p>
                    </div>
                    <button onClick={resetChat} className="mobile-new-chat" type="button">
                        New chat
                    </button>
                </header>

                <section className="chat-scroll">
                    {chat.map((msg, i) => (
                        <div key={i} className={`msg-row ${msg.role === "user" ? "user" : "bot"}`}>
                            <div className={`msg-bubble ${msg.role === "user" ? "user-bubble" : "bot-bubble"}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className="loading-row">
                            <span>Thinking</span>
                            <span className="dot"></span>
                            <span className="dot dot-delay-1"></span>
                            <span className="dot dot-delay-2"></span>
                        </div>
                    )}

                    <div ref={chatEndRef} />
                </section>

                <footer className="chat-composer-wrap">
                    <div className="chat-composer">
                        <input
                            className="chat-input"
                            placeholder="Message Startup Guru..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={loading || !message.trim()}
                            className="send-btn"
                            type="button"
                        >
                            Send
                        </button>
                    </div>
                    <p className="composer-note">Startup Guru can make mistakes. Verify key assumptions.</p>
                </footer>
            </main>
        </div>
    );
}
