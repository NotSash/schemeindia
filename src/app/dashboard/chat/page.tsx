'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    ArrowLeft,
    Send,
    Bot,
    User,
    Sparkles,
    Loader2,
} from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
    'What documents do I need for PM-KISAN?',
    'How to apply for Ayushman Bharat?',
    'Am I eligible for housing schemes?',
    'What scholarship schemes are available?',
    'How does PMAY work for urban areas?',
];

export default function AIChatPage() {
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: 'Hello! 👋 I\'m your SchemeIndia AI assistant. I can help you understand government schemes, eligibility criteria, application processes, and required documents. Ask me anything about government schemes!',
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || loading) return;

        const userMessage: ChatMessage = {
            role: 'user',
            content: messageText,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        try {
            // Call AI chat API
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText }),
            });

            const data = await response.json();

            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: data.reply || 'I apologize, but I couldn\'t process that request. Please try again.',
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, assistantMessage]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: 'assistant',
                    content: 'Sorry, I\'m having trouble connecting right now. Please try again in a moment.',
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-muted/30 flex flex-col">
            {/* Header */}
            <div className="border-b bg-card px-4 py-3">
                <div className="mx-auto max-w-3xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-blue text-white">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold">SchemeIndia AI</p>
                                <p className="text-xs text-muted-foreground">Ask about government schemes</p>
                            </div>
                        </div>
                    </div>
                    <Badge className="bg-brand-saffron text-white border-0">
                        <Sparkles className="h-3 w-3 mr-1" /> Premium
                    </Badge>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="mx-auto max-w-3xl space-y-4">
                    {messages.map((msg, i) => (
                        <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'assistant' && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                                    <Bot className="h-4 w-4" />
                                </div>
                            )}
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user'
                                    ? 'bg-brand-blue text-white rounded-br-md'
                                    : 'bg-card border shadow-sm rounded-bl-md'
                                }`}>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                <p className={`text-[10px] mt-1 ${msg.role === 'user' ? 'text-blue-200' : 'text-muted-foreground'}`}>
                                    {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                            {msg.role === 'user' && (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-saffron text-white">
                                    <User className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                    {loading && (
                        <div className="flex gap-3 justify-start">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-blue text-white">
                                <Bot className="h-4 w-4" />
                            </div>
                            <div className="bg-card border shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
                                <Loader2 className="h-4 w-4 animate-spin text-brand-blue" />
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Suggestions */}
            {messages.length <= 1 && (
                <div className="px-4 pb-2">
                    <div className="mx-auto max-w-3xl">
                        <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
                        <div className="flex flex-wrap gap-2">
                            {SUGGESTED_QUESTIONS.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => sendMessage(q)}
                                    className="text-xs bg-card border rounded-full px-3 py-1.5 hover:bg-muted transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="border-t bg-card px-4 py-3">
                <div className="mx-auto max-w-3xl flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                        placeholder="Ask about any government scheme..."
                        disabled={loading}
                        className="flex-1"
                    />
                    <Button
                        onClick={() => sendMessage()}
                        disabled={!input.trim() || loading}
                        className="bg-brand-saffron hover:bg-brand-saffron/90 text-white"
                        size="icon"
                    >
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
