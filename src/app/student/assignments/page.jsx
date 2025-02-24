'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search,
  Calendar,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  Filter,
  ArrowUpDown,
  ChevronDown,
  BarChart2,
  PlusCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Enhanced sample data with more details
const sampleAssignments = [
  {
    id: 1,
    title: 'Math Homework - Chapter 5',
    subject: 'Mathematics',
    subjectIcon: <BookOpen className="h-4 w-4" />,
    dueDate: '2023-12-25',
    status: 'Due Soon',
    priority: 'High',
    description: 'Complete problems 1-20 from Chapter 5 of the textbook.',
    completionPercentage: 45,
    resources: [
      { name: 'Textbook Chapter 5', type: 'pdf' },
      { name: 'Class Notes', type: 'doc' }
    ]
  },
  {
    id: 2,
    title: 'English Essay - Shakespeare',
    subject: 'English',
    subjectIcon: <BookOpen className="h-4 w-4" />,
    dueDate: '2023-12-28',
    status: 'Not Started',
    priority: 'Medium',
    description: 'Write a 1000-word essay analyzing the themes in Hamlet.',
    completionPercentage: 0,
    resources: [
      { name: 'Hamlet PDF', type: 'pdf' },
      { name: 'Essay Guidelines', type: 'doc' }
    ]
  },
  {
    id: 3,
    title: 'Science Lab Report',
    subject: 'Science',
    subjectIcon: <GraduationCap className="h-4 w-4" />,
    dueDate: '2023-12-20',
    status: 'Submitted',
    priority: 'High',
    description: 'Complete the lab report for the experiment on photosynthesis.',
    completionPercentage: 100,
    submissionDate: '2023-12-19',
    resources: [
      { name: 'Lab Instructions', type: 'pdf' },
      { name: 'Data Collection Sheet', type: 'xlsx' }
    ],
    feedback: {
      grade: 'A',
      comments: 'Excellent work on the analysis section!'
    }
  },
  {
    id: 4,
    title: 'History Research Paper',
    subject: 'History',
    subjectIcon: <GraduationCap className="h-4 w-4" />,
    dueDate: '2023-12-15',
    status: 'Late',
    priority: 'High',
    description: 'Research paper on the Civil War, minimum 8 pages.',
    completionPercentage: 75,
    resources: [
      { name: 'Research Guidelines', type: 'pdf' },
      { name: 'Source Requirements', type: 'doc' }
    ]
  },
  {
    id: 5,
    title: 'Algebra Quiz Preparation',
    subject: 'Mathematics',
    subjectIcon: <BookOpen className="h-4 w-4" />,
    dueDate: '2023-12-30',
    status: 'Not Started',
    priority: 'Low',
    description: 'Study for upcoming quiz on quadratic equations.',
    completionPercentage: 0,
    resources: [
      { name: 'Practice Problems', type: 'pdf' }
    ]
  },
  {
    id: 6,
    title: 'Physics Problem Set',
    subject: 'Science',
    subjectIcon: <GraduationCap className="h-4 w-4" />,
    dueDate: '2024-01-05',
    status: 'Not Started',
    priority: 'Medium',
    description: 'Complete problems from Chapter 7 on thermodynamics.',
    completionPercentage: 0,
    resources: [
      { name: 'Problem Set', type: 'pdf' },
      { name: 'Formula Sheet', type: 'pdf' }
    ]
  },
];

// Get unique list of subjects
const subjects = [...new Set(sampleAssignments.map(a => a.subject))];

