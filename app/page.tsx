"use client";

import { useState } from "react";

export default function Home() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Cześć! 👋 Jestem Clyde 2.0. W czym mogę Ci pomóc?",
        },
    ]);

    const [input, setInput] = useState("");

    function sendMessage() {
        if (!input.trim()) return;

        const userMessage = input.trim();

        setMessages((old) => [
            ...old,
            { role: "user", content: userMessage },
            {
                role: "assistant",
                content: "Clyde 2.0: Otrzymałem Twoją wiadomość! 🤖",
            },
        ]);

        setInput("");
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white flex flex-col">
            <header className="border-b border-zinc-800 p-4">
                <h1 className="text-xl font-bold">🤖 Clyde 2.0</h1>
                <p className="text-sm text-zinc-400">
                    Twój własny chatbot
                </p>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                    ? "bg-blue-600"
                                    : "bg-zinc-800"
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-zinc-800 p-4">
                <div className="flex gap-2 max-w-4xl mx-auto">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") sendMessage();
                        }}
                        placeholder="Napisz wiadomość..."
                        className="flex-1 rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 outline-none focus:border-blue-500"
                    />

                    <button
                        onClick={sendMessage}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500"
                    >
                        Wyślij
                    </button>
                </div>
            </div>
        </main>
    );
}

