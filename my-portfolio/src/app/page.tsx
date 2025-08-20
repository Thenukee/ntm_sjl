'use client';
import { motion, LazyMotion, domAnimation, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ReactNode, useEffect, useState, useRef } from 'react';

export default function Home() {
  // Single source of scroll progress
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, { damping: 50, stiffness: 400 });
  
  // State for visibility control
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  
  // Update states based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowScrollTop(latest > 0.2);
    setShowEasterEgg(latest > 0.8);
  });
  
  // Mouse position for parallax effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Refs for section-specific scroll tracking
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  
  // Parallax effect values
  const heroTextY = useTransform(smoothScrollProgress, [0, 0.2], [0, 50]);
  const heroOpacity = useTransform(smoothScrollProgress, [0, 0.2], [1, 0.5]);
  
  // Background parallax effects
  const bgPosY1 = useTransform(smoothScrollProgress, [0, 1], ['0%', '30%']);
  const bgRotate = useTransform(smoothScrollProgress, [0, 1], [0, 15]);
  
  // Custom scroll tracking for projects section
  const { scrollYProgress: projectsScrollProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"]
  });
  
  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);
  
  // Custom cursor state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [prevCursorPosition, setPrevCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorSpeed, setCursorSpeed] = useState(0);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [bubbles, setBubbles] = useState<{id: number, x: number, y: number, size: number}[]>([]);
  const bubbleIdRef = useRef(0);
  
  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Handle cursor movement and bubble generation
  useEffect(() => {
    let lastTime = performance.now();
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      const timeDelta = currentTime - lastTime;
      
      // Update previous position before setting new position
      setPrevCursorPosition(cursorPosition);
      
      // Update current position
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      // Calculate speed (distance / time)
      if (timeDelta > 0) {
        const dx = e.clientX - prevCursorPosition.x;
        const dy = e.clientY - prevCursorPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = distance / timeDelta;
        setCursorSpeed(speed);
        
        // Generate bubbles based on speed
        const bubbleCount = Math.floor(speed * 0.3); // Adjust multiplier to control bubble density
        
        for (let i = 0; i < bubbleCount; i++) {
          const randomOffset = () => (Math.random() - 0.5) * 20;
          const newBubble = {
            id: bubbleIdRef.current++,
            x: e.clientX + randomOffset(),
            y: e.clientY + randomOffset(),
            size: Math.random() * 15 + 5, // Random size between 5-20px
          };
          
          setBubbles(prev => [...prev, newBubble]);
          
          // Remove bubbles after they animate to keep performance good
          setTimeout(() => {
            setBubbles(prev => prev.filter(bubble => bubble.id !== newBubble.id));
          }, 2000);
        }
      }
      
      lastTime = currentTime;
    };
    
    const updateMousePosition = (e: MouseEvent) => {
      // For parallax effects
      setMousePosition({ 
        x: e.clientX / window.innerWidth, 
        y: e.clientY / window.innerHeight 
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [cursorPosition, prevCursorPosition]);
  
  // Cursor variants
  const cursorVariants = {
    default: {
      x: cursorPosition.x - 16,
      y: cursorPosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: darkMode ? 'rgba(94, 169, 221, 0.2)' : 'rgba(94, 169, 221, 0.1)',
      mixBlendMode: 'difference',
    },
    link: {
      height: 64,
      width: 64,
      x: cursorPosition.x - 32,
      y: cursorPosition.y - 32,
      backgroundColor: 'rgba(94, 169, 221, 0.3)',
      mixBlendMode: 'difference',
    },
  };
  
  // Text reveal animation variants
  const textRevealVariants = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.05, 
        delayChildren: i * 0.1 
      }
    })
  };
  
  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateX: 90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring" as const, 
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  // Helper function to split text for animations
  const splitText = (text: string, className = "") => {
    return (
      <motion.span
        variants={textRevealVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="inline-block"
      >
        {text.split("").map((char: string, index: number) => (
          <motion.span key={index} className={`inline-block ${className}`} variants={letterVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    );
  };
  
  return (
    <LazyMotion features={domAnimation}>
      {/* Bubble effect */}
      <AnimatePresence>
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="fixed rounded-full pointer-events-none z-[90] mix-blend-screen"
            initial={{ 
              x: bubble.x, 
              y: bubble.y, 
              opacity: 0.8, 
              scale: 0.2,
              width: bubble.size,
              height: bubble.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 30% 30%, 
                ${darkMode ? 'rgba(140, 200, 255, 0.8)' : 'rgba(140, 200, 255, 0.6)'}, 
                ${darkMode ? 'rgba(94, 169, 221, 0.2)' : 'rgba(94, 169, 221, 0.2)'})`
            }}
            animate={{
              x: bubble.x + (Math.random() - 0.5) * 100,
              y: bubble.y - 100 - Math.random() * 50,
              opacity: 0,
              scale: Math.random() * 0.5 + 0.5,
              transition: {
                duration: 1 + Math.random(),
                ease: "easeOut"
              }
            }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              boxShadow: `
                inset 0 0 10px rgba(255, 255, 255, 0.5),
                0 0 5px rgba(255, 255, 255, 0.3)
              `,
              border: '1px solid rgba(255, 255, 255, 0.3)'
            }}
          />
        ))}
      </AnimatePresence>

      {/* Custom cursor */}
      <motion.div
        className="custom-cursor fixed rounded-full pointer-events-none z-[100] hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      />
      
      {/* Dark mode toggle */}
      <motion.button
        className={`fixed top-6 right-6 z-50 p-3 rounded-full ${darkMode ? 'bg-white text-sky' : 'bg-sky text-white'}`}
        onClick={() => setDarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setCursorVariant('link')}
        onMouseLeave={() => setCursorVariant('default')}
      >
        {darkMode ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.button>
      
      {/* Progress bar and rest of the content */}
      <div className={darkMode ? "bg-gray-900 text-white transition-colors duration-500" : "bg-pattern relative transition-colors duration-500"}>
        {/* Progress bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-sky z-50 origin-left"
          style={{ scaleX: smoothScrollProgress }}
        />
        
        <div className="bg-pattern relative">
          {/* Parallax background elements */}
          <motion.div 
            className="fixed inset-0 pointer-events-none z-[-1] opacity-30"
            style={{ 
              backgroundImage: "radial-gradient(circle, rgba(94, 169, 221, 0.1) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              y: bgPosY1
            }}
          />
          
          <motion.div 
            className="fixed top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-violet/5 to-transparent blur-3xl pointer-events-none z-[-1]"
            style={{ 
              x: useTransform(() => mousePosition.x * 40 - 20),
              y: useTransform(() => mousePosition.y * 40 - 20),
              rotate: bgRotate
            }}
          />
          
          <motion.div 
            className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-sky/5 to-transparent blur-3xl pointer-events-none z-[-1]"
            style={{ 
              x: useTransform(() => mousePosition.x * -40 + 20),
              y: useTransform(() => mousePosition.y * -40 + 20),
              rotate: useTransform(smoothScrollProgress, [0, 1], [0, -10])
            }}
          />
          
          {/* Hero section with parallax - SPRING THEME */}
          <section 
            ref={heroRef}
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-8"
          >
            {/* Spring background elements - fresh greens and pinks */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky/5 via-transparent to-sage/10 pointer-events-none"></div>
            <motion.div 
              className="absolute -top-20 -right-20 w-96 h-96 bg-sky/10 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.4, 0.3]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            {/* Cherry blossom floating elements */}
            <AnimatePresence>
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={`spring-blossom-${i}`}
                  className="absolute pointer-events-none opacity-70"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -50, 
                    rotate: Math.random() * 180,
                    opacity: 0.7
                  }}
                  animate={{ 
                    y: window.innerHeight + 100,
                    rotate: Math.random() * 360,
                    x: (Math.random() - 0.5) * 200 + (i * 100)
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ 
                    duration: 15 + (Math.random() * 20), 
                    repeat: Infinity,
                    delay: i * 2 
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="10" cy="10" r="8" fill="#FBCFE8" fillOpacity="0.7" />
                    <circle cx="10" cy="10" r="3" fill="#EC4899" fillOpacity="0.5" />
                  </svg>
                </motion.div>
              ))}
            </AnimatePresence>
            
            <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-violet/10 rounded-full blur-3xl"></div>
            
            <motion.div 
              className="z-10 max-w-4xl mx-auto text-center"
              style={{
                y: heroTextY,
                opacity: heroOpacity
              }}
            >
              <motion.span 
                className="inline-block text-sky font-medium mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Data Analyst &amp; Business Analytics Specialist
              </motion.span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl mx-auto leading-tight mb-6">
                Turning {splitText("data", "text-sky")} into {splitText("stories", "text-violet")} that drive decisions
              </h1>
              
              <motion.p 
                className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                I combine analytical skills with business acumen to transform complex data into actionable insights.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link
                  href="#projects"
                  className="bg-sky text-white px-8 py-3.5 rounded-full hover:bg-violet transition-colors shadow-md hover:shadow-lg font-medium"
                >
                  View My Projects
                </Link>
                <Link
                  href="#contact"
                  className="border-2 border-sky text-sky px-8 py-3 rounded-full hover:bg-sky hover:text-white transition-colors font-medium"
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Enhanced paw-print animation */}
            <motion.div
              className="absolute top-1/3 left-1/4 w-24 pointer-events-none opacity-50"
              animate={{ 
                x: ['-100%', '400%'], 
                y: [0, -50, 30, -20, 0],
                opacity: [0, 0.7, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity, 
                repeatType: "loop",
                times: [0, 0.2, 0.5, 0.8, 1]
              }}
            >
              <Image src="/paws.svg" alt="" width={96} height={96} />
            </motion.div>
          </section>

          {/* ---------- Skills Section ---------- */}
          <section id="skills" className="py-16 px-4 relative">
            {/* Summer background - warm, bright, sunny */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-100/20 via-amber-50/5 to-orange-50/10 pointer-events-none"></div>
            
            {/* Sun element */}
            <motion.div 
              className="absolute right-0 top-0 w-60 h-60 rounded-full bg-yellow-300/10 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.2, 0.15]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            {/* Summer particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 10 }).map((_, i) => (
                <motion.div
                  key={`summer-particle-${i}`}
                  className="absolute w-1.5 h-1.5 bg-yellow-400/30 rounded-full"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -20,
                    opacity: 0
                  }}
                  animate={{ 
                    y: window.innerHeight + 20,
                    opacity: [0, 0.7, 0],
                    scale: [0.8, 1.2, 0.8]
                  }}
                  transition={{ 
                    duration: 8 + Math.random() * 10, 
                    repeat: Infinity,
                    delay: i * 2 
                  }}
                />
              ))}
            </div>
            
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">My Expertise</h2>
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                I leverage these skills and tools to extract meaningful insights from complex datasets
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Data Analysis',
                    skills: ['SQL', 'Python', 'R', 'Tableau', 'Power BI'],
                    icon: (
                      <svg className="w-8 h-8 text-sky mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    ),
                  },
                  {
                    title: 'Business Intelligence',
                    skills: ['Dashboard Design', 'Data Modeling', 'KPI Tracking', 'Forecasting'],
                    icon: (
                      <svg className="w-8 h-8 text-sky mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                    ),
                  },
                  {
                    title: 'Tools & Technologies',
                    skills: ['Git', 'dbt', 'Excel', 'Jupyter', 'Google Analytics'],
                    icon: (
                      <svg className="w-8 h-8 text-sky mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    ),
                  },
                ].map((category, i) => (
                  <motion.div
                    key={category.title}
                    className="glass rounded-xl p-6 shadow-soft"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    {category.icon}
                    <h3 className="text-xl font-bold text-violet mb-2">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.skills.map(skill => (
                        <li key={skill} className="flex items-center gap-2">
                          <span className="text-sky text-xs">●</span>
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- About ---------- */}
          <section id="about" className="py-20 px-4 relative">
            {/* Autumn background - warm, golden colors */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-transparent to-orange-100/20 pointer-events-none"></div>
            
            {/* Falling leaves */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={`autumn-leaf-${i}`}
                  className="absolute"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -50, 
                    rotate: Math.random() * 180,
                    opacity: 0.8
                  }}
                  animate={{ 
                    y: window.innerHeight + 100,
                    rotate: Math.random() * 360 + 180,
                    x: (Math.random() - 0.5) * 300 + (i * 100)
                  }}
                  transition={{ 
                    duration: 20 + (Math.random() * 15), 
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: [0.1, 0.8, 0.1, 1]
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22Z" fill={i % 2 === 0 ? "#FCD34D" : "#F97316"} fillOpacity="0.3" />
                  </svg>
                </motion.div>
              ))}
            </div>
            
            {/* Warm glow */}
            <motion.div 
              className="absolute -bottom-20 left-1/3 w-96 h-96 rounded-full bg-orange-400/10 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  className="relative perspective"
                  style={{ 
                    rotateY: useTransform(() => (mousePosition.x - 0.5) * 20),
                    rotateX: useTransform(() => (mousePosition.y - 0.5) * -20)
                  }}
                >
                  <div className="w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 rounded-full overflow-hidden shadow-lg border-4 border-white relative">
                    <Image
                      src="/you-and-dog.jpg"
                      alt="Anya Martin with her dog"
                      fill
                      sizes="(max-width: 768px) 256px, 320px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-full shadow-md">
                    <Image src="/paws.svg" alt="" width={32} height={32} />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                >
                  <span className="text-sky font-medium">About Me</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 mt-1">
                    Transforming Data into <span className="text-violet">Strategic Decisions</span>
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    I'm <strong>Anya Martin</strong>, a business analytics undergraduate with a passion for finding stories within data. 
                    I believe that data-driven insights are the foundation of successful business strategies.
                  </p>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    When I'm not analyzing datasets, you'll find me exploring new hiking trails with my dog or planning my next international adventure.
                    My travels have taught me to look at problems from different perspectives—a skill I bring to every analysis I perform.
                  </p>
                  
                  <div className="flex flex-wrap gap-6 mb-8">
                    <div>
                      <div className="text-2xl font-bold text-sky">3+</div>
                      <div className="text-sm text-gray-500">Years Experience</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-sky">15+</div>
                      <div className="text-sm text-gray-500">Projects Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-sky">5+</div>
                      <div className="text-sm text-gray-500">Tools Mastered</div>
                    </div>
                  </div>
                  
                  <Link
                    href="/anya-martin-cv.pdf"
                    className="inline-flex items-center gap-2 bg-violet text-white px-6 py-3 rounded-full hover:bg-sky transition-colors shadow-md hover:shadow-lg"
                  >
                    <span>Download CV</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ---------- Volunteering Journey ---------- */}
          <section id="volunteering" className="py-20 px-4 relative">
            {/* Winter background - cool blues and silvers */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/20 via-transparent to-slate-100/10 pointer-events-none"></div>
            
            {/* Snowflakes */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={`snowflake-${i}`}
                  className="absolute w-2 h-2 rounded-full bg-white/80"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -20,
                    opacity: 0.8,
                    scale: Math.random() * 0.5 + 0.5
                  }}
                  animate={{ 
                    y: window.innerHeight + 20,
                    x: (Math.random() - 0.5) * 100 + (i * 50)
                  }}
                  transition={{ 
                    duration: 15 + (Math.random() * 15), 
                    repeat: Infinity,
                    delay: i * 0.5 
                  }}
                />
              ))}
            </div>
            
            {/* Frost glow */}
            <motion.div 
              className="absolute top-1/4 right-10 w-80 h-80 rounded-full bg-blue-200/10 blur-3xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-sky font-medium">Giving Back</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-4">
                  My Volunteering Journey
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  I believe in using my skills to make a positive impact. Here are some highlights from my volunteering experiences.
                </p>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    org: "Animal Shelter Outreach",
                    role: "Data Volunteer",
                    period: "2022 - Present",
                    desc: "Analyzed adoption trends and optimized shelter resources, helping more pets find loving homes.",
                    icon: "/paws.svg"
                  },
                  {
                    org: "Local Food Bank",
                    role: "Logistics Assistant",
                    period: "2021 - 2022",
                    desc: "Streamlined inventory and delivery routes, ensuring efficient food distribution to families in need.",
                    icon: "/thumbs/dogfood-trends.jpg"
                  },
                  {
                    org: "Youth Coding Club",
                    role: "Mentor",
                    period: "2020 - 2021",
                    desc: "Taught Python basics and data visualization to high school students, inspiring the next generation of analysts.",
                    icon: "/thumbs/london-bikes.jpg"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={item.org}
                    className="glass-card rounded-xl p-6 flex flex-col items-center text-center shadow-soft"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <div className="mb-4">
                      <Image src={item.icon} alt="" width={56} height={56} className="rounded-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-violet mb-1">{item.org}</h3>
                    <div className="text-sky text-sm font-medium mb-1">{item.role}</div>
                    <div className="text-gray-400 text-xs mb-3">{item.period}</div>
                    <p className="text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Projects ---------- */}
          <section 
            id="projects" 
            ref={projectsRef}
            className="py-20 px-4 relative overflow-hidden"
          >
            {/* Seasons blend background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50/20 via-sky-50/10 to-indigo-50/5 pointer-events-none"></div>
            
            {/* Season orbs representing different project categories */}
            <motion.div 
              className="absolute -top-40 left-10 w-96 h-96 rounded-full bg-green-200/10 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            <motion.div 
              className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-amber-200/10 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }}
            ></motion.div>
            
            <motion.div 
              className="absolute -bottom-40 left-1/3 w-96 h-96 rounded-full bg-blue-200/10 blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 4
              }}
            ></motion.div>
            
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7 }}
              >
                <span className="text-sky font-medium">Portfolio</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-4">Featured Projects</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Explore my latest data analytics projects that demonstrate my ability to extract meaningful insights and drive business decisions.
                </p>
              </motion.div>
              
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: 'Mexico Tourism Revenue Analysis',
                    description: 'Statistical analysis of tourism patterns and revenue streams across Mexico\'s top destinations, identifying growth opportunities.',
                    image: '/thumbs/mexico-revenue.jpg',
                    tools: ['Tableau', 'Python', 'SQL'],
                  },
                  {
                    title: 'Sri Lanka Tourism Trends',
                    description: 'Forecasting post-pandemic recovery for Sri Lanka\'s tourism industry using time series analysis and predictive modeling.',
                    image: '/thumbs/srilanka-tourism.jpg',
                    tools: ['Power BI', 'R', 'Excel'],
                  },
                  {
                    title: 'London Bike Share Analysis',
                    description: 'Spatial and temporal analysis of London\'s bike sharing system, optimizing distribution and maintenance schedules.',
                    image: '/thumbs/london-bikes.jpg', 
                    tools: ['Python', 'Matplotlib', 'GIS'],
                  },
                  {
                    title: 'Pet Food Market Trends',
                    description: 'Market research analysis on emerging trends in premium pet food, identifying consumer preferences and growth segments.',
                    image: '/thumbs/dogfood-trends.jpg',
                    tools: ['Tableau', 'SPSS', 'Survey Analysis'],
                  },
                ].map((project, i) => (
                  <motion.article
                    key={project.title}
                    className="glass rounded-xl overflow-hidden shadow-card h-[420px] perspective"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ 
                      rotateY: 5,
                      rotateX: -5,
                      y: -15,
                      transition: { duration: 0.3, type: "spring" }
                    }}
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <div className="h-48 overflow-hidden relative">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.4 }}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover"
                          priority={i < 2}
                        />
                      </motion.div>
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <div className="p-6 relative z-10 bg-gradient-to-b from-transparent to-white/5 backdrop-blur-sm h-full">
                      <motion.h3 
                        className="font-bold text-xl mb-2"
                        whileHover={{ x: 3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      >
                        {project.title}
                      </motion.h3>
                      
                      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tools.map(tool => (
                          <motion.span 
                            key={tool} 
                            className="text-xs bg-sky/10 text-sky px-2 py-1 rounded-full"
                            whileHover={{ 
                              scale: 1.1, 
                              backgroundColor: "rgba(94, 169, 221, 0.2)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                          >
                            {tool}
                          </motion.span>
                        ))}
                      </div>
                      
                      <Link 
                        href={`/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}`} 
                        className="text-sky font-medium text-sm flex items-center gap-1 hover:text-violet transition-colors group"
                      >
                        <span>View Project</span>
                        <motion.svg 
                          className="w-4 h-4" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                          initial={{ x: 0 }}
                          whileHover={{ x: 3 }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </motion.svg>
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* ---------- Contact ---------- */}
          <section id="contact" className="py-20 px-4 relative">
            {/* Spring returning background */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-50/20 via-transparent to-sky-50/10 pointer-events-none"></div>
            
            {/* Fresh start glow */}
            <motion.div 
              className="absolute -top-40 right-0 w-96 h-96 bg-violet/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            
            {/* Small blossoms */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={`spring-return-${i}`}
                  className="absolute"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: -30, 
                    rotate: Math.random() * 180,
                    opacity: 0.6
                  }}
                  animate={{ 
                    y: window.innerHeight + 100,
                    rotate: Math.random() * 360,
                    x: (Math.random() - 0.5) * 200 + (i * 120)
                  }}
                  transition={{ 
                    duration: 18 + (Math.random() * 15), 
                    repeat: Infinity,
                    delay: i * 2 
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="6" cy="6" r="5" fill="#BFDBFE" fillOpacity="0.6" />
                    <circle cx="6" cy="6" r="2" fill="#3B82F6" fillOpacity="0.4" />
                  </svg>
                </motion.div>
              ))}
            </div>
            
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="text-sky font-medium">Contact</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-1 mb-4">Let's Connect</h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                  Have a project in mind or want to discuss data analytics opportunities? 
                  I'd love to hear from you!
                </p>
              </div>
              
              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <motion.div
                    className="glass p-6 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-sky/10 p-3 rounded-full">
                        <svg className="w-6 h-6 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold">Email</h3>
                        <a href="mailto:anya.martin@example.com" className="text-sm text-gray-600 hover:text-sky">anya.martin@example.com</a>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    className="glass p-6 rounded-xl"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-sky/10 p-3 rounded-full">
                        <svg className="w-6 h-6 text-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-bold">Social Media</h3>
                        <div className="flex gap-3 mt-2">
                          <a href="https://linkedin.com/in/anyamartin" className="text-gray-600 hover:text-sky" aria-label="LinkedIn">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                          <a href="https://github.com/anyamartin" className="text-gray-600 hover:text-sky" aria-label="GitHub">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                          </a>
                          <a href="https://twitter.com/anyamartin" className="text-gray-600 hover:text-sky" aria-label="Twitter">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <motion.div
                  className="md:col-span-3 glass-card overflow-hidden"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="p-8">
                    <motion.div
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="h-1 bg-gradient-to-r from-sky via-violet to-sky/0 mb-6 rounded-full"
                    />
                    
                    <form action="https://formspree.io/f/yourID" method="POST" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        {[{
                          id: "name",
                          label: "Name",
                          type: "text",
                          placeholder: "Your name"
                        },
                        {
                          id: "email",
                          label: "Email",
                          type: "email",
                          placeholder: "Your email",
                          name: "_replyto"
                        }].map((field, i) => (
                          <motion.div 
                            key={field.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.7 + (i * 0.1) }}
                            className="relative"
                          >
                            <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                              {field.label}
                            </label>
                            <motion.div className="relative">
                              <motion.input
                                type={field.type}
                                id={field.id}
                                name={field.name || field.id}
                                placeholder={field.placeholder}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-sky focus:ring-1 focus:ring-sky transition"
                                whileFocus={{ 
                                  boxShadow: "0 0 0 3px rgba(94, 169, 221, 0.2)",
                                  borderColor: "#5EA9DD" 
                                }}
                                whileTap={{ scale: 0.995 }}
                                onMouseEnter={() => setCursorVariant('link')}
                                onMouseLeave={() => setCursorVariant('default')}
                              />
                              <motion.span 
                                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-sky to-violet rounded-full"
                                initial={{ width: "0%" }}
                                whileFocus={{ width: "100%" }}
                                transition={{ duration: 0.3 }}
                              />
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                          Subject
                        </label>
                        <motion.input
                          type="text"
                          id="subject"
                          name="subject"
                          placeholder="How can I help you?"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-sky focus:ring-1 focus:ring-sky transition"
                          whileFocus={{ 
                            boxShadow: "0 0 0 3px rgba(94, 169, 221, 0.2)",
                            borderColor: "#5EA9DD" 
                          }}
                          whileTap={{ scale: 0.995 }}
                        />
                      </motion.div>
                      
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.0 }}
                      >
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Message
                        </label>
                        <motion.textarea
                          id="message"
                          name="message"
                          rows={5}
                          placeholder="Your message"
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-sky focus:ring-1 focus:ring-sky transition resize-none"
                          whileFocus={{ 
                            boxShadow: "0 0 0 3px rgba(94, 169, 221, 0.2)",
                            borderColor: "#5EA9DD" 
                          }}
                          whileTap={{ scale: 0.995 }}
                        />
                      </motion.div>
                      
                      <motion.button
                        type="submit"
                        className="bg-sky text-white px-8 py-3.5 rounded-lg hover:bg-violet transition-colors shadow-md hover:shadow-lg font-medium w-full md:w-auto relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.1 }}
                        whileHover={{ 
                          scale: 1.03, 
                          boxShadow: "0 10px 25px -5px rgba(94, 169, 221, 0.4)"
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">Send Message</span>
                        <motion.span 
                          className="absolute inset-0 bg-gradient-to-r from-violet via-sky to-violet bg-[length:200%_100%] z-0"
                          initial={{ opacity: 0, backgroundPosition: "0% 0%" }}
                          whileHover={{ 
                            opacity: 1, 
                            backgroundPosition: ["0% 0%", "100% 0%"] 
                          }}
                          transition={{ duration: 1.5, repeat: Infinity, repeatType: "mirror" }}
                        />
                      </motion.button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 px-4 border-t border-gray-100">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <motion.p 
                className="text-gray-500 text-sm"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                © {new Date().getFullYear()} Anya Martin. All rights reserved.
              </motion.p>
              
              <motion.div 
                className="flex gap-6 mt-4 md:mt-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {['about', 'volunteering', 'projects', 'contact'].map((id, i) => (
                  <motion.div
                    key={id}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Link 
                      href={`#${id}`} 
                      className="text-sm text-gray-500 hover:text-sky transition-colors relative overflow-hidden group"
                    >
                      <span>{id.charAt(0).toUpperCase() + id.slice(1)}</span>
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-sky scale-x-0 origin-left"
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            
            {/* Scroll to top button */}
            <motion.div
              className="fixed bottom-8 right-8 z-50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: showScrollTop ? 1 : 0,
                scale: showScrollTop ? 1 : 0
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="bg-sky text-white p-3 rounded-full shadow-md hover:bg-violet transition-colors duration-300"
                animate={{ 
                  y: [0, -5, 0],
                }}
                transition={{ 
                  y: { duration: 1.5, repeat: Infinity, repeatType: "loop" }
                }}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            </motion.div>
            
            {/* Easter egg animation */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  className="fixed bottom-20 right-20 z-10 pointer-events-none"
                  initial={{ opacity: 0, scale: 0, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 20 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  >
                    <Image src="/paws.svg" alt="" width={40} height={40} />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </footer>
          
          {/* Easter egg animation - appears on certain scroll positions */}
          <AnimatePresence>
            {scrollYProgress.get() > 0.8 && (
              <motion.div
                className="fixed bottom-20 right-20 z-10 pointer-events-none"
                initial={{ opacity: 0, scale: 0, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0, rotate: 20 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <motion.div
                  animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Image src="/paws.svg" alt="" width={40} height={40} />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </LazyMotion>
  );
}

// Helper component for animated section transitions
function AnimatedSection({ children, delay = 0, ...props }: { children: ReactNode; delay?: number; [key: string]: any }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
