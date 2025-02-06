'use client';

import { useCallback, useEffect, useState } from 'react';
import { SessionManager } from '../components';
const TestPage = () => {
  const [mounted, setMounted] = useState(false);
  const handleLogout = useCallback(() => {
    // Add your logout logic here
  }, []);
  useEffect(() => {
    setMounted(true);
    handleLogout();
  }, [handleLogout]);
  if (!mounted) {
    return null;
  }
  return (
    <div className="container mx-auto p-4" data-oid="zxy1no7">
      <h1 className="mb-6 text-2xl font-bold" data-oid="50sl9m6">
        Session Management Test
      </h1>
      <SessionManager data-oid="qk5aeio" />
    </div>
  );
};
export default TestPage;
