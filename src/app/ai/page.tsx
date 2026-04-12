"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

// Updated context-aware replies for Gather
const MOCK_REPLIES = [
  "There are 3 major events at DTU this week, including a Hackathon and a Cultural Fest. Would you like the registration links?",
  "You have a 1-on-1 mentorship session scheduled for tomorrow at 4:00 PM with Priya Sharma.",
  "NSUT just updated their society listings. The Robotics society is now accepting new members.",
  "Based on your profile, I recommend checking out the 'Gen AI' workshop happening at IIT Delhi next month.",
  "I've analyzed the upcoming schedule. You have a gap on Friday—perfect time to visit the BITS Pilani tech fest!",
  "Gather is currently tracking 50+ active societies across 8 colleges. Which one can I help you explore?",
];

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "ai",
      content: "Welcome to Gather AI. I can help you track upcoming events, manage your mentor meetings, or find societies across colleges. What's on your mind?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let finalReply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];
      
      const query = userMessage.content.toLowerCase();
      if (query.includes("event")) {
        finalReply = "The biggest upcoming event is Engifest 2026 at DTU. I can also show you tech symposiums at IIT Delhi.";
      } else if (query.includes("meeting") || query.includes("session")) {
        finalReply = "Checking your dashboard... You have one upcoming session with Sneha Gupta (UI/UX) on Wednesday.";
      } else if (query.includes("hello") || query.includes("hi")) {
        finalReply = "Hello! Ready to explore the college circuit? Ask me about fests or your scheduled meetings.";
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), role: "ai", content: finalReply },
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-500 flex flex-col">
      {/* Top Fixed Header with Back Button */}
      <header className="fixed top-0 inset-x-0 h-20 border-b border-black/5 dark:border-white/10 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-[1000px] mx-auto h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/colleges" 
              className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-full transition-colors group"
            >
              <ArrowLeft size={20} className="text-neutral-500 group-hover:text-black dark:group-hover:text-white" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center shadow-lg">
                <Bot size={20} className="text-white dark:text-black" />
              </div>
              <div>
                <h1 className="text-lg font-display font-bold text-black dark:text-white leading-none">
                  Gather AI
                </h1>
                <p className="text-[10px] font-bold uppercase tracking-widest text-green-500 mt-1">
                  System Active
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex gap-2">
            {["Events", "Meetings", "Colleges"].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-[10px] font-bold uppercase tracking-tighter text-neutral-500 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-[1000px] w-full mx-auto px-4 md:px-12 flex-1 flex flex-col pt-24">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto py-8 space-y-8">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "flex items-start gap-4",
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-1 shadow-sm",
                  m.role === "ai" ? "bg-black dark:bg-white" : "bg-neutral-100 dark:bg-neutral-900"
                )}>
                  {m.role === "ai" ? (
                    <Sparkles size={14} className="text-white dark:text-black" />
                  ) : (
                    <User size={14} className="text-neutral-500" />
                  )}
                </div>

                <div className={cn(
                  "max-w-[80%] px-6 py-4 rounded-[1.5rem] text-[15px] font-medium leading-relaxed shadow-sm",
                  m.role === "user" 
                    ? "bg-black text-white dark:bg-white dark:text-black rounded-tr-none" 
                    : "bg-neutral-50 border border-black/5 dark:bg-neutral-900/40 dark:border-white/10 text-black dark:text-white rounded-tl-none"
                )}>
                  {m.content}
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center shrink-0 mt-1">
                  <Loader2 size={14} className="text-white dark:text-black animate-spin" />
                </div>
                <div className="px-6 py-4 rounded-[1.5rem] rounded-tl-none bg-neutral-50 dark:bg-neutral-900/40 border border-black/5 dark:border-white/10 flex gap-1">
                   {[0, 1, 2].map((i) => (
                     <motion.div
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                        className="w-1.5 h-1.5 bg-neutral-400 rounded-full"
                     />
                   ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} className="h-20" />
        </div>

        {/* Input Area */}
        <div className="sticky bottom-0 bg-white dark:bg-black pb-8 pt-4">
          <form 
            onSubmit={handleSubmit}
            className="relative flex items-center bg-neutral-50 dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-xl focus-within:border-black dark:focus-within:border-white transition-all group"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Engifest, meetings with mentors, or society details..."
              className="flex-1 bg-transparent border-none py-5 px-6 outline-none text-[15px] font-medium text-black dark:text-white placeholder:text-neutral-400"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="mr-3 p-3 bg-black text-white dark:bg-white dark:text-black rounded-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
            </button>
          </form>
          <p className="text-center mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
            Gather Intelligence v1.0 • Powered by Gather
          </p>
        </div>
      </div>
    </div>
  );
}