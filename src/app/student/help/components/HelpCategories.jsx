'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function HelpCategories({ categories, onCategoryClick }) {
  if (!categories.length) {
    return (
      <div 
        className="text-center py-8 text-gray-500"
        role="status"
        aria-live="polite"
      >
        No categories found matching your search.
      </div>
    );
  }

  return (
    <section className="py-8" id="help-categories" aria-labelledby="categories-title">
      <h2 
        id="categories-title"
        className="text-2xl font-semibold text-slate-800 mb-6"
      >
        Help Categories
      </h2>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onCategoryClick(category)}
            className="group flex flex-col p-6 bg-white rounded-xl shadow-sm 
                     border border-gray-100 hover:border-blue-200 
                     hover:shadow-md transition-all duration-200
                     text-left"
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={`View details for ${category.title}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-slate-800 mb-2 group-hover:text-blue-600">
                  {category.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
              <FiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 
                                       transform group-hover:translate-x-1 transition-all" />
            </div>
            
            {category.topics && category.topics.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {category.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="px-2 py-1 text-xs font-medium text-gray-600 
                             bg-gray-100 rounded-full"
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
