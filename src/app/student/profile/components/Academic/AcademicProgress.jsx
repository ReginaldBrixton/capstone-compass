'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  Trophy,
  BookOpen,
  BarChart,
  Calendar,
  Star,
  Zap,
  Clock,
  Award,
} from 'lucide-react';
import { academicConstants, getGradeInfo, getStatus } from '../../data';

const SubjectCard = React.memo(({ subject, isActive, onClick }) => {
  const { grade, color } = getGradeInfo(subject.progress);
  const status = getStatus(subject.progress);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative rounded-xl border-2 bg-white p-4 shadow-sm hover:shadow-lg dark:bg-gray-900 sm:p-6 ${
        isActive
          ? 'border-blue-500 dark:border-blue-600'
          : 'border-gray-100 dark:border-gray-800'
      } w-full cursor-pointer transition-all`}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      id={`subject-card-${subject.id}`}
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <div
              className={`rounded-lg p-2 ${isActive ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}
            >
              <BookOpen className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="line-clamp-1 text-lg font-semibold text-gray-800 dark:text-white">
                {subject.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subject.teacher || 'Main Teacher'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
              {subject.credits || '3'} Credits
            </span>
            <span
              className="flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
              style={{ backgroundColor: `${color}20`, color }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {status}
            </span>
          </div>
        </div>

        <div
          className="flex flex-col items-center rounded-xl bg-opacity-10 p-3"
          style={{ backgroundColor: `${color}20` }}
        >
          <span className="text-2xl font-bold" style={{ color }}>
            {grade}
          </span>
          <span className="text-sm" style={{ color }}>
            {subject.progress}%
          </span>
        </div>
      </div>

      <div className="relative mb-4 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <motion.div
          className="absolute h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${subject.progress}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-2">
          <span className="text-xs text-gray-500">{subject.progress}%</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{subject.hours || '15'} hrs/week</span>
        </div>
        <button className="flex items-center gap-1 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400">
          Details
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
});

// Add display name to fix the lint error
SubjectCard.displayName = 'SubjectCard';

const AcademicProgress = ({ subjects = [] }) => {
  const [activeSubject, setActiveSubject] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sortedSubjects = useMemo(() => {
    if (!Array.isArray(subjects)) return [];
    return [...subjects].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'grade') {
        const gradeA = getGradeInfo(a.progress).grade;
        const gradeB = getGradeInfo(b.progress).grade;
        return gradeA.localeCompare(gradeB);
      }
      return b.progress - a.progress;
    });
  }, [subjects, sortBy]);

  const averageProgress = useMemo(() => {
    if (!Array.isArray(subjects) || subjects.length === 0) return '0.0';
    return (
      subjects.reduce((sum, s) => sum + (s.progress || 0), 0) / subjects.length
    ).toFixed(1);
  }, [subjects]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date());
  }, []);

  const sortOptions = [
    { id: 'name', label: 'Name', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'grade', label: 'Grade', icon: <Award className="h-4 w-4" /> },
    {
      id: 'progress',
      label: 'Progress',
      icon: <BarChart className="h-4 w-4" />,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-gray-100 bg-white p-4 shadow-lg dark:border-gray-800 dark:bg-gray-900 sm:p-6">
      <div className="mb-8 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
        <div className="space-y-2">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-800 dark:text-white">
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/50">
              <Trophy className="h-6 w-6 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              Academic Progress
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                Last updated: {formattedDate}
              </p>
            </div>
          </h2>
        </div>

        <div className="grid w-full grid-cols-2 gap-4 lg:w-auto">
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/50">
                <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Average Grade
                </p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {averageProgress}%
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-100 p-2 dark:bg-purple-900/50">
                <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Subjects
                </p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {subjects.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 flex justify-end">
        <div className="relative w-full sm:w-64">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex w-full items-center justify-between gap-2 rounded-xl bg-gray-50 px-4 py-3 transition-colors hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <BarChart className="h-5 w-5" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 z-10 mt-2 w-full rounded-xl bg-white shadow-lg dark:bg-gray-800"
                role="listbox"
              >
                {sortOptions.map((option) => (
                  <li key={option.id}>
                    <button
                      onClick={() => {
                        setSortBy(option.id);
                        setIsMenuOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 px-4 py-3 text-left text-sm ${
                        sortBy === option.id
                          ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white'
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      } transition-colors`}
                      role="option"
                      aria-selected={sortBy === option.id}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {sortedSubjects.length > 0 ? (
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              isActive={activeSubject?.id === subject.id}
              onClick={() =>
                setActiveSubject(
                  activeSubject?.id === subject.id ? null : subject
                )
              }
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4 py-12 text-center">
          <div className="text-6xl text-gray-400 dark:text-gray-600">📚</div>
          <p className="text-gray-500 dark:text-gray-400">
            No subjects available
          </p>
        </div>
      )}

      <div className="border-t border-gray-200 pt-6 dark:border-gray-800">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3.5 font-medium text-white transition-all hover:from-blue-600 hover:to-purple-600 hover:shadow-lg sm:w-auto">
          Generate Full Report
          <ArrowUpRight className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {activeSubject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSubject(null)}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal content here */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AcademicProgress;
