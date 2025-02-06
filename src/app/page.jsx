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
    <div
      className="flex min-h-screen flex-col bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
      data-oid="i8e6nf6"
    >
      <Header data-oid="c-fziz0" />

      <main className="flex flex-1 flex-col items-center justify-center" data-oid="p:m_6h-">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          data-oid="_wklsmd"
        >
          <Features data-oid="jjjeh-7" />
        </motion.div>

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
          className="mx-auto w-full max-w-7xl px-4 py-24"
          data-oid="1nzdff2"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3" data-oid=".0wrf8b">
            {quickFeatures.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                }}
                className="group relative rounded-2xl border border-gray-200/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/90"
                data-oid="j84c19i"
              >
                <div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/[0.07] dark:to-purple-500/[0.07]"
                  data-oid="-el62ab"
                />
                <div
                  className="absolute inset-0 rotate-180 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/[0.07] dark:to-purple-500/[0.07]"
                  data-oid="_0pzagk"
                />
                <feature.icon
                  className="mb-4 h-8 w-8 text-blue-600 dark:text-blue-400"
                  data-oid="yoj.usj"
                />
                <h3 className="mb-2 text-xl font-semibold" data-oid="p1plcgq">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300" data-oid="hoa3k6.">
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
          className="w-full bg-gradient-to-r from-blue-50 to-purple-50 py-24 dark:from-blue-900/20 dark:to-purple-900/20"
          data-oid="26gl_eo"
        >
          <div className="mx-auto max-w-7xl px-4" data-oid="05sywj2">
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
                      className="h-8 w-8 text-blue-600 dark:text-blue-400"
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-bold text-transparent"
                    data-oid="eeeo17u"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="mt-2 text-gray-600 dark:text-gray-300" data-oid="f9lpwr8">
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
          <div className="mx-auto max-w-7xl px-4" data-oid="72jxbvr">
            <h2
              className="mb-16 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-4xl font-bold text-transparent"
              data-oid="b089et7"
            >
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3" data-oid="ld31w3d">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                  }}
                  className="rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-800"
                  data-oid="5-c0vn0"
                >
                  <div className="mb-4 flex items-center" data-oid="08skk8u">
                    <div
                      className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                      data-oid="qiiv7mm"
                    />
                    <div className="ml-4" data-oid="n_mg4gw">
                      <h3 className="font-semibold" data-oid=":9ao92p">
                        {testimonial.name}
                      </h3>
                      <p className="text-sm text-gray-500" data-oid=":qz8uy:">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300" data-oid="uh2qtv8">
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
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-24 text-white"
          data-oid=":a303kh"
        >
          <div className="mx-auto max-w-4xl px-4 text-center" data-oid="8xxbek5">
            <h2 className="mb-8 text-4xl font-bold" data-oid="10flz3-">
              Ready to Get Started?
            </h2>
            <p className="mb-12 text-xl text-white/80" data-oid="ccg1uu2">
              Join thousands of developers building amazing applications
            </p>
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-600 shadow-lg transition-shadow duration-200 hover:shadow-xl"
              data-oid="9191mrn"
            >
              Start Building Now
            </motion.button>
          </div>
        </motion.section>
      </main>

      <footer
        className="border-t border-gray-200/50 bg-white/80 py-16 text-sm text-gray-600 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/30 dark:text-gray-400"
        data-oid="1uqf051"
      >
        <div className="mx-auto max-w-7xl px-4" data-oid="71xbm0c">
          <div
            className="flex flex-col items-center justify-between gap-12 md:flex-row"
            data-oid="ift6zs0"
          >
            <div className="flex flex-col items-center md:items-start" data-oid=".sv6gn2">
              <p className="text-lg font-medium" data-oid="_x5mooh">
                © {new Date().getFullYear()} Your App.
                <span className="ml-1" data-oid="viuo:uj">
                  All rights reserved.
                </span>
              </p>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-500" data-oid="5bc:7ub">
                Made with ❤️ for developers
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
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
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
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
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
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-900 dark:hover:text-gray-100"
                  data-oid="g9yhtcp"
                >
                  <Linkedin className="h-6 w-6" data-oid="7w:i1wq" />
                </motion.a>
              </div>
              <div
                className="h-px w-full bg-gray-200 dark:bg-gray-700 md:h-8 md:w-px"
                data-oid="o57ltwb"
              />
              <div className="flex items-center gap-8" data-oid=":lobc6f">
                <Link
                  href="/privacy"
                  className="group flex items-center gap-1 text-base transition-colors duration-200 hover:text-blue-600"
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
                  className="group flex items-center gap-1 text-base transition-colors duration-200 hover:text-blue-600"
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
