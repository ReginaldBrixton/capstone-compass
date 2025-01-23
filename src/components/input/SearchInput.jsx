'use client';

import React from 'react';

import { cn } from '@/utils/cn';

/**
 * SearchInput Component Documentation
 *
 * A flexible and customizable search input component built using the compound component pattern.
 * It provides a clean interface for creating search inputs with various styles and features.
 *
 * Features:
 * - Compound component architecture for flexible composition
 * - Multiple style variants (circle, box, default)
 * - State variants (success, error) with animations
 * - Dark mode support
 * - Customizable icon with click handler
 * - Optional label
 * - Responsive design
 *
 * Usage Example:
 * ```jsx
 * <SearchInput
 *   id="search-demo"
 *   className="search-demo-input"
 *   style="circle success"
 * >
 *   <SearchLabel>Search Teams</SearchLabel>
 *   <SearchValue>{searchValue}</SearchValue>
 *   <SearchOnChange>{handleSearchChange}</SearchOnChange>
 *   <SearchPlaceholder>Search Teams...</SearchPlaceholder>
 *   <SearchIcon onClick={() => console.log('Search clicked')}>
 *     <Search className="w-5 h-5" />
 *   </SearchIcon>
 * </SearchInput>
 * ```
 *
 * Sub-Components:
 *
 * 1. SearchValue
 * - Purpose: Provides the value for the search input
 * - Props: {children: React.ReactNode}
 *
 * 2. SearchOnChange
 * - Purpose: Provides the onChange handler
 * - Props: {children: function}
 *
 * 3. SearchPlaceholder
 * - Purpose: Sets the input placeholder text
 * - Props: {children: React.ReactNode}
 *
 * 4. SearchIcon
 * - Purpose: Adds a clickable icon to the input
 * - Props: {children: React.ReactNode, onClick?: function}
 *
 * 5. SearchLabel
 * - Purpose: Adds a label above the input
 * - Props: {children: React.ReactNode, disable?: boolean}
 *
 * Main Component Props:
 * @param {object} props - The component props
 * @param {string} [props.id='search-input'] - Input element ID
 * @param {React.ReactNode} props.children - Compound components
 * @param {string} [props.className] - Additional CSS classes
 * @param {string} [props.style='default'] - Style variant ('circle' | 'box' | 'default' | 'success' | 'error')
 *
 * Style Variants:
 * - circle: Fully rounded corners
 * - box: Sharp corners
 * - default: Slightly rounded corners
 * - success: Green focus ring with glow animation
 * - error: Red focus ring with glow animation
 *
 * Accessibility:
 * - Proper ARIA labels
 * - Keyboard navigation support
 * - Semantic HTML structure
 *
 * Theming:
 * - Supports light and dark modes
 * - Customizable through className prop
 * - Consistent styling with design system
 */

const SearchValue = ({ children }) => children;

/**
 * Compound component to provide an onChange handler for the search input.
 * @param {object} props - The component props.
 * @param {function} props.children - The onChange handler function.
 * @returns {function} The children prop.
 */
const SearchOnChange = ({ children }) => children;

/**
 * Compound component to provide a placeholder for the search input.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The placeholder text.
 * @returns {React.ReactNode} The children prop.
 */
const SearchPlaceholder = ({ children }) => children;

/**
 * Compound component to provide an icon for the search input.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The icon to be displayed.
 * @param {function} [props.onClick] - Optional click handler for the icon.
 * @returns {React.ReactNode} The icon wrapped in a clickable div.
 */
const SearchIcon = ({ children, onClick }) => (
  <div onClick={onClick} className="cursor-pointer">
    {children}
  </div>
);

/**
 * Compound component to provide a label for the search input.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The label text.
 * @param {boolean} [props.disable] - Flag to disable the label.
 * @returns {React.ReactNode} The children prop.
 */
const SearchLabel = ({ children, disable }) => children;

/**
 * Main SearchInput component that composes various compound components.
 * @param {object} props - The component props.
 * @param {string} [props.id='search-input'] - The id for the input element.
 * @param {React.ReactNode} props.children - The compound components.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {string} [props.style='default'] - Style variant for the input.
 * @returns {JSX.Element} The rendered search input component.
 */
const SearchInput = ({ id = 'search-input', children, className, style = 'default' }) => {
  // Default values
  let value = '';
  let onChange = () => {};
  let placeholder = 'Search...';
  let icon = null;
  let iconOnClick = () => {};
  let label = null;
  let labelDisabled = false;

  // Extract values from children
  React.Children.forEach(children, (child) => {
    if (!child) return;

    switch (child.type) {
      case SearchValue:
        value = child.props.children;
        break;
      case SearchOnChange:
        onChange = child.props.children;
        break;
      case SearchPlaceholder:
        placeholder = child.props.children;
        break;
      case SearchIcon:
        icon = child.props.children;
        iconOnClick = child.props.onClick;
        break;
      case SearchLabel:
        label = child.props.children;
        labelDisabled = child.props.disable;
        break;
      default:
        break;
    }
  });

  // Style variants
  const styleVariants = {
    circle: 'rounded-full',
    box: 'rounded-none',
    default: 'rounded',
    success:
      'focus:ring-green-500 focus:border-green-500 dark:focus:ring-green-400 dark:focus:border-green-400 animate-[glow_1.5s_ease-in-out_infinite] focus:ring-[3px]',
    error:
      'focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-400 dark:focus:border-red-400 animate-[glow_1.5s_ease-in-out_infinite] focus:ring-[3px]',
  };

  // Parse style prop to get variants
  const styles = style.split(' ');
  const shape = styles.find((s) => ['circle', 'box', 'default'].includes(s)) || 'default';
  const state = styles.find((s) => ['success', 'error'].includes(s));

  return (
    <div className={cn('relative w-full', className)}>
      {label && !labelDisabled && (
        <label
          htmlFor={id}
          className="block mb-2 pl-1 text-sm font-medium text-gray-900 dark:text-gray-100"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            'w-full px-4 py-2.5',
            icon && 'pr-12', // Add padding right if icon exists
            'text-base', // Increased text size
            'text-gray-900 dark:text-gray-100',
            'bg-white dark:bg-gray-800',
            'border border-gray-300 dark:border-gray-600',
            'focus:outline-none focus:ring-2',
            !state &&
              'focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400',
            state && styleVariants[state],
            styleVariants[shape],
            'placeholder-gray-500 dark:placeholder-gray-400',
            'transition-all duration-200',
            'shadow-sm'
          )}
        />
        {icon && (
          <button
            type="button"
            onClick={iconOnClick}
            className={cn(
              'absolute right-3',
              'p-1',
              'flex items-center justify-center w-8 h-8',
              iconOnClick && 'cursor-pointer',
              !iconOnClick && 'pointer-events-none',
              'text-gray-500 dark:text-gray-400',
              'rounded-md',
              'transition-all duration-200',
              'hover:text-blue-500 dark:hover:text-blue-400',
              'hover:glow-sm active:glow-md',
              'hover:shadow-[0_0_10px_rgba(59,130,246,0.5)] dark:hover:shadow-[0_0_10px_rgba(96,165,250,0.5)]',
              'active:shadow-[0_0_15px_rgba(37,99,235,0.6)] dark:active:shadow-[0_0_15px_rgba(59,130,246,0.6)]'
            )}
            aria-label="Search"
          >
            <span className="w-5 h-5">{icon}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export { SearchValue, SearchOnChange, SearchPlaceholder, SearchIcon, SearchLabel };
export default SearchInput;
