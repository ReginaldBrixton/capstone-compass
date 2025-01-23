'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi';

export default function ContactForm({ onSubmit, isSubmitting, submitStatus }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await onSubmit(formData);
      if (submitStatus === 'success') {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <section className="py-8" id="contact-form" aria-labelledby="contact-title">
      <h2
        id="contact-title"
        className="mb-6 text-2xl font-semibold text-slate-800"
      >
        Still Need Help?
      </h2>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="mx-auto max-w-2xl rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
        noValidate
      >
        <div className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              } transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-500">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              } transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-500">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="subject"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`w-full rounded-lg border px-4 py-2 ${
                errors.subject ? 'border-red-500' : 'border-gray-200'
              } transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              aria-invalid={errors.subject ? 'true' : 'false'}
              aria-describedby={errors.subject ? 'subject-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.subject && (
              <p id="subject-error" className="mt-1 text-sm text-red-500">
                {errors.subject}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={`w-full rounded-lg border px-4 py-2 ${
                errors.message ? 'border-red-500' : 'border-gray-200'
              } transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              disabled={isSubmitting}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-red-500">
                {errors.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center gap-2 rounded-lg px-6 py-2 font-medium text-white transition-all duration-200 ${isSubmitting ? 'cursor-not-allowed bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </>
              ) : (
                <>
                  <FiSend className="h-4 w-4" />
                  Send Message
                </>
              )}
            </motion.button>

            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center gap-2 ${
                  submitStatus === 'success' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {submitStatus === 'success' ? (
                  <>
                    <FiCheck className="h-5 w-5" />
                    <span>Message sent successfully!</span>
                  </>
                ) : (
                  <>
                    <FiAlertCircle className="h-5 w-5" />
                    <span>Failed to send message. Please try again.</span>
                  </>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.form>
    </section>
  );
}
