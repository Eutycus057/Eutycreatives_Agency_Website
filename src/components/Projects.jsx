// Finalized 3D Carousel & Deployment Sync
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import aiAgentChat from '../assets/ai-agent-chat-ui.png';

const projects = [
    {
        id: 'ai-conversational-agent',
        title: 'AI-Powered Conversational Agent',
        thumbnail: aiAgentChat,
        shortDescription: 'An intelligent chatbot designed to handle business inquiries and reduce manual response workload.',
        problem: 'Businesses often face delayed response times and repetitive customer inquiries, leading to poor user experience.',
        solution: 'Designed and implemented an AI-driven agent capable of natural language understanding and automated service retrieval.',
        value: 'Improves customer response time by 80% and reduces operational costs for manual support.',
        features: [
            'Natural language inquiry handling',
            'Context-aware responses',
            'Service and knowledge-base retrieval',
            'Scalable web interface'
        ],
        techStack: ['React', 'Node.js', 'OpenAI API', 'Framer Motion'],
        githubUrl: 'https://github.com/Eutycus057',
        liveUrl: '#',
        category: 'AI & Automation',
        color: '#646cff'
    },
    {
        id: 'automated-resume-generator',
        title: 'ATS-Compliant Resume Generator',
        thumbnail: '/images/projects/resume-generator.png',
        shortDescription: 'AI-powered tool that optimizes resumes for specific job descriptions to bypass ATS filters.',
        problem: 'Job seekers often fail to pass initial ATS screenings due to poor keyword matching and formatting issues.',
        solution: 'Built an AI pipeline that analyzes JDs and rephrases resume content to highlight relevance without fabricating data.',
        value: 'Increases interview callback rates by ensuring resumes are tailored to specific role requirements.',
        features: [
            'PDF/DOCX resume parsing',
            'AI job description analysis',
            'Keyword density optimization',
            'ATS-safe DOCX generation'
        ],
        techStack: ['FastAPI', 'OpenAI', 'React', 'python-docx'],
        githubUrl: 'https://github.com/Eutycus057',
        liveUrl: '#',
        category: 'AI & Productivity',
        color: '#00d2ff'
    },
    {
        id: 'ecommerce-scaling',
        title: 'Next-Gen E-commerce Platform',
        thumbnail: '/images/projects/ecommerce-thumbnail.png',
        shortDescription: 'A high-performance e-commerce solution built for scale and seamless user experience.',
        problem: 'Legacy e-commerce platforms often struggle with slow load times and complex checkout flows during peak traffic.',
        solution: 'Built a modern, headless e-commerce architecture focusing on performance, SEO, and 1-click checkout.',
        value: 'Increased conversion rates by 25% and improved page load speeds by 2x.',
        features: [
            'Headless commerce integration',
            'Dynamic inventory management',
            'Personalized product recommendations',
            'Lightning-fast search'
        ],
        techStack: ['Next.js', 'Shopify API', 'Tailwind CSS', 'Redis'],
        githubUrl: 'https://github.com/Eutycus057',
        liveUrl: '#',
        category: 'Web Development',
        color: '#9f5afd'
    },
    {
        id: 'fintech-dashboard',
        title: 'Enterprise Fintech Dashboard',
        thumbnail: '/images/projects/fintech-thumbnail.png',
        shortDescription: 'Real-time financial tracking and analytics platform for corporate asset management.',
        problem: 'Financial managers lack a unified, real-time view of complex asset portfolios across multiple regions.',
        solution: 'Developed a robust dashboard that aggregates global financial data into actionable, real-time visualizations.',
        value: 'Enables faster decision-making through real-time data transparency and automated reporting.',
        features: [
            'Real-time data visualization',
            'Multi-currency asset tracking',
            'Automated financial reporting',
            'Secure OAuth2 authentication'
        ],
        techStack: ['React', 'D3.js', 'PostgreSQL', 'AWS'],
        githubUrl: 'https://github.com/Eutycus057',
        liveUrl: '#',
        category: 'Fintech Solutions',
        color: '#FF6B6B'
    }
];

