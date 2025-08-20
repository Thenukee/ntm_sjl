'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ setCursorVariant }: { setCursorVariant?: (variant: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine which section is currently in view
      const sections = ['skills', 'about', 'volunteering', 'projects', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if the section is in the viewport (with some offset)
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Centered navbar design */}
      <motion.nav 
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md ${
          scrolled ? 'bg-white/20' : 'bg-white/10'
        } rounded-full px-6 py-3 shadow-lg border border-white/20`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
      >
        <ul className="flex space-x-6">
          {[
            {
              name: 'Skills',
              href: '#skills'
            },
            {
              name: 'About',
              href: '#about'
            },
            {
              name: 'Volunteering',
              href: '#volunteering'
            },
            {
              name: 'Projects',
              href: '#projects'
            },
            {
              name: 'Contact',
              href: '#contact'
            }
          ].map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <motion.li key={item.name}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Link
                  href={item.href}
                  className={`text-sm font-medium relative group px-4 py-2 rounded-full border ${
                    isActive 
                      ? 'text-sky border-sky/30 bg-sky/15 font-bold shadow-sm shadow-sky/20' 
                      : 'border-transparent hover:bg-white/10 transition-colors'
                  }`}
                  onMouseEnter={() => setCursorVariant && setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant && setCursorVariant('default')}
                >
                  <span className="relative z-10">
                    {item.name}
                    
                    {/* Glow effect behind active text */}
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 bg-sky/10 blur-sm rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      />
                    )}
                    
                    {/* Dot indicator for active item */}
                    {isActive && (
                      <motion.span
                        className="absolute -right-2 top-1/2 transform -translate-y-1/2 h-2 w-2 bg-sky rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1] 
                        }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 2,
                          ease: "easeInOut" 
                        }}
                      />
                    )}
                  </span>
                  
                  {/* Bottom bar indicator with layout animation */}
                  {isActive ? (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-sky rounded-full"
                      layoutId="navbar-indicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  ) : (
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-sky/50 rounded-full origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.nav>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden absolute top-20 left-4 right-4 glass shadow-lg rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col p-4 space-y-3">
              {[
                {
                  name: 'Skills',
                  href: '#skills'
                },
                {
                  name: 'About',
                  href: '#about'
                },
                {
                  name: 'Volunteering',
                  href: '#volunteering'
                },
                {
                  name: 'Projects',
                  href: '#projects'
                },
                {
                  name: 'Contact',
                  href: '#contact'
                }
              ].map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      className={`relative block py-2.5 px-5 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-sky/15 text-sky font-bold pl-7 border-l-2 border-sky shadow-sm' 
                          : 'hover:bg-sky/5 pl-7'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {isActive && (
                        <motion.div className="absolute left-0 inset-y-0 w-1 bg-sky rounded-r-md"
                          layoutId="mobile-indicator-bar"
                          initial={{ height: 0 }}
                          animate={{ height: '100%' }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      )}
                      {isActive && (
                        <motion.span 
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-sky rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [1, 0.7, 1] 
                          }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 2,
                            ease: "easeInOut" 
                          }}
                        />
                      )}
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile menu button - only visible on mobile */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="md:hidden fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-md text-sky hover:text-violet p-2.5 rounded-full border border-white/20 shadow-md transition-colors"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        )}
      </motion.button>
      
      {/* LinkedIn link - mobile only */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            href="https://www.linkedin.com/in/anyamartin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 py-2 px-4 bg-white/20 backdrop-blur-md rounded-full border border-white/20 shadow-md transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span>LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
            </svg>
          </Link>
        </motion.div>
      )}
    </header>
  );
}

