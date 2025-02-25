import React from 'react';
import { ArrowDownIcon, ArrowUpIcon, TrendingUpIcon } from 'lucide-react';

/**
 * MetricCard component displays a card with a title, value, change percentage,
 * and an icon. It visually indicates whether the change is positive or negative.
 * Enhanced for better visual appeal, interactivity, and responsiveness across all device sizes.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The value of the metric.
 * @param {number} props.change - The change in percentage.
 * @param {React.ReactNode} props.icon - The icon to display.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {string} [props.description] - Optional description text.
 * @param {Function} [props.onClick] - Optional click handler for interaction.
 * @param {string} [props.tooltipText] - Optional tooltip text for more information.
 * @returns {JSX.Element} The rendered MetricCard component.
 */
const MetricCard = ({ 
  title, 
  value, 
  change, 
  icon, 
  className,
  description,
  onClick,
  tooltipText
}) => {
  const isPositive = change > 0;
  const isNeutral = change === 0;

  // Determine color scheme based on change direction
  const colorScheme = isPositive 
    ? 'positive' 
    : isNeutral 
      ? 'neutral' 
      : 'negative';
  
  const colorClasses = {
    positive: {
      badge: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      bar: 'bg-green-500 dark:bg-green-600',
      glow: 'bg-green-400'
    },
    neutral: {
      badge: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
      bar: 'bg-blue-500 dark:bg-blue-600',
      glow: 'bg-blue-400'
    },
    negative: {
      badge: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      bar: 'bg-red-500 dark:bg-red-600',
      glow: 'bg-red-400'
    }
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700
        bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-all duration-300
        p-3 sm:p-4 md:p-5
        ${onClick ? 'cursor-pointer active:scale-[0.98] hover:scale-[1.02]' : ''}
        touch-manipulation select-none
        ${className || ''}
      `}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={tooltipText || title}
      data-tooltip={tooltipText}
    >
      {/* Top section with icon and title */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className={`flex-shrink-0 p-1.5 sm:p-2 rounded-full 
            bg-gray-50 dark:bg-gray-800 
            ${colorClasses[colorScheme].badge.replace('text-', 'ring-').replace('bg-', 'ring-')} 
            ring-1 ring-opacity-30`}>
            {React.cloneElement(icon, { 
              className: 'h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5',
              'aria-hidden': 'true'
            })}
          </div>
          <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700 dark:text-gray-300">
            {title}
          </h3>
        </div>

        <div
          className={`
            inline-flex items-center gap-1 rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 
            text-xs font-medium transition-colors duration-200
            ${colorClasses[colorScheme].badge}
            shadow-sm
          `}
          aria-label={`${change}% ${isPositive ? 'increase' : isNeutral ? 'unchanged' : 'decrease'}`}
        >
          {isPositive ? (
            <ArrowUpIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          ) : isNeutral ? (
            <TrendingUpIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          ) : (
            <ArrowDownIcon className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
          )}
          <span className="text-[10px] sm:text-xs font-bold">{Math.abs(change)}%</span>
        </div>
      </div>

      {/* Value section */}
      <div className="mt-2 sm:mt-3">
        <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {value}
        </p>
        {description && (
          <p className="mt-1 sm:mt-1.5 text-[11px] xs:text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Visual indicator bar */}
      <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden shadow-inner">
        <div 
          className={`h-full rounded-full transform transition-all duration-500 ${colorClasses[colorScheme].bar}`}
          style={{ width: `${Math.min(Math.abs(change) * 2, 100)}%` }}
          aria-hidden="true"
        />
      </div>
      
      {/* Enhanced background decoration with better blur and positioning */}
      <div 
        className={`absolute -right-8 -bottom-8 w-28 h-28 rounded-full opacity-15 blur-xl 
        ${colorClasses[colorScheme].glow}`}
        aria-hidden="true"
      />

      {/* Small decorative circle for additional visual interest */}
      <div 
        className={`absolute right-8 top-10 w-2 h-2 rounded-full opacity-40 
        ${colorClasses[colorScheme].glow}`}
        aria-hidden="true"
      />
      
      {/* Tooltip for mobile - appears on touch and hold */}
      {tooltipText && (
        <div className="hidden group-active:block sm:group-hover:block absolute -top-10 left-1/2 transform -translate-x-1/2 
        bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-active:opacity-100 
        sm:group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
