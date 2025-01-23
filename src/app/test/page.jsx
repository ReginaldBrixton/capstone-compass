'use client';

import React, { useState } from 'react';

import { Select, SelectItem } from '../../components';

const TestPage = () => {
  const [theme, setTheme] = useState('');
  const [fruit, setFruit] = useState('');
  const [size, setSize] = useState('');

  return (
    <div className="test-page min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <h1 className="test-page__title text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        Select Component Demo
      </h1>

      <div className="test-page__grid grid gap-8 max-w-md">
        {/* Theme Selector */}
        <div className="test-page__selector space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <Select
            placeholder="Choose a theme"
            value={theme}
            onChange={setTheme}
            className="test-page__theme-select"
          >
            <SelectItem value="light">Light Theme</SelectItem>
            <SelectItem value="dark">Dark Theme</SelectItem>
            <SelectItem value="system">System Theme</SelectItem>
          </Select>
          {theme && (
            <p className="test-page__selected-value text-sm text-gray-500 dark:text-gray-400">
              Selected theme: {theme}
            </p>
          )}
        </div>

        {/* Fruit Selector */}
        <div className="test-page__selector space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Fruit
          </label>
          <Select
            placeholder="Pick a fruit"
            value={fruit}
            onChange={setFruit}
            className="test-page__fruit-select"
          >
            <SelectItem value="apple">🍎 Apple</SelectItem>
            <SelectItem value="banana">🍌 Banana</SelectItem>
            <SelectItem value="orange">🍊 Orange</SelectItem>
            <SelectItem value="grape">🍇 Grape</SelectItem>
          </Select>
          {fruit && (
            <p className="test-page__selected-value text-sm text-gray-500 dark:text-gray-400">
              Selected fruit: {fruit}
            </p>
          )}
        </div>

        {/* Size Selector */}
        <div className="test-page__selector space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
          <Select
            placeholder="Select size"
            value={size}
            onChange={setSize}
            className="test-page__size-select"
          >
            <SelectItem value="xs">Extra Small</SelectItem>
            <SelectItem value="sm">Small</SelectItem>
            <SelectItem value="md">Medium</SelectItem>
            <SelectItem value="lg">Large</SelectItem>
            <SelectItem value="xl">Extra Large</SelectItem>
          </Select>
          {size && (
            <p className="test-page__selected-value text-sm text-gray-500 dark:text-gray-400">
              Selected size: {size}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
