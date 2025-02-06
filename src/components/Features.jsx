'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Layout,
  Smile,
  Code,
  Shield,
  Sparkles,
  Rocket,
  Database,
  Cloud,
  Users,
  Star,
  Check,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);

  // Animation variants for container
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  const features = [
    {
      icon: Layout,
      title: 'Modern Design',
      description: 'Beautiful, responsive layouts that adapt seamlessly to any device',
      gradient: 'from-blue-600 to-blue-400',
      bgGradient: 'from-blue-500/5 to-blue-500/5',
      stats: {
        users: '10K+',
        rating: '4.9',
      },
      details: [
        'Responsive grid system',
        'Custom animations',
        'Dark mode support',
        'Accessibility features',
      ],
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-grade security with end-to-end encryption and compliance',
      gradient: 'from-green-600 to-green-400',
      bgGradient: 'from-green-500/5 to-green-500/5',
      stats: {
        users: '5K+',
        rating: '4.8',
      },
      details: [
        'End-to-end encryption',
        'GDPR compliance',
        'Regular security audits',
        'Two-factor authentication',
      ],
    },
    {
      icon: Code,
      title: 'Developer First',
      description: 'Built with TypeScript and modern development practices',
      gradient: 'from-purple-600 to-purple-400',
      bgGradient: 'from-purple-500/5 to-purple-500/5',
      stats: {
        users: '15K+',
        rating: '4.7',
      },
      details: ['TypeScript support', 'API documentation', 'Developer tools', 'Custom hooks'],
    },
    {
      icon: Database,
      title: 'Scalable Infrastructure',
      description: 'Cloud-native architecture that grows with your needs',
      gradient: 'from-orange-600 to-orange-400',
      bgGradient: 'from-orange-500/5 to-orange-500/5',
      stats: {
        users: '8K+',
        rating: '4.9',
      },
      details: ['Auto-scaling', 'Load balancing', 'Database sharding', 'CDN integration'],
    },
    {
      icon: Sparkles,
      title: 'AI-Powered',
      description: 'Intelligent features powered by cutting-edge AI models',
      gradient: 'from-pink-600 to-pink-400',
      bgGradient: 'from-pink-500/5 to-pink-500/5',
      stats: {
        users: '12K+',
        rating: '4.8',
      },
      details: [
        'Smart recommendations',
        'Automated workflows',
        'Natural language processing',
        'Predictive analytics',
      ],
    },
    {
      icon: Cloud,
      title: 'Cloud Integration',
      description: 'Seamless integration with major cloud providers',
      gradient: 'from-cyan-600 to-cyan-400',
      bgGradient: 'from-cyan-500/5 to-cyan-500/5',
      stats: {
        users: '7K+',
        rating: '4.7',
      },
      details: ['Multi-cloud support', 'Easy deployment', 'Cloud monitoring', 'Automatic backups'],
    },
  ];
  const comparisonTiers = [
    {
      name: 'Free',
      price: '$0',
      features: ['Basic features', 'Community support', '1GB storage', '2 team members'],
    },
    {
      name: 'Pro',
      price: '$29',
      features: ['Advanced features', 'Priority support', '10GB storage', '10 team members'],
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: ['Custom features', '24/7 support', 'Unlimited storage', 'Unlimited team members'],
    },
  ];
  return (
    <section className="relative overflow-hidden px-4 py-32" id="features" data-oid="l_kgiyq">
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10"
        data-oid="ygo1b8o"
      />
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden" data-oid="bfbjks.">
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -left-[20%] -top-[40%] h-[70%] w-[70%] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 blur-3xl dark:from-blue-900/20 dark:to-purple-900/20"
          data-oid="7dnu0ct"
        />
        <motion.div
          animate={{
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -bottom-[40%] -right-[20%] h-[70%] w-[70%] rounded-full bg-gradient-to-br from-purple-100/40 to-pink-100/40 blur-3xl dark:from-purple-900/20 dark:to-pink-900/20"
          data-oid="dm1zez6"
        />
      </div>

      <div className="relative mx-auto max-w-7xl" data-oid="83gt:hr">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          variants={containerVariants}
          className="mb-20 text-center"
          data-oid="zqhxgbi"
        >
          <motion.div variants={itemVariants} data-oid="fo34o64">
            <span
              className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-blue-600 dark:from-blue-500/20 dark:to-purple-500/20 dark:text-blue-400"
              data-oid="cde:hyv"
            >
              Powerful Features
            </span>
            <h2
              className="mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-5xl font-bold text-transparent drop-shadow-sm md:text-6xl"
              data-oid="pbt93xl"
            >
              Everything You Need
            </h2>
            <p
              className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:text-2xl"
              data-oid="tgpay0r"
            >
              Build amazing applications with our comprehensive suite of tools
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
          data-oid="a9bnjn_"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -12,
                scale: 1.02,
              }}
              onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
              className="group relative cursor-pointer rounded-2xl border border-gray-200/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-gray-700/50 dark:bg-gray-800/90"
              data-oid="ud4wyb1"
            >
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-[0.07]`}
                data-oid="vlsw1zg"
              />
              <div
                className={`absolute inset-0 rotate-180 rounded-2xl bg-gradient-to-br ${feature.bgGradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:opacity-[0.07]`}
                data-oid="u67l23x"
              />

              <motion.div
                whileHover={{
                  scale: 1.1,
                  rotate: [0, 10, -10, 0],
                }}
                className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 transition-transform duration-300 group-hover:scale-110 dark:from-gray-800 dark:to-gray-700"
                data-oid="itz44bz"
              >
                <div
                  className="absolute inset-0 animate-pulse rounded-xl bg-gray-500/10 dark:bg-gray-400/10"
                  data-oid="qkfacqm"
                />
                <feature.icon
                  className={`h-8 w-8 bg-gradient-to-r bg-clip-text text-transparent ${feature.gradient}`}
                  data-oid="ts9sio."
                />
              </motion.div>

              <h3
                className={`mb-4 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent ${feature.gradient}`}
                data-oid="ou:bd4i"
              >
                {feature.title}
              </h3>

              <p
                className="mb-6 leading-relaxed text-gray-600 dark:text-gray-300"
                data-oid="2u4qtd."
              >
                {feature.description}
              </p>

              <AnimatePresence data-oid="v59j3bg">
                {selectedFeature === index && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto',
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="mt-4 space-y-2"
                    data-oid="7v5u31y"
                  >
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{
                          opacity: 0,
                          x: -20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: i * 0.1,
                        }}
                        className="flex items-center space-x-2"
                        data-oid="zcxmefb"
                      >
                        <Check
                          className={`h-5 w-5 bg-gradient-to-r bg-clip-text text-transparent ${feature.gradient}`}
                          data-oid="mo3ut2g"
                        />
                        <span className="text-gray-600 dark:text-gray-300" data-oid="i3bwr3f">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div
                className="flex items-center justify-between border-t border-gray-200/50 pt-6 dark:border-gray-700/50"
                data-oid="5.jlcw0"
              >
                <div className="flex items-center space-x-2" data-oid=":h5hio:">
                  <Users className="h-4 w-4 text-gray-400" data-oid="zx-ek4_" />
                  <span className="text-sm text-gray-600 dark:text-gray-400" data-oid="4.i8tms">
                    {feature.stats.users}
                  </span>
                </div>
                <div className="flex items-center space-x-1" data-oid="1gycc-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" data-oid="ma2otoa" />
                  <span className="text-sm text-gray-600 dark:text-gray-400" data-oid="b_73g81">
                    {feature.stats.rating}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Section */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mt-32 text-center"
          data-oid="lp3x4o4"
        >
          <button
            onClick={() => setIsComparisonVisible(!isComparisonVisible)}
            className="inline-flex items-center space-x-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-shadow duration-300 hover:shadow-lg"
            data-oid="zuuecgk"
          >
            <span data-oid="j_eq3-g">Compare Features</span>
            <ChevronRight
              className={`h-5 w-5 transform transition-transform duration-300 ${isComparisonVisible ? 'rotate-90' : ''}`}
              data-oid="tc_3moi"
            />
          </button>

          <AnimatePresence data-oid="ka..dax">
            {isComparisonVisible && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                }}
                className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3"
                data-oid="g-73wzv"
              >
                {comparisonTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.2,
                    }}
                    className="rounded-2xl border border-gray-200/50 bg-white/90 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/90"
                    data-oid="f3.c8-r"
                  >
                    <h3 className="mb-2 text-2xl font-bold" data-oid="m:fn8g_">
                      {tier.name}
                    </h3>
                    <p
                      className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent"
                      data-oid="g.lp.q-"
                    >
                      {tier.price}
                    </p>
                    <ul className="space-y-4" data-oid="j51rh7i">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2" data-oid="hwv175_">
                          <Check className="h-5 w-5 text-green-500" data-oid="4uo1x02" />
                          <span className="text-gray-600 dark:text-gray-300" data-oid="y:o6l93">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="mt-8 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white transition-shadow duration-300 hover:shadow-lg"
                      data-oid="2ljcnqu"
                    >
                      Get Started
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
export default Features;
