'use client';

import { useEffect, useState } from 'react';

interface LoadingIndicatorProps {
  visible?: boolean;
}

export default function LoadingIndicator({ visible = true }: LoadingIndicatorProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 30;
      });
    }, 200);

    // Complete after timeout
    const timeout = setTimeout(() => {
      setProgress(100);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Animated spinner */}
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />

        {/* Progress text */}
        <div className="text-center">
          <p className="text-sm text-gray-600 font-medium">{Math.floor(progress)}%</p>
          <p className="text-xs text-gray-400 mt-1">Loading 3D experience</p>
        </div>
      </div>
    </div>
  );
}
