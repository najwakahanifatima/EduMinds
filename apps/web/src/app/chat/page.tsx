"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { sendMessageToAI } from "@/lib/api";

type Thread = {
    id: string;
    name: string;
    avatar: string;
    isCompanion?: boolean;
};

const threads: Thread[] = [
    {
        id: "bot",
        name: "EduBot",
        avatar: "/edubot.png",
    },
    {
        id: "jane",
        name: "Jane",
        avatar: "/pendamping.png",
        isCompanion: true,
    },
];

type Msg = {
    from: "me" | "other";
    text: string;
    time: string;
    read?: boolean;
};

const initialMsgs: Record<string, Msg[]> = {
    bot: [
        {
        from: "other",
        text: "Hai! Apa yang ingin kamu tanyakan?",
        time: "15:36",
        },
    ],
    jane: [
        { from: "me", text: "Halo kak jane, apakah besok bisa meeting?", time: "15:37", read: true },
        { from: "other", text: "Bisa banget dong!", time: "15:45" },
        { from: "other", text: "Kamu maunya jam berapa?", time: "15:45" },
    ],
};

export default function ChatPage() {
    const router = useRouter();
    const [active, setActive] = useState<Thread>(threads[0]);
    const [messages, setMessages] = useState<Record<string, Msg[]>>(initialMsgs);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, active.id]);

    const getThreadSnippet = (threadId: string): string => {
        const threadMessages = messages[threadId];
        if (!threadMessages || threadMessages.length === 0) {
            return "Belum ada pesan";
        }
        
        const lastMessage = threadMessages[threadMessages.length - 1];
        const maxLength = 20;
        
        if (lastMessage.text.length > maxLength) {
            return lastMessage.text.substring(0, maxLength) + "...";
        }
        
        return lastMessage.text;
    };

    const send = async () => {
        if (!input.trim()) return;

        const newMessage: Msg = {
            from: "me",
            text: input,
            time: new Date().toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            read: true,
        };

        // pesan user
        setMessages((prev) => ({
            ...prev,
            [active.id]: [...(prev[active.id] || []), newMessage],
        }));

        const userInput = input;
        setInput("");

        // kirim ke chatbot
        if (active.id === "bot") {
            console.log('DEBUG in FE: sending message to AI ', userInput);
            try {
                const replyText = await sendMessageToAI(userInput);
                const aiReply: Msg = {
                    from: "other",
                    text: replyText,
                    time: new Date().toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };

                // balasan dari AI
                setMessages((prev) => ({
                    ...prev,
                    [active.id]: [...(prev[active.id] || []), aiReply],
                }));
                
            } catch (error) {
                console.error("Gagal menghubungi AI:", error);
                const errorReply: Msg = {
                    from: "other",
                    text: "Maaf, terjadi kesalahan saat menghubungi EduBot.",
                    time: new Date().toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };
                setMessages((prev) => ({
                    ...prev,
                    [active.id]: [...(prev[active.id] || []), errorReply],
                }));
            }
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden">
            <aside className="w-[260px] border-r flex flex-col flex-shrink-0">
                <header className="flex items-center gap-4 px-4 py-3 border-b bg-white flex-shrink-0">
                    <img src="/arrow-back.png" className="h-5 w-5 cursor-pointer" 
                        onClick={() => router.push("/user-dashboard")}/>
                    <h2 className="text-xl font-semibold">Pesan</h2>
                </header>

                <div className="flex-1 overflow-y-auto">
                    <ul className="space-y-1 px-3 py-2">
                        {threads.map((t) => (
                        <li
                            key={t.id}
                            onClick={() => setActive(t)}
                            className={`cursor-pointer rounded-lg p-3 transition ${
                            active.id === t.id ? "bg-[#B3EBCE]/25 border-3 border-[#B3EBCE]" : "hover:bg-gray-100"
                            }`}
                        >
                            <div className="flex items-center gap-3">
                            <img src={t.avatar} className="h-8 w-8 rounded-full" />
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                <span className="font-semibold">{t.name}</span>
                                {t.isCompanion && (
                                    <span className="rounded-full bg-[#EDCD50] px-2 text-[10px] text-gray-700">Pendamping</span>
                                )}
                                </div>
                                <p className="text-xs text-gray-500 truncate">{getThreadSnippet(t.id)}</p>
                            </div>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </aside>

            <main className="flex-1 flex flex-col min-w-0">
                {/* Header chat */}
                <header className="flex items-center gap-4 border-b bg-[#FFEDA8] p-4 flex-shrink-0">
                    <img src={active.avatar} className="h-10 w-10 rounded-full" />
                    <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">{active.name}</h3>
                        {active.isCompanion && (
                        <span className="rounded-full bg-[#EDCD50] px-2 text-[10px] text-[#1E1E1E]">Pendamping</span>
                        )}
                    </div>
                    <div className="flex">
                        <span className="text-xs text-[#69C57D]">●  </span>
                        <span className="text-xs text-black">online</span>
                    </div>
                    </div>
                </header>

                {/* Messages area */}
                <div 
                    ref={messagesContainerRef}
                    className="flex-1 overflow-y-auto bg-white px-6 py-8 scroll-smooth"
                    style={{ minHeight: 0 }}
                >
                    {messages[active.id]?.map((m, idx) => (
                    <div key={idx} className={`mb-6 ${m.from === "me" ? "flex flex-col items-end" : "flex flex-col items-start"}`}>
                        {/* Chat bubble */}
                        <div
                        className={`max-w-[60%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                            m.from === "me" ? "bg-[#5254A8] border-2 border-[#41438E] text-white rounded-tr-none" : "bg-[#BFC1FF] text-[#1E1E1E] border-2 border-[#A0A3F7] rounded-tl-none"
                        }`}
                        >
                        {m.text}
                        </div>
                        {/* Info pengirim */}
                        <div className={`mt-1 text-[10px] text-gray-500 ${m.from === "me" ? "text-right" : "text-left"}`}>
                        <span>{m.read ? "Dibaca" : ""}</span>
                        <span className="ml-1">{m.time}</span>
                        </div>
                    </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input area */}
                <footer className="p-4 mb-4 bg-white border-t flex-shrink-0">
                    <div className="flex items-center gap-2 rounded-xl border border-[#1E1E1E] bg-[#E5E5E5] px-4">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && send()}
                        placeholder="Ketik pesanmu..."
                        className="flex-1 bg-transparent py-3 text-sm outline-none"
                    />
                    <button onClick={send}>
                        <PaperAirplaneIcon className="h-5 w-5 -rotate-45 text-gray-700 hover:text-indigo-700" />
                    </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}