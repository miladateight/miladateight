import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error("AT8 boundary caught a runtime error", error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <section className="boundary-fallback" role="alert">
          <span>AT8</span>
          <h1>Something failed to render.</h1>
          <p>The core navigation and contact links are still available. Reloading the page may restore the visual layer.</p>
          <a className="btn btn-primary" href="/">Return home</a>
        </section>
      );
    }

    return this.props.children;
  }
}

export function VisualBoundary({ children, label = "visual" }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="visual-boundary-fallback" role="img" aria-label={`${label} unavailable`}>
          <span>AT8</span>
          <p>{label}</p>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}
