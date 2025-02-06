import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiCalendar,
  FiCheck,
  FiClock,
  FiEdit2,
  FiFilter,
  FiPlus,
  FiTrash2,
  FiUser,
} from 'react-icons/fi';
import ConfirmDialog from './ConfirmDialog';
const getStatusStyles = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    case 'in-progress':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    case 'pending':
      return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  }
};
const TaskCard = ({ task, onEdit, onDelete }) => (
  <motion.div
    className={`rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 md:p-6`}
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    exit={{
      opacity: 0,
      y: -20,
    }}
    layout
    data-oid="4z-w0.2"
  >
    <div className="mb-4 flex items-start justify-between gap-4" data-oid="y7xesqu">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white" data-oid=".15r5sq">
        {task.title}
      </h3>
      <span
        className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyles(task.status)}`}
        data-oid="4ta.2js"
      >
        {task.status}
      </span>
    </div>

    <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300" data-oid="vv5j9j4">
      {task.description}
    </p>

    <div
      className="mt-auto flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400"
      data-oid="3yadfea"
    >
      <div className="flex items-center gap-2" data-oid="erjvwz:">
        <FiCalendar className="h-4 w-4" data-oid="uy1ch:c" />
        <span data-oid="x3z9pvs">Due: {task.dueDate}</span>
      </div>
      <div className="flex items-center gap-2" data-oid="s7ath7q">
        <FiUser className="h-4 w-4" data-oid="mkp6:fa" />
        <span data-oid="hvs.pc4">{task.assignee}</span>
      </div>
      <div className="ml-auto flex items-center gap-2" data-oid="z2cnfvg">
        <button
          onClick={() => onEdit(task)}
          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition-colors duration-200 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50"
          title="Edit task"
          data-oid="yrqr7zz"
        >
          <FiEdit2 className="h-4 w-4" data-oid="aj9k:xx" />
        </button>
        <button
          onClick={() => onDelete(task)}
          className="rounded-lg bg-red-100 p-2 text-red-600 transition-colors duration-200 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50"
          title="Delete task"
          data-oid="dl-y2v4"
        >
          <FiTrash2 className="h-4 w-4" data-oid="b6ck859" />
        </button>
      </div>
    </div>
  </motion.div>
);
const TasksSection = ({ teamId }) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulated API call to fetch tasks
    const fetchTasks = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        const mockTasks = [
          {
            id: 1,
            title: 'Design System Implementation',
            description:
              'Create a comprehensive design system for the project including colors, typography, and components.',
            status: 'in-progress',
            dueDate: '2024-01-15',
            assignee: 'John Doe',
            priority: 'High',
          },
          // ... existing mock tasks ...
        ];
        setTimeout(() => {
          setTasks(mockTasks);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      }
    };
    fetchTasks();
  }, [teamId]);
  const handleCreateTask = () => {
    // Handle task creation logic
    console.log('Creating new task for team:', teamId);
  };
  const handleDeleteTask = async () => {
    if (!selectedTask) return;
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTasks(tasks.filter((task) => task.id !== selectedTask.id));
      console.log('Deleted task:', selectedTask.id);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setShowDeleteDialog(false);
      setSelectedTask(null);
    }
  };
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'all') return true;
      return task.status === filter;
    })
    .filter((task) => {
      if (!searchQuery) return true;
      return (
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate) - new Date(b.dueDate);
        case 'priority':
          const priorityOrder = {
            High: 3,
            Medium: 2,
            Low: 1,
          };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  return (
    <div className="space-y-6" data-oid="ko:5v1m">
      <div className="flex flex-wrap items-center justify-between gap-4" data-oid="kfvl_oz">
        <motion.button
          className={`flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 font-medium text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:translate-y-0 dark:bg-blue-600 dark:hover:bg-blue-700`}
          onClick={handleCreateTask}
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.98,
          }}
          data-oid="n.ys3ek"
        >
          <FiPlus className="h-5 w-5" data-oid="r08jhyg" />
          Create Task
        </motion.button>
      </div>

      <div className="flex flex-wrap gap-4" data-oid=".62mnnz">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          data-oid="hrdswlu"
        >
          <option value="all" data-oid=".od77rk">
            All Status
          </option>
          <option value="pending" data-oid=":sfa207">
            Pending
          </option>
          <option value="in-progress" data-oid="2z8he19">
            In Progress
          </option>
          <option value="completed" data-oid="icq7ol0">
            Completed
          </option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
          data-oid="3:121z7"
        >
          <option value="dueDate" data-oid="8hqgv5f">
            Sort by Due Date
          </option>
          <option value="priority" data-oid="9qbe:y6">
            Sort by Priority
          </option>
          <option value="title" data-oid="_h.z2w4">
            Sort by Title
          </option>
        </select>

        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="min-w-[200px] flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 placeholder-gray-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500"
          data-oid="bubsfxm"
        />
      </div>

      <div
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3"
        data-oid="p16t9px"
      >
        <AnimatePresence mode="popLayout" data-oid="plsgbgu">
          {loading ? (
            <motion.div
              className="col-span-full py-12 text-center"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              data-oid="2e1e54r"
            >
              <div
                className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 dark:border-blue-400"
                data-oid="fr1t0.."
              />
              <p className="text-gray-600 dark:text-gray-400" data-oid="dzsnl93">
                Loading tasks...
              </p>
            </motion.div>
          ) : filteredTasks.length === 0 ? (
            <motion.div
              className="col-span-full py-12 text-center"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              data-oid="5oraum5"
            >
              <p className="text-gray-600 dark:text-gray-400" data-oid="-vjek2b">
                No tasks found
              </p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => console.log('Edit task:', task.id)}
                onDelete={() => {
                  setSelectedTask(task);
                  setShowDeleteDialog(true);
                }}
                data-oid="ab:b3:3"
              />
            ))
          )}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedTask(null);
        }}
        onConfirm={handleDeleteTask}
        title="Delete Task"
        message={`Are you sure you want to delete "${selectedTask?.title}"? This action cannot be undone.`}
        confirmText="Delete"
        icon="🗑️"
        data-oid="xpz5j6y"
      />
    </div>
  );
};
export default TasksSection;
