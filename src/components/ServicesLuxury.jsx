import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

const COLORS = {
  bg: '#0a0a0a',
  bgElevated: '#111111',
  card: '#161616',
  gold: '#D4AF37',
  goldLight: '#F4E4BC',
  text: '#f5f5f5',
  textMuted: '#a1a1a1',
  border: 'rgba(212, 175, 55, 0.15)',
};

const FONTS = {
  heading: "'Playfair Display', serif",
  body: "'Inter', sans-serif",
};

const services = [
  {
    id: 'threading',
    title: 'Threading',
    image: '/images/THREADING.jpg',
    items: ['Threading'],
  },
  {
    id: 'waxing',
    title: 'Waxing',
    image: '/images/waxing.jpg',
    bgSize: '150%',
    items: ['Waxing', 'Honey Wax', 'Reca Wax', 'Gel Wax', 'Roll On Wax', 'Brazilian Wax'],
  },
  {
    id: 'pedicure',
    title: 'Pedicure & Manicure',
    image: '/images/PEDICURE ANDMANICURE.jpg',
    items: [
      'Basic Pedicure & Manicure',
      'Crystal Pedicure & Manicure',
      'Crystal Ice Cream Pedicure & Manicure',
      'Aroma Pedicure Manicure',
      'Candle Pedicure Manicure',
      'Paraffin Pedicure Manicure',
    ],
  },
  {
    id: 'facials',
    title: 'Facials',
    image: '/images/facials.jpg',
    bgSize: '130%',
    items: [
      'Mini Facials',
      'Tan Clear Facials',
      'Basic Facial (Fruit & Herbal)',
      'Metallic Facials (Silver, Gold, Diamond, Pearl, Platinum)',
      'Acne Facial',
      'Whitening Facial',
      'Brightening Facial',
      'Skin Lightning Facial',
      'Glass Skin Facial',
      'Korean Facial',
      'And 100+ More',
    ],
  },
  {
    id: 'hair-colouring',
    title: 'Hair Colouring',
    image: '/images/haircolouring.jpg',
    items: ['Natural Henna', 'Permanent Hair Colour', 'Basic Hair Colour', 'Hair Highlighting'],
  },
  {
    id: 'hair-cuts',
    title: 'Hair Cuts',
    image: '/images/haircuts.jpg',
    items: [
      'All Basic & Fashion Cuts',
      'All Baby Hair Cuts',
      'Customised Hair Cuts (Face Framing & Hair Volume Based)',
    ],
  },
  {
    id: 'head-massage',
    title: 'Head Massage',
    image: '/images/headmassages.jpg',
    items: ['Coconut Oil Massage', 'Aroma Oil Massage'],
  },
  {
    id: 'body-massage',
    title: 'Body Massage',
    image: '/images/bodymassage.jpg',
    items: [
      'Body Massage for Weight Loss with Steam',
      'Body Massage for Relaxing',
      'Body Polishing',
    ],
  },
  {
    id: 'skin-treatments',
    title: 'Skin Treatments',
    image: '/images/SKINTREATMENTS.jpg',
    items: ['Pigmentation Treatments', 'Skin Whitening', 'Acne Treatments'],
  },
  {
    id: 'hair-treatments',
    title: 'Hair Treatments',
    image: '/images/HAIRTREATMENT.jpg',
    items: [
      'Dandruff Treatments',
      'Treatments for Hairfall',
      'Treatments for Hair Regrowth',
      'SPA Treatment for Hair Smoothing',
      'Ceratine',
      'Hair Botax',
      'Nanoplastia',
    ],
  },
  {
    id: 'aesthetic',
    title: 'Aesthetic Treatments',
    image: '/images/ASTHETIC TREATMENTS.jpg',
    items: [
      'Hydro Facials',
      'Chemical Peels',
      'Laser for Hair Removal',
      'Permanent Eyebrows',
      'Permanent Lipstick',
      'Permanent Makeup',
    ],
  },
  {
    id: 'lashes',
    title: 'Permanent Lashes',
    image: '/images/PERMENANT LASHES.jpg',
    items: ['Permanent Lashes'],
  },
];

const SectionReveal = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const GoldText = ({ children, className = '' }) => (
  <span className={`bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] via-[#F4E4BC] to-[#D4AF37] ${className}`}>
    {children}
  </span>
);

