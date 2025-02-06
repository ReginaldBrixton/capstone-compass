'use client';

import React from 'react';
import { FiAlertTriangle, FiCheckCircle, FiClock, FiFileText } from 'react-icons/fi';

const sampleAssignments = [
  {
    id: 1,
    title: 'Math Homework - Chapter 5',
    subject: 'Mathematics',
    dueDate: '2023-12-25',
    status: 'Due Soon',
  },
  {
    id: 2,
    title: 'English Essay - Shakespeare',
    subject: 'English',
    dueDate: '2023-12-28',
    status: 'Not Started',
  },
  {
    id: 3,
    title: 'Science Lab Report',
    subject: 'Science',
    dueDate: '2023-12-20',
    status: 'Submitted',
  },
];

const StatusBadge = ({ status, children }) => {
  const baseStyles = 'px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 transition-colors';
  const statusStyles = {
    'Due Soon': `bg-amber-500/10 text-amber-600 dark:text-amber-300 dark:bg-amber-400/20`,
    'Submitted': `bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 dark:bg-emerald-400/20`,
    'Late': `bg-rose-500/10 text-rose-600 dark:text-rose-300 dark:bg-rose-400/20`,
    'Not Started': `bg-slate-200/50 text-slate-600 dark:text-slate-300 dark:bg-slate-700/50`,
  };
  
  return (
    <span className={`${baseStyles} ${statusStyles[status]}`}>
      {status === 'Due Soon' && <FiAlertTriangle className="w-4 h-4" />}
      {status === 'Submitted' && <FiCheckCircle className="w-4 h-4" />}
      {status === 'Not Started' && <FiClock className="w-4 h-4" />}
      {children}
    </span>
  );
};

export default function AssignmentsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              My Assignments
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Track and manage your current assignments and submissions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {sampleAssignments.map((assignment) => {
              const isOverdue = new Date(assignment.dueDate) < new Date();
              
              return (
                <div 
                  key={assignment.id}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-200 dark:hover:border-slate-600"
                  data-oid="ciqi6l:"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity dark:from-blue-900/10 dark:to-indigo-900/10" />
                  
                  <div className="relative flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-100/50 dark:bg-blue-900/20 rounded-lg">
                          <FiFileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="space-y-1">
                          <h2 className="text-xl font-semibold text-slate-900 dark:text-white" data-oid="r9dfs7c">
                            {assignment.title}
                          </h2>
                          <p className="text-slate-600 dark:text-slate-300 font-medium" data-oid="lwjst5h">
                            {assignment.subject}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                          <FiClock className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                          <span className="text-slate-600 dark:text-slate-300" data-oid="yqdg-7a">
                            {new Date(assignment.dueDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                          {isOverdue && (
                            <span className="ml-2 text-rose-500 dark:text-rose-400 font-medium">Overdue</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <StatusBadge status={assignment.status} data-oid="y4omzxh">
                      {assignment.status}
                    </StatusBadge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
