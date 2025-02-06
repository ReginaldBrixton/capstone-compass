import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

/**
 * MetricCard component displays a card with a title, value, change percentage,
 * and an icon. It visually indicates whether the change is positive or negative.
 * Optimized for responsiveness across all screen sizes.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The value of the metric.
 * @param {number} props.change - The change in percentage.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {string} [props.className] - Additional class names for styling.
 * @returns {JSX.Element} The rendered MetricCard component.
 */
const MetricCard = ({ title, value, change, icon, className }) => {
  const isPositive = change > 0;

  return (
    <div
      className={`
        relative rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900
        p-4 sm:p-5 md:p-6
        ${className}
      `}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>

        <div
          className={`
            inline-flex items-center gap-1 self-start
            rounded-full px-2 py-1 text-xs font-medium
            ${isPositive
              ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }
          `}
        >
          {isPositive ? (
            <ArrowUpIcon className="h-3 w-3" />
          ) : (
            <ArrowDownIcon className="h-3 w-3" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <div className="mt-3 text-gray-500 dark:text-gray-400">
        {icon}
      </div>
    </div>
  );
};

export default MetricCard;
