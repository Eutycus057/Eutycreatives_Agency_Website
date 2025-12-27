import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = ['Home', 'About', 'Developer', 'Projects', 'Contact'];

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 1000,
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={logo} alt="Eutycreatives Logo" style={{ height: '32px', objectFit: 'contain' }} />
                    <span style={{
                        fontSize: '1.25rem',
                        fontWeight: 'bold',
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: '-0.02em'
                    }}>
                        <span style={{ color: '#00BFFF' }}>Euty</span>
                        <span style={{ color: '#FF8C00' }}>creatives</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <ul style={{ display: 'none', gap: '2rem' }} className="desktop-menu">
                    {navItems.map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Hamburger Toggle */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                        zIndex: 1001
                    }}
                >
                    <motion.span animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 7 : 0 }} style={{ width: '25px', height: '2px', background: 'white', display: 'block' }} />
                    <motion.span animate={{ opacity: isOpen ? 0 : 1 }} style={{ width: '25px', height: '2px', background: 'white', display: 'block' }} />
                    <motion.span animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -7 : 0 }} style={{ width: '25px', height: '2px', background: 'white', display: 'block' }} />
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '80%',
                            maxWidth: '300px',
                            height: '100vh',
                            background: '#111',
                            padding: '80px 2rem 2rem',
                            boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            zIndex: 1000
                        }}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                onClick={() => setIsOpen(false)}
                                style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white' }}
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CSS for Desktop vs Mobile visibility */}
            <style>{`
                @media (min-width: 768px) {
                    .desktop-menu { display: flex !important; }
                    div[onClick] { display: none !important; }
                }
            `}</style>
        </motion.nav>
    );
};

export default Navbar;
