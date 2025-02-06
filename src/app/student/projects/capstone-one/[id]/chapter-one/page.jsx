'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ChapterEditor } from '../../../components';

const chapterOneGuidelines = [
  {
    title: 'Background of the Study',
    description: 'Provide context and rationale for your research. Explain why this study is important and relevant.',
  },
  {
    title: 'Problem Statement',
    description: 'Clearly state the problem your research aims to address. Use specific and measurable terms.',
  },
  {
    title: 'Research Objectives',
    description: 'List your main objective and specific objectives. Use action verbs and make them SMART.',
  },
  {
    title: 'Scope and Limitations',
    description: 'Define what your study will and will not cover. Be specific about the boundaries of your research.',
  },
  {
    title: 'Significance of the Study',
    description: 'Explain who will benefit from your research and how. Address both theoretical and practical implications.',
  },
];

export default function ChapterOne() {
  const params = useParams();
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async (content) => {
    try {
      setIsSaving(true);
      // TODO: Implement save logic
      console.log('Saving content:', content);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error saving:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (content) => {
    try {
      setIsSubmitting(true);
      // TODO: Implement submission logic
      console.log('Submitting content:', content);
      await new Promise((resolve) => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 space-y-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Chapter 1: Introduction</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapterOneGuidelines.map((guideline, index) => (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500/70 hover:border-blue-600 dark:hover:border-blue-400"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 to-transparent dark:from-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {guideline.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {guideline.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <ChapterEditor
          chapterTitle="Chapter 1: Introduction"
          guidelines={chapterOneGuidelines}
          onSave={handleSave}
          onSubmit={handleSubmit}
          isSaving={isSaving}
          isSubmitting={isSubmitting}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
        />
      </div>
    </div>
  );
}
