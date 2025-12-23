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
        <section id="developer" className="section-padding" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div className="responsive-grid responsive-grid-developer" style={{ alignItems: 'center' }}>

                    {/* Photo Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}
                    >
                        <div style={{
                            position: 'relative',
                            zIndex: 1,
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
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
                            marginTop: '1.5rem',
                            fontSize: '1.4rem',
                            fontWeight: 700,
                            color: 'white',
                            letterSpacing: '1px'
                        }}>
                            Eutycus <span style={{ color: '#FF8C00' }}>Mbuthia</span>
                        </h3>
                        {/* Decorative Background Element */}
                        <div style={{
                            position: 'absolute',
                            top: '20px',
                            left: '-20px',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, #00BFFF, #FF8C00)',
                            borderRadius: '30px',
                            zIndex: 0,
                            opacity: 0.3,
                            filter: 'blur(20px)'
                        }}></div>
                    </motion.div>

                    {/* Text Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '1.5rem', fontWeight: 800 }}>
                            About the <span style={{ color: '#00BFFF' }}>Developer</span>
                        </h2>

                        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '1.2rem', fontSize: 'var(--fs-body)' }}>
                            I am a software developer specializing in <span style={{ color: '#00BFFF' }}>AI-powered websites</span>, intelligent applications, and business automation solutions. My work focuses on building reliable, scalable digital systems that combine clean architecture, modern web technologies, and practical artificial intelligence to solve real-world problems.
                        </p>

                        <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '2rem', fontSize: 'var(--fs-body)' }}>
                            I bring a strong academic foundation in computing and technology education, complemented by professional training in <span style={{ color: '#FF8C00' }}>Generative AI</span>. This background allows me to approach development with both technical depth and structured problem-solving, ensuring solutions are effective, maintainable, and aligned with business goals.
                        </p>

                        <div className="responsive-grid responsive-grid-2" style={{ gap: '2rem' }}>
                            <div>
                                <h4 style={{ color: 'white', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Academic Background</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {listItems.map((item, i) => (
                                        <li key={i} style={{ color: '#888', marginBottom: '0.6rem', fontSize: '0.9rem', position: 'relative', paddingLeft: '1.2rem' }}>
                                            <span style={{ position: 'absolute', left: 0, color: '#00BFFF' }}>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h4 style={{ color: 'white', marginBottom: '0.8rem', fontSize: '1.1rem' }}>Technical Focus</h4>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {techFocus.map((item, i) => (
                                        <li key={i} style={{ color: '#888', marginBottom: '0.6rem', fontSize: '0.9rem', position: 'relative', paddingLeft: '1.2rem' }}>
                                            <span style={{ position: 'absolute', left: 0, color: '#FF8C00' }}>•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <p style={{ color: '#ccc', marginTop: '2rem', fontStyle: 'italic', fontSize: 'var(--fs-body)' }}>
                            I am passionate about leveraging emerging technologies to create digital experiences that are not only functional and efficient, but also future-ready.
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
