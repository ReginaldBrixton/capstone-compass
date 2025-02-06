"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

// Helper function to determine if a link is active
const isLinkActive = (href, pathname) => {
  // Handle root path specifically
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
};

export function SidebarNav({ children, className = "" }) {
  return (
    <nav
      className={`flex-1 overflow-y-auto overflow-x-hidden p-2 ${className}`}
    >
      <ul className="space-y-2">{children}</ul>
    </nav>
  );
}

export function SidebarNavItem({
  icon: Icon,
  label,
  href,
  onClick,
  className = "",
  badge,
}) {
  const { isCollapsed } = useSidebar();
  const pathname = usePathname();

  const isActive = href ? isLinkActive(href, pathname) : false;

  const baseStyles = `
    flex items-center
    w-full px-3 py-2
    text-gray-700 dark:text-gray-200
    rounded-lg
    transition-all duration-200 ease-in-out
    ${
      isActive
        ? "bg-gray-100 dark:bg-gray-800 font-medium"
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    }
    ${className}
  `;

  const content = (
    <>
      {Icon && (
        <div
          className={`flex-shrink-0 ${isCollapsed ? "w-6 h-6" : "w-5 h-5"}`}
        >
          <Icon className="w-full h-full" />
        </div>
      )}
      {!isCollapsed && (
        <span
          className={`ml-3 transition-opacity duration-200 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
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

  // Use Next.js Link for internal links, button for onClick
  if (href) {
    return (
      <li>
        <Link href={href} className={baseStyles} prefetch={false}>
          {content}
        </Link>
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

export function SidebarNavGroup({ label, children, className = "" }) {
  const { isCollapsed } = useSidebar();

  return (
    <div className={`space-y-2 ${className}`}>
      {!isCollapsed && (
        <h2
          className={`
            px-3 text-xs font-semibold
            text-gray-500 uppercase tracking-wider
          `}
        >
          {label}
        </h2>
      )}
      <ul className="space-y-1">{children}</ul>
    </div>
  );
}