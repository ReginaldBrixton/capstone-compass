'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';
import { createPortal } from 'react-dom';

interface CommandDialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CommandDialog({
  open,
  onOpenChange,
  className,
  children,
  ...props
}: CommandDialogProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className={cn(
        'fixed inset-0 z-50 flex items-start justify-center',
        !open && 'pointer-events-none opacity-0',
        'transition-opacity duration-200',
        className
      )}
      {...props}
    >
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" />
      <div className="relative mt-[20vh] w-full max-w-lg rounded-lg border bg-background shadow-lg">
        {children}
      </div>
    </div>,
    document.body
  );
}

export function CommandInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center border-b px-3">
      <input
        className={cn(
          'flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
    </div>
  );
}

export function CommandList({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'max-h-[300px] overflow-y-auto overflow-x-hidden',
        className
      )}
      {...props}
    />
  );
}

export function CommandEmpty({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'py-6 text-center text-sm text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

export function CommandGroup({
  heading,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  heading: string;
}) {
  return (
    <div
      className={className}
      role="group"
      aria-labelledby={heading}
      {...props}
    >
      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
        {heading}
      </div>
      {props.children}
    </div>
  );
}

export function CommandItem({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    />
  );
}
