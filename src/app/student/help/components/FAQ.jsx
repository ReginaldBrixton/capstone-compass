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
        className="py-8 text-center text-gray-500"
        role="status"
        aria-live="polite"
      >
        No FAQs found matching your search.
      </div>
    );
  }

  return (
    <section className="py-8" id="faq-section" aria-labelledby="faq-title">
      <h2 id="faq-title" className="mb-6 text-2xl font-semibold text-slate-800">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4" role="tablist">
        {faqs.map((faq, index) => {
          const isOpen = openItem === faq.id;

          return (
            <motion.div
              key={faq.id}
              initial={false}
              animate={{
                backgroundColor: isOpen
                  ? 'rgb(249, 250, 251)'
                  : 'rgb(255, 255, 255)',
              }}
              className="overflow-hidden rounded-lg border border-gray-200"
              role="tab"
            >
              <button
                onClick={() => setOpenItem(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="pr-8 font-medium text-slate-800">
                  {faq.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-gray-400"
                >
                  <FiChevronDown className="h-5 w-5" />
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
                    <div className="prose prose-sm max-w-none px-6 pb-4 pt-2 text-gray-600">
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
                              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
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
