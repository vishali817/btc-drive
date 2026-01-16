import React, { useState } from 'react';
import { Send, User, Bot } from 'lucide-react';

const Help = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you with BTC Drive today?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const newMsg = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, newMsg]);
        setInput('');

        // Simulate reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "Thank you for your message. Our support team will get back to you shortly.",
                sender: 'bot'
            }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-180px)] max-w-2xl mx-auto p-4 bg-white rounded-xl shadow-sm border border-gray-100 my-4">
            <div className="flex-1 overflow-y-auto space-y-4 p-4 scrollbar-hide">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-end gap-2 max-w-[80%]`}>
                            {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center"><Bot size={16} className="text-[#195BAC]" /></div>}
                            <div className={`p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-[#195BAC] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
                                {msg.text}
                            </div>
                            {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-[#195BAC] flex items-center justify-center"><User size={16} className="text-white" /></div>}
                        </div>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-2 pb-24">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-1 p-3 border rounded-full focus:outline-none focus:border-[#195BAC]"
                />
                <button type="submit" className="p-3 bg-[#195BAC] text-white rounded-full hover:bg-blue-700 transition">
                    <Send size={20} />
                </button>
            </form>
        </div>
    );
};

export default Help;
