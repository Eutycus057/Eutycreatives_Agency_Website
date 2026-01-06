import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import ResumeGenerator from './components/ResumeGenerator';
import { useState, useEffect } from 'react';

function App() {
  const [isResumeGeneratorOpen, setIsResumeGeneratorOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setIsResumeGeneratorOpen(prev => !prev);
    window.addEventListener('toggle-resume-generator', handleToggle);
    return () => window.removeEventListener('toggle-resume-generator', handleToggle);
  }, []);

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <ChatBot />
      <ResumeGenerator isOpen={isResumeGeneratorOpen} onClose={() => setIsResumeGeneratorOpen(false)} />
    </div>
  );
}

export default App;