// Status badge component
const StatusBadge = ({ status }) => {
  const getStatusStyles = (status) => {
    switch (status) {
      case 'Due Soon':
        return {
          bg: 'bg-amber-500/10 dark:bg-amber-400/20',
          text: 'text-amber-600 dark:text-amber-300',
          icon: <AlertTriangle className="h-3.5 w-3.5" />
        };
      case 'Submitted':
        return {
          bg: 'bg-emerald-500/10 dark:bg-emerald-400/20',
          text: 'text-emerald-600 dark:text-emerald-300',
          icon: <CheckCircle2 className="h-3.5 w-3.5" />
        };
      case 'Late':
        return {
          bg: 'bg-rose-500/10 dark:bg-rose-400/20',
          text: 'text-rose-600 dark:text-rose-300',
          icon: <XCircle className="h-3.5 w-3.5" />
        };
      case 'Not Started':
      default:
        return {
          bg: 'bg-slate-200/50 dark:bg-slate-700/50',
          text: 'text-slate-600 dark:text-slate-300',
          icon: <Clock className="h-3.5 w-3.5" />
        };
    }
  };

  const { bg, text, icon } = getStatusStyles(status);
  
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium flex 
      items-center gap-1.5 transition-colors ${bg} ${text}`}>
      {icon}
      {status}
    </span>
  );
};

// Priority indicator component
const PriorityIndicator = ({ priority }) => {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-500';
      case 'Medium':
        return 'bg-amber-500';
      case 'Low':
      default:
        return 'bg-emerald-500';
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${getPriorityStyles(priority)}`} />
      <span className="text-xs text-slate-500 dark:text-slate-400">
        {priority} Priority
      </span>
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ percentage }) => {
  const getProgressColor = (pct) => {
    if (pct === 100) return 'bg-emerald-500';
    if (pct >= 75) return 'bg-blue-500';
    if (pct >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };
  
  return (
    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full">
      <div 
        className={`h-full rounded-full transition-all duration-500 
          ${getProgressColor(percentage)}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// View type options
const viewOptions = [
  { id: 'list', name: 'List View', icon: <BarChart2 className="h-4 w-4" /> },
  { id: 'calendar', name: 'Calendar', icon: <Calendar className="h-4 w-4" /> },
];

export default function AssignmentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [viewType, setViewType] = useState('list');

  // Filter and sort assignments
  const filteredAssignments = useMemo(() => {
    return sampleAssignments
      .filter(assignment => {
        // Filter by search query
        const matchesSearch = assignment.title.toLowerCase()
          .includes(searchQuery.toLowerCase()) || 
          assignment.description.toLowerCase()
            .includes(searchQuery.toLowerCase());
        
        // Filter by status
        const matchesStatus = statusFilter === 'All' || 
          assignment.status === statusFilter;
        
        // Filter by subject
        const matchesSubject = subjectFilter === 'All' || 
          assignment.subject === subjectFilter;
        
        return matchesSearch && matchesStatus && matchesSubject;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDate') {
          const dateA = new Date(a.dueDate);
          const dateB = new Date(b.dueDate);
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sortBy === 'priority') {
          const priorityValues = { 'High': 3, 'Medium': 2, 'Low': 1 };
          return sortOrder === 'asc' 
            ? priorityValues[a.priority] - priorityValues[b.priority]
            : priorityValues[b.priority] - priorityValues[a.priority];
        } else if (sortBy === 'completion') {
          return sortOrder === 'asc'
            ? a.completionPercentage - b.completionPercentage
            : b.completionPercentage - a.completionPercentage;
        } else { // title
          return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
      });
  }, [searchQuery, statusFilter, subjectFilter, sortBy, sortOrder]);

  // Toggle expanded assignment
  const toggleExpand = (id) => {
    setExpandedAssignment(expandedAssignment === id ? null : id);
  };

  // Handle sort change
  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('asc');
    }
  };

  // Get counts by status for stats
  const statusCounts = useMemo(() => {
    const counts = { 
      'Not Started': 0, 
      'Due Soon': 0, 
      'Late': 0, 
      'Submitted': 0 
    };
    sampleAssignments.forEach(assignment => {
      counts[assignment.status]++;
    });
    return counts;
  }, []);

  // Format a date nicely
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate if a due date is approaching (within 3 days)
  const isApproaching = (dateString) => {
    const now = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 3;
  };

  // Calculate if assignment is overdue
  const isOverdue = (dateString) => {
    return new Date(dateString) < new Date();
  };

  // Render the list view
  const renderListView = () => (
    <div className="space-y-4">
      {filteredAssignments.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto w-24 h-24 bg-slate-100 dark:bg-slate-800 
            rounded-full flex items-center justify-center mb-4">
            <Search className="h-10 w-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white">
            No assignments found
          </h3>
          <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </div>
      ) : (
        filteredAssignments.map((assignment) => (
          <div 
            key={assignment.id}
            className={cn(
              "bg-white dark:bg-slate-800 rounded-xl overflow-hidden transition-all",
              "border border-slate-200 dark:border-slate-700",
              "hover:shadow-md shadow-sm",
              expandedAssignment === assignment.id ? "shadow-md" : ""
            )}
          >
            <div className="p-5">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 
                justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      {assignment.subjectIcon}
                    </div>
                  </div>
                  
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h2 className="text-lg font-medium text-slate-900 
                        dark:text-white truncate">
                        {assignment.title}
                      </h2>
                      <PriorityIndicator priority={assignment.priority} />
                    </div>
                    
                    <div className="flex items-center text-sm text-slate-500 
                      dark:text-slate-400">
                      <span>{assignment.subject}</span>
                      <span className="mx-2">•</span>
                      <span className={cn(
                        isOverdue(assignment.dueDate) ? 
                          "text-rose-500 dark:text-rose-400" : 
                          isApproaching(assignment.dueDate) ? 
                            "text-amber-500 dark:text-amber-400" : ""
                      )}>
                        Due {formatDate(assignment.dueDate)}
                        {isOverdue(assignment.dueDate) && " (Overdue)"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 mt-2 lg:mt-0">
                  <div className="flex-1 lg:flex-none w-full lg:w-24">
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      Progress: {assignment.completionPercentage}%
                    </div>
                    <ProgressBar percentage={assignment.completionPercentage} />
                  </div>
                  
                  <StatusBadge status={assignment.status} />
                  
                  <button
                    onClick={() => toggleExpand(assignment.id)}
                    className="p-1.5 rounded-md text-slate-400 hover:text-slate-600
                      hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-300
                      transition-colors"
                    aria-label={expandedAssignment === assignment.id ? 
                      "Collapse details" : "Expand details"}
                  >
                    <ChevronDown className={cn(
                      "h-5 w-5 transition-transform duration-200",
                      expandedAssignment === assignment.id ? "rotate-180" : ""
                    )} />
                  </button>
                </div>
              </div>
            </div>
            
            {expandedAssignment === assignment.id && (
              <div className="p-5 border-t border-slate-200 dark:border-slate-700
                bg-slate-50 dark:bg-slate-800/60 animate-fadeIn">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-700 
                      dark:text-slate-200 mb-1">
                      Description
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {assignment.description}
                    </p>
                  </div>
                  
                  {assignment.resources && assignment.resources.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-slate-700 
                        dark:text-slate-200 mb-2">
                        Resources
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {assignment.resources.map((resource, idx) => (
                          <button 
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5
                              text-xs font-medium rounded-md bg-white 
                              dark:bg-slate-700 border border-slate-200 
                              dark:border-slate-600 text-slate-700 
                              dark:text-slate-200 hover:bg-slate-50 
                              dark:hover:bg-slate-600 transition-colors"
                          >
                            <BookOpen className="h-3.5 w-3.5" />
                            {resource.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {assignment.status === 'Submitted' && assignment.feedback && (
                    <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20
                      border border-emerald-100 dark:border-emerald-900/30
                      rounded-lg">
                      <h3 className="text-sm font-medium text-emerald-800 
                        dark:text-emerald-200 mb-1">
                        Feedback
                      </h3>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-emerald-700 
                          dark:text-emerald-300">
                          Grade: {assignment.feedback.grade}
                        </span>
                      </div>
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        {assignment.feedback.comments}
                      </p>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-3 justify-end pt-2">
                    {assignment.status !== 'Submitted' && (
                      <>
                        <button className="btn-secondary">
                          Edit Submission
                        </button>
                        <button className="btn-primary">
                          Submit Assignment
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  // Render the calendar view (simplified)
  const renderCalendarView = () => {
    // Group assignments by due date
    const assignmentsByDate = {};
    
    filteredAssignments.forEach(assignment => {
      const date = assignment.dueDate;
      if (!assignmentsByDate[date]) {
        assignmentsByDate[date] = [];
      }
      assignmentsByDate[date].push(assignment);
    });
    
    // Sort dates
    const sortedDates = Object.keys(assignmentsByDate).sort();
    
    return (
      <div className="space-y-6">
        {sortedDates.map(date => (
          <div key={date} className="bg-white dark:bg-slate-800 rounded-xl 
            shadow-sm overflow-hidden">
            <div className="bg-blue-50 dark:bg-blue-900/20 px-5 py-3 border-b 
              border-blue-100 dark:border-blue-900/30">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-blue-800 dark:text-blue-200">
                  {formatDate(date)}
                </h3>
                <span className="text-sm text-blue-600 dark:text-blue-300">
                  {assignmentsByDate[date].length} Assignment{
                    assignmentsByDate[date].length !== 1 ? 's' : ''
                  }
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {assignmentsByDate[date].map(assignment => (
                <div key={assignment.id} className="p-4 hover:bg-slate-50 
                  dark:hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 
                        rounded-lg">
                        {assignment.subjectIcon}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 
                          dark:text-white">
                          {assignment.title}
                        </h4>
                        <div className="text-sm text-slate-500 
                          dark:text-slate-400">
                          {assignment.subject}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <ProgressBar percentage={assignment.completionPercentage} />
                      <div className="w-24 text-right">
                        <StatusBadge status={assignment.status} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors 
      duration-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white 
              bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text 
              text-transparent" data-oid="1hbo45p">
              Assignments
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              Track, manage, and submit your assignments
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {Object.entries(statusCounts).map(([status, count]) => {
              const getCardStyles = (status) => {
                switch (status) {
                  case 'Due Soon':
                    return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20';
                  case 'Submitted':
                    return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20';
                  case 'Late':
                    return 'border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-900/20';
                  case 'Not Started':
                  default:
                    return 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800';
                }
              };
              
              return (
                <div 
                  key={status}
                  className={`rounded-xl p-4 border ${getCardStyles(status)}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-slate-500 
                      dark:text-slate-400">
                      {status}
                    </h3>
                    <StatusBadge status={status} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">
                    {count}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Filters and controls */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 mb-6 
            shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center 
                  pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 
                    dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 
                    text-slate-900 dark:text-slate-100 placeholder-slate-400 
                    dark:placeholder-slate-500 focus:ring-2 focus:ring-blue-500
                    dark:focus:ring-blue-600 focus:border-transparent"
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <div className="w-40">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full border border-slate-300 dark:border-slate-600 
                      rounded-lg bg-white dark:bg-slate-700 text-slate-900 
                      dark:text-slate-100 px-3 py-2 appearance-none"
                    aria-label="Filter by status"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Not Started">Not Started</option>
                    <option value="Due Soon">Due Soon</option>
                    <option value="Late">Late</option>
                    <option value="Submitted">Submitted</option>
                  </select>
                </div>
                
                <div className="w-40">
                  <select
                    value={subjectFilter}
                    onChange={(e) => setSubjectFilter(e.target.value)}
                    className="w-full border border-slate-300 dark:border-slate-600 
                      rounded-lg bg-white dark:bg-slate-700 text-slate-900 
                      dark:text-slate-100 px-3 py-2 appearance-none"
                    aria-label="Filter by subject"
                  >
                    <option value="All">All Subjects</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>
                
                <div className="w-40">
                  <select
                    value={`${sortBy}-${sortOrder}`}
                    onChange={(e) => {
                      const [newSortBy, newSortOrder] = e.target.value.split('-');
                      setSortBy(newSortBy);
                      setSortOrder(newSortOrder);
                    }}
                    className="w-full border border-slate-300 dark:border-slate-600 
                      rounded-lg bg-white dark:bg-slate-700 text-slate-900 
                      dark:text-slate-100 px-3 py-2 appearance-none"
                    aria-label="Sort assignments"
                  >
                    <option value="dueDate-asc">Due Date (Earliest)</option>
                    <option value="dueDate-desc">Due Date (Latest)</option>
                    <option value="priority-desc">Priority (High-Low)</option>
                    <option value="priority-asc">Priority (Low-High)</option>
                    <option value="completion-desc">Progress (High-Low)</option>
                    <option value="completion-asc">Progress (Low-High)</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 
              border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center space-x-1">
                <Filter className="h-4 w-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {filteredAssignments.length} assignments found
                </span>
              </div>
              
              <div className="flex items-center space-x-2 rounded-lg 
                bg-slate-100 dark:bg-slate-700 p-1">
                {viewOptions.map(option => (
                  <button
                    key={option.id}
                    onClick={() => setViewType(option.id)}
                    className={cn(
                      "flex items-center space-x-1.5 rounded-md px-3 py-1.5 text-sm",
                      viewType === option.id
                        ? "bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-200 shadow-sm"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    )}
                  >
                    {option.icon}
                    <span>{option.name}</span>
                  </button>
                ))}
              </div>
              
              <button className="btn-primary flex items-center gap-1.5" 
                aria-label="Add new assignment">
                <PlusCircle className="h-4 w-4" />
                <span>Add New</span>
              </button>
            </div>
          </div>

          {/* Assignment list */}
          <div className="mb-8">
            {viewType === 'list' ? renderListView() : renderCalendarView()}
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .btn-primary {
          @apply px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700
            text-white font-medium text-sm shadow-sm transition-colors
            dark:bg-blue-700 dark:hover:bg-blue-600;
        }
        .btn-secondary {
          @apply px-4 py-2 rounded-md bg-white hover:bg-slate-50
            text-slate-700 font-medium text-sm shadow-sm transition-colors
            border border-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600
            dark:text-slate-200 dark:border-slate-600;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
