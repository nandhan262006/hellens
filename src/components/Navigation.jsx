import React, { useState, useEffect, useCallback } from 'react';
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
  { label: 'Bridal', href: '#bridal' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
          scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#D4AF37]/10 shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-2">
          <a href="#hero" className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <img src={ASSETS.logo} alt="Hellen's Logo" className="h-10 sm:h-12 md:h-16 w-auto object-contain flex-shrink-0" />
            <div className="hidden xs:block sm:block min-w-0">
              <div className="text-sm sm:text-base md:text-lg font-bold tracking-widest truncate" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.gold }}>
                HELLEN'S
              </div>
              <p className="text-[8px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase truncate" style={{ color: THEME.colors.textMuted }}>
                Herbal Beauty Parlour and training institute
              </p>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-4 lg:gap-8" role="navigation" aria-label="Main navigation">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs lg:text-sm tracking-wider uppercase hover:text-[#D4AF37] transition-colors duration-300 whitespace-nowrap"
                style={{ color: THEME.colors.textMuted, fontFamily: THEME.fonts.body }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className="md:hidden p-2 flex-shrink-0 touch-target flex items-center justify-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6 text-[#D4AF37]" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-[#0a0a0a]/98 backdrop-blur-xl flex flex-col items-center justify-center gap-6 sm:gap-8 safe-top safe-bottom"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-4 right-4 p-3 touch-target"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="w-7 h-7 text-[#D4AF37]" />
            </button>

            <nav className="flex flex-col items-center gap-5 sm:gap-8" role="navigation" aria-label="Mobile navigation">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-xl sm:text-2xl md:text-3xl tracking-widest uppercase hover:text-[#D4AF37] transition-colors px-6 py-2"
                  style={{ color: THEME.colors.text, fontFamily: THEME.fonts.heading }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
