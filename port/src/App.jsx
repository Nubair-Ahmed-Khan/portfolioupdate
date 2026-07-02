import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header';
import MenuOverlay from './components/layout/MenuOverlay';
import Hero from './components/sections/Hero';
import WorkGrid from './components/sections/WorkGrid';
import Skills from './components/sections/Skills';
import WhatIDo from './components/sections/WhatIDo';
// import AboutSection from './components/sections/About'; // Home page wala about
import AboutPage from './components/sections/About'; // Naya full About Page jo humne banaya
import Footer from './components/layout/Footer';
import LoadingScreen from './components/ui/LoadingScreen';
import Contact from './components/sections/Contact';




// Home Component (Saare sections yahan move kar diye)
const Home = () => (

  
  <>
    
    <Hero/>
    <WhatIDo/>
    <WorkGrid/>
    <Skills/>
     
    
    

    {/* <AboutSection /> */}
  </>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <Router>
      <div className="relative">
        {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

        {/* Header aur Menu hamesha top par rahenge */}
        <Header
          isOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        <main className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000'}>
          <Routes>
            {/* Jab koi "/" par ho to Home dikhao */}
            <Route path="/" element={<Home />} />

            {/* Jab koi "/about" par click kare to AboutPage dikhao */}
            <Route path="/about" element={<><AboutPage /><WhatIDo /></>} />

            {/* Baaki pages ke routes yahan add karte jayein */}
            <Route path="/work" element={<WorkGrid />} />   
            <Route path="/contact" element={<Contact />} />   
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;