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
      <div
        className="custom-toast-content rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
        data-oid=":u1y3t2"
      >
        <h3 className="mb-2 text-lg font-semibold" data-oid="ubh8hw2">
          Custom Toast
        </h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300" data-oid="h4:1zr3">
          This is a custom toast with actions
        </p>
        <div className="flex space-x-2" data-oid="m-41hcd">
          <Button size="sm" variant="primary" onClick={() => toast.dismiss(t)} data-oid="6z.c6ku">
            Accept
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.dismiss(t)} data-oid="2qm4_kt">
            Dismiss
          </Button>
        </div>
      </div>
    ));
  };
  return (
    <div className="toast-demo space-y-8 p-8" data-oid="m5vez:w">
      <div className="basic-toasts space-y-4" data-oid="perl2mt">
        <h3 className="mb-2 text-lg font-semibold" data-oid="95nsrxe">
          Basic Toasts
        </h3>
        <div className="space-x-4" data-oid="o34v58o">
          <Button onClick={showBasicToast} data-oid=":2lhly5">
            Show Basic Toast
          </Button>
          <Button variant="success" onClick={showSuccessToast} data-oid=":sx4xy:">
            Show Success Toast
          </Button>
          <Button variant="error" onClick={showErrorToast} data-oid="n71h.bg">
            Show Error Toast
          </Button>
          <Button variant="warning" onClick={showWarningToast} data-oid="l33d4o0">
            Show Warning Toast
          </Button>
        </div>
      </div>

      <div className="advanced-toasts space-y-4" data-oid="bgr6l8e">
        <h3 className="mb-2 text-lg font-semibold" data-oid="4cj60_l">
          Advanced Toasts
        </h3>
        <div className="space-x-4" data-oid="t7vjkpq">
          <Button variant="primary" onClick={showPromiseToast} data-oid="vk1_8fr">
            Show Promise Toast
          </Button>
          <Button variant="secondary" onClick={showCustomToast} data-oid="o806p_l">
            Show Custom Toast
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ToastDemo;
