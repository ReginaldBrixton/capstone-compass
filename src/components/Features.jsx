'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Layout, Smile, Code, Shield, Sparkles, Rocket, Database, Cloud, Users, Star, Check, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isComparisonVisible, setIsComparisonVisible] = useState(false);

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  // Animation variants for items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
      title: "Modern Design",
      description: "Beautiful, responsive layouts that adapt seamlessly to any device",
      gradient: "from-blue-600 to-blue-400",
      bgGradient: "from-blue-500/5 to-blue-500/5",
      stats: { users: "10K+", rating: "4.9" },
      details: [
        "Responsive grid system",
        "Custom animations",
        "Dark mode support",
        "Accessibility features"
      ]
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance",
      gradient: "from-green-600 to-green-400",
      bgGradient: "from-green-500/5 to-green-500/5",
      stats: { users: "5K+", rating: "4.8" },
      details: [
        "End-to-end encryption",
        "GDPR compliance",
        "Regular security audits",
        "Two-factor authentication"
      ]
    },
    {
      icon: Code,
      title: "Developer First",
      description: "Built with TypeScript and modern development practices",
      gradient: "from-purple-600 to-purple-400",
      bgGradient: "from-purple-500/5 to-purple-500/5",
      stats: { users: "15K+", rating: "4.7" },
      details: [
        "TypeScript support",
        "API documentation",
        "Developer tools",
        "Custom hooks"
      ]
    },
    {
      icon: Database,
      title: "Scalable Infrastructure",
      description: "Cloud-native architecture that grows with your needs",
      gradient: "from-orange-600 to-orange-400",
      bgGradient: "from-orange-500/5 to-orange-500/5",
      stats: { users: "8K+", rating: "4.9" },
      details: [
        "Auto-scaling",
        "Load balancing",
        "Database sharding",
        "CDN integration"
      ]
    },
    {
      icon: Sparkles,
      title: "AI-Powered",
      description: "Intelligent features powered by cutting-edge AI models",
      gradient: "from-pink-600 to-pink-400",
      bgGradient: "from-pink-500/5 to-pink-500/5",
      stats: { users: "12K+", rating: "4.8" },
      details: [
        "Smart recommendations",
        "Automated workflows",
        "Natural language processing",
        "Predictive analytics"
      ]
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless integration with major cloud providers",
      gradient: "from-cyan-600 to-cyan-400",
      bgGradient: "from-cyan-500/5 to-cyan-500/5",
      stats: { users: "7K+", rating: "4.7" },
      details: [
        "Multi-cloud support",
        "Easy deployment",
        "Cloud monitoring",
        "Automatic backups"
      ]
    }
  ];

  const comparisonTiers = [
    {
      name: "Free",
      price: "$0",
      features: ["Basic features", "Community support", "1GB storage", "2 team members"]
    },
    {
      name: "Pro",
      price: "$29",
      features: ["Advanced features", "Priority support", "10GB storage", "10 team members"]
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Custom features", "24/7 support", "Unlimited storage", "Unlimited team members"]
    }
  ];

  return (
    <section className="py-32 px-4 relative overflow-hidden" id="features">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent dark:via-blue-950/10" />
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[40%] -left-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-blue-100/40 to-purple-100/40 dark:from-blue-900/20 dark:to-purple-900/20 blur-3xl"
        />
        <motion.div 
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[40%] -right-[20%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-purple-100/40 to-pink-100/40 dark:from-purple-900/20 dark:to-pink-900/20 blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              Powerful Features
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 drop-shadow-sm">
              Everything You Need
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Build amazing applications with our comprehensive suite of tools
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12, scale: 1.02 }}
              onClick={() => setSelectedFeature(selectedFeature === index ? null : index)}
              className="group relative p-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-xl hover:shadow-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 cursor-pointer"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.bgGradient} dark:opacity-[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className={`absolute inset-0 rounded-2xl rotate-180 bg-gradient-to-br ${feature.bgGradient} dark:opacity-[0.07] opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <motion.div 
                whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 relative"
              >
                <div className="absolute inset-0 rounded-xl bg-gray-500/10 dark:bg-gray-400/10 animate-pulse" />
                <feature.icon className={`w-8 h-8 bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`} />
              </motion.div>

              <h3 className={`text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`}>
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {feature.description}
              </p>

              <AnimatePresence>
                {selectedFeature === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {feature.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center space-x-2"
                      >
                        <Check className={`w-5 h-5 bg-clip-text text-transparent bg-gradient-to-r ${feature.gradient}`} />
                        <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex items-center justify-between pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature.stats.users}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{feature.stats.rating}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Comparison Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <button
            onClick={() => setIsComparisonVisible(!isComparisonVisible)}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg transition-shadow duration-300"
          >
            <span>Compare Features</span>
            <ChevronRight className={`w-5 h-5 transform transition-transform duration-300 ${isComparisonVisible ? 'rotate-90' : ''}`} />
          </button>

          <AnimatePresence>
            {isComparisonVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {comparisonTiers.map((tier, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="p-8 rounded-2xl bg-white/90 dark:bg-gray-800/90 shadow-xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                    <p className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                      {tier.price}
                    </p>
                    <ul className="space-y-4">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <Check className="w-5 h-5 text-green-500" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="mt-8 w-full py-3 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-shadow duration-300">
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