'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ChevronDown,
  Trophy,
  BookOpen,
  BarChart,
  Star,
  Zap,
  Clock,
  Award,
} from 'lucide-react';
import { academicConstants, getGradeInfo, getStatus } from '../../data';

const SubjectCard = React.memo(({ subject, isActive, onClick }) => {
  const { grade, color } = useMemo(() => 
    getGradeInfo(subject.progress), 
    [subject.progress]
  );
  
  const status = useMemo(() => 
    getStatus(subject.progress), 
    [subject.progress]
  );

  return (
    <motion.div
      className="relative flex h-full w-full flex-col rounded-xl border-2 bg-white p-4 shadow-sm transition-all hover:shadow-lg dark:bg-gray-800/90 sm:p-6"
      style={{
        borderColor: isActive ? 'rgb(59, 130, 246)' : 'rgb(243, 244, 246)',
      }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-1 items-center gap-3">
            <div className={`flex-shrink-0 rounded-lg p-2.5 ${
              isActive ? 'bg-blue-100 dark:bg-blue-900/50' : 'bg-gray-100 dark:bg-gray-700/50'
            }`}>
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-bold text-gray-900 dark:text-white">
                {subject.name}
              </h3>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {subject.teacher || 'Main Teacher'}
              </p>
            </div>
          </div>
          
          <div className="flex flex-shrink-0 flex-col items-center rounded-xl p-3.5"
               style={{ backgroundColor: `${color}20` }}>
            <span className="text-2xl font-extrabold" style={{ color }}>{grade}</span>
            <span className="text-sm font-medium" style={{ color }}>{subject.progress}%</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-100/80 px-3 py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900/50 dark:text-blue-200">
            {subject.credits || '3'} Credits
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: `${color}20`, color }}>
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
            {status}
          </span>
        </div>

        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
          <motion.div
            className="absolute h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: `${subject.progress}%` }}
            transition={{ duration: 1, type: 'spring', bounce: 0.2 }}
          />
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{subject.hours || '15'} hrs/week</span>
          </div>
          <button className="group inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
            Details
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}, (prevProps, nextProps) => 
  prevProps.isActive === nextProps.isActive &&
  prevProps.subject.progress === nextProps.subject.progress
);

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
        return getGradeInfo(b.progress).grade.localeCompare(getGradeInfo(a.progress).grade);
      }
      return b.progress - a.progress;
    });
  }, [subjects, sortBy]);

  const averageProgress = useMemo(() => {
    if (!subjects?.length) return '0.0';
    return (subjects.reduce((sum, s) => sum + (s.progress || 0), 0) / subjects.length).toFixed(1);
  }, [subjects]);

  const formattedDate = useMemo(() => 
    new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    }).format(new Date()), []);

  const sortOptions = [
    { id: 'name', label: 'Name', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'grade', label: 'Grade', icon: <Award className="h-4 w-4" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart className="h-4 w-4" /> },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-gray-100 bg-white/90 p-4 shadow-lg backdrop-blur-sm transition-colors dark:border-gray-700 dark:bg-gray-800/90 sm:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex-shrink-0 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 p-3.5 dark:from-blue-900/50 dark:to-blue-800/30">
              <Trophy className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">Academic Progress</h2>
              <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                Last updated: {formattedDate}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm dark:from-gray-700/50 dark:to-gray-800/30">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 rounded-lg bg-green-100 p-2.5 dark:bg-green-900/50">
                  <Star className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-600 dark:text-gray-300">Average Grade</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {averageProgress}%
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-gray-50 to-white p-4 shadow-sm dark:from-gray-700/50 dark:to-gray-800/30">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 rounded-lg bg-purple-100 p-2.5 dark:bg-purple-900/50">
                  <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-600 dark:text-gray-300">Total Subjects</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {subjects.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-6 flex w-full justify-end">
          <div className="relative w-full max-w-xs">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex w-full items-center justify-between gap-2 rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 dark:bg-gray-700/50 dark:text-gray-200 dark:hover:bg-gray-600/50"
            >
              <div className="flex items-center gap-2">
                <BarChart className="h-5 w-5 flex-shrink-0" />
                <span className="truncate">Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}</span>
              </div>
              <ChevronDown className={`h-4 w-4 flex-shrink-0 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 z-10 mt-2 w-full overflow-hidden rounded-xl bg-white shadow-xl dark:bg-gray-700"
                >
                  {sortOptions.map((option) => (
                    <li key={option.id}>
                      <button
                        onClick={() => {
                          setSortBy(option.id);
                          setIsMenuOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                          sortBy === option.id 
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300' 
                            : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-600/50'
                        }`}
                      >
                        {option.icon}
                        <span className="truncate">{option.label}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        {sortedSubjects.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {sortedSubjects.map((subject) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                isActive={activeSubject?.id === subject.id}
                onClick={() => setActiveSubject(activeSubject?.id === subject.id ? null : subject)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="text-6xl text-gray-400 dark:text-gray-600">📚</div>
            <p className="text-gray-600 dark:text-gray-400">No subjects available</p>
          </div>
        )}

        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="flex justify-center sm:justify-start">
            <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3.5 font-semibold text-white shadow-lg transition-all hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
              Generate Full Report
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {activeSubject && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSubject(null)}
            >
              <motion.div
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal content here */}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AcademicProgress;
