'use client';

import Link from 'next/link';
import { ArrowRight, Github, Twitter, Linkedin, Users, Star, Award, Code, Database, Cloud, Shield, Layout, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import Features from '@/components/Features';
import Header from '@/components/Header';

export default function Home() {
  const stats = [
    { label: 'Active Users', value: '100K+', icon: Users },
    { label: 'Star Rating', value: '4.9/5', icon: Star },
    { label: 'Awards', value: '25+', icon: Award }
  ];

  const testimonials = [
    {
      name: 'John Doe',
      role: 'CEO, TechCorp',
      image: '/avatars/john.jpg',
      content: 'Amazing product that has transformed our workflow. The features are exactly what we needed.'
    },
    {
      name: 'Jane Smith',
      role: 'CTO, StartupX',
      image: '/avatars/jane.jpg',
      content: 'The best development experience we\'ve had. The team is incredibly responsive.'
    },
    {
      name: 'Mike Johnson',
      role: 'Lead Developer, Enterprise Co',
      image: '/avatars/mike.jpg',
      content: 'Outstanding performance and scalability. Our team productivity has increased significantly.'
    }
  ];

  const quickFeatures = [
    { icon: Code, title: 'Modern Stack', description: 'Built with Next.js 14 and React 18' },
    { icon: Database, title: 'Type Safe', description: 'Full TypeScript support out of the box' },
    { icon: Cloud, title: 'Cloud Ready', description: 'Deploy anywhere with zero configuration' },
    { icon: Shield, title: 'Secure', description: 'Enterprise-grade security built-in' },
    { icon: Layout, title: 'Responsive', description: 'Beautiful on all screen sizes' },
    { icon: Sparkles, title: 'AI Powered', description: 'Smart features powered by AI' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-center">
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
          className="w-full max-w-7xl mx-auto px-4 py-24"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative p-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/[0.07] dark:to-purple-500/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 rounded-2xl rotate-180 bg-gradient-to-br from-blue-500/5 to-purple-500/5 dark:from-blue-500/[0.07] dark:to-purple-500/[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <feature.icon className="w-8 h-8 mb-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="w-full py-24 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center justify-center mb-4"
                  >
                    <stat.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{stat.label}</p>
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
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    <div className="ml-4">
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
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
          className="w-full py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
            <p className="text-xl mb-12 text-white/80">
              Join thousands of developers building amazing applications
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow duration-200"
            >
              Start Building Now
            </motion.button>
          </div>
        </motion.section>
      </main>

      <footer className="py-16 bg-white/80 dark:bg-gray-800/30 text-gray-600 dark:text-gray-400 text-sm border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-lg font-medium">
                © {new Date().getFullYear()} Your App. 
                <span className="ml-1">All rights reserved.</span>
              </p>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-500">
                Made with ❤️ for developers
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-6">
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  <Twitter className="w-6 h-6" />
                </motion.a>
                <motion.a 
                  whileHover={{ scale: 1.1, y: -2 }}
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              </div>
              <div className="h-px md:h-8 w-full md:w-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center gap-8">
                <Link 
                  href="/privacy" 
                  className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group text-base"
                >
                  Privacy Policy
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
                <Link 
                  href="/terms" 
                  className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group text-base"
                >
                  Terms of Service
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
