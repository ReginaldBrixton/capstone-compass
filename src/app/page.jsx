'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
  Users,
  Star,
  Award,
  Code,
  Database,
  Cloud,
  Shield,
  Layout,
  Sparkles,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Features from '@/components/Features';
import Header from '@/components/Header';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Check user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Handle scroll events
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const stats = [
    {
      label: 'Active Users',
      value: '100K+',
      icon: Users,
    },
    {
      label: 'Star Rating',
      value: '4.9/5',
      icon: Star,
    },
    {
      label: 'Awards',
      value: '25+',
      icon: Award,
    },
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, TechCorp',
      image: '/avatars/john.jpg',
      content:
        'Amazing product that has transformed our workflow. The features are exactly what we needed.',
    },
    {
      name: 'Jane Smith',
      role: 'CTO, StartupX',
      image: '/avatars/jane.jpg',
      content: "The best development experience we've had. The team is incredibly responsive.",
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer, Enterprise Co',
      image: '/avatars/mike.jpg',
      content:
        'Outstanding performance and scalability. Our team productivity has increased significantly.',
    },
  ];

  const quickFeatures = [
    {
      icon: Code,
      title: 'Classic Architecture',
      description: 'Built with time-tested development patterns',
    },
    {
      icon: Database,
      title: 'Reliable Storage',
      description: 'Traditional database systems you can trust',
    },
    {
      icon: Cloud,
      title: 'Proven Deployment',
      description: 'Deploy with confidence on established platforms',
    },
    {
      icon: Shield,
      title: 'Time-Tested Security',
      description: 'Conventional security practices that work',
    },
    {
      icon: Layout,
      title: 'Timeless Design',
      description: 'Elegant interfaces that never go out of style',
    },
    {
      icon: Sparkles,
      title: 'Refined Features',
      description: 'Carefully crafted functionality for real needs',
    },
  ];

  return (
    <div
      className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900"
      data-oid="i8e6nf6"
    >
      {/* Responsive Header with Dark Mode Toggle */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 shadow-md dark:bg-gray-900/95'
            : 'bg-white dark:bg-gray-900'
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-serif font-bold text-gray-800 dark:text-gray-200">
              DashBoard
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href="/features"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Blog
            </Link>
            <button
              onClick={toggleDarkMode}
              className="ml-4 rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link
              href="/dashboard"
              className="rounded-md bg-gray-800 px-4 py-2 text-white transition-all hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleDarkMode}
              className="mr-4 rounded-full p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900 md:hidden"
            >
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/features"
                  className="py-2 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="py-2 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/docs"
                  className="py-2 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Documentation
                </Link>
                <Link
                  href="/blog"
                  className="py-2 text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link
                  href="/dashboard"
                  className="rounded-md bg-gray-800 px-4 py-2 text-center text-white transition-all hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center" data-oid="p:m_6h-">
        {/* Hero Section */}
        <section className="w-full py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col space-y-6 md:w-1/2"
              >
                <h1 className="font-serif text-4xl font-bold leading-tight text-gray-900 dark:text-white md:text-5xl">
                  Timeless Dashboard for{" "}
                  <span className="text-gray-800 dark:text-gray-200 underline decoration-gray-500">
                    Classic Applications
                  </span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  A comprehensive, responsive dashboard with a vintage aesthetic that brings elegance and reliability to your applications.
                </p>
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                  <Link
                    href="/dashboard"
                    className="rounded-md bg-gray-800 px-6 py-3 text-center font-medium text-white shadow-md transition-all hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Get Started
                  </Link>
                  <Link
                    href="/docs"
                    className="rounded-md border border-gray-300 bg-white px-6 py-3 text-center font-medium text-gray-800 transition-all hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    View Documentation
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative md:w-1/2"
              >
                <div className="relative h-[400px] w-full overflow-hidden rounded-md border border-gray-300 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="h-full w-full rounded-sm bg-white dark:bg-gray-800">
                    <div className="flex h-10 items-center space-x-2 rounded-t-sm bg-gray-200 px-4 dark:bg-gray-700">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="p-4">
                      <Features data-oid="jjjeh-7" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Features Grid */}
        <motion.section
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto w-full max-w-6xl px-4 py-24"
          data-oid="1nzdff2"
        >
          <h2 className="mb-16 text-center text-3xl font-serif font-bold text-gray-800 dark:text-gray-200 md:text-4xl">
            Time-Tested Features for Reliable Applications
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3" data-oid=".0wrf8b">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -5,
                }}
                className="group relative rounded-md border border-gray-300 bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                data-oid="j84c19i"
              >
                <feature.icon
                  className="mb-4 h-8 w-8 text-gray-700 dark:text-gray-300"
                  data-oid="yoj.usj"
                />
                <h3 className="mb-2 font-serif text-xl font-semibold text-gray-800 dark:text-gray-200" data-oid="p1plcgq">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400" data-oid="hoa3k6.">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="w-full bg-gray-200 py-24 dark:bg-gray-800"
          data-oid="26gl_eo"
        >
          <div className="mx-auto max-w-6xl px-4" data-oid="05sywj2">
            <h2 className="mb-16 text-center font-serif text-3xl font-bold text-gray-800 dark:text-gray-200 md:text-4xl">
              Trusted by Thousands
            </h2>
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3" data-oid="z_7qryr">
              {stats.map((stat, index) => (
                <div key={index} className="p-8" data-oid="5tgpdk5">
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    className="mb-4 inline-flex items-center justify-center"
                    data-oid="594enpo"
                  >
                    <stat.icon
                      className="h-8 w-8 text-gray-700 dark:text-gray-300"
                      data-oid="b2pe.._"
                    />
                  </motion.div>
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    whileInView={{
                      scale: 1,
                    }}
                    viewport={{
                      once: true,
                    }}
                    className="font-serif text-5xl font-bold text-gray-800 dark:text-gray-200"
                    data-oid="eeeo17u"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="mt-2 text-gray-600 dark:text-gray-400" data-oid="f9lpwr8">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="w-full py-24"
          data-oid="urn2npg"
        >
          <div className="mx-auto max-w-6xl px-4" data-oid="72jxbvr">
            <h2
              className="mb-16 text-center font-serif text-3xl font-bold text-gray-800 dark:text-gray-200 md:text-4xl"
              data-oid="b089et7"
            >
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3" data-oid="ld31w3d">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -5,
                  }}
                  className="rounded-md border border-gray-300 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800"
                  data-oid="5-c0vn0"
                >
                  <div className="mb-4 flex items-center" data-oid="08skk8u">
                    <div
                      className="h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600"
                      data-oid="qiiv7mm"
                    />
                    <div className="ml-4" data-oid="n_mg4gw">
                      <h3 className="font-serif font-semibold text-gray-800 dark:text-gray-200" data-oid=":9ao92p">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400" data-oid=":qz8uy:">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400" data-oid="uh2qtv8">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
          className="w-full bg-gray-800 py-24 text-white dark:bg-gray-700"
          data-oid=":a303kh"
        >
          <div className="mx-auto max-w-4xl px-4 text-center" data-oid="8xxbek5">
            <h2 className="mb-8 font-serif text-4xl font-bold" data-oid="10flz3-">
              Ready to Get Started?
            </h2>
            <p className="mb-12 text-xl text-white/80" data-oid="ccg1uu2">
              Join thousands of developers building timeless applications
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="rounded-md bg-white px-8 py-4 font-medium text-gray-800 shadow-md transition-shadow duration-200 hover:shadow-lg"
              data-oid="9191mrn"
            >
              Start Building Now
            </motion.button>
          </div>
        </motion.section>
      </main>

      <footer
        className="border-t border-gray-300 bg-white py-16 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-400"
        data-oid="1uqf051"
      >
        <div className="mx-auto max-w-6xl px-4" data-oid="71xbm0c">
          <div
            className="flex flex-col items-center justify-between gap-12 md:flex-row"
            data-oid="ift6zs0"
          >
            <div className="flex flex-col items-center md:items-start" data-oid=".sv6gn2">
              <p className="font-serif text-lg font-medium" data-oid="_x5mooh">
                © {new Date().getFullYear()} Your App.
                <span className="ml-1" data-oid="viuo:uj">
                  All rights reserved.
                </span>
              </p>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-500" data-oid="5bc:7ub">
                Crafted with care for professionals
              </p>
            </div>

            <div className="flex flex-col items-center gap-8 md:flex-row" data-oid="9g:1ugq">
              <div className="flex items-center gap-6" data-oid="kbrk4-m">
                <motion.a
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                  }}
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300"
                  data-oid="1w-xzle"
                >
                  <Github className="h-6 w-6" data-oid="qah401y" />
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                  }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300"
                  data-oid="yngxucr"
                >
                  <Twitter className="h-6 w-6" data-oid="j1qquh_" />
                </motion.a>
                <motion.a
                  whileHover={{
                    scale: 1.1,
                    y: -2,
                  }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300"
                  data-oid="g9yhtcp"
                >
                  <Linkedin className="h-6 w-6" data-oid="7w:i1wq" />
                </motion.a>
              </div>
              <div
                className="h-px w-full bg-gray-300 dark:bg-gray-700 md:h-8 md:w-px"
                data-oid="o57ltwb"
              />
              <div className="flex items-center gap-8" data-oid=":lobc6f">
                <Link
                  href="/privacy"
                  className="group flex items-center gap-1 text-base transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300"
                  data-oid="nmip:x5"
                >
                  Privacy Policy
                  <ArrowRight
                    className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    data-oid="ji_1r5g"
                  />
                </Link>
                <Link
                  href="/terms"
                  className="group flex items-center gap-1 text-base transition-colors duration-200 hover:text-gray-800 dark:hover:text-gray-300"
                  data-oid="w2_xr3q"
                >
                  Terms of Service
                  <ArrowRight
                    className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                    data-oid="brztnp1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
