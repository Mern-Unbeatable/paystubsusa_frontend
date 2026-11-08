import { Suspense, lazy } from "react";
import RouteLoadingFallback from "@/Components/loader/RouteLoadingFallback";

/**
 * Wraps a dynamic import in React.lazy + Suspense for route elements.
 * @param {() => Promise<{ default: React.ComponentType }>} factory
 */
export function lazyPage(factory) {
  const Component = lazy(factory);

  return function LazyRoutePage(props) {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
