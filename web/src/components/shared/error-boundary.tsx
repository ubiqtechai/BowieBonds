"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Mono } from "@/components/ui/mono";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="px-4 lg:px-12 py-12">
          <div className="border-2 border-red bg-red-faint p-6 lg:p-8 max-w-lg">
            <Mono className="text-[10px] text-red uppercase tracking-widest block mb-3">
              Something went wrong
            </Mono>
            <h2 className="text-xl font-bold mb-2">Unexpected Error</h2>
            <p className="text-sm text-ink-mid mb-4">
              {this.state.error?.message || "An unknown error occurred."}
            </p>
            <Button
              variant="secondary"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              Try Again
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
