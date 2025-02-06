'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiAlertCircle, FiCheck, FiSave, FiSend, FiChevronDown } from 'react-icons/fi';

const researchAreas = [
  'Artificial Intelligence',
  'Data Science',
  'Software Engineering',
  'Cybersecurity',
  'Network Systems',
  'Human-Computer Interaction',
  'Other',
];

const formAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: 'easeOut',
      staggerChildren: 0.1
    }
  }
};

const fieldAnimation = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: 'spring',
      stiffness: 120
    }
  }
};

export default function NewProposal() {
  const [formData, setFormData] = useState({
    title: '',
    researchArea: '',
    problemStatement: '',
    objectives: '',
    methodology: '',
  });
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [progress, setProgress] = useState(0);

  const validateField = (name, value) => {
    const validations = {
      title: value.length < 10 && 'Title must be at least 10 characters long',
      problemStatement: value.length < 50 && 'Problem statement must be at least 50 characters long',
      objectives: value.length < 50 && 'Objectives must be at least 50 characters long',
      methodology: value.length < 50 && 'Methodology must be at least 50 characters long',
    };
    return validations[name] || '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    setProgress((Object.values(newFormData).filter(v => v.trim().length > 0).length / 5) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitted:', formData);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saved as draft:', formData);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={formAnimation}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 backdrop-blur-sm bg-opacity-90"
      >
        <header className="pt-8 px-6">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center"
            variants={fieldAnimation}
          >
            Research Proposal
          </motion.h1>
          <motion.p 
            className="mt-2 text-gray-600 dark:text-gray-300 text-center text-lg"
            variants={fieldAnimation}
          >
            Craft your research vision with precision
          </motion.p>
        </header>

        <div className="px-6 pt-6">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-right text-sm mt-1 text-gray-500 dark:text-gray-400">
            {Math.round(progress)}% Complete
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <motion.div variants={fieldAnimation}>
            <div className="space-y-2">
              <label className="block text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Research Title
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Revolutionizing AI through quantum computing"
                  required
                  className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-all ${
                    errors.title 
                      ? 'border-red-500 focus:ring-red-500/30 bg-red-50 dark:bg-red-900/20' 
                      : formData.title 
                      ? 'border-green-500 focus:ring-green-500/30 bg-green-50 dark:bg-green-900/20'
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500/30 dark:bg-gray-700/50'
                  }`}
                />
                {errors.title ? (
                  <span className="flex items-center mt-2 text-sm text-red-500">
                    <FiAlertCircle className="mr-2" /> {errors.title}
                  </span>
                ) : formData.title && (
                  <span className="flex items-center mt-2 text-sm text-green-500">
                    <FiCheck className="mr-2" /> Valid title
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fieldAnimation}>
            <div className="space-y-2">
              <label className="block text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Research Domain
              </label>
              <div className="relative">
                <select
                  id="researchArea"
                  name="researchArea"
                  value={formData.researchArea}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 appearance-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all pr-10"
                >
                  <option value="">Select your research domain</option>
                  {researchAreas.map(area => (
                    <option key={area} value={area} className="dark:bg-gray-800">{area}</option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-4 text-gray-400 dark:text-gray-300 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {['problemStatement', 'objectives', 'methodology'].map((field) => (
            <motion.div key={field} variants={fieldAnimation}>
              <div className="space-y-2">
                <label className="block text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <textarea
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Describe your ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}...`}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all min-h-[120px] resize-y"
                />
                {errors[field] && (
                  <span className="flex items-center mt-2 text-sm text-red-500">
                    <FiAlertCircle className="mr-2" /> {errors[field]}
                  </span>
                )}
              </div>
            </motion.div>
          ))}

          <motion.div 
            className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={fieldAnimation}
          >
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:transform-none"
            >
              <FiSend className="inline mr-2" /> {isSaving ? 'Submitting...' : 'Submit Proposal'}
            </button>
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={isSaving}
              className="px-6 py-3.5 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all disabled:opacity-50 disabled:transform-none"
            >
              <FiSave className="inline mr-2" /> Save Draft
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
