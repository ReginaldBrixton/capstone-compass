'use client';

import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  BookOpen, 
  GraduationCap, 
  ArrowUp, 
  ArrowDown, 
  Calendar, 
  Filter, 
  Download,
  Target,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample data
const subjects = [
  {
    name: 'Mathematics',
    grade: 'A',
    progress: 85,
    previousProgress: 78,
    icon: <BookOpen className="h-5 w-5" />,
    assignments: [
      { name: 'Midterm Exam', score: 88 },
      { name: 'Final Project', score: 92 },
      { name: 'Homework Avg.', score: 82 },
    ],
    trends: [75, 78, 80, 82, 85],
    goalProgress: 90,
  },
  {
    name: 'Science',
    grade: 'B+',
    progress: 78,
    previousProgress: 81,
    icon: <GraduationCap className="h-5 w-5" />,
    assignments: [
      { name: 'Lab Report', score: 79 },
      { name: 'Final Exam', score: 83 },
      { name: 'Quizzes Avg.', score: 75 },
    ],
    trends: [82, 85, 80, 79, 78],
    goalProgress: 85,
  },
  {
    name: 'English',
    grade: 'A-',
    progress: 90,
    previousProgress: 86,
    icon: <BookOpen className="h-5 w-5" />,
    assignments: [
      { name: 'Essay', score: 93 },
      { name: 'Presentation', score: 88 },
      { name: 'Participation', score: 90 },
    ],
    trends: [84, 86, 88, 89, 90],
    goalProgress: 95,
  },
  {
    name: 'History',
    grade: 'B',
    progress: 75,
    previousProgress: 70,
    icon: <GraduationCap className="h-5 w-5" />,
    assignments: [
      { name: 'Research Paper', score: 77 },
      { name: 'Midterm', score: 74 },
      { name: 'Final Exam', score: 78 },
    ],
    trends: [68, 70, 72, 73, 75],
    goalProgress: 80,
  },
];

// Time periods
const timePeriods = [
  { id: 'current', name: 'Current Semester' },
  { id: 'previous', name: 'Previous Semester' },
  { id: 'yearly', name: 'Yearly Overview' }
];

// Add a function to determine color based on progress
function getProgressColor(progress) {
  if (progress >= 90) return "from-blue-400 to-blue-600";
  if (progress >= 80) return "from-emerald-400 to-emerald-600";
  if (progress >= 70) return "from-yellow-400 to-yellow-600";
  return "from-orange-400 to-orange-600";
}

// Function to get trend indicator
function getTrendIndicator(current, previous) {
  const diff = current - previous;
  if (diff > 0) {
    return {
      icon: <ArrowUp className="h-3 w-3" />,
      text: `+${diff.toFixed(1)}%`,
      className: "text-emerald-500"
    };
  } else if (diff < 0) {
    return {
      icon: <ArrowDown className="h-3 w-3" />,
      text: `${diff.toFixed(1)}%`,
      className: "text-red-500"
    };
  }
  return {
    icon: null,
    text: "0%",
    className: "text-gray-500"
  };
}

