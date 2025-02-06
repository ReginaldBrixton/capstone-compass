'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, error, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-11 w-full items-center justify-between rounded-lg border border-input bg-white px-4 py-2 text-sm ring-offset-background transition-colors duration-200 placeholder:text-muted-foreground hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:hover:bg-gray-700 [&>span]:line-clamp-1',
      error && 'border-red-500 focus:ring-red-500',
      className
    )}
    {...props}
    data-oid=".rbe2a-"
  >
    {children}
    <SelectPrimitive.Icon asChild data-oid=":0ijf.w">
      <ChevronDown
        className="h-4 w-4 opacity-50 transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-180"
        data-oid="5334qvd"
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center bg-white py-1 transition-colors duration-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700',
      className
    )}
    {...props}
    data-oid="-ljpx-o"
  >
    <ChevronUp className="h-4 w-4" data-oid="7jd.2_2" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'flex cursor-default items-center justify-center bg-white py-1 transition-colors duration-200 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700',
      className
    )}
    {...props}
    data-oid="fyrs18g"
  >
    <ChevronDown className="h-4 w-4" data-oid="6ulwxxu" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(
  ({ className, children, position = 'popper', ...props }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const filteredChildren = React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      if (child.type.displayName === SelectPrimitive.Item.displayName) {
        return searchTerm.length > 0 &&
          !child.props.children.toLowerCase().includes(searchTerm.toLowerCase())
          ? null
          : child;
      }
      return child;
    });
    return (
      <SelectPrimitive.Portal data-oid="cz28oww">
        <SelectPrimitive.Content
          ref={ref}
          className={cn(
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border bg-white text-gray-900 shadow-lg dark:bg-gray-800 dark:text-gray-100',
            position === 'popper' &&
              'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
            className
          )}
          position={position}
          {...props}
          data-oid="bffhzx0"
        >
          <div
            className="sticky top-0 flex items-center gap-2 border-b bg-gray-50 p-2 dark:bg-gray-700"
            data-oid="hu0fng9"
          >
            <Search className="h-4 w-4 opacity-50" data-oid="xrrh5lu" />
            <input
              className="flex h-8 w-full rounded-md bg-white px-2 text-sm outline-none placeholder:text-gray-400 dark:bg-gray-800 dark:placeholder:text-gray-500"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              data-oid="ya6ihbd"
            />
          </div>
          <SelectScrollUpButton data-oid="-_10yqb" />
          <SelectPrimitive.Viewport
            className={cn(
              'p-2',
              position === 'popper' &&
                'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
            )}
            data-oid=".ou--h."
          >
            {filteredChildren}
          </SelectPrimitive.Viewport>
          <SelectScrollDownButton data-oid="zkpnjax" />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    );
  }
);
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      'py-1.5 pl-8 pr-2 text-sm font-semibold text-gray-500 dark:text-gray-400',
      className
    )}
    {...props}
    data-oid="ce_37wu"
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:focus:text-gray-100',
      className
    )}
    {...props}
    data-oid="xot_0m3"
  >
    <span
      className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
      data-oid="a.joffc"
    >
      <SelectPrimitive.ItemIndicator data-oid=".sqruci">
        <Check className="h-4 w-4" data-oid="5fqi0ij" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText data-oid="185ywji">{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-gray-200 dark:bg-gray-700', className)}
    {...props}
    data-oid="o_iufkz"
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
