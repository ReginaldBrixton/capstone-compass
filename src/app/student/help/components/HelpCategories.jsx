'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HelpCategories({ categories, onCategoryClick }) {
  if (!categories.length) {
    return (
      <div
        className="py-8 text-center text-gray-500"
        role="status"
        aria-live="polite"
      >
        No categories found matching your search.
      </div>
    );
  }

  return (
    <section
      className="py-8"
      id="help-categories"
      aria-labelledby="categories-title"
    >
      <h2
        id="categories-title"
        className="mb-6 text-2xl font-semibold text-slate-800"
      >
        Help Categories
      </h2>

      <motion.div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryClick(category)}
            className="group flex flex-col rounded-xl border border-gray-100 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-md"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View details for ${category.title}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-medium text-slate-800 group-hover:text-blue-600">
                  {category.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {category.description}
                </p>
              </div>
              <FiChevronRight className="h-5 w-5 transform text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-blue-500" />
            </div>

            {category.topics && category.topics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {category.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600"
                  >
                    {topic}
                  </span>
                ))}
                {category.topics.length > 3 && (
                  <span className="px-2 py-1 text-xs font-medium text-gray-500">
                    +{category.topics.length - 3} more
                  </span>
                )}
              </div>
            )}
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}
