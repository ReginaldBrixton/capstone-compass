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
        className="py-8 text-center text-gray-500 dark:text-gray-400"
        role="status"
        aria-live="polite"
        data-oid="q-.sk:g"
      >
        No FAQs found matching your search.
      </div>
    );
  }
  return (
    <section className="py-8" id="faq-section" aria-labelledby="faq-title" data-oid="qo.1uyb">
      <h2 id="faq-title" className="mb-6 text-2xl font-semibold text-slate-800 dark:text-white" data-oid="lha:s0n">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4" role="tablist" data-oid="cwm:pge">
        {faqs.map((faq, index) => {
          const isOpen = openItem === faq.id;
          return (
            <motion.div
              key={faq.id}
              initial={false}
              animate={{
                backgroundColor: isOpen ? 'rgb(249, 250, 251)' : 'rgb(255, 255, 255)',
                backgroundColor: isOpen ? 'var(--faq-open-bg)' : 'var(--faq-closed-bg)', // Use CSS variables for theming
              }}
              className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
              role="tab"
              data-oid="h02atfd"
            >
              <button
                onClick={() => setOpenItem(isOpen ? null : faq.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                data-oid="c:d64u9"
              >
                <span className="pr-8 font-medium text-slate-800 dark:text-white" data-oid="9yyf_uf">
                  {faq.question}
                </span>
                <motion.span
                  animate={{
                    rotate: isOpen ? 180 : 0,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                  className="flex-shrink-0 text-gray-400 dark:text-gray-500"
                  data-oid="8-8ax9t"
                >
                  <FiChevronDown className="h-5 w-5" data-oid="tqbela4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false} data-oid="f5lod:m">
                {isOpen && (
                  <motion.div
                    initial={{
                      height: 0,
                      opacity: 0,
                    }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    id={`faq-answer-${faq.id}`}
                    role="tabpanel"
                    aria-labelledby={`faq-question-${faq.id}`}
                    data-oid="bwioz93"
                  >
                    <div
                      className="prose prose-sm max-w-none px-6 pb-4 pt-2 text-gray-600 dark:text-gray-400"
                      data-oid="z7o4daa"
                    >
                      {typeof faq.answer === 'string' ? (
                        <p data-oid="dndofds">{faq.answer}</p>
                      ) : (
                        faq.answer
                      )}

                      {faq.links && faq.links.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-3" data-oid="p.hpm8:">
                          {faq.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              data-oid="0h48u4p"
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
