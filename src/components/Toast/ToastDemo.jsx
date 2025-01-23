'use client';

import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/Button';

const ToastDemo = () => {
  const showBasicToast = () => {
    toast('Basic notification');
  };

  const showSuccessToast = () => {
    toast.success('Success notification', {
      description: 'Your action was completed successfully!',
    });
  };

  const showErrorToast = () => {
    toast.error('Error notification', {
      description: 'Something went wrong. Please try again.',
    });
  };

  const showWarningToast = () => {
    toast.warning('Warning notification', {
      description: 'Please review your input before proceeding.',
    });
  };

  const showPromiseToast = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
      loading: 'Loading...',
      success: 'Data loaded successfully',
      error: 'Error loading data',
    });
  };

  const showCustomToast = () => {
    toast.custom((t) => (
      <div className="custom-toast-content rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <h3 className="mb-2 text-lg font-semibold">Custom Toast</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          This is a custom toast with actions
        </p>
        <div className="flex space-x-2">
          <Button size="sm" variant="primary" onClick={() => toast.dismiss(t)}>
            Accept
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => toast.dismiss(t)}
          >
            Dismiss
          </Button>
        </div>
      </div>
    ));
  };

  return (
    <div className="toast-demo space-y-8 p-8">
      <div className="basic-toasts space-y-4">
        <h3 className="mb-2 text-lg font-semibold">Basic Toasts</h3>
        <div className="space-x-4">
          <Button onClick={showBasicToast}>Show Basic Toast</Button>
          <Button variant="success" onClick={showSuccessToast}>
            Show Success Toast
          </Button>
          <Button variant="error" onClick={showErrorToast}>
            Show Error Toast
          </Button>
          <Button variant="warning" onClick={showWarningToast}>
            Show Warning Toast
          </Button>
        </div>
      </div>

      <div className="advanced-toasts space-y-4">
        <h3 className="mb-2 text-lg font-semibold">Advanced Toasts</h3>
        <div className="space-x-4">
          <Button variant="primary" onClick={showPromiseToast}>
            Show Promise Toast
          </Button>
          <Button variant="secondary" onClick={showCustomToast}>
            Show Custom Toast
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToastDemo;
