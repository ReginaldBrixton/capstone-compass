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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-800"
      id="help-page"
      data-oid="8v9b6dl"
    >
      <main className="mx-auto p-4 md:p-8" role="main" data-oid="6-:hyr2">
        <motion.h1
          initial={{
            opacity: 0,
            y: -20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative mb-8 text-center text-3xl font-bold text-slate-800 dark:text-white md:text-4xl"
          id="help-title"
          data-oid="y:07yp8"
        >
          Help & Support
          <span className="mx-auto mt-2 block h-1 w-12 rounded-sm bg-blue-500 dark:bg-blue-400" data-oid="0z7xk0r" />
        </motion.h1>

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.2,
          }}
          className="space-y-8"
          data-oid="4310hw0"
        >
          <div className="col-span-full md:col-span-2 lg:col-span-3">
            <SearchBar
              onSearch={handleSearch}
              value={searchTerm}
              className="mx-auto max-w-2xl"
              data-oid="91y815o"
            />
          </div>

          <div className="col-span-full md:col-span-1 lg:col-span-1">
            <HelpCategories
              categories={filteredCategories}
              onCategoryClick={handleCategoryClick}
              data-oid=":ddolwc"
            />
          </div>

          <div className="col-span-full md:col-span-1 lg:col-span-1">
            <FAQ faqs={filteredFAQs} openFAQ={openFAQ} setOpenFAQ={setOpenFAQ} data-oid="x_zqxa7" />
          </div>

          <div className="col-span-full md:col-span-2 lg:col-span-1">
            <ContactForm
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitStatus={submitStatus}
              data-oid="c-6ws31"
            />
          </div>
        </motion.div>

        {/* Category Detail Modal */}
        <AnimatePresence data-oid="wlmu4hv">
          {isModalOpen && selectedCategory && (
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 p-4"
              id="category-modal"
              role="dialog"
              aria-labelledby="modal-title"
              onClick={(e) => {
                if (e.target === e.currentTarget) setIsModalOpen(false);
              }}
              data-oid="46de2_3"
            >
              <motion.div
                initial={{
                  scale: 0.9,
                  opacity: 0,
                }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{
                  scale: 0.9,
                  opacity: 0,
                }}
                className="relative mx-auto w-full max-w-lg rounded-lg bg-white dark:bg-gray-900 p-6 shadow-xl"
                data-oid="gcczgb0"
              >
                <button
                  className="absolute right-4 top-4 rounded-full p-2 text-gray-500 dark:text-gray-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close modal"
                  data-oid="ftgygi1"
                >
                  <FiX className="h-6 w-6" data-oid="88v:pa." />
                </button>
                <h2
                  id="modal-title"
                  className="mb-4 text-2xl font-semibold text-slate-800 dark:text-white"
                  data-oid="6oil-8_"
                >
                  {selectedCategory.title}
                </h2>
                <p className="leading-relaxed text-gray-600 dark:text-gray-400" data-oid="6:-zci-">
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
