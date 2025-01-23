'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTeamModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    course: '',
    icon: '📚',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 3) {
      newErrors.name = 'Team name must be at least 3 characters';
    }
    if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    if (!formData.course) {
      newErrors.course = 'Course is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
        id="modal-overlay"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", duration: 0.3 }}
          className="bg-white dark:bg-gray-900 p-8 rounded-2xl w-[90%] max-w-[500px] relative shadow-xl dark:shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          id="modal-content"
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={onClose}
            aria-label="Close modal"
            id="close-button"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white" id="modal-title">
            Create New Team
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5" id="create-team-form">
            <div className="space-y-2" id="form-group-name">
              <label htmlFor="name" className="block font-medium text-gray-700 dark:text-gray-300" id="label-name">
                Team Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter team name"
                required
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900"
                data-testid="input-name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="space-y-2" id="form-group-description">
              <label htmlFor="description" className="block font-medium text-gray-700 dark:text-gray-300" id="label-description">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your team's purpose and goals"
                required
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white min-h-[120px] resize-y transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900"
                data-testid="textarea-description"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </div>

            <div className="space-y-2" id="form-group-course">
              <label htmlFor="course" className="block font-medium text-gray-700 dark:text-gray-300" id="label-course">
                Course
              </label>
              <input
                id="course"
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                placeholder="Enter course name"
                required
                className="w-full p-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900"
                data-testid="input-course"
              />
              {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
            </div>

            <div className="space-y-2" id="form-group-icon">
              <label htmlFor="icon" className="block font-medium text-gray-700 dark:text-gray-300" id="label-icon">
                Team Icon
              </label>
              <div className="grid grid-cols-6 gap-2">
                {['📚', '⚡', '🔬', '💻', '🎨', '🧮'].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`aspect-square flex items-center justify-center text-xl rounded-lg transition-colors border-2 ${
                      formData.icon === icon
                        ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                        : 'bg-gray-50 dark:bg-gray-800 border-transparent hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    aria-label={`Select ${icon} icon`}
                    aria-pressed={formData.icon === icon}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl text-base font-semibold transition-colors shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
              id="submit-button"
            >
              Create Team
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateTeamModal;
