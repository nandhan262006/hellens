import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
  Scissors, Phone, Instagram, MapPin, ChevronLeft, ChevronRight, Star,
  Calendar, MessageCircle, X, ArrowUpRight, Sparkles,
  Heart, Clock, Gem, Flower2, Eye, Send, CheckCircle2
} from 'lucide-react';
import Navigation from './components/Navigation';
import ServicesLuxury from './components/ServicesLuxury';

/* ───────────────────────────────────────────────
   HELLEN'S HERBAL BEAUTY PARLOUR
   Luxury Portfolio Website — Single File React App
   Owner: Alla Sujatha
   Instagram: @makeupbysujatha_ongole
   Contact: 9848833609, 8978833609
   Maps: https://share.google/h7pP5uBaQltxzo88N
   ─────────────────────────────────────────────── */

/* ═══════════════════════════════════════════════
   THEME CONFIGURATION
   ═══════════════════════════════════════════════ */
const THEME = {
  colors: {
    bg: '#0a0a0a',
    bgElevated: '#111111',
    card: '#161616',
    gold: '#D4AF37',
    goldLight: '#F4E4BC',
    roseGold: '#B76E79',
    burgundy: '#5D1A3C',
    text: '#f5f5f5',
    textMuted: '#a1a1a1',
    border: 'rgba(212, 175, 55, 0.15)',
  },
  fonts: {
    heading: "'Playfair Display', serif",
    body: "'Inter', sans-serif",
  }
};

/* ═══════════════════════════════════════════════
   IMAGE ASSET PATHS
   Place your uploaded images in the /public/images/ folder
   ═══════════════════════════════════════════════ */
const ASSETS = {
  logo: '/images/logo.png',
  owner: '/images/owner.png',
  heroPortrait: '/images/owner.jpg',
  watermark: '/images/watermark.png',
  portfolio: [
    '/images/bride-red-gold.jpg',
    '/images/bride-blue.jpg',
    '/images/bride-pink-gold.jpg',
    '/images/bride-lightblue.jpg',
    '/images/bride-purple.jpg',
    '/images/bride-white.jpg',
    '/images/bride-red-maternity.jpg',
    '/images/bride-pink-green.jpg',
    '/images/bride-pink-pot.jpg',
    '/images/couple.jpg',
    '/images/bride-green.jpg',
    '/images/bride-yellow-red.jpg',
  ]
};

const FOUNDING_DATE = new Date(2004, 0, 1);

const getExperienceYears = (date = new Date()) => {
  const years = date.getFullYear() - FOUNDING_DATE.getFullYear();
  const hasAnniversaryPassed =
    date.getMonth() > FOUNDING_DATE.getMonth() ||
    (date.getMonth() === FOUNDING_DATE.getMonth() && date.getDate() >= FOUNDING_DATE.getDate());

  return hasAnniversaryPassed ? years : years - 1;
};

const yearsOfExperience = getExperienceYears();

/* ═══════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════ */

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'repeat',
    }}
  />
);

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[100] origin-left"
      style={{ scaleX, backgroundColor: THEME.colors.gold, willChange: 'transform' }}
    />
  );
};

const CursorGlow = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handle, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handle);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  if (isMobile) return null;
  return (
    <div
      className="pointer-events-none fixed w-[400px] h-[400px] rounded-full z-[9998]"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)',
        transition: 'left 0.15s ease-out, top 0.15s ease-out',
        willChange: 'left, top',
      }}
    />
  );
};

const FloatingWhatsApp = () => (
  <motion.a
    href="https://wa.me/919848833609"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl"
    style={{ backgroundColor: '#25D366' }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 2, type: 'spring' }}
  >
    <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
  </motion.a>
);

const FloatingInstagram = () => (
  <motion.a
    href="https://www.instagram.com/makeupbysujatha_ongole/"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-4 sm:bottom-8 right-[4.5rem] sm:right-24 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl"
    style={{ backgroundColor: '#E1306C' }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 2, type: 'spring' }}
  >
    <Instagram className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
  </motion.a>
);

const GlobalBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0" style={{ backgroundColor: '#0a0a0a' }}>
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `url(${ASSETS.watermark})`,
        backgroundSize: '55% auto',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.25,
        mixBlendMode: 'soft-light',
      }}
    />
  </div>
);

const SectionReveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
    style={delay === 0 ? { willChange: 'transform, opacity' } : undefined}
  >
    {children}
  </motion.div>
);

const GoldText = ({ children, className = '' }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F4E4BC] to-[#D4AF37] ${className}`}>
    {children}
  </span>
);

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 70%)',
            y: y1,
          }}
        />
        <motion.div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, rgba(183,110,121,0.3) 0%, transparent 70%)',
            y: y2,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#D4AF37]/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center" style={{ opacity }}>
        {/* Text Content */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <p className="text-[0.6rem] sm:text-xs md:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: THEME.colors.gold }}>
              Est. 2004 — Ongole, Andhra Pradesh
            </p>
          </motion.div>

          <motion.h1
            className="text-fluid-hero font-bold mb-4 sm:mb-6"
            style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Beauty Crafted<br />
            <GoldText>As An Experience</GoldText>
          </motion.h1>

          <motion.p
            className="text-fluid-body max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-8"
            style={{ color: THEME.colors.textMuted, fontFamily: THEME.fonts.body }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Where tradition meets artistry. Alla Sujatha transforms every bride into a timeless masterpiece,
            weaving heritage, elegance, and soul into every stroke.
          </motion.p>

          <motion.div
            className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full xs:w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <a
              href="#contact"
              className="group w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8942E] text-[#0a0a0a] font-semibold tracking-wider uppercase rounded-full flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300 text-sm sm:text-base"
            >
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
              Contact Me
              <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href="#portfolio"
              className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-[#D4AF37]/30 text-[#D4AF37] tracking-wider uppercase rounded-full hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              Explore My Work
            </a>
          </motion.div>
        </div>

        {/* Hero Portrait */}
        <motion.div
          className="order-1 lg:order-2 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <div className="relative aspect-[3/4] max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#D4AF37]/20 to-[#B76E79]/20 blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden border border-[#D4AF37]/20 shadow-2xl">
              <img
                src={ASSETS.heroPortrait}
                alt="Alla Sujatha — Founder & Lead Artist"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-4 sm:-bottom-6 -left-3 sm:-left-6 bg-[#161616]/90 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B76E79] flex items-center justify-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-[#0a0a0a]" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold" style={{ color: THEME.colors.text }}>{yearsOfExperience} Years</p>
                  <p className="text-[10px] sm:text-xs" style={{ color: THEME.colors.textMuted }}>Of Excellence</p>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: THEME.colors.textMuted }}>Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#D4AF37] to-transparent" />
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   STORY SECTION
   ═══════════════════════════════════════════════ */

const StorySection = () => {
  const milestones = [
    { year: '2004', title: 'The Beginning', desc: "Started Hellen's with a dream to bring authentic herbal beauty to every woman." },
    { year: '2008', title: 'Bridal Mastery', desc: 'Became the most sought-after bridal makeup artist in Prakasam district.' },
    { year: '2016', title: 'Training Institute', desc: 'Launched the training institute to empower aspiring beauticians.' },
    { year: '2026', title: 'Legacy Continues', desc: 'Over 2000+ brides transformed. A name synonymous with trust and artistry.' },
  ];

  return (
    <section id="story" className="relative section-py overflow-hidden">
      <div className="w-full max-w-7xl mx-auto container-px">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          <SectionReveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/10 to-[#B76E79]/10 rounded-[2rem] blur-xl" />
              <div className="relative rounded-[2rem] overflow-hidden border border-[#D4AF37]/10">
                <img src={ASSETS.owner} alt="Alla Sujatha at work" className="w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
                  <p className="text-fluid-h3 font-bold" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
                    Alla Sujatha
                  </p>
                  <p className="text-fluid-small tracking-wider uppercase mt-1" style={{ color: THEME.colors.gold }}>
                    Founder & Lead Makeup Artist
                  </p>
                </div>
              </div>
            </div>
          </SectionReveal>

          <div>
            <SectionReveal>
              <p className="text-[0.6rem] sm:text-xs md:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: THEME.colors.gold }}>
                My Journey
              </p>
              <h2 className="text-fluid-h2 font-bold mb-4 sm:mb-6" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
                The Artist <GoldText>Behind The Brand</GoldText>
              </h2>
              <p className="text-fluid-body mb-6 sm:mb-8" style={{ color: THEME.colors.textMuted }}>
                Every face tells a story, and I have dedicated my life to making those stories shine.
                From humble beginnings in Ongole to becoming a trusted name across Andhra Pradesh,
                my journey has been fueled by passion, precision, and an unwavering commitment to
                bringing out the natural beauty in every woman I touch.
              </p>
            </SectionReveal>

            <div className="space-y-4 sm:space-y-6">
              {milestones.map((m, i) => (
                <SectionReveal key={m.year} delay={i * 0.15}>
                  <div className="flex gap-3 sm:gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-[#D4AF37] group-hover:scale-150 transition-transform duration-300" />
                      {i !== milestones.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-[#D4AF37]/50 to-transparent mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                    <span className="text-fluid-small font-bold tracking-wider" style={{ color: THEME.colors.gold }}>{m.year}</span>
                    <h3 className="text-fluid-h3 font-semibold mt-1 mb-2" style={{ color: THEME.colors.text }}>{m.title}</h3>
                    <p className="text-fluid-small leading-relaxed" style={{ color: THEME.colors.textMuted }}>{m.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════════ */

const ImageSlider = ({ images, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + images.length) % images.length);
  };

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-[1.5rem] h-56 sm:h-64 md:h-80 bg-[#0a0a0a] group">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} example ${currentIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          variants={{
            enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={(_, info) => {
            if (info.offset.x > 80) paginate(-1);
            else if (info.offset.x < -80) paginate(1);
          }}
        />
      </AnimatePresence>

      <button
        onClick={() => paginate(-1)}
        className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 md:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80 touch-target"
        aria-label="Previous image"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/50 flex items-center justify-center text-white opacity-0 md:opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-black/80 touch-target"
        aria-label="Next image"
      >
        <ChevronRight size={16} />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
            className={`h-1.5 rounded-full transition-all ${
              i === currentIndex ? 'bg-[#D4AF37] w-5' : 'bg-white/40 w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  const serviceTypes = [
    {
      title: 'Normal Bridal Makeup',
      desc: 'Classic bridal styling for a timeless and elegant wedding day look.',
      images: [
        '/images/bride-red-gold.jpg',
        '/images/bride-blue.jpg',
        '/images/bride-pink-gold.jpg',
      ],
    },
    {
      title: 'HD Bridal Makeup',
      desc: 'Flawless makeup designed to look perfect in photos, video, and high-definition camera work.',
      images: [
        '/images/bride-purple.jpg',
        '/images/bride-lightblue.jpg',
        '/images/bride-white.jpg',
      ],
    },
    {
      title: 'Airbrush Bridal Makeup',
      desc: 'Airbrush application for a soft, glowing finish that lasts throughout the celebration.',
      images: [
        '/images/bride-yellow-red.jpg',
        '/images/bride-green.jpg',
        '/images/bride-pink-green.jpg',
      ],
    },
  ];

  return (
    <section id="bridal" className="relative section-py">
      <div className="w-full max-w-7xl mx-auto container-px">
        <SectionReveal className="text-center mb-10 sm:mb-12 md:mb-16">
              <p className="text-[0.6rem] sm:text-xs md:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: THEME.colors.gold }}>
                Bridal Makeup
              </p>
          <h2 className="text-fluid-h2 font-bold" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
            Bridal <GoldText>Collection</GoldText>
          </h2>
          <p className="text-fluid-body max-w-3xl mx-auto mt-3 sm:mt-4" style={{ color: THEME.colors.textMuted }}>
            Choose the perfect bridal makeup experience: Normal Bridal, HD Bridal, or Airbrush Bridal. Each service is showcased with three photo examples to help you visualize your dream look.
          </p>
        </SectionReveal>

        <div className="grid-responsive">
          {serviceTypes.map((type, idx) => (
            <SectionReveal key={type.title} delay={idx * 0.12}>
              <div className="rounded-xl sm:rounded-[1.5rem] lg:rounded-[2rem] border border-[#D4AF37]/10 bg-[#111111]/80 p-4 sm:p-6 lg:p-8 shadow-xl h-full flex flex-col">
                <div className="mb-4 sm:mb-6">
                  <p className="text-fluid-small tracking-[0.3em] uppercase mb-2 sm:mb-3" style={{ color: THEME.colors.gold }}>
                    Bridal Style {idx + 1}
                  </p>
                  <h3 className="text-fluid-h3 font-bold" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
                    {type.title}
                  </h3>
                  <p className="text-fluid-small leading-relaxed mt-3 sm:mt-4" style={{ color: THEME.colors.textMuted }}>
                    {type.desc}
                  </p>
                </div>

                <div className="mt-auto">
                  <ImageSlider images={type.images} title={type.title} />
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   PORTFOLIO SECTION
   ═══════════════════════════════════════════════ */

const PortfolioSection = () => {
  const [selected, setSelected] = useState(null);

  const images = ASSETS.portfolio.map((src, i) => ({
    src,
    alt: `Bridal makeup work ${i + 1}`,
    span: i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : i % 3 === 0 ? 'md:col-span-2' : '',
  }));

  return (
    <section id="portfolio" className="relative section-py">
      <div className="w-full max-w-7xl mx-auto container-px">
        <SectionReveal className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-fluid-small tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: THEME.colors.gold }}>
            My Work
          </p>
          <h2 className="text-fluid-h2 font-bold" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
            Portfolio <GoldText>Gallery</GoldText>
          </h2>
        </SectionReveal>

        <div className="grid-portfolio">
          {images.map((img, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <motion.div
                className="relative w-full aspect-square md:aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer group border border-[#D4AF37]/10"
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelected(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-fluid-small font-medium" style={{ color: THEME.colors.gold }}>View Details</p>
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.src} alt={selected.alt} className="w-full rounded-2xl" />
              <button
                onClick={() => setSelected(null)}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#D4AF37] transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


/* ═══════════════════════════════════════════════
   EMAIL BOOKING SECTION
   ═══════════════════════════════════════════════ */

const EmailBookingSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    specialRequests: ''
  });

  const services = ['Bridal Makeup', 'Hair Styling', 'Party Makeup', 'Facial & Spa', 'Nail Art', 'Saree Draping'];

  const generateBookingTemplate = () => {
    const template = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HELLEN'S HERBAL BEAUTY PARLOUR
BOOKING REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NAME: ${formData.name || '[Your Full Name]'}
PHONE: ${formData.phone || '[Your Contact Number]'}

SERVICE: ${formData.service || '[Select Service]'}
PREFERRED DATE: ${formData.date || '[Your Preferred Date]'}

SPECIAL REQUESTS:
${formData.specialRequests || '[Any special requests or requirements]'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
We will confirm your booking via WhatsApp or call within 24 hours.
    `.trim();
    return template;
  };

  const handleSendEmail = () => {
    const template = generateBookingTemplate();
    const emailSubject = `Booking Request - ${formData.name || 'New Customer'}`;
    
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=allasujatha@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(template)}`;
    window.open(gmailUrl, '_blank');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative section-py">
      <div className="w-full max-w-4xl mx-auto container-px">
        <SectionReveal className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="text-fluid-small tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: THEME.colors.gold }}>
            Alternative Booking
          </p>
          <h2 className="text-fluid-h2 font-bold" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
            Book Via <GoldText>Email</GoldText>
          </h2>
          <p className="text-fluid-body mt-3 sm:mt-4 max-w-2xl mx-auto" style={{ color: THEME.colors.textMuted }}>
            Prefer sending a detailed email? Fill in your details below and we'll generate a beautifully formatted booking request.
          </p>
        </SectionReveal>

        <SectionReveal>
          <motion.div
            className="relative p-4 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-[1.5rem] lg:rounded-[2rem] border border-[#D4AF37]/10 bg-[#111111]/50 backdrop-blur-sm overflow-hidden"
          >
            {/* Animated Background */}
            <div className="absolute -inset-px rounded-xl sm:rounded-[1.5rem] lg:rounded-[2rem] bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#B76E79]/5 pointer-events-none" />

            <div className="relative space-y-4 sm:space-y-6">
              {/* Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Enter your full name' },
                  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9848833609' },
                ].map((field) => (
                  <div key={field.name} className="relative group">
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      className="peer w-full bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl px-4 py-4 text-white outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent"
                      placeholder={field.placeholder}
                    />
                    <label className="absolute left-4 -top-2.5 bg-[#111111] px-2 text-xs text-[#D4AF37] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#a1a1a1] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#D4AF37]">
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Service Selection */}
              <div className="relative group">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="peer w-full bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl px-4 py-4 text-white outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Select a service</option>
                  {services.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <label className="absolute left-4 -top-2.5 bg-[#111111] px-2 text-xs text-[#D4AF37]">
                  Preferred Service
                </label>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37] pointer-events-none" style={{ transform: 'translateY(-50%) rotate(90deg)' }} />
              </div>

              {/* Date Selection */}
              <div className="relative group">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="peer w-full bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl px-4 py-4 text-white outline-none focus:border-[#D4AF37] transition-colors"
                />
                <label className="absolute left-4 -top-2.5 bg-[#111111] px-2 text-xs text-[#D4AF37]">
                  Preferred Date
                </label>
              </div>

              {/* Special Requests */}
              <div className="relative group">
                <textarea
                  name="specialRequests"
                  rows={4}
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="peer w-full bg-[#0a0a0a] border border-[#D4AF37]/20 rounded-xl px-4 py-4 text-white outline-none focus:border-[#D4AF37] transition-colors placeholder-transparent resize-none"
                  placeholder="Any special requests, theme preferences, or additional information..."
                />
                <label className="absolute left-4 -top-2.5 bg-[#111111] px-2 text-xs text-[#D4AF37] transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#a1a1a1] peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-[#D4AF37]">
                  Special Requests
                </label>
              </div>

              {/* Email Template Preview */}
              <motion.div
                className="p-4 rounded-xl bg-[#0a0a0a] border border-[#D4AF37]/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-xs text-[#D4AF37] mb-2 font-semibold tracking-wider">PREVIEW</p>
                <pre className="text-xs text-[#a1a1a1] font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                  {generateBookingTemplate()}
                </pre>
              </motion.div>

              {/* Send Button */}
              <motion.button
                onClick={handleSendEmail}
                className="relative w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#B8942E] text-[#0a0a0a] font-bold tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Send className="w-5 h-5" />
                Generate & Send Email
              </motion.button>

              <p className="text-center text-xs" style={{ color: THEME.colors.textMuted }}>
                💌 Click the button above to open your email client with the pre-filled booking request.
              </p>
            </div>
          </motion.div>
        </SectionReveal>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-10 sm:mt-12 lg:mt-16">
          {[
            { icon: <Send className="w-6 h-6" />, title: 'Easy Booking', desc: 'Pre-filled template ready to send' },
            { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Instant Confirmation', desc: 'Confirmation via WhatsApp or call' },
            { icon: <Gem className="w-6 h-6" />, title: 'Personalized', desc: 'Customize your booking preferences' },
          ].map((item, i) => (
            <SectionReveal key={item.title} delay={i * 0.1}>
              <motion.div
                className="p-6 rounded-xl border border-[#D4AF37]/10 bg-[#161616] hover:border-[#D4AF37]/30 transition-all duration-300 text-center"
                whileHover={{ y: -5 }}
              >
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4 text-[#D4AF37]">
                  {item.icon}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: THEME.colors.text }}>{item.title}</h3>
                <p className="text-sm" style={{ color: THEME.colors.textMuted }}>{item.desc}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   INSTAGRAM SECTION
   ═══════════════════════════════════════════════ */

const InstagramSection = () => {
  const topImages = ASSETS.portfolio.slice(0, 6);

  return (
    <section className="relative section-py overflow-hidden">
      <div className="w-full max-w-7xl mx-auto container-px">
        <SectionReveal className="text-center mb-8 sm:mb-12 lg:mb-16">
          <p className="text-fluid-small tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: THEME.colors.gold }}>
            Follow The Journey
          </p>
          <h2 className="text-fluid-h2 font-bold mb-3 sm:mb-4" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
            On <GoldText>Instagram</GoldText>
          </h2>
          <a
            href="https://www.instagram.com/makeupbysujatha_ongole/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg hover:text-[#D4AF37] transition-colors"
            style={{ color: THEME.colors.textMuted }}
          >
            <Instagram className="w-5 h-5" />
            @makeupbysujatha_ongole
          </a>
        </SectionReveal>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {topImages.map((src, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <motion.a
                href="https://www.instagram.com/makeupbysujatha_ongole/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block aspect-square rounded-lg sm:rounded-xl overflow-hidden group border border-[#D4AF37]/10"
                whileHover={{ scale: 1.05 }}
              >
                <img src={src} alt={`Instagram post ${i + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#0a0a0a]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Instagram className="w-5 h-5 sm:w-8 sm:h-8 text-[#D4AF37]" />
                </div>
              </motion.a>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════════════ */

const ContactSection = () => {
  const contacts = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      lines: ['98488 33609', '89788 33609'],
      href: 'tel:+919848833609',
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      lines: ['+91 98488 33609'],
      href: 'https://wa.me/919848833609',
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      title: 'Instagram',
      lines: ['@makeupbysujatha_ongole'],
      href: 'https://www.instagram.com/makeupbysujatha_ongole/',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Visit Us',
      lines: ['Ongole, Andhra Pradesh'],
      href: 'https://share.google/h7pP5uBaQltxzo88N',
    },
  ];

  return (
    <section id="contact" className="relative section-py">
      <div className="w-full max-w-7xl mx-auto container-px">
        <SectionReveal className="text-center mb-10 sm:mb-12 lg:mb-20">
          <p className="text-fluid-small tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: THEME.colors.gold }}>
            Get In Touch
          </p>
          <h2 className="text-fluid-h2 font-bold" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.text }}>
            Let's <GoldText>Connect</GoldText>
          </h2>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12 lg:mb-16">
          {contacts.map((c, i) => (
            <SectionReveal key={c.title} delay={i * 0.1}>
              <motion.a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group block p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-[#D4AF37]/10 bg-[#111111]/50 backdrop-blur-sm hover:border-[#D4AF37]/30 transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#D4AF37]/20 to-[#B76E79]/20 flex items-center justify-center mb-3 sm:mb-4 text-[#D4AF37] group-hover:scale-110 transition-transform">
                  {c.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2" style={{ color: THEME.colors.text }}>{c.title}</h3>
                {c.lines.map((line) => (
                  <p key={line} className="text-fluid-small" style={{ color: THEME.colors.textMuted }}>{line}</p>
                ))}
              </motion.a>
            </SectionReveal>
          ))}
        </div>

        {/* Map Embed */}
        <SectionReveal>
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#D4AF37]/10 h-[250px] sm:h-[300px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.0!2d80.0487!3d15.5057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDMwJzIwLjUiTiA4MMKwMDInNTUuMyJF!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hellen's Location"
            />
            <div className="absolute inset-0 pointer-events-none border border-[#D4AF37]/10 rounded-xl sm:rounded-2xl" />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */

const Footer = () => (
  <footer className="relative section-py border-t border-[#D4AF37]/10">
    <div className="w-full max-w-7xl mx-auto container-px">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <img src={ASSETS.logo} alt="Hellen's Logo" className="h-14 sm:h-16 md:h-20 w-auto object-contain" />
          <div>
            <h3 className="text-lg sm:text-xl font-bold tracking-wider" style={{ fontFamily: THEME.fonts.heading, color: THEME.colors.gold }}>
              HELLEN'S
            </h3>
            <p className="text-[10px] sm:text-xs tracking-[0.15em] uppercase" style={{ color: THEME.colors.textMuted }}>
              Herbal Beauty Parlour & Training Institute
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {[
            { icon: <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />, href: 'https://www.instagram.com/makeupbysujatha_ongole/' },
            { icon: <Phone className="w-4 h-4 sm:w-5 sm:h-5" />, href: 'tel:+919848833609' },
            { icon: <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />, href: 'https://wa.me/919848833609' },
          ].map((social, i) => (
            <motion.a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/20 flex items-center justify-center text-[#a1a1a1] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-[#D4AF37]/5 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-xs text-center sm:text-left" style={{ color: THEME.colors.textMuted }}>
        <p>© 2024 Hellen&apos;s Herbal Beauty Parlour. All rights reserved.</p>
        <p>Crafted with love by Alla Sujatha — Ongole, Andhra Pradesh</p>
      </div>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════ */

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden" style={{ fontFamily: THEME.fonts.body }}>
      {/* Global Styles Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; width: 100%; max-width: 100vw; }

        img, video, iframe, svg {
          max-width: 100%;
          height: auto;
        }

        ::selection { background: rgba(212,175,55,0.3); color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #D4AF37; }

        /* Fluid Typography Scale */
        .text-fluid-hero { font-size: clamp(2.2rem, 8vw, 6rem); line-height: 0.95; }
        .text-fluid-h1 { font-size: clamp(1.8rem, 5vw, 3.75rem); line-height: 1.1; }
        .text-fluid-h2 { font-size: clamp(1.5rem, 4vw, 3rem); line-height: 1.15; }
        .text-fluid-h3 { font-size: clamp(1.2rem, 3vw, 2rem); line-height: 1.2; }
        .text-fluid-body { font-size: clamp(0.85rem, 1.5vw, 1.125rem); line-height: 1.6; }
        .text-fluid-small { font-size: clamp(0.7rem, 1.2vw, 0.875rem); }

        /* Responsive Section Padding */
        .section-py { padding-top: clamp(3rem, 10vh, 8rem); padding-bottom: clamp(3rem, 10vh, 8rem); }

        /* Responsive Container Padding */
        .container-px { padding-left: clamp(1rem, 4vw, 2rem); padding-right: clamp(1rem, 4vw, 2rem); }

        /* Professional Container Breakpoints */
        @media (min-width: 768px) {
          .container { max-width: 720px; margin: auto; }
        }
        @media (min-width: 992px) {
          .container { max-width: 960px; }
        }
        @media (min-width: 1200px) {
          .container { max-width: 1140px; }
        }
        @media (min-width: 1440px) {
          .container { max-width: 1320px; }
        }
        @media (min-width: 1920px) {
          .container { max-width: 1600px; }
        }

        /* Responsive Grid */
        .grid-responsive {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
        }

        .grid-portfolio {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 180px), 1fr));
          gap: clamp(0.5rem, 1.5vw, 1rem);
        }

        /* Touch-friendly */
        .touch-btn { min-height: 44px; min-width: 44px; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Mobile First Container */
        .container {
          width: 100%;
          padding: 12px;
        }

        /* Responsive visibility utilities */
        @media (max-width: 320px) {
          .hide-mobile-small { display: none !important; }
        }

        @media (min-width: 321px) and (max-width: 480px) {
          .hide-mobile { display: none !important; }
        }

        @media (min-width: 481px) and (max-width: 767px) {
          .hide-mobile-large { display: none !important; }
        }

        @media (min-width: 768px) and (max-width: 991px) {
          .hide-tablet { display: none !important; }
        }

        @media (min-width: 992px) and (max-width: 1199px) {
          .hide-tablet-large { display: none !important; }
        }

        @media (min-width: 1200px) and (max-width: 1439px) {
          .hide-laptop { display: none !important; }
        }

        @media (min-width: 1440px) and (max-width: 1919px) {
          .hide-desktop { display: none !important; }
        }

        @media (min-width: 1920px) {
          .hide-ultrawide { display: none !important; }
        }
      `}</style>

      <GlobalBackground />
      <NoiseOverlay />
      <CursorGlow />
      <ScrollProgress />
      <Navigation />

      <main>
        <HeroSection />
        <StorySection />
        <ServicesSection />
        <ServicesLuxury />
        <PortfolioSection />
        <EmailBookingSection />
        <InstagramSection />
        <ContactSection />
      </main>

      <Footer />
      <FloatingInstagram />
      <FloatingWhatsApp />
    </div>
  );
}
