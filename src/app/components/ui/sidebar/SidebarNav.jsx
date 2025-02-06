'use client';

import { useSidebar } from './SidebarContext';

export function SidebarNav({ children, className = '' }) {
  return (
    <nav className={`flex-1 overflow-y-auto p-4 ${className}`}>
      <ul className="space-y-2">
        {children}
      </ul>
    </nav>
  );
}

export function SidebarNavItem({
  icon: Icon,
  label,
  href,
  isActive = false,
  onClick,
  className = '',
  badge,
}) {
  const { isCollapsed } = useSidebar();

  const baseStyles = `
    flex items-center
    w-full px-3 py-2
    text-gray-700 dark:text-gray-200
    rounded-lg
    transition-all duration-200 ease-in-out
    hover:bg-gray-100 dark:hover:bg-gray-800
    ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-medium' : ''}
    ${className}
  `;

  const content = (
    <>
      {Icon && (
        <div className={`flex-shrink-0 ${isCollapsed ? 'w-6 h-6' : 'w-5 h-5'}`}>
          <Icon className="w-full h-full transition-transform duration-200" />
        </div>
      )}
      {!isCollapsed && (
        <span className="ml-3 transition-opacity duration-200">
          {label}
        </span>
      )}
      {badge && !isCollapsed && (
        <span className="ml-auto px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 transition-all duration-200">
          {badge}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <li>
        <a href={href} className={baseStyles}>
          {content}
        </a>
      </li>
    );
  }

  return (
    <li>
      <button onClick={onClick} className={baseStyles}>
        {content}
      </button>
    </li>
  );
}

export function SidebarNavGroup({ 
  label, 
  children, 
  className = '' 
}) {
  const { isCollapsed } = useSidebar();

  return (
    <div className={`space-y-2 ${className}`}>
      {label && !isCollapsed && (
        <h2 className={`
          px-3 text-xs font-semibold 
          text-gray-500 uppercase tracking-wider
          transition-opacity duration-200
          ${isCollapsed ? 'opacity-0 h-0' : 'opacity-100 h-auto'}
        `}>
          {label}
        </h2>
      )}
      {children}
    </div>
  );
}