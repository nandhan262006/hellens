import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const ASSETS = {
  logo: '/images/logo.png',
};

const THEME = {
  colors: {
    bg: '#0a0a0a',
    gold: '#D4AF37',
    text: '#f5f5f5',
    textMuted: '#a1a1a1',
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
  }
};

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Story', href: '#story' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 overflow-hidden ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#D4AF37]/10' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 flex-shrink-0 whitespace-nowrap">
            <img src={ASSETS.logo} alt="Hellen's Logo" className="h-16 w-auto object-contain flex-shrink-0" />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold tracking-widest whitespace-nowrap" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.gold }}>
                HELLEN'S
              </h1>
              <p className="text-[10px] tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: THEME.colors.textMuted }}>
                Herbal Beauty Parlour and training institute
              </p>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm tracking-wider uppercase hover:text-[#D4AF37] transition-colors duration-300 flex-shrink-0"
                style={{ color: THEME.colors.textMuted, fontFamily: THEME.fonts.body }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 text-sm tracking-wider uppercase border border-[#D4AF37]/30 rounded-full hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 flex-shrink-0"
              style={{ color: THEME.colors.gold }}
            >
              Contact
            </a>
          </div>

          <button
            className="md:hidden p-2 flex-shrink-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-[#D4AF37]" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl tracking-widest uppercase hover:text-[#D4AF37] transition-colors"
                style={{ color: THEME.colors.text, fontFamily: THEME.fonts.heading }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
