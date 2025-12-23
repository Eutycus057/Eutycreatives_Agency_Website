import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle'); // idle, sending, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('https://formspree.io/f/meejrnpe', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(e.target)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const inputStyle = {
        width: '100%',
        padding: '1rem',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '12px',
        color: 'white',
        fontSize: '1rem',
        outline: 'none',
        transition: 'all 0.3s'
    };

    return (
        <section id="contact" className="section-padding" style={{ background: 'var(--color-bg)', textAlign: 'center' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1rem', fontWeight: 800 }}>
                        <span style={{ color: '#00BFFF' }}>Let's</span> <span style={{ color: '#FF8C00' }}>Talk</span>
                    </h2>
                    <p style={{ fontSize: 'var(--fs-body)', color: '#888', marginBottom: '3rem' }}>
                        Have a groundbreaking idea? Let's bring it to life together.
                    </p>

                    <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                        <div className="responsive-grid responsive-grid-2" style={{ gap: '1rem', marginBottom: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                    placeholder="Your Name"
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={inputStyle}
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                style={inputStyle}
                                placeholder="What's this about?"
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#aaa', fontSize: '0.9rem' }}>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                style={{ ...inputStyle, resize: 'none' }}
                                placeholder="Tell us about your project..."
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1.5rem' }}>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="btn"
                                disabled={status === 'sending'}
                                style={{
                                    padding: '1rem 4rem',
                                    fontSize: '1.1rem',
                                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                                    opacity: status === 'sending' ? 0.7 : 1,
                                    width: 'clamp(200px, 100%, 300px)'
                                }}
                            >
                                {status === 'sending' ? 'Sending...' : 'Send Message'}
                            </motion.button>

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{ color: '#4BB543', fontWeight: 'bold' }}
                                    >
                                        Message sent successfully! We'll get back to you soon.
                                    </motion.p>
                                )}
                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        style={{ color: '#ff4d4d', fontWeight: 'bold', maxWidth: '400px', textAlign: 'center' }}
                                    >
                                        Something went wrong. Please try again or email us directly at eutycreatives@gmail.com.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
