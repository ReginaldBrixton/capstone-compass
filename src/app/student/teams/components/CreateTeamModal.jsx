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
    <AnimatePresence data-oid="lgidiff">
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={onClose}
        id="modal-overlay"
        data-oid="c6x60:7"
      >
        <motion.div
          initial={{
            scale: 0.95,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0.95,
            opacity: 0,
          }}
          transition={{
            type: 'spring',
            duration: 0.3,
          }}
          className="relative w-[90%] max-w-[500px] rounded-2xl bg-white p-8 shadow-xl dark:bg-gray-900 dark:shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          id="modal-content"
          data-oid="sskfwpr"
        >
          <button
            className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={onClose}
            aria-label="Close modal"
            id="close-button"
            data-oid="lre0cu5"
          >
            ✕
          </button>

          <h2
            className="mb-6 text-2xl font-bold text-gray-900 dark:text-white"
            id="modal-title"
            data-oid="va96b7q"
          >
            Create New Team
          </h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5"
            id="create-team-form"
            data-oid="tz_5d7l"
          >
            <div className="space-y-2" id="form-group-name" data-oid="c3bmamc">
              <label
                htmlFor="name"
                className="block font-medium text-gray-700 dark:text-gray-300"
                id="label-name"
                data-oid=":5.-129"
              >
                Team Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                placeholder="Enter team name"
                required
                className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900"
                data-testid="input-name"
                data-oid="vde9:yg"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500" data-oid="sepkd4z">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2" id="form-group-description" data-oid="2g0sumq">
              <label
                htmlFor="description"
                className="block font-medium text-gray-700 dark:text-gray-300"
                id="label-description"
                data-oid="f8g.d9r"
              >
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                placeholder="Describe your team's purpose and goals"
                required
                className="min-h-[120px] w-full resize-y rounded-xl border-2 border-gray-200 bg-white p-3 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900"
                data-testid="textarea-description"
                data-oid="8_sld6o"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500" data-oid="1ghbr3h">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="space-y-2" id="form-group-course" data-oid="woy48_y">
              <label
                htmlFor="course"
                className="block font-medium text-gray-700 dark:text-gray-300"
                id="label-course"
                data-oid="xx2al1q"
              >
                Course
              </label>
              <input
                id="course"
                type="text"
                value={formData.course}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    course: e.target.value,
                  })
                }
                placeholder="Enter course name"
                required
                className="w-full rounded-xl border-2 border-gray-200 bg-white p-3 text-sm text-gray-900 transition-all focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-900"
                data-testid="input-course"
                data-oid="4nq37mc"
              />
              {errors.course && (
                <p className="mt-1 text-sm text-red-500" data-oid="_rj-:2i">
                  {errors.course}
                </p>
              )}
            </div>

            <div className="space-y-2" id="form-group-icon" data-oid="6:4ywax">
              <label
                htmlFor="icon"
                className="block font-medium text-gray-700 dark:text-gray-300"
                id="label-icon"
                data-oid="wjwx37q"
              >
                Team Icon
              </label>
              <div className="grid grid-cols-6 gap-2" data-oid="5iavey8">
                {['📚', '⚡', '🔬', '💻', '🎨', '🧮'].map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        icon,
                      })
                    }
                    className={`flex aspect-square items-center justify-center rounded-lg border-2 text-xl transition-colors ${formData.icon === icon ? 'border-blue-500 bg-blue-100 dark:bg-blue-900' : 'border-transparent bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'}`}
                    aria-label={`Select ${icon} icon`}
                    aria-pressed={formData.icon === icon}
                    data-oid="q-av30e"
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.98,
              }}
              type="submit"
              className="mt-4 rounded-xl bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-colors hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-gray-400"
              id="submit-button"
              data-oid="bi59l_o"
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