const ServiceCard = ({ service, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    className="group relative cursor-pointer rounded-xl sm:rounded-[1.5rem] overflow-hidden border border-[#D4AF37]/10 bg-[#111111]/80 h-52 sm:h-56 md:h-64 lg:h-72"
    onClick={() => onClick(service)}
  >
      <div className="absolute inset-0" style={{ backgroundColor: '#161616' }} />
      {service.image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{
            backgroundImage: `url('${service.image}')`,
            backgroundSize: service.bgSize || 'cover',
          }}
        />
      )}
    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
          backgroundSize: '300% 100%',
          animation: 'shine 3s ease-in-out infinite',
        }}
      />
    </div>
    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6">
      <div
        className="backdrop-blur-xl rounded-xl px-4 py-3 sm:px-5 sm:py-4"
        style={{
          background: 'rgba(17, 17, 17, 0.7)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl tracking-wide"
          style={{ fontFamily: FONTS.heading, textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
        >
          {service.title}
        </h3>
        <p className="text-[8px] sm:text-[10px] tracking-[0.2em] uppercase mt-0.5"
          style={{ color: COLORS.gold }}
        >
          Click to explore
        </p>
      </div>
    </div>
    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
      <div
        className="backdrop-blur-xl rounded-full p-2"
        style={{
          background: 'rgba(212, 175, 55, 0.15)',
          border: '1px solid rgba(212, 175, 55, 0.2)',
        }}
      >
        <Sparkles className="w-4 h-4" style={{ color: COLORS.gold }} />
      </div>
    </div>
  </motion.div>
);

const ServicePopup = ({ service, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {service.image && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${service.image}')`,
            filter: 'blur(40px)',
            transform: 'scale(1.1)',
          }}
        />
      )}
      <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-md" />
      <motion.div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10"
        style={{
          background: 'rgba(17, 17, 17, 0.7)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          border: '1px solid rgba(212, 175, 55, 0.15)',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(212, 175, 55, 0.05) inset',
        }}
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-start justify-between mb-6 sm:mb-8">
          <div>
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold"
              style={{ fontFamily: FONTS.heading, color: COLORS.text, textShadow: '0 2px 16px rgba(0,0,0,0.3)' }}
            >
              {service.title}
            </h2>
            <div
              className="h-1 w-16 rounded-full mt-3"
              style={{ background: `linear-gradient(90deg, ${COLORS.gold}, rgba(212, 175, 55, 0.1))` }}
            />
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-full p-2 sm:p-3 transition-all duration-300 hover:scale-110"
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(212, 175, 55, 0.15)',
            }}
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: COLORS.gold }} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {service.items.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl sm:rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                border: '1px solid rgba(212, 175, 55, 0.08)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: COLORS.gold,
                    boxShadow: `0 0 8px ${COLORS.gold}44`,
                  }}
                />
                <span
                  className="text-sm sm:text-base font-medium tracking-wide"
                  style={{ color: COLORS.text }}
                >
                  {item}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesLuxury = () => {
  const [selectedService, setSelectedService] = useState(null);

  const openPopup = useCallback((service) => setSelectedService(service), []);
  const closePopup = useCallback(() => setSelectedService(null), []);

  return (
    <section id="services" className="relative section-py" style={{ backgroundColor: '#0a0a0a' }}>
      <div className="w-full max-w-7xl mx-auto container-px relative z-10">
        <SectionReveal className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="text-[0.6rem] sm:text-xs md:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4" style={{ color: COLORS.gold }}>
            All Services
          </p>
          <h2 className="text-fluid-h2 font-bold" style={{ fontFamily: FONTS.heading, color: COLORS.text }}>
            Our <GoldText>Services</GoldText>
          </h2>
          <p className="text-fluid-body max-w-3xl mx-auto mt-3 sm:mt-4" style={{ color: COLORS.textMuted }}>
            Explore our complete range of beauty and wellness treatments
          </p>
        </SectionReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} onClick={openPopup} />
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selectedService && <ServicePopup service={selectedService} onClose={closePopup} />}
      </AnimatePresence>
      <style>{`
        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        #services ::-webkit-scrollbar { width: 4px; }
        #services ::-webkit-scrollbar-track { background: transparent; }
        #services ::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 4px;
        }
        @media (max-width: 380px) {
          #services .grid { gap: 0.5rem; }
        }
      `}</style>
    </section>
  );
};

export default ServicesLuxury;
