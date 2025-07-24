'use client';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <LazyMotion features={domAnimation}>
      {/* ---------- Hero ---------- */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold max-w-3xl leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Turning data&nbsp;into stories&nbsp;—&nbsp;and saving room for&nbsp;dogs&nbsp;&amp;&nbsp;plane&nbsp;tickets.
        </motion.h1>

        <motion.div
          className="mt-10 flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            href="#projects"
            className="bg-sky text-cream px-6 py-3 rounded-full hover:bg-terra transition"
          >
            View My Work
          </Link>
        </motion.div>

        {/* Paw‑print animation */}
        <motion.img
          src="/paws.svg"
          alt=""
          className="absolute top-1/3 left-0 w-32 pointer-events-none opacity-70"
          animate={{ x: ['-20%', '110%'], opacity: [0, 0.7, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </section>

      {/* ---------- Quick facts ---------- */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-4 py-12">
        {['Skills', 'Tools', 'Interests'].map((title, i) => (
          <motion.div
            key={title}
            className="border-t-4 border-sky bg-white/40 backdrop-blur rounded-md p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <h3 className="font-semibold text-terra mb-2">{title}</h3>
            <p className="text-sm leading-relaxed">
              {title === 'Skills' && 'SQL · Python · Tableau · Power BI'}
              {title === 'Tools' && 'dbt · Git · Figma'}
              {title === 'Interests' && 'Dogs 🐕 · Travel ✈️ · Photography'}
            </p>
          </motion.div>
        ))}
      </section>

      {/* ---------- About ---------- */}
      <section
        id="about"
        className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center px-4 py-20"
      >
        <img
          src="/you-and-dog.jpg"
          alt="You and a dog"
          className="rounded-full w-56 h-56 object-cover border-4 border-sage mx-auto md:mx-0"
        />
        <div>
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="leading-relaxed mb-6">
            I’m <strong>Your Name</strong>, a business‑analytics undergrad who
            believes insights are best chased with a pup at your side and a
            passport in your pocket. Here you’ll find a few data journeys
            inspired by places I’ve explored (or plan to!).
          </p>
          <a
            href="/yourname-cv.pdf"
            className="inline-block border-2 border-terra text-terra px-5 py-2 rounded-full hover:bg-terra hover:text-cream transition"
          >
            Download CV
          </a>
        </div>
      </section>

      {/* ---------- Projects ---------- */}
      <section
        id="projects"
        className="bg-sage/10 py-20 px-4"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Projects</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {['mexico-revenue', 'srilanka-tourism', 'london-bikes', 'dogfood-trends'].map((slug) => (
              <motion.article
                key={slug}
                className="relative bg-cream rounded-lg shadow hover:-translate-y-1 hover:shadow-lg transition p-6"
                whileHover={{ rotate: -1 }}
              >
                <img
                  src={`/thumbs/${slug}.jpg`}
                  alt={slug}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold capitalize">{slug.replace(/-/g, ' ')}</h3>
                <p className="text-sm mt-2">Short teaser about the analysis…</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" className="py-24 px-4">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let’s Talk</h2>
          <form
            action="https://formspree.io/f/yourID"
            method="POST"
            className="flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="border rounded-md p-3"
            />
            <input
              type="email"
              name="_replyto"
              placeholder="Email"
              required
              className="border rounded-md p-3"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              className="border rounded-md p-3 resize-none"
              required
            />
            <button
              type="submit"
              className="bg-terra text-cream py-3 rounded-full hover:bg-sky transition"
            >
              Send Message
            </button>
          </form>

          <div className="mt-6 flex justify-center gap-6 text-2xl">
            <a href="https://github.com/yourhandle" aria-label="GitHub">
              🐙
            </a>
            <a href="https://linkedin.com/in/yourhandle" aria-label="LinkedIn">
              💼
            </a>
            <a href="https://instagram.com/yourtravelfeed" aria-label="Instagram">
              📷
            </a>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
