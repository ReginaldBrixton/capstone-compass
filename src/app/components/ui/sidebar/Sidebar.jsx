'use client';

import { useSidebar } from './SidebarContext';

export function Sidebar({
  children,
  className = '',
  showBackdrop = true,
  enableAnimation = true,
}) {
  const { isOpen, isCollapsed, toggleSidebar } = useSidebar();

  const baseStyles = `
    fixed md:relative
    h-[100dvh]
    flex flex-col
    bg-white dark:bg-gray-900
    border-r border-gray-200 dark:border-gray-800
    transition-all duration-300 ease-in-out
    overflow-hidden
    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    ${isCollapsed ? 'w-20' : 'w-64'}
    ${className}
  `;

  const backdropStyles = `
    fixed inset-0 
    bg-black/50 
    md:hidden
    transition-opacity duration-300
    z-40
    ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
  `;

  return (
    <>
      {showBackdrop && <div className={backdropStyles} onClick={() => toggleSidebar()} />}
      <aside className={baseStyles} style={{ zIndex: 50 }}>
        <div className="flex flex-col h-full">
          {children}
        </div>
      </aside>
    </>
  );
} 