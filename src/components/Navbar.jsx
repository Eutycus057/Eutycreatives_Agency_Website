import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {

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
                padding: '1rem 2rem',
                background: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(10px)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={logo} alt="Eutycreatives Logo" style={{ height: '40px', objectFit: 'contain' }} />
                <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    fontFamily: "'Inter', sans-serif",
                    letterSpacing: '-0.02em'
                }}>
                    <span style={{ color: '#00BFFF' }}>Euty</span>
                    <span style={{ color: '#FF8C00' }}>creatives</span>
                </span>
            </div>
            <ul style={{ display: 'flex', gap: '2rem' }}>
                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                    <li key={item}>
                        <a href={`#${item.toLowerCase()}`} style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
};

export default Navbar;
