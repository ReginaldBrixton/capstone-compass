import Link from 'next/link';
import {
  HomeIcon,
  BookOpenIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'; // Example icons - use your preferred library

export const AppSidebar = ({ isOpen, onToggle }) => {
  return (
    <aside
      className={`bg-white dark:bg-gray-800 h-full flex flex-col justify-between shadow-lg ${
        isOpen ? '' : ''
      }`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {isOpen && (
            <span className="text-lg font-semibold">Student Portal</span>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle Sidebar"
          >
            {isOpen ? (
              <ChevronLeftIcon className="h-6 w-6" />
            ) : (
              <ChevronRightIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <ul>
            <li className="mb-2">
              <Link href="/student/dashboard">
                <a
                  className={`flex items-center p-4 ${
                    isOpen ? '' : 'justify-center'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200`}
                >
                  <HomeIcon className="h-5 w-5 mr-3" />
                  {isOpen && <span>Dashboard</span>}
                </a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/student/courses">
                <a
                  className={`flex items-center p-4 ${
                    isOpen ? '' : 'justify-center'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200`}
                >
                  <BookOpenIcon className="h-5 w-5 mr-3" />
                  {isOpen && <span>Courses</span>}
                </a>
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/student/profile">
                <a
                  className={`flex items-center p-4 ${
                    isOpen ? '' : 'justify-center'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200`}
                >
                  <UserIcon className="h-5 w-5 mr-3" />
                  {isOpen && <span>Profile</span>}
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Sidebar Footer (optional) */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {/* ... Footer content (e.g., settings, logout) ... */}
        </div>
      )}
    </aside>
  );
}; 