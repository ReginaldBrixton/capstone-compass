'use client';

import React, { useEffect, useState } from 'react';

const ChapterEditor = ({ chapterTitle, guidelines, initialContent = '', onSave, onSubmit, submissionId }) => {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);
  const [isCheckingFeedback, setIsCheckingFeedback] = useState(false);

  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      handleSave();
    }, 30000);
    return () => clearInterval(autoSaveInterval);
  }, [content]);

  useEffect(() => {
    const checkFeedback = async () => {
      if (!submissionId) return;
      
      setIsCheckingFeedback(true);
      try {
        const response = await fetch(`/api/submissions?id=${submissionId}`);
        if (response.ok) {
          const data = await response.json();
          setHasFeedback(!!data?.feedback);
        }
      } catch (error) {
        console.error('Failed to check feedback:', error);
      } finally {
        setIsCheckingFeedback(false);
      }
    };

    checkFeedback();
    const feedbackInterval = setInterval(checkFeedback, 300000);
    return () => clearInterval(feedbackInterval);
  }, [submissionId]);

  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  const handleSave = async () => {
    if (!content || isSaving) return;

    setIsSaving(true);
    try {
      await onSave(content);
      setLastSaved(new Date());
    } catch (error) {
      console.error('Failed to save:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!content) return;

    try {
      await onSubmit(content);
    } catch (error) {
      console.error('Failed to submit:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{chapterTitle}</h1>
          {hasFeedback && (
            <div className="inline-flex items-center bg-blue-600 dark:bg-blue-700 text-white text-sm font-medium px-3 py-1 rounded-full ml-4">
              New Feedback Available
            </div>
          )}
          <div className="flex items-center gap-2 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-500' : 'bg-green-500'}`} />
            {isSaving
              ? 'Saving...'
              : lastSaved
                ? `Last saved ${lastSaved.toLocaleTimeString()}`
                : 'Not saved yet'}
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {wordCount} words
        </div>
      </div>

      <div className="flex gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md mb-4">
        {['B', 'I', 'U', '•', '1.'].map((btn, index) => (
          <button
            key={index}
            className="px-2 py-1 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={['Bold', 'Italic', 'Underline', 'Bullet List', 'Numbered List'][index]}
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8">
        <div
          contentEditable
          suppressContentEditableWarning
          onInput={(e) => setContent(e.currentTarget.textContent)}
          dangerouslySetInnerHTML={{ __html: content }}
          className="min-h-[500px] p-4 border border-gray-200 dark:border-gray-700 rounded-md 
                   focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 transition-colors"
        />

        <div className="md:block hidden space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Chapter Guidelines</h3>
          {guidelines.map((guideline, index) => (
            <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">{guideline.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{guideline.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md 
                   transition-colors font-medium disabled:opacity-50"
        >
          Submit for Review
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                   rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors font-medium"
        >
          Save Draft
        </button>
      </div>
    </div>
  );
};

export default ChapterEditor;
