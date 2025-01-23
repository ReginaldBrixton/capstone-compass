'use client';

import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

import { ContactForm, FAQ, HelpCategories, SearchBar } from './components';
import { faqs, helpCategories } from './data/helpData';

export default function HelpPage() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState(helpCategories);
  const [filteredFAQs, setFilteredFAQs] = useState(faqs);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    const normalizedTerm = term.toLowerCase().trim();

    if (!normalizedTerm) {
      setFilteredCategories(helpCategories);
      setFilteredFAQs(faqs);
      return;
    }

    // Filter categories
    const matchedCategories = helpCategories.filter(
      (category) =>
        category.title.toLowerCase().includes(normalizedTerm) ||
        category.description.toLowerCase().includes(normalizedTerm)
    );
    setFilteredCategories(matchedCategories);

    // Filter FAQs
    const matchedFAQs = faqs.filter(
      (faq) => 
        faq.question.toLowerCase().includes(normalizedTerm) || 
        faq.answer.toLowerCase().includes(normalizedTerm)
    );
    setFilteredFAQs(matchedFAQs);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      // Reset form here
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle escape key for modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" id="help-page">
      <main className="p-4 md:p-8 max-w-7xl mx-auto" role="main">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-slate-800 mb-8 text-3xl md:text-4xl font-bold text-center relative"
          id="help-title"
        >
          Help & Support
          <span className="block w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-sm" />
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <SearchBar 
            onSearch={handleSearch} 
            value={searchTerm}
            className="max-w-2xl mx-auto"
          />

          <HelpCategories 
            categories={filteredCategories} 
            onCategoryClick={handleCategoryClick}
          />

          <FAQ 
            faqs={filteredFAQs} 
            openFAQ={openFAQ} 
            setOpenFAQ={setOpenFAQ} 
          />

          <ContactForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitStatus={submitStatus}
          />
        </motion.div>

        {/* Category Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              id="category-modal"
              role="dialog"
              aria-labelledby="modal-title"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsModalOpen(false);
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg p-6 max-w-lg w-full mx-auto relative shadow-xl"
              >
                <button 
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  <FiX className="w-6 h-6" />
                </button>
                <h2 
                  id="modal-title"
                  className="text-2xl font-semibold text-slate-800 mb-4"
                >
                  {selectedCategory.title}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {selectedCategory.description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
