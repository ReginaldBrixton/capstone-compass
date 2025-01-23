'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { AccordionContext } from '@/components/Accordion/Accordion';

export default function FAQ({ faqs }) {
  const [openItem, setOpenItem] = React.useState(null);

  if (!faqs.length) {
    return (
      <div 
        className="text-center py-8 text-gray-500"
        role="status"
        aria-live="polite"
      >
        No FAQs found matching your search.
      </div>
    );
  }

  return (
    <section className="py-8" id="faq-section" aria-labelledby="faq-title">
      <h2 
        id="faq-title"
        className="text-2xl font-semibold text-slate-800 mb-6"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-4" role="tablist">
        {faqs.map((faq, index) => {
          const isOpen = openItem === faq.id;
          
          return (
            <motion.div
              key={faq.id}
              initial={false}
              animate={{ backgroundColor: isOpen ? 'rgb(249, 250, 251)' : 'rgb(255, 255, 255)' }}
              className="border border-gray-200 rounded-lg overflow-hidden"
              role="tab"
            >
              <button
                onClick={() => setOpenItem(isOpen ? null : faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between
                         hover:bg-gray-50 transition-colors duration-200"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="font-medium text-slate-800 pr-8">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-gray-400"
                >
                  <FiChevronDown className="w-5 h-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    id={`faq-answer-${faq.id}`}
                    role="tabpanel"
                    aria-labelledby={`faq-question-${faq.id}`}
                  >
                    <div className="px-6 pb-4 pt-2 text-gray-600 prose prose-sm max-w-none">
                      {typeof faq.answer === 'string' ? (
                        <p>{faq.answer}</p>
                      ) : (
                        faq.answer
                      )}
                      
                      {faq.links && faq.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3">
                          {faq.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              className="inline-flex items-center text-sm text-blue-600 
                                       hover:text-blue-800 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.text} →
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
