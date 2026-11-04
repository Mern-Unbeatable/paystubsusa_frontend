import { Component } from "react";

class LazyRouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("Lazy route failed to load", error);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="min-h-[40vh] w-full flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center">
          <p className="text-sm font-semibold text-rose-700">
            We couldn’t load this page right now.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 transition-colors cursor-pointer"
          >
            Reload page
          </button>
        </div>
      </div>
    );
  }
}

export default LazyRouteErrorBoundary;
