import React, { Suspense } from "react";
import LazyRouteErrorBoundary from "../../Components/loader/LazyRouteErrorBoundary";
import RouteLoadingFallback from "../../Components/loader/RouteLoadingFallback";

export function createLazyRouteElement(LazyComponent, options = {}) {
  const { compactFallback = false } = options;

  return React.createElement(
    LazyRouteErrorBoundary,
    null,
    React.createElement(
      Suspense,
      {
        fallback: React.createElement(RouteLoadingFallback, {
          compact: compactFallback,
        }),
      },
      React.createElement(LazyComponent),
    ),
  );
}
