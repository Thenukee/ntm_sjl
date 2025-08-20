/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
      },
      colors: {
        cream: "#FFF8F2",
        terra: "#C75E4B",
        sky: "#5EA9DD",
        evening: "#243B55",
        sage: "#A7D2C4",
        violet: "#4C4E8F",
        primary: {
          DEFAULT: "#5EA9DD",
          dark: "#4C4E8F",
        },
        secondary: "#C75E4B",
        accent: "#A7D2C4",
        spring: {
          light: "#E9F6EF",
          DEFAULT: "#A7D2C4",
          dark: "#65B891",
        },
        summer: {
          light: "#FEF9C3",
          DEFAULT: "#FBBF24",
          dark: "#F59E0B",
        },
        autumn: {
          light: "#FEF3C7",
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        winter: {
          light: "#E0F2FE",
          DEFAULT: "#7DD3FC",
          dark: "#0EA5E9",
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'scale-up': 'scaleUp 0.5s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 4s infinite ease-in-out',
        'text-shimmer': 'textShimmer 2.5s ease-in-out infinite alternate',
        'morph': 'morphing 8s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
        'expand': 'expand 0.5s ease-out forwards',
        'bounce-in': 'bounceIn 0.8s ease-out',
        'wiggle': 'wiggle 0.75s ease-in-out',
        'reveal-right': 'revealRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal-top': 'revealTop 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'float 10s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'rotate-slow': 'rotate 15s linear infinite',
        'rotate-reverse': 'rotateReverse 12s linear infinite',
        'wave': 'wave 5s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'marquee': 'marquee 25s linear infinite',
        'scale-pulse': 'scalePulse 3s ease-in-out infinite',
        'appear': 'appear 0.7s cubic-bezier(0.17, 0.67, 0.83, 0.67) forwards',
        'blur-in': 'blurIn 0.7s ease-out forwards',
        'tilt': 'tilt 10s infinite linear',
        'scroll-hint': 'scrollHint 2s ease infinite',
        'draw-line': 'drawLine 2s ease-out forwards',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'float-leaf': 'floatLeaf 15s ease-in-out infinite',
        'snowfall': 'snowfall 15s linear infinite',
        'petal-fall': 'petalFall 12s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        slideLeft: {
          '0%': { transform: 'translateX(20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideRight: {
          '0%': { transform: 'translateX(-20px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.85, transform: 'scale(0.98)' },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-500% 0' },
          '100%': { backgroundPosition: '500% 0' },
        },
        morphing: {
          '0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
        },
        expand: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '80%': { transform: 'scale(1.15)', opacity: 0.8 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        bounceIn: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '50%': { transform: 'scale(1.05)', opacity: 1 },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        revealRight: {
          '0%': { width: '0%', opacity: 0 },
          '100%': { width: '100%', opacity: 1 },
        },
        revealTop: {
          '0%': { height: '0%', opacity: 0 },
          '100%': { height: '100%', opacity: 1 },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        rotateReverse: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '25%': { transform: 'translateY(-15px) scale(1.05)' },
          '50%': { transform: 'translateY(0) scale(1)' },
          '75%': { transform: 'translateY(15px) scale(0.95)' },
        },
        blob: {
          '0%, 100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
          '25%': { borderRadius: '50% 50% 40% 60% / 60% 40% 50% 50%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '75%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        appear: {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        blurIn: {
          '0%': { filter: 'blur(10px)', opacity: 0 },
          '100%': { filter: 'blur(0)', opacity: 1 },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(2deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-2deg)' },
        },
        scrollHint: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        floatLeaf: {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateY(20px) rotate(10deg) translateX(10px)' },
          '50%': { transform: 'translateY(40px) rotate(20deg) translateX(-10px)' },
          '75%': { transform: 'translateY(60px) rotate(10deg) translateX(10px)' },
          '100%': { transform: 'translateY(80px) rotate(0deg)' },
        },
        snowfall: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(25vh) translateX(15px)' },
          '50%': { transform: 'translateY(50vh) translateX(-15px)' },
          '75%': { transform: 'translateY(75vh) translateX(15px)' },
          '100%': { transform: 'translateY(100vh) translateX(0)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(0) rotate(0deg) translateX(0)' },
          '25%': { transform: 'translateY(25vh) rotate(45deg) translateX(20px)' },
          '50%': { transform: 'translateY(50vh) rotate(90deg) translateX(-20px)' },
          '75%': { transform: 'translateY(75vh) rotate(45deg) translateX(20px)' },
          '100%': { transform: 'translateY(100vh) rotate(0deg) translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-shine': 'linear-gradient(45deg, transparent 25%, rgba(255, 255, 255, 0.1) 25%, rgba(255, 255, 255, 0.1) 50%, transparent 50%, transparent 75%, rgba(255, 255, 255, 0.1) 75%, rgba(255, 255, 255, 0.1) 100%)',
        'mesh-1': 'linear-gradient(45deg, rgba(94, 169, 221, 0.02), transparent), linear-gradient(-45deg, rgba(167, 210, 196, 0.02), transparent)',
        'mesh-2': 'linear-gradient(60deg, rgba(76, 78, 143, 0.03), transparent 70%), linear-gradient(120deg, rgba(199, 94, 75, 0.03), transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'grid': "linear-gradient(to right, rgba(94, 169, 221, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(94, 169, 221, 0.1) 1px, transparent 1px)",
        'dots': "radial-gradient(rgba(94, 169, 221, 0.2) 2px, transparent 2px)",
        'gradient-blur': "linear-gradient(145deg, rgba(94, 169, 221, 0.3), rgba(76, 78, 143, 0.1), rgba(167, 210, 196, 0.2))",
        'glare': "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)",
      },
      boxShadow: {
        'soft': '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
        'card': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 15px rgba(94, 169, 221, 0.5)',
        'intense': '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        'inner-glow': 'inset 0 0 10px 0 rgba(94, 169, 221, 0.2)',
        'button': '0 4px 14px -5px rgba(76, 78, 143, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'neon': '0 0 5px rgba(94, 169, 221, 0.2), 0 0 20px rgba(94, 169, 221, 0.2), 0 0 30px rgba(94, 169, 221, 0.2)',
        'layered': '0 1px 2px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07)',
        '3d': '0 10px 30px -15px rgba(0, 0, 0, 0.2), 0 5px 10px -7px rgba(0, 0, 0, 0.15)',
        'inner-multi': 'inset 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.05), inset 0 4px 8px rgba(0, 0, 0, 0.05)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
        'border-radius': 'border-radius',
        'text-shadow': 'text-shadow',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-md': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-glow': {
          textShadow: '0 0 10px rgba(94, 169, 221, 0.7)',
        },
        '.text-shadow-xl': {
          textShadow: '0 6px 12px rgba(0, 0, 0, 0.08)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        '.text-gradient': {
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent',
          backgroundImage: 'linear-gradient(45deg, #5EA9DD, #4C4E8F)',
        },
        '.bg-blur': {
          backdropFilter: 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
        },
        '.text-glitch': {
          position: 'relative',
          animation: 'glitch 3s infinite',
        },
        '.backdrop-blur-xl': {
          backdropFilter: 'blur(24px)',
          '-webkit-backdrop-filter': 'blur(24px)',
        },
        '.text-outline': {
          '-webkit-text-stroke': '1px rgba(0, 0, 0, 0.1)',
        },
        '.mask-fadeout-x': {
          maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))',
          '-webkit-mask-image': 'linear-gradient(to right, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))',
        },
        '.mask-fadeout-y': {
          maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))',
          '-webkit-mask-image': 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 80%, rgba(0, 0, 0, 0))',
        },
        '.clip-path-slant': {
          clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
        },
        '.perspective': {
          perspective: '1000px',
        },
        '.transform-3d': {
          transformStyle: 'preserve-3d',
        },
        '.parallax-scroll': {
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        },
      };
      addUtilities(newUtilities);
    },
    function({ addComponents }) {
      const components = {
        '.glass-card': {
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
        },
        '.glass-card:hover': {
          boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)',
          transform: 'translateY(-5px)',
        },
      };
      addComponents(components);
    },
  ],
};