const ProjectCard = ({ project, index }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { label: 'Overview', content: project.shortDescription },
        { label: 'Problem', content: project.problem },
        { label: 'Solution', content: project.solution },
        { label: 'Impact', content: project.value },
        { label: 'Features', type: 'list', items: project.features },
        { label: 'Tech Stack', type: 'tags', items: project.techStack }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    const handleDemoClick = (e) => {
        if (project.id === 'ai-conversational-agent') {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('toggle-chatbot'));
        } else if (project.id === 'automated-resume-generator') {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('toggle-resume-generator'));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr)',
                gap: '2rem',
                alignItems: 'stretch',
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                overflow: 'hidden',
                padding: '2rem'
            }}
            className="responsive-grid-2"
        >
            {/* Left Column: Fixed Info */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
            }} className="project-sidebar">
                <div style={{
                    position: 'relative',
                    aspectRatio: '16/9',
                    background: `linear-gradient(135deg, ${project.color}22 0%, ${project.color}44 100%)`,
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {typeof project.thumbnail === 'string' && project.thumbnail.startsWith('/images') ? (
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: project.color, opacity: 0.5, textAlign: 'center', padding: '1rem' }}>
                            {project.title}
                        </div>
                    ) : (
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                    )}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'white', fontWeight: 700 }}>{project.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: project.color, textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600 }}>
                        {project.category}
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: 'auto' }}>
                    <a href={project.liveUrl} onClick={handleDemoClick} className="btn" style={{ flex: 1, fontSize: '0.85rem', textAlign: 'center' }}>Live Demo</a>
                    <a href={project.githubUrl} className="btn btn-secondary" style={{ flex: 1, fontSize: '0.85rem', textAlign: 'center' }}>Source Code</a>
                </div>
            </div>

            {/* Right Column: Rotating Cuboid Carousel */}
            <div style={{
                position: 'relative',
                minHeight: '350px',
                display: 'flex',
                flexDirection: 'column',
                perspective: '1500px',
                justifyContent: 'center',
                padding: '0 3rem',
                borderLeft: '1px solid rgba(255, 255, 255, 0.05)'
            }} className="project-carousel-container">

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    style={{
                        position: 'absolute',
                        left: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        fontSize: '0.8rem',
                        transition: 'all 0.3s ease'
                    }}
                    className="carousel-btn"
                >‹</button>

                <button
                    onClick={nextSlide}
                    style={{
                        position: 'absolute',
                        right: '0.5rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'white',
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 10,
                        fontSize: '0.8rem',
                        transition: 'all 0.3s ease'
                    }}
                    className="carousel-btn"
                >›</button>

                <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, rotateY: 90, scale: 0.9, z: -200 }}
                            animate={{ opacity: 1, rotateY: 0, scale: 1, z: 0 }}
                            exit={{ opacity: 0, rotateY: -90, scale: 0.9, z: -200 }}
                            transition={{
                                duration: 0.7,
                                ease: [0.4, 0, 0.2, 1]
                            }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                textAlign: 'center',
                                transformStyle: 'preserve-3d',
                                background: 'rgba(255, 255, 255, 0.03)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '20px',
                                padding: '3rem 2rem',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                height: '100%'
                            }}
                        >
                            <h4 style={{ color: project.color, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '2rem', fontWeight: 700, opacity: 0.7 }}>
                                {slides[currentSlide].label}
                            </h4>

                            <div style={{ width: '100%', margin: '0 auto' }}>
                                {slides[currentSlide].type === 'list' ? (
                                    <ul style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '0.8rem',
                                        listStyle: 'none',
                                        padding: 0
                                    }}>
                                        {slides[currentSlide].items.map((item, i) => (
                                            <li key={i} style={{ fontSize: '0.95rem', color: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                <span style={{ color: project.color, marginRight: '0.5rem' }}>•</span> {item}
                                            </li>
                                        ))}
                                    </ul>
                                ) : slides[currentSlide].type === 'tags' ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', alignItems: 'center' }}>
                                        {slides[currentSlide].items.map(tech => (
                                            <span key={tech} style={{
                                                fontSize: '0.8rem',
                                                padding: '0.5rem 1.5rem',
                                                background: 'rgba(255,255,255,0.03)',
                                                borderRadius: '50px',
                                                color: '#aaa',
                                                border: '1px solid rgba(255,255,255,0.08)',
                                                fontWeight: 500,
                                                minWidth: '200px'
                                            }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.7', fontWeight: 400 }}>
                                        {slides[currentSlide].content}
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Progress Indicators */}
                <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' }}>
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            style={{
                                height: '3px',
                                width: '20px',
                                background: i === currentSlide ? project.color : 'rgba(255,255,255,0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                                borderRadius: '2px'
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="section-padding" style={{ background: 'var(--color-bg)' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, marginBottom: '1rem' }}>
                        Featured Projects
                    </h2>
                    <p style={{ color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        Innovating at the edge of AI and modern web technology.
                    </p>
                </motion.div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
            <style>{`
                @media (min-width: 992px) {
                    .project-sidebar {
                        width: 100% !important;
                    }
                    div.responsive-grid-2 {
                        grid-template-columns: 1fr 1fr !important;
                        gap: 0 !important;
                    }
                }
                @media (max-width: 991px) {
                    .project-carousel-container {
                        border-left: none !important;
                        border-top: 1px solid rgba(255, 255, 255, 0.05);
                        padding: 2rem 1rem !important;
                        margin-top: 1.5rem;
                        min-height: 480px !important;
                    }
                    .carousel-btn {
                        display: none !important;
                    }
                }
                .carousel-btn:hover {
                    background: rgba(255,255,255,0.1) !important;
                    transform: translateY(-50%) scale(1.1) !important;
                }
            `}</style>
        </section>
    );
};

export default Projects;
