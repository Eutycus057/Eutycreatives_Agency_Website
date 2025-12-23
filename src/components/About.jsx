import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" className="section-padding" style={{ background: 'var(--color-surface)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: 'var(--fs-h2)', marginBottom: '2.5rem', textAlign: 'center', fontWeight: 800 }}>
                        <span style={{ color: '#00BFFF' }}>About</span> <span style={{ color: '#FF8C00' }}>Us</span>
                    </h2>
                    <div style={{
                        maxWidth: '900px',
                        margin: '0 auto',
                        textAlign: 'left',
                        fontSize: 'var(--fs-body)',
                        lineHeight: '1.7',
                        color: '#bbb',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem'
                    }}>
                        <p>
                            At <strong>Eutycreatives</strong>, we design and build <span style={{ color: '#00BFFF' }}>AI-powered websites</span> and <span style={{ color: '#FF8C00' }}>intelligent applications</span> that help businesses operate smarter, faster, and more efficiently. We combine modern web technologies with <span style={{ color: '#00BFFF' }}>artificial intelligence</span> to deliver digital products that are not only visually compelling, but also <span style={{ color: '#FF8C00' }}>adaptive</span>, <span style={{ color: '#00BFFF' }}>data-driven</span>, and <span style={{ color: '#FF8C00' }}>scalable</span>.
                        </p>
                        <p>
                            Our expertise spans <span style={{ color: '#00BFFF' }}>responsive web development</span>, <span style={{ color: '#FF8C00' }}>AI integration</span>, <span style={{ color: '#00BFFF' }}>automation</span>, and <span style={{ color: '#FF8C00' }}>intelligent user experiences</span>. From predictive features and conversational interfaces to performance-optimized web platforms, we create solutions that actively enhance <span style={{ color: '#00BFFF' }}>engagement</span> and <span style={{ color: '#FF8C00' }}>decision-making</span>.
                        </p>
                        <p>
                            We believe great digital products sit at the intersection of <span style={{ color: '#00BFFF' }}>design excellence</span>, <span style={{ color: '#FF8C00' }}>clean architecture</span>, and <span style={{ color: '#00BFFF' }}>intelligent systems</span>. Whether you are launching a personal brand, a startup platform, or an enterprise-grade application, we transform ideas into <span style={{ color: '#FF8C00' }}>high-performing digital solutions</span> powered by <span style={{ color: '#00BFFF' }}>cutting-edge technology</span>.
                        </p>
                        <p style={{
                            fontWeight: 'bold',
                            color: 'white',
                            borderLeft: '4px solid #00BFFF',
                            paddingLeft: '1.5rem',
                            marginTop: '1rem',
                            fontSize: '1.15rem'
                        }}>
                            At Eutycreatives, we do more than build websites — we engineer <span style={{ color: '#FF8C00' }}>intelligent digital experiences</span>.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
