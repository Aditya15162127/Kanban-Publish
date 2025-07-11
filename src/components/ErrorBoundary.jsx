import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // Optionally log error
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-8 text-center text-red-600">Something went wrong. Please reload the page.</div>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;