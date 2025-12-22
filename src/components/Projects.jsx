import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'Modern E-Commerce',
        description: 'A full-featured online store with a sleek design and seamless checkout experience.',
        tags: ['React', 'Node.js', 'Stripe'],
        color: '#FF6B6B'
    },
    {
        title: 'Portfolio Template',
        description: 'A minimal and clean portfolio template for creatives to showcase their work.',
        tags: ['HTML', 'CSS', 'JavaScript'],
        color: '#4ECDC4'
    },
    {
        title: 'Task Management App',
        description: 'A productivity tool designed to help teams collaborate and stay organized.',
        tags: ['Vue', 'Firebase', 'Tailwind'],
        color: '#FFE66D'
    }
];

const Projects = () => {
    return (
        <section id="projects" style={{ padding: '80px 0' }}>
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}
                >
                    Featured Projects
                </motion.h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{ background: 'var(--color-surface)', borderRadius: 'var(--border-radius)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                            <div style={{ height: '200px', background: project.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', fontWeight: 'bold' }}>
                                {/* Placeholder Image Area */}
                                Project Image
                            </div>
                            <div style={{ padding: '1.5rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>{project.description}</p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: 'rgba(255,255,255,0.1)', borderRadius: '20px' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
