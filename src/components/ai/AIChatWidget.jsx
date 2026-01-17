import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIChatWidget = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'bot', text: 'Hi 👋 How can I help you manage your files today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // User Message
        const userMsg = { id: Date.now(), sender: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Simulate Bot Response
        setTimeout(() => {
            const botMsg = {
                id: Date.now() + 1,
                sender: 'bot',
                text: "I'm a demo AI. In a real app, I would process: " + inputValue
            };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="fixed top-20 right-8 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-[60] flex flex-col overflow-hidden"
                    style={{ maxHeight: 'calc(100vh - 120px)' }}
                >
                    {/* Header */}
                    <div className="bg-[#0B1F3B] p-4 flex items-center justify-between text-white shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 bg-white/10 rounded-lg">
                                <Sparkles size={18} className="text-blue-300" />
                            </div>
                            <span className="font-bold text-sm tracking-wide">BTC AI Assistant</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-[400px]">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-indigo-100 text-indigo-600' : 'bg-blue-100 text-[#0B1F3B]'}`}>
                                    {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} />}
                                </div>
                                <div
                                    className={`max-w-[80%] p-3 text-sm rounded-2xl ${msg.sender === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-none'
                                            : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-tl-none'
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-3 bg-white border-t border-gray-100 shrink-0">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder:text-gray-400"
                            />
                            <button
                                onClick={handleSend}
                                className={`p-2 rounded-lg transition-all ${inputValue.trim() ? 'bg-[#0B1F3B] text-white shadow-md' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                                disabled={!inputValue.trim()}
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIChatWidget;
