'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ProgressTracker } from '../../components';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiEdit, FiFileText, FiPlay, FiEye } from 'react-icons/fi';

const steps = [
  { id: 'chapter-one', label: 'Chapter 1: Introduction' },
  { id: 'chapter-two', label: 'Chapter 2: Literature Review' },
  { id: 'chapter-three', label: 'Chapter 3: Methodology' },
  { id: 'defense', label: 'Defense' },
];

const chapters = [
  {
    id: 'chapter-one',
    title: 'Chapter 1: Introduction',
    description: 'Background, Problem Statement, and Research Objectives',
    status: 'in-progress',
    deadline: '2024-02-15',
    route: 'chapter-one',
  },
  {
    id: 'chapter-two',
    title: 'Chapter 2: Literature Review',
    description: 'Theoretical Framework and Related Studies',
    status: 'not-started',
    deadline: '2024-03-15',
    route: 'chapter-two',
  },
  {
    id: 'chapter-three',
    title: 'Chapter 3: Methodology',
    description: 'Research Design and Methods',
    status: 'not-started',
    deadline: '2024-04-15',
    route: 'chapter-three',
  },
];

export default function CapstoneOne() {
  const params = useParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isDeadlineOverdue = (deadline) => new Date(deadline) < new Date();

  if (!hasMounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white bg-clip-text">
            Capstone One Progress
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track and manage your progress through each chapter of your capstone project.
            Complete the chapters in sequence and submit for review.
          </p>
        </div>

        <ProgressTracker steps={steps} currentStep={currentStep} className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
          {chapters.map((chapter) => {
            const statusColor = {
              'completed': 'green',
              'in-progress': 'yellow',
              'not-started': 'gray'
            }[chapter.status];

            return (
              <div
                key={chapter.id}
                className={`relative group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4 ${{
                  'completed': 'border-green-500',
                  'in-progress': 'border-yellow-500',
                  'not-started': 'border-gray-300 dark:border-gray-600'
                }[chapter.status]}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <FiFileText className={`w-6 h-6 ${{
                      'completed': 'text-green-500',
                      'in-progress': 'text-yellow-500',
                      'not-started': 'text-gray-400'
                    }[chapter.status]}`} />
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {chapter.title}
                    </h2>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    statusColor === 'green' 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                      : statusColor === 'yellow'
                      ? 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {chapter.status.replace('-', ' ')}
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {chapter.description}
                </p>

                <div className={`flex items-center gap-2 mb-6 p-2 rounded-lg ${
                  isDeadlineOverdue(chapter.deadline)
                    ? 'bg-red-100 dark:bg-red-900/20 text-red-500 dark:text-red-400'
                    : 'bg-gray-100 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400'
                }`}>
                  <FiClock className="flex-shrink-0" />
                  <span className="text-sm">
                    Deadline: {new Date(chapter.deadline).toLocaleDateString()}
                    {isDeadlineOverdue(chapter.deadline) && (
                      <span className="ml-2 font-medium">(Overdue)</span>
                    )}
                  </span>
                </div>

                <Link
                  href={`/student/projects/capstone-one/${params.id}/${chapter.route}`}
                  className={`w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    chapter.status === 'completed'
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                  } ${chapter.status === 'completed' ? 'pointer-events-none' : ''}`}
                >
                  {chapter.status === 'completed' ? (
                    <>
                      <FiEye className="w-5 h-5" />
                      View Chapter
                    </>
                  ) : chapter.status === 'in-progress' ? (
                    <>
                      <FiEdit className="w-5 h-5" />
                      Continue Writing
                    </>
                  ) : (
                    <>
                      <FiPlay className="w-5 h-5" />
                      Start Chapter
                    </>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
