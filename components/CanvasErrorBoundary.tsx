'use client';

import { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('[v0] Canvas Error Boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error('[v0] Error details:', error.message);
    console.error('[v0] Component stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-100 to-slate-50">
          <div className="text-center">
            <div className="text-red-600 text-lg font-semibold mb-2">3D Scene Error</div>
            <div className="text-gray-600 text-sm">{this.state.error?.message || 'Unknown error'}</div>
            <div className="text-gray-400 text-xs mt-4">Check browser console for details</div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
