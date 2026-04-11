"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, User, Send, Sparkles, Loader2, Coins, Plus } from "lucide-react";
import { getUserCredits, deductAICredit, purchaseCredits } from "@/src/app/actions/users";

type Message = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

const INITIAL_MESSAGE: Message = {
  id: "1",
  role: "assistant",
  content: "Hi there! I'm your Gathers AI assistant. I can help you find the perfect upcoming events, societies that match your interests, or information about any college in Delhi. What are you looking for today?"
};

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [credits, setCredits] = useState(0);
  const [loadingCredits, setLoadingCredits] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUserCredits().then(c => {
      setCredits(c);
      setLoadingCredits(false);
    });
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleBuyCredits = async () => {
     const result = await purchaseCredits(5);
     if (result.success) setCredits(result.remaining!);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (credits <= 0) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: "assistant",
        content: "Oops! You've run out of AI credits. Please top up your account to continue chatting."
      }]);
      return;
    }

    const currentInput = input;
    setInput("");

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: currentInput
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: currentInput })
      });
      
      const data = await res.json();
      
      if (res.ok) {
         if (data.remainingCredits !== undefined) {
           setCredits(data.remainingCredits);
         }
         
         setMessages(prev => [...prev, {
           id: (Date.now() + 1).toString(),
           role: "assistant",
           content: data.text
         }]);
      } else {
         setMessages(prev => [...prev, {
           id: (Date.now() + 1).toString(),
           role: "assistant",
           content: data.error || "Sorry, I encountered an error."
         }]);
      }
    } catch (e) {
       setMessages(prev => [...prev, {
         id: (Date.now() + 1).toString(),
         role: "assistant",
         content: "Network error occurred."
       }]);
    }

    setIsTyping(false);
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    show: { opacity: 1, scale: 1, y: 0 }
  };

  return (
    <div className="h-[calc(100vh-8rem)] max-h-[800px] flex flex-col bg-card border rounded-3xl overflow-hidden shadow-xl shadow-primary/5">
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between bg-card/50 backdrop-blur-md z-10">
         <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
               <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
               <h2 className="font-bold text-lg leading-tight">Gathers AI</h2>
               <div className="flex items-center text-xs text-emerald-500 font-medium">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" /> Online
               </div>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-bold border">
               {loadingCredits ? <Loader2 className="h-3 w-3 animate-spin" /> : <Coins className="h-4 w-4 text-amber-500" />}
               <span>{loadingCredits ? "..." : credits} Credits</span>
            </div>
            <button onClick={handleBuyCredits} className="p-1.5 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-full border border-primary/20">
               <Plus className="h-4 w-4" />
            </button>
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id} 
                variants={item}
                layout
                className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center ${
                  msg.role === "user" ? "bg-muted" : "bg-gradient-to-br from-primary to-purple-600 shadow-md"
                }`}>
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 text-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                  ? "bg-primary text-primary-foreground rounded-tr-sm" 
                  : "bg-muted text-foreground rounded-tl-sm border"
                }`}>
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="flex gap-4 max-w-[80%] mr-auto"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-md">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="px-5 py-4 rounded-2xl bg-muted rounded-tl-sm flex items-center gap-1.5 border">
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="h-2 w-2 rounded-full bg-primary/40 text-primary" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="h-2 w-2 rounded-full bg-primary/60 text-primary" />
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="h-2 w-2 rounded-full bg-primary text-primary" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </motion.div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-card border-t">
         <form onSubmit={handleSend} className="relative max-w-4xl mx-auto flex items-center bg-background border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all shadow-sm">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={credits > 0 ? "Ask about events, societies, or colleges..." : "Out of credits. Please purchase more."}
              className="flex-1 bg-transparent px-5 py-4 focus:outline-none disabled:opacity-50"
              disabled={isTyping || credits <= 0}
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping || credits <= 0}
              className="mr-2 p-2 rounded-xl bg-primary text-primary-foreground disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground transition-all hover:bg-primary/90"
            >
              {isTyping ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
         </form>
         <p className="text-center text-[11px] font-medium text-muted-foreground mt-3 tracking-wide">
            1 Message = 1 AI Credit. You have {credits} credits remaining.
         </p>
      </div>
    </div>
  );
}
