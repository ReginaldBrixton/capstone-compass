'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronDown, Trophy, BookOpen, BarChart, Calendar, Star, Zap, Clock, Award } from 'lucide-react';
import { academicConstants, getGradeInfo, getStatus } from '../../data';

const SubjectCard = React.memo(({ subject, isActive, onClick }) => {
  const { grade, color } = getGradeInfo(subject.progress);
  const status = getStatus(subject.progress);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-sm hover:shadow-lg border-2 ${
        isActive ? 'border-blue-500 dark:border-blue-600' : 'border-gray-100 dark:border-gray-800'
      } transition-all cursor-pointer w-full`}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      id={`subject-card-${subject.id}`}
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
              <BookOpen className="w-5 h-5 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-1">
                {subject.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subject.teacher || 'Main Teacher'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300">
              {subject.credits || '3'} Credits
            </span>
            <span className="px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1"
              style={{ backgroundColor: `${color}20`, color }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
              {status}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-center p-3 rounded-xl bg-opacity-10" style={{ backgroundColor: `${color}20` }}>
          <span className="text-2xl font-bold" style={{ color }}>{grade}</span>
          <span className="text-sm" style={{ color }}>{subject.progress}%</span>
        </div>
      </div>

      <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full rounded-full absolute"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${subject.progress}%` }}
          transition={{ duration: 0.8, type: 'spring' }}
        />
        <div className="absolute inset-0 flex items-center justify-end pr-2">
          <span className="text-xs text-gray-500">{subject.progress}%</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{subject.hours || '15'} hrs/week</span>
        </div>
        <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 flex items-center gap-1 text-sm">
          Details
          <ArrowUpRight className="w-4 h-4" />
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
    return (subjects.reduce((sum, s) => sum + (s.progress || 0), 0) / subjects.length).toFixed(1);
  }, [subjects]);

  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    }).format(new Date());
  }, []);

  const sortOptions = [
    { id: 'name', label: 'Name', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'grade', label: 'Grade', icon: <Award className="w-4 h-4" /> },
    { id: 'progress', label: 'Progress', icon: <BarChart className="w-4 h-4" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto bg-white dark:bg-gray-900 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/50">
              <Trophy className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
            <div>
              Academic Progress
              <p className="text-sm font-normal text-gray-500 dark:text-gray-400 mt-1">
                Last updated: {formattedDate}
              </p>
            </div>
          </h2>
        </div>
        
        <div className="w-full lg:w-auto grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <Star className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Average Grade</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-white">
                  {averageProgress}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Subjects</p>
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
            className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
            aria-haspopup="listbox"
            aria-expanded={isMenuOpen}
          >
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <BarChart className="w-5 h-5" />
              Sort by: {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {isMenuOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg z-10"
                role="listbox"
              >
                {sortOptions.map((option) => (
                  <li key={option.id}>
                    <button
                      onClick={() => {
                        setSortBy(option.id);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 ${
                        sortBy === option.id 
                          ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
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
        <div className="text-center py-12 space-y-4">
          <div className="text-gray-400 dark:text-gray-600 text-6xl">📚</div>
          <p className="text-gray-500 dark:text-gray-400">No subjects available</p>
        </div>
      )}

      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-xl transition-all hover:shadow-lg">
          Generate Full Report
          <ArrowUpRight className="w-5 h-5" />
        </button>
      </div>

      <AnimatePresence>
        {activeSubject && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveSubject(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
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