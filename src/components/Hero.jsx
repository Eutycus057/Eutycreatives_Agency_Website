import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <section id="home" className="section-padding" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            background: 'radial-gradient(circle at 50% 50%, rgba(100, 108, 255, 0.1) 0%, rgba(10, 10, 10, 1) 50%)'
        }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 style={{ fontSize: 'var(--fs-h1)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        Creative Solutions <br />
                        <span style={{ background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            For Your Digital Presence
                        </span>
                    </h1>
                    <p style={{ fontSize: 'var(--fs-body)', color: 'var(--color-text-secondary)', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
                        We build attractive, professional websites that showcase your unique value.
                        Let's turn your vision into reality.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="#projects" className="btn">View Portfolio</a>
                        <a href="#contact" className="btn btn-secondary">Contact Us</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
