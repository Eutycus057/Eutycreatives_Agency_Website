import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Developer from './components/Developer';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Developer />
      <Projects />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;
