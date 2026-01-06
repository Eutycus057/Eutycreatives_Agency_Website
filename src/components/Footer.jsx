import React from 'react';

const Footer = () => {
    return (
        <footer style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
            <div className="container">
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.6', fontSize: '0.9rem' }}>
                    Developed by an AI software engineer specializing in multi-agent systems, automation, and scalable content platforms.
                    Certified in Generative AI by BCS Technology International.
                </p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.8rem', opacity: 0.5 }}>
                    &copy; {new Date().getFullYear()} Eutycreatives. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
