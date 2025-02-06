'use client';

import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
const TabsContext = React.createContext();
const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  className,
  orientation = 'horizontal',
  disabled = [],
  dir,
  activationMode = 'automatic',
  ...props
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue || value);
  const [mounted, setMounted] = React.useState(false);
  const disabledTabs = React.useMemo(
    () => (typeof disabled === 'string' ? disabled.split(',').map((tab) => tab.trim()) : disabled),
    [disabled]
  );
  React.useEffect(() => {
    setMounted(true);
  }, []);
  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);
  const handleTabChange = (newValue) => {
    if (disabledTabs.includes(newValue)) return;
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };
  if (!mounted) return null;
  return (
    <TabsContext.Provider
      value={{
        activeTab,
        onTabChange: handleTabChange,
        orientation,
        disabledTabs,
        activationMode,
      }}
      data-oid=":uq_wlm"
    >
      <div
        className={cn(
          'tabs-root w-full max-w-full',
          orientation === 'vertical'
            ? 'grid grid-cols-1 gap-4 md:grid-cols-[auto_1fr]'
            : 'flex flex-col',
          className
        )}
        data-orientation={orientation}
        dir={dir}
        {...props}
        data-oid="_:f-1kl"
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};
const TabsList = React.forwardRef(({ className, children, loop = true, ...props }, ref) => {
  const { orientation } = React.useContext(TabsContext);
  return (
    <div
      ref={ref}
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'tabs-list-component inline-flex items-center justify-start rounded-md bg-muted p-1 text-muted-foreground',
        orientation === 'horizontal'
          ? 'h-auto min-h-[2.5rem] w-full flex-wrap md:flex-nowrap'
          : 'h-auto w-full flex-col md:w-48',
        className
      )}
      data-orientation={orientation}
      {...props}
      data-oid="ed7nt0u"
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          loop,
        });
      })}
    </div>
  );
});
TabsList.displayName = 'TabsList';
const TabsTrigger = React.forwardRef(
  ({ className, value, children, disabled = false, loop, ...props }, ref) => {
    const { activeTab, onTabChange, orientation, disabledTabs } = React.useContext(TabsContext);
    const isActive = activeTab === value;
    const isDisabled = disabled || disabledTabs.includes(value);
    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isActive}
        aria-disabled={isDisabled}
        onClick={() => !isDisabled && onTabChange(value)}
        className={cn(
          'tabs-trigger-component relative inline-flex min-w-[100px] items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all hover:bg-background/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          orientation === 'horizontal' ? 'max-w-[200px] flex-1 md:flex-initial' : 'w-full',
          isDisabled && 'cursor-not-allowed opacity-50',
          isActive && 'bg-background font-bold text-foreground dark:bg-white/10',
          className
        )}
        data-state={isActive ? 'active' : 'inactive'}
        data-disabled={isDisabled || undefined}
        data-orientation={orientation}
        {...props}
        data-oid=":zfvrfk"
      >
        {isActive && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 rounded-sm bg-background shadow-sm dark:bg-white/10"
            transition={{
              duration: 0.15,
            }}
            style={{
              zIndex: 0,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
            data-oid="ic0v:fr"
          />
        )}
        <span
          className={cn(
            'relative z-10 truncate',
            isActive ? 'text-foreground dark:text-white' : 'text-muted-foreground'
          )}
          data-oid="e7c:8fp"
        >
          {children}
        </span>
      </button>
    );
  }
);
TabsTrigger.displayName = 'TabsTrigger';
const TabsContent = React.forwardRef(
  ({ className, value, children, forceMount, ...props }, ref) => {
    const { activeTab } = React.useContext(TabsContext);
    const isActive = activeTab === value;
    if (!isActive && !forceMount) return null;
    return (
      <AnimatePresence mode="wait" data-oid="u2rz1o6">
        {isActive && (
          <motion.div
            ref={ref}
            role="tabpanel"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.15,
            }}
            className={cn(
              'tabs-content-component mt-2 w-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              className
            )}
            data-state={isActive ? 'active' : 'inactive'}
            data-orientation={props.orientation}
            {...props}
            data-oid="e-2xcdw"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }
);
TabsContent.displayName = 'TabsContent';
export { Tabs, TabsList, TabsTrigger, TabsContent };