// Create sparkline component
function Sparkline({ data }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 100;
  const height = 20;
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="text-gray-500">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const overallProgress = 82;
const previousOverallProgress = 78;

export default function ProgressPage() {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  
  // Sort subjects
  const sortedSubjects = [...subjects].sort((a, b) => {
    if (sortBy === "name") {
      return sortOrder === "asc" 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
    } else if (sortBy === "progress") {
      return sortOrder === "asc" 
        ? a.progress - b.progress 
        : b.progress - a.progress;
    } else if (sortBy === "grade") {
      return sortOrder === "asc" 
        ? a.grade.localeCompare(b.grade) 
        : b.grade.localeCompare(a.grade);
    }
    return 0;
  });

  // Toggle expanded subject
  const toggleExpand = (index) => {
    setExpandedSubject(expandedSubject === index ? null : index);
  };

  // Handle sort change
  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6 animate-fadeIn" data-oid="1hbo45p">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100" data-oid="dq-kfj.">
            Academic Progress
          </h1>
          <p className="mt-2 text-gray-600 dark:text-slate-400">
            Current semester performance overview
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
          <Trophy className="h-8 w-8" />
        </div>
      </div>

      {/* Controls section */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-background/95 p-4 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Select time period"
            >
              {timePeriods.map(period => (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('-');
                setSortBy(newSortBy);
                setSortOrder(newSortOrder);
              }}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Sort subjects"
            >
              <option value="name-asc">Name (A-Z)</option>
              <option value="name-desc">Name (Z-A)</option>
              <option value="progress-desc">Progress (High-Low)</option>
              <option value="progress-asc">Progress (Low-High)</option>
              <option value="grade-asc">Grade (A-F)</option>
              <option value="grade-desc">Grade (F-A)</option>
            </select>
          </div>
        </div>
        
        <button 
          className="flex items-center space-x-2 rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          aria-label="Download progress report"
        >
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-full rounded-xl border border-gray-200 bg-background/95 p-6 backdrop-blur-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 dark:hover:shadow-xl/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-200">
                Overall Achievement
              </h2>
              <p className="mt-1 text-gray-600 dark:text-slate-400">
                Based on all subject performances
              </p>
            </div>
            <div className="relative">
              <div className="h-24 w-24">
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    {overallProgress}%
                  </span>
                  <div className="flex items-center text-xs">
                    <span className={getTrendIndicator(overallProgress, previousOverallProgress).className}>
                      {getTrendIndicator(overallProgress, previousOverallProgress).icon}
                      {getTrendIndicator(overallProgress, previousOverallProgress).text}
                    </span>
                  </div>
                </div>
                <svg className="h-full w-full -rotate-90 transform">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="fill-none stroke-gray-200 dark:stroke-slate-700"
                    strokeWidth="8"
                  />
                  <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="fill-none stroke-emerald-500 dark:stroke-emerald-400 transition-all duration-1000 ease-in-out"
                    strokeWidth="8"
                    strokeDasharray={`${(overallProgress / 100) * 283} 283`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600 dark:text-slate-400">
              Semester goal: 85%
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
              <div 
                className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-1000 ease-out"
                style={{ width: `${(overallProgress / 85) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {sortedSubjects.map((subject, index) => (
          <div
            key={index}
            className={cn(
              "rounded-xl border border-gray-200 bg-background/95 p-6 backdrop-blur-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 dark:hover:shadow-xl/50",
              expandedSubject === index && "col-span-2"
            )}
            data-oid="_l7.f39"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    {subject.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-200">
                    {subject.name}
                  </h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-400">Progress</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900 dark:text-slate-200">
                        {subject.progress}%
                      </span>
                      <span className={cn("ml-1 flex items-center text-xs", getTrendIndicator(subject.progress, subject.previousProgress).className)}>
                        {getTrendIndicator(subject.progress, subject.previousProgress).icon}
                        {getTrendIndicator(subject.progress, subject.previousProgress).text}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                        getProgressColor(subject.progress)
                      )}
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3 text-gray-500" />
                      <span className="text-xs text-gray-600 dark:text-slate-400">
                        Goal: {subject.goalProgress}%
                      </span>
                    </div>
                    <div className="h-10 w-20">
                      <Sparkline data={subject.trends} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Grade: {subject.grade}
                </div>
                <button
                  onClick={() => toggleExpand(index)}
                  className="mt-2 inline-flex items-center justify-center rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-800 dark:hover:text-slate-300"
                  aria-label={expandedSubject === index ? "Collapse details" : "Expand details"}
                >
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    expandedSubject === index ? "rotate-180 transform" : ""
                  )} />
                </button>
              </div>
            </div>
            
            {expandedSubject === index && (
              <div className="mt-4 animate-slideDown border-t border-gray-200 pt-4 dark:border-slate-700">
                <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-slate-200">
                  Assignment Breakdown
                </h4>
                <div className="space-y-2">
                  {subject.assignments.map((assignment, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        {assignment.name}
                      </span>
                      <div className="flex w-32 items-center">
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                          <div
                            className={cn(
                              "h-full bg-gradient-to-r transition-all",
                              getProgressColor(assignment.score)
                            )}
                            style={{ width: `${assignment.score}%` }}
                          />
                        </div>
                        <span className="ml-2 text-xs font-medium text-gray-700 dark:text-slate-300">
                          {assignment.score}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-slate-200">
                    Recommendations
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    {subject.progress < subject.goalProgress 
                      ? `Focus on improving ${subject.name.toLowerCase()} skills to reach your goal of ${subject.goalProgress}%.`
                      : `Great job! You've reached your ${subject.name.toLowerCase()} goal of ${subject.goalProgress}%.`
                    }
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
