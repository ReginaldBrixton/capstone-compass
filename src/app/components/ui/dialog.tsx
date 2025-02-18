"use client";

/**
 * A native-looking dialog component that adapts to mobile and desktop views.
 * Provides a modal dialog with customizable header, content, and actions.
 * Supports swipe-to-dismiss on mobile devices.
 *
 * @example
 * ```tsx
 * <ResponsiveDialog>
 *   <ResponsiveDialogTrigger>Open Dialog</ResponsiveDialogTrigger>
 *   <ResponsiveDialogContent>
 *     <ResponsiveDialogHeader>
 *       <ResponsiveDialogTitle>Confirm Action</ResponsiveDialogTitle>
 *       <ResponsiveDialogDescription>
 *         Are you sure you want to proceed?
 *       </ResponsiveDialogDescription>
 *     </ResponsiveDialogHeader>
 *     <ResponsiveDialogFooter>
 *       <ResponsiveDialogAction onClick={() => handleConfirm()}>
 *         Confirm
 *       </ResponsiveDialogAction>
 *       <ResponsiveDialogClose>Cancel</ResponsiveDialogClose>
 *     </ResponsiveDialogFooter>
 *   </ResponsiveDialogContent>
 * </ResponsiveDialog>
 * ```
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
  useCallback,
} from "react";
import { X } from "lucide-react";
import React from "react";

interface ResponsiveDialogProps {
  children: ReactNode;
  /** Initial open state of the dialog */
  defaultOpen?: boolean;
  /** Callback fired when dialog open state changes */
  onOpenChange?: (open: boolean) => void;
}

interface ResponsiveDialogContextType {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  isMobile: boolean;
  /** Ref to the dialog content element */
  contentRef: React.RefObject<HTMLDivElement | null>;
}

const ResponsiveDialogContext =
  createContext<ResponsiveDialogContextType | undefined>(undefined);

export function ResponsiveDialog({
  children,
  defaultOpen = false,
  onOpenChange,
}: ResponsiveDialogProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
    };
    checkMobile();

    const handleResize = () => {
      requestAnimationFrame(checkMobile);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openDialog = useCallback((): void => {
    setIsOpen(true);
    onOpenChange?.(true);
  }, [onOpenChange]);

  const closeDialog = useCallback((): void => {
    setIsOpen(false);
    onOpenChange?.(false);
  }, [onOpenChange]);

  return (
    <ResponsiveDialogContext.Provider
      value={{ isOpen, openDialog, closeDialog, isMobile, contentRef }}
    >
      {/* ResponsiveDialog Component - Root */}
      <div className="responsive-dialog" id="responsive-dialog">
        {children}
      </div>
    </ResponsiveDialogContext.Provider>
  );
}

interface TriggerProps {
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Whether the trigger is disabled */
  disabled?: boolean;
}

export function ResponsiveDialogTrigger({
  children,
  className = "",
  disabled = false,
}: TriggerProps) {
  const context = useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error(
      "ResponsiveDialogTrigger must be used within a ResponsiveDialog"
    );
  }

  return (
    <button
      onClick={context.openDialog}
      disabled={disabled}
      className={`responsive-dialog-trigger px-4 py-2 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 rounded-lg
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-200 ${className}`}
      aria-haspopup="dialog"
      id="responsive-dialog-trigger"
    >
      {children}
    </button>
  );
}

interface ContentProps {
  children: ReactNode;
  /** Additional CSS classes for the content wrapper */
  className?: string;
}

