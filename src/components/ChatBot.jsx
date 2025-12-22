import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m **Euty**. I help businesses build AI-powered websites and intelligent automation tools.\n\nWhich area would you like to explore?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const suggestedReplies = [
        "AI Websites",
        "Automation",
        "Custom Apps",
        "Contact Us"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async (customText = null) => {
        if (customText === "Contact Us") {
            setIsOpen(false);
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
            return;
        }

        const messageText = customText || input;
        if (!messageText.trim() || isLoading) return;

        const userMessage = { role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        if (!customText) setInput('');
        setIsLoading(true);

        try {
            const systemPrompt = {
                role: "system",
                content: `You are Euty, a conversational sales assistant for Eutycreatives. 
                STRICT CONSTRAINTS:
                1. Progressive Disclosure: Never deliver more than 1-3 simple ideas per turn.
                2. 3-3-3 Rule: Max 3 bullet points, Max 3 lines per paragraph, Max 50 words total.
                3. Conversational Tone: Be helpful and brief. Avoid marketing fluff.
                4. Invite Choice: ALWAYS end with a short follow-up question to guide the user.
                5. Formatting: Use Markdown for bolding and bullet points. Use bullet points instead of long paragraphs.
                
                Knowledge: We specialze in AI-powered websites, Automation (chatbots, internal workflows), Custom Web Applications, and UX/UI Design.`
            };

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [systemPrompt, ...messages, userMessage],
                    temperature: 0.7
                })
            });

            const data = await response.json();

            if (data.choices && data.choices[0]) {
                setMessages(prev => [...prev, data.choices[0].message]);
            } else {
                throw new Error('Invalid response');
            }
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'I encountered an error. Please check your setup.'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Bubble */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '30px',
                    background: 'linear-gradient(45deg, #00BFFF, #FF8C00)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    zIndex: 2000,
                }}
            >
                <span style={{ fontSize: '1.6rem', color: 'white' }}>
                    {isOpen ? '✕' : '🤖'}
                </span>
            </motion.div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '30px',
                            width: '400px',
                            maxHeight: '600px',
                            height: '80vh',
                            background: 'rgba(10, 10, 10, 0.9)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '24px',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                            zIndex: 1999,
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: '1.2rem 1.5rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4BB543', boxShadow: '0 0 10px #4BB543' }}></div>
                                <h3 style={{ margin: 0, fontSize: '1.05rem', color: 'white', fontWeight: 600 }}>
                                    Euty <span style={{ color: '#888', fontSize: '0.75rem', fontWeight: 400 }}>| Sales Assistant</span>
                                </h3>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '1.2rem' }}
                            >✕</button>
                        </div>

                        {/* Messages Area */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.2rem'
                        }}>
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%',
                                        padding: '0.9rem 1.2rem',
                                        borderRadius: '20px',
                                        fontSize: '0.92rem',
                                        lineHeight: '1.5',
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, #00BFFF, #0080FF)'
                                            : 'rgba(255, 255, 255, 0.07)',
                                        color: msg.role === 'user' ? 'white' : '#eee',
                                        border: msg.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <ReactMarkdown components={{
                                        p: ({ node, ...props }) => <span {...props} style={{ display: 'block' }} />,
                                        strong: ({ node, ...props }) => <b style={{ color: '#00BFFF', fontWeight: 'bold' }} {...props} />,
                                        ul: ({ node, ...props }) => <ul style={{ margin: '8px 0', paddingLeft: '1.2rem' }} {...props} />,
                                        li: ({ node, ...props }) => <li style={{ marginBottom: '4px' }} {...props} />
                                    }}>
                                        {msg.content}
                                    </ReactMarkdown>
                                </motion.div>
                            ))}
                            {isLoading && (
                                <div style={{ alignSelf: 'flex-start', padding: '1rem', display: 'flex', gap: '4px' }}>
                                    {[0, 1, 2].map(i => (
                                        <motion.div key={i} animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                            style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#888' }}
                                        />
                                    ))}
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggested Replies Area */}
                        {!isLoading && (
                            <div style={{
                                padding: '0 1.5rem 0.8rem',
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem',
                                justifyContent: 'center'
                            }}>
                                {suggestedReplies.map((reply, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.05, background: 'rgba(0, 191, 255, 0.15)' }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleSend(reply)}
                                        style={{
                                            padding: '0.4rem 0.9rem',
                                            borderRadius: '20px',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            border: '1px solid rgba(0, 191, 255, 0.3)',
                                            color: '#00BFFF',
                                            fontSize: '0.78rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        {reply}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Input Area */}
                        <form
                            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                            style={{
                                padding: '1.2rem',
                                background: 'rgba(0, 0, 0, 0.3)',
                                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                gap: '0.7rem'
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Message Euty..."
                                style={{
                                    flex: 1,
                                    padding: '0.8rem 1.2rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    borderRadius: '50px',
                                    color: 'white',
                                    fontSize: '0.9rem',
                                    outline: 'none'
                                }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="submit"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(45deg, #00BFFF, #0080FF)',
                                    border: 'none',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: 'white',
                                    boxShadow: '0 4px 15px rgba(0, 191, 255, 0.3)'
                                }}
                            >
                                ➔
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ChatBot;
