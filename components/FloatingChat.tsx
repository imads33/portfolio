'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { sendMessageToMadi } from '@/actions/chat'

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const suggestions = [
    "Hi, Madi here!",
    "Ask me anything!",
    "Lazy to scroll? Ask me instead!"
]

export function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! I'm Madi. Ask me anything about this portfolio!" }
    ])
    const [input, setInput] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [suggestionIndex, setSuggestionIndex] = useState(0)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    // Cycle suggestions
    useEffect(() => {
        const interval = setInterval(() => {
            setSuggestionIndex(prev => (prev + 1) % suggestions.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const { response, error } = await sendMessageToMadi(userMsg);
            if (error) {
                setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now." }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', content: response }]);
            }
        } catch {
            setMessages(prev => [...prev, { role: 'assistant', content: "Something went wrong." }]);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-24 right-6 w-80 md:w-96 h-[500px] bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 flex flex-col overflow-hidden z-50 ring-1 ring-black/5"
                    >
                        {/* Header */}
                        <div className="bg-stone-50 dark:bg-stone-800 p-4 flex justify-between items-center border-b border-stone-200 dark:border-stone-700">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shadow-sm">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-stone-800 dark:text-stone-100 text-sm">Ask Madi</h3>
                                    <p className="text-xs text-stone-500 dark:text-stone-400">AI Assistant</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 p-1 rounded-full hover:bg-stone-200 dark:hover:bg-stone-700 transition">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user'
                                            ? 'bg-orange-500 text-white rounded-br-none'
                                            : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-bl-none border border-stone-200 dark:border-stone-700'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-stone-100 dark:bg-stone-800 p-3 rounded-2xl rounded-bl-none border border-stone-200 dark:border-stone-700">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 border-t border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex items-center gap-2"
                            >
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all border-none"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="p-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
                {/* Floating Text Bubble */}
                <AnimatePresence mode="wait">
                    {!isOpen && (
                        <motion.div
                            key={suggestionIndex}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.9 }}
                            className="hidden md:block bg-white dark:bg-stone-800 px-4 py-2 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 text-sm font-medium text-stone-600 dark:text-stone-300 relative"
                        >
                            {suggestions[suggestionIndex]}
                            {/* Little triangle arrow pointing right */}
                            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white dark:bg-stone-800 rotate-45 border-t border-r border-stone-200 dark:border-stone-700" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 bg-stone-900 dark:bg-white text-white dark:text-stone-900 rounded-full shadow-lg flex items-center justify-center animate-float hover:shadow-orange-500/20 relative"
                    aria-label="Open Chat"
                >
                    <AnimatePresence mode='wait'>
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={28} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="open"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                            >
                                <Bot size={28} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </>
    )
}