export function ResponsiveDialogContent({
  children,
  className = "",
}: ContentProps) {
  const context = useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error(
      "ResponsiveDialogContent must be used within a ResponsiveDialog"
    );
  }

  const { isOpen, closeDialog, isMobile, contentRef } = context;
  const touchStartY = useRef<number | null>(null);
  const currentTranslateY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeDialog]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      contentRef.current.focus();
    }
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
    if (contentRef.current) {
      contentRef.current.style.transition = 'none';
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile || !isDragging.current || touchStartY.current === null) return;

    const deltaY = e.touches[0].clientY - touchStartY.current;
    if (deltaY < 0) return;

    currentTranslateY.current = deltaY;
    if (contentRef.current) {
      const opacity = Math.max(1 - deltaY / 500, 0);
      contentRef.current.style.transform = `translateY(${deltaY}px)`;
      contentRef.current.style.opacity = opacity.toString();
    }
  };

  const handleTouchEnd = () => {
    if (!isMobile || !isDragging.current) return;

    isDragging.current = false;
    if (contentRef.current) {
      contentRef.current.style.transition = 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)';

      if (currentTranslateY.current > 100) {
        closeDialog();
      } else {
        contentRef.current.style.transform = 'translateY(0)';
        contentRef.current.style.opacity = '1';
      }
    }

    touchStartY.current = null;
    currentTranslateY.current = 0;
  };

  if (!isOpen) return null;

  return (
    <div
      className="responsive-dialog-overlay fixed inset-0 z-50 overflow-y-auto bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          closeDialog();
        }
      }}
      id="responsive-dialog-overlay"
    >
      {/* ResponsiveDialog Content Wrapper */}
      <div className="responsive-dialog-wrapper flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" id="responsive-dialog-wrapper">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* ResponsiveDialog Content */}
        <div
          ref={contentRef}
          className={`responsive-dialog-content inline-block align-bottom bg-white dark:bg-gray-900 rounded-2xl text-left
            overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
            border border-gray-200 dark:border-gray-800
            ${isMobile ? "fixed inset-x-0 bottom-0 pb-6 rounded-t-2xl sm:static sm:pb-0" : ""}
            ${className}`}
          tabIndex={-1}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          id="responsive-dialog-content"
        >
          {!isMobile && (
            <div className="responsive-dialog-close-button-container absolute top-2 right-2" id="responsive-dialog-close-button-container">
              <button
                onClick={closeDialog}
                className="responsive-dialog-close-button p-2 rounded-full text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500"
                aria-label="Close"
                id="responsive-dialog-close-button"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
          {isMobile && (
            <div className="responsive-dialog-mobile-indicator w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mt-3 mb-4" id="responsive-dialog-mobile-indicator" />
          )}
          <div className="responsive-dialog-body px-6 pt-5 pb-6" id="responsive-dialog-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResponsiveDialogHeader({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`responsive-dialog-header mb-5 ${className}`} id="responsive-dialog-header">{children}</div>;
}

export function ResponsiveDialogTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h3 className={`responsive-dialog-title text-xl font-semibold text-gray-900 dark:text-gray-100 ${className}`} id="responsive-dialog-title">
      {children}
    </h3>
  );
}

export function ResponsiveDialogDescription({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`responsive-dialog-description mt-2 text-sm text-gray-600 dark:text-gray-400 ${className}`} id="responsive-dialog-description">{children}</div>;
}

export function ResponsiveDialogFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`responsive-dialog-footer mt-6 sm:mt-5 sm:flex sm:flex-row-reverse gap-2 space-y-3 sm:space-y-0 ${className}`} id="responsive-dialog-footer">
      {children}
    </div>
  );
}

interface ActionProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  className?: string;
  /** Whether the action is destructive */
  destructive?: boolean;
  /** Whether the action is disabled */
  disabled?: boolean;
}

export function ResponsiveDialogAction({
  children,
  onClick,
  className = "",
  destructive = false,
  disabled = false,
}: ActionProps) {
  const context = useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error(
      "ResponsiveDialogAction must be used within a ResponsiveDialog"
    );
  }

  const handleClick = async () => {
    if (onClick) {
      await onClick();
    }
    context.closeDialog();
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`responsive-dialog-action w-full inline-flex justify-center rounded-lg px-4 py-2.5 text-sm font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200
        ${destructive
          ? "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700"
          : "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        sm:w-auto ${className}`}
      id="responsive-dialog-action"
    >
      {children}
    </button>
  );
}

export function ResponsiveDialogClose({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const context = useContext(ResponsiveDialogContext);
  if (!context) {
    throw new Error(
      "ResponsiveDialogClose must be used within a ResponsiveDialog"
    );
  }

  return (
    <button
      onClick={context.closeDialog}
      className={`responsive-dialog-close w-full inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-700
        px-4 py-2.5 bg-white dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300
        hover:bg-gray-50 dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500
        transition-colors duration-200
        sm:w-auto ${className}`}
      id="responsive-dialog-close"
    >
      {children}
    </button>
  );
}
