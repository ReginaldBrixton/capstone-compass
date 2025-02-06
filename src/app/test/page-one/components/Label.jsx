'use client';

import * as React from 'react';
const Label = React.memo(
  React.forwardRef(({ className, htmlFor, children, ...props }, ref) => {
    // Warn if htmlFor is missing in development
    if (process.env.NODE_ENV === 'development' && !htmlFor) {
      console.warn(
        'The `htmlFor` prop is missing in the Label component. This is required for accessibility.'
      );
    }
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={[
          'p-2 text-sm font-medium leading-none',
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
          'transition-colors duration-200',
          'hover:text-foreground/80',
          'focus-within:text-foreground',
          'label-component',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
        data-oid="mbk0dno"
      >
        {children}
      </label>
    );
  })
);
Label.displayName = 'Label';
export { Label };
