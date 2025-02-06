'use client';

import React, { useState } from 'react';
import { Select, SelectItem } from '../../components';
const TestPage = () => {
  const [theme, setTheme] = useState('');
  const [fruit, setFruit] = useState('');
  const [size, setSize] = useState('');
  return (
    <div className="test-page min-h-screen bg-gray-50 p-8 dark:bg-gray-900" data-oid="cxuqnkk">
      <h1
        className="test-page__title mb-8 text-3xl font-bold text-gray-900 dark:text-white"
        data-oid="66g8njd"
      >
        Select Component Demo
      </h1>

      <div className="test-page__grid grid max-w-md gap-8" data-oid="tw-dr8.">
        {/* Theme Selector */}
        <div className="test-page__selector space-y-2" data-oid="_xxt9t3">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            data-oid="cpbo-hx"
          >
            Theme
          </label>
          <Select
            placeholder="Choose a theme"
            value={theme}
            onChange={setTheme}
            className="test-page__theme-select"
            data-oid="kqh.uhs"
          >
            <SelectItem value="light" data-oid="7413o8w">
              Light Theme
            </SelectItem>
            <SelectItem value="dark" data-oid="n41efty">
              Dark Theme
            </SelectItem>
            <SelectItem value="system" data-oid="xg7to9k">
              System Theme
            </SelectItem>
          </Select>
          {theme && (
            <p
              className="test-page__selected-value text-sm text-gray-500 dark:text-gray-400"
              data-oid="9j34b58"
            >
              Selected theme: {theme}
            </p>
          )}
        </div>

        {/* Fruit Selector */}
        <div className="test-page__selector space-y-2" data-oid="g65qmfa">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            data-oid="c62wv9o"
          >
            Fruit
          </label>
          <Select
            placeholder="Pick a fruit"
            value={fruit}
            onChange={setFruit}
            className="test-page__fruit-select"
            data-oid="4titkzt"
          >
            <SelectItem value="apple" data-oid="mctztau">
              🍎 Apple
            </SelectItem>
            <SelectItem value="banana" data-oid="j4jl1.q">
              🍌 Banana
            </SelectItem>
            <SelectItem value="orange" data-oid="ugpo3w4">
              🍊 Orange
            </SelectItem>
            <SelectItem value="grape" data-oid="hgagnma">
              🍇 Grape
            </SelectItem>
          </Select>
          {fruit && (
            <p
              className="test-page__selected-value text-sm text-gray-500 dark:text-gray-400"
              data-oid="lz:t0:h"
            >
              Selected fruit: {fruit}
            </p>
          )}
        </div>

        {/* Size Selector */}
        <div className="test-page__selector space-y-2" data-oid="r0e38xh">
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            data-oid="28v4m1:"
          >
            Size
          </label>
          <Select
            placeholder="Select size"
            value={size}
            onChange={setSize}
            className="test-page__size-select"
            data-oid=".h9.d3d"
          >
            <SelectItem value="xs" data-oid="y2e0-wj">
              Extra Small
            </SelectItem>
            <SelectItem value="sm" data-oid="t24jv1-">
              Small
            </SelectItem>
            <SelectItem value="md" data-oid="3mu_cbw">
              Medium
            </SelectItem>
            <SelectItem value="lg" data-oid="5g0uc04">
              Large
            </SelectItem>
            <SelectItem value="xl" data-oid="wl_17b8">
              Extra Large
            </SelectItem>
          </Select>
          {size && (
            <p
              className="test-page__selected-value text-sm text-gray-500 dark:text-gray-400"
              data-oid="3uk35m2"
            >
              Selected size: {size}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TestPage;
