'use client';

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
} from 'lucide-react';
import { motion } from 'framer-motion';

import Features from '@/components/Features';
import Header from '@/components/Header';

export default function Home() {
  const stats = [
    { label: 'Active Users', value: '100K+', icon: Users },
    { label: 'Star Rating', value: '4.9/5', icon: Star },
    { label: 'Awards', value: '25+', icon: Award },
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
      content:
        "The best development experience we've had. The team is incredibly responsive.",
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
      title: 'Modern Stack',
      description: 'Built with Next.js 14 and React 18',
    },
    {
      icon: Database,
      title: 'Type Safe',
      description: 'Full TypeScript support out of the box',
    },
    {
      icon: Cloud,
      title: 'Cloud Ready',
      description: 'Deploy anywhere with zero configuration',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Enterprise-grade security built-in',
    },
    {
      icon: Layout,
      title: 'Responsive',
      description: 'Beautiful on all screen sizes',
    },
    {
      icon: Sparkles,
      title: 'AI Powered',
      description: 'Smart features powered by AI',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Features />
        </motion.div>

        {/* Quick Features Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto w-full max-w-7xl px-4 py-24"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl border border-gray-200/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/90"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/[0.07] dark:to-purple-500/[0.07]" />
                <div className="absolute inset-0 rotate-180 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/[0.07] dark:to-purple-500/[0.07]" />
                <feature.icon className="mb-4 h-8 w-8 text-blue-600 dark:text-blue-400" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-r from-blue-50 to-purple-50 py-24 dark:from-blue-900/20 dark:to-purple-900/20"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
              {stats.map((stat, index) => (
                <div key={index} className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-4 inline-flex items-center justify-center"
                  >
                    <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full py-24"
        >
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800"
                >
                  <div className="mb-4 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    "{testimonial.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-24 text-white"
        >
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-8 text-4xl font-bold">Ready to Get Started?</h2>
            <p className="mb-12 text-xl text-white/80">
              Join thousands of developers building amazing applications
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-shadow duration-200 hover:shadow-xl"
            >
              Start Building Now
            </motion.button>
          </div>
        </motion.section>
      </main>

      <footer className="border-t border-gray-200/50 bg-white/80 py-16 text-sm text-gray-600 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-400">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-lg font-medium">
                © {new Date().getFullYear()} Your App.
                <span className="ml-1">All rights reserved.</span>
              </p>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-500">
                Made with ❤️ for developers
              </p>
            </div>

            <div className="flex flex-col items-center gap-8 md:flex-row">
              <div className="flex items-center gap-6">
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <Github className="h-6 w-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <Twitter className="h-6 w-6" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
              </div>
              <div className="h-px w-full bg-gray-200 dark:bg-gray-700 md:h-8 md:w-px" />
              <div className="flex items-center gap-8">
                <Link
                  href="/privacy"
                  className="group flex items-center gap-1 text-base transition-colors duration-200 hover:text-blue-600"
                >
                  Privacy Policy
                  <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
                <Link
                  href="/terms"
                  className="group flex items-center gap-1 text-base transition-colors duration-200 hover:text-blue-600"
                >
                  Terms of Service
                  <ArrowRight className="h-4 w-4 -translate-x-2 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
