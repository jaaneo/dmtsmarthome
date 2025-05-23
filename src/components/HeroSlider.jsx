import React, { useState, useEffect, useRef } from 'react';

const slides = [
  {
    title: 'Domótica y conectividad total',
    text: 'Controla tu hogar o parcela desde cualquier lugar. Integramos KNX, Z-Wave, Zigbee, Bluetooth y WiFi para máxima comodidad y seguridad.',
    img: '/images/smart-home.jpg',
    cta: 'Solicita tu asesoría gratuita',
    ctaLink: '#contacto',
    bg: 'from-blue-900 via-blue-800 to-blue-700',
  },
  {
    title: 'Redes WiFi profesionales',
    text: 'Cobertura total, incluso en parcelas de 5.000 m². Una sola red, sin puntos ciegos ni múltiples nombres.',
    img: '/images/integration.jpg',
    cta: 'Conoce más sobre integración',
    ctaLink: '/integracion-total',
    bg: 'from-green-800 via-green-600 to-green-400',
  },
  {
    title: 'Acompañamiento total',
    text: 'Te asesoramos desde el diseño hasta la puesta en marcha y soporte postventa.',
    img: '/images/asesoria.jpg',
    cta: 'Ver soluciones de seguridad',
    ctaLink: '/seguridad-inteligente',
    bg: 'from-purple-900 via-pink-700 to-pink-400',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const goTo = (idx) => setCurrent(idx);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(next, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [current]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full transition-all duration-700">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${current === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'} bg-gradient-to-br ${slide.bg} dark:from-gray-900 dark:via-gray-800 dark:to-gray-900`}
            aria-hidden={current !== idx}
          />
        ))}
      </div>
      {/* Indicadores SIEMPRE abajo del hero */}
      <div className="absolute left-0 right-0 bottom-4 md:bottom-8 flex justify-center gap-2 z-30 pointer-events-none">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`pointer-events-auto w-3 h-3 rounded-full ${current === idx ? 'bg-yellow-400' : 'bg-white/60 dark:bg-gray-700'} border-2 border-white dark:border-gray-800 transition`}
            aria-label={`Ir al slide ${idx + 1}`}
          ></button>
        ))}
      </div>
      <div className="container mx-auto px-4 sm:px-8 md:px-20 py-10 sm:py-16 relative z-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`w-full flex flex-col md:flex-row items-center gap-8 md:gap-12 ${current === idx ? 'block md:absolute opacity-100 translate-x-0 z-20' : 'hidden md:absolute opacity-0 translate-x-10 pointer-events-none z-0'}`}
            aria-hidden={current !== idx}
            style={{ minHeight: '350px' }}
          >
            <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl mb-8 text-blue-100 dark:text-gray-300 drop-shadow">
                {slide.text}
              </p>
              <a href={slide.ctaLink} className="inline-block bg-gradient-to-r from-[#FFD700] via-[#FFC300] to-[#FFB300] text-gray-900 px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-bold shadow-lg border border-yellow-400 hover:from-[#FFEF8E] hover:to-[#FFD700] hover:shadow-xl hover:border-yellow-500 transition duration-300 text-center text-base sm:text-lg">
                {slide.cta}
              </a>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl w-[260px] h-[180px] sm:w-[340px] sm:h-[260px] md:w-[420px] md:h-[320px] bg-white/10">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="object-cover w-full h-full transition duration-300 dark:brightness-75"
                  loading="lazy"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 rounded-3xl border-4 border-white/30 dark:border-gray-700 pointer-events-none"></div>
              </div>
            </div>
          </div>
        ))}
        {/* Flechas */}
        <button onClick={prev} className="hidden md:flex absolute left-[-32px] md:left-[-56px] top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 p-2 md:p-3 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition z-30">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={next} className="hidden md:flex absolute right-[-32px] md:right-[-56px] top-1/2 -translate-y-1/2 bg-white/70 dark:bg-gray-800/70 p-2 md:p-3 rounded-full shadow hover:bg-white dark:hover:bg-gray-700 transition z-30">
          <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
} 