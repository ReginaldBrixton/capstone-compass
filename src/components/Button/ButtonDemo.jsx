'use client';

import React from 'react';
import { useTheme } from 'next-themes';

import Button from './Button';

const ButtonDemo = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="button-demo space-y-8 p-8">
      <div className="theme-switcher space-x-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setTheme('light')}
          className={theme === 'light' ? 'ring-2 ring-blue-500' : ''}
        >
          Light Mode
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setTheme('dark')}
          className={theme === 'dark' ? 'ring-2 ring-blue-500' : ''}
        >
          Dark Mode
        </Button>
      </div>

      <div className="variants space-y-4">
        <h3 className="mb-2 text-lg font-semibold">Button Variants</h3>
        <div className="space-x-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="error">Error</Button>
          <Button variant="warning">Warning</Button>
        </div>
      </div>

      <div className="sizes space-y-4">
        <h3 className="mb-2 text-lg font-semibold">Button Sizes</h3>
        <div className="space-x-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>

      <div className="states space-y-4">
        <h3 className="mb-2 text-lg font-semibold">Button States</h3>
        <div className="space-x-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
