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
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
      id="help-page"
    >
      <main className="mx-auto max-w-7xl p-4 md:p-8" role="main">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8 text-center text-3xl font-bold text-slate-800 md:text-4xl"
          id="help-title"
        >
          Help & Support
          <span className="mx-auto mt-2 block h-1 w-12 rounded-sm bg-blue-500" />
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
            className="mx-auto max-w-2xl"
          />

          <HelpCategories
            categories={filteredCategories}
            onCategoryClick={handleCategoryClick}
          />

          <FAQ faqs={filteredFAQs} openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} />

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
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
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
                className="relative mx-auto w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
              >
                <button
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                >
                  <FiX className="h-6 w-6" />
                </button>
                <h2
                  id="modal-title"
                  className="mb-4 text-2xl font-semibold text-slate-800"
                >
                  {selectedCategory.title}
                </h2>
                <p className="leading-relaxed text-gray-600">
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
