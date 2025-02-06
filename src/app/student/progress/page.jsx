'use client';

import React from 'react';
import { Trophy, BookOpen, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const subjects = [
  {
    name: 'Mathematics',
    grade: 'A',
    progress: 85,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: 'Science',
    grade: 'B+',
    progress: 78,
    icon: <GraduationCap className="h-5 w-5" />,
  },
  {
    name: 'English',
    grade: 'A-',
    progress: 90,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    name: 'History',
    grade: 'B',
    progress: 75,
    icon: <GraduationCap className="h-5 w-5" />,
  },
];

const overallProgress = 82;

export default function ProgressPage() {
  return (
    <div className="mx-auto max-w-6xl p-6" data-oid="1hbo45p">
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
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                    {overallProgress}%
                  </span>
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
                    className="fill-none stroke-emerald-500 dark:stroke-emerald-400"
                    strokeWidth="8"
                    strokeDasharray={`${(overallProgress / 100) * 283} 283`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {subjects.map((subject, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 bg-background/95 p-6 backdrop-blur-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/80 dark:hover:shadow-xl/50"
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
                    <span className="text-sm font-medium text-gray-900 dark:text-slate-200">
                      {subject.progress}%
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-500 ease-out"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  Grade: {subject.grade}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
