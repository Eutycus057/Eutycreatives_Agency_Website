import React from 'react';
import { motion } from 'framer-motion';
import devPhoto from '../assets/dev.png';

const Developer = () => {
    const listItems = [
        "Bachelor of Education Technology (Computing & Information Technology)",
        "Generative AI Certification — BCS Technology International Pty Limited"
    ];

    const techFocus = [
        "AI-powered web applications",
        "Automation systems and intelligent workflows",
        "Conversational AI and chatbots",
        "Scalable, user-centered system design"
    ];

    return (
        <section id="developer" className="section-padding" style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '40px 0' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
                <div className="responsive-grid responsive-grid-developer" style={{ alignItems: 'center' }}>

                    {/* Photo Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ position: 'relative', maxWidth: '300px', margin: '0 auto' }}
                    >
                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            borderRadius: '24px',
                            overflow: 'hidden',
                            boxShadow: '0 15px 30px rgba(0,0,0,0.4)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            <img
                                src={devPhoto}
                                alt="Developer"
                                style={{ width: '100%', display: 'block', filter: 'grayscale(20%)' }}
                            />
                        </div>
                        <h3 style={{
                            textAlign: 'center',
                            marginTop: '1rem',
                            fontSize: '1.2rem',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '1px'
                        }}>
                            Eutycus <span style={{ color: '#FF8C00' }}>Mbuthia</span>
                        </h3>
                        {/* Decorative Background Element */}
                        <div style={{
                            position: 'absolute',
                            top: '15px',
                            left: '-15px',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, #00BFFF, #FF8C00)',
                            borderRadius: '24px',
                            zIndex: 0,
                            opacity: 0.25,
                            filter: 'blur(15px)'
                        }}></div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'var(--fs-h3)', marginBottom: '1rem', fontWeight: 800 }}>
                            About the <span style={{ color: '#00BFFF' }}>Developer</span>
                        </h2>

                        <p style={{ color: '#ccc', lineHeight: '1.5', marginBottom: '0.75rem', fontSize: '0.9rem' }}>
                            I am a software developer specializing in <span style={{ color: '#00BFFF' }}>AI-powered websites</span> and intelligent applications. My work focuses on building reliable, scalable digital systems that combine clean architecture and modern web technologies to solve real-world problems.
                        </p>

                        <div className="responsive-grid responsive-grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div>
                                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>Academic Background</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {listItems.map((item, i) => (
                                        <li key={i} style={{ color: '#888', marginBottom: '0.4rem', fontSize: '0.85rem', position: 'relative', paddingLeft: '1.2rem' }}>
                                            <span style={{ position: 'absolute', left: 0, color: '#00BFFF' }}>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1rem' }}>Technical Focus</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {techFocus.map((item, i) => (
                                        <li key={i} style={{ color: '#888', marginBottom: '0.4rem', fontSize: '0.85rem', position: 'relative', paddingLeft: '1.2rem' }}>
                                            <span style={{ position: 'absolute', left: 0, color: '#FF8C00' }}>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <p style={{ color: '#ccc', marginTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem' }}>
                            I am passionate about leveraging emerging technologies to create digital experiences that are efficient and future-ready.
                        </p>
                    </motion.div>
                </div>
            </div>
            <style>{`
                @media (min-width: 992px) {
                    .responsive-grid-developer {
                        grid-template-columns: 1fr 1.5fr !important;
                        gap: 4rem !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Developer;
