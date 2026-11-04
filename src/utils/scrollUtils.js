/**
 * Centralized scroll utility for managing page and element scrolling.
 * Supports smooth scrolling, instant scrolling, and targeting specific elements.
 * 
 * Usage:
 *   import { scrollToTop, scrollToElement } from '@/utils/scrollUtils';
 *   scrollToTop();
 *   scrollToElement('section-id', { behavior: 'smooth' });
 */

/**
 * Scroll to the top of the page or a specific container.
 * @param {Object} options - Configuration options
 * @param {string} options.behavior - 'smooth' or 'auto' (default: 'smooth')
 * @param {HTMLElement} options.container - Container to scroll (default: window)
 */
export function scrollToTop(options = {}) {
  const { behavior = 'smooth', container = null } = options;

  if (container && container instanceof HTMLElement) {
    container.scrollTo({
      top: 0,
      behavior,
    });
  } else {
    window.scrollTo({
      top: 0,
      behavior,
    });
  }
}

/**
 * Scroll to the bottom of the page or a specific container.
 * @param {Object} options - Configuration options
 * @param {string} options.behavior - 'smooth' or 'auto' (default: 'smooth')
 * @param {HTMLElement} options.container - Container to scroll (default: window)
 */
export function scrollToBottom(options = {}) {
  const { behavior = 'smooth', container = null } = options;

  if (container && container instanceof HTMLElement) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  } else {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior,
    });
  }
}

/**
 * Scroll to a specific position (pixel value).
 * @param {number} position - Y position to scroll to
 * @param {Object} options - Configuration options
 * @param {string} options.behavior - 'smooth' or 'auto' (default: 'smooth')
 * @param {HTMLElement} options.container - Container to scroll (default: window)
 */
export function scrollToPosition(position, options = {}) {
  const { behavior = 'smooth', container = null } = options;

  if (typeof position !== 'number' || position < 0) {
    console.warn('scrollToPosition: position must be a non-negative number');
    return;
  }

  if (container && container instanceof HTMLElement) {
    container.scrollTo({
      top: position,
      behavior,
    });
  } else {
    window.scrollTo({
      top: position,
      behavior,
    });
  }
}

/**
 * Scroll to a specific element by ID.
 * @param {string} elementId - ID of the element to scroll to
 * @param {Object} options - Configuration options
 * @param {string} options.behavior - 'smooth' or 'auto' (default: 'smooth')
 * @param {number} options.offset - Additional offset in pixels (default: 0)
 * @param {HTMLElement} options.container - Container to scroll (default: window)
 */
export function scrollToElement(elementId, options = {}) {
  const { behavior = 'smooth', offset = 0, container = null } = options;

  if (!elementId || typeof elementId !== 'string') {
    console.warn('scrollToElement: elementId must be a non-empty string');
    return;
  }

  const element = document.getElementById(elementId);

  if (!element) {
    console.warn(`scrollToElement: element with id "${elementId}" not found`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
  const targetPosition = Math.max(0, elementPosition + offset);

  if (container && container instanceof HTMLElement) {
    const containerRect = container.getBoundingClientRect();
    const relativePosition = elementPosition - containerRect.top + container.scrollTop;
    container.scrollTo({
      top: relativePosition + offset,
      behavior,
    });
  } else {
    window.scrollTo({
      top: targetPosition,
      behavior,
    });
  }
}

/**
 * Get the current scroll position.
 * @param {HTMLElement} container - Container to check (default: window)
 * @returns {number} Current vertical scroll position
 */
export function getScrollPosition(container = null) {
  if (container && container instanceof HTMLElement) {
    return container.scrollTop;
  }
  return window.scrollY || window.pageYOffset;
}

/**
 * Check if page is scrolled to the top.
 * @param {HTMLElement} container - Container to check (default: window)
 * @returns {boolean} True if scrolled to top
 */
export function isScrolledToTop(container = null) {
  return getScrollPosition(container) === 0;
}

/**
 * Check if page is scrolled to the bottom.
 * @param {HTMLElement} container - Container to check (default: window)
 * @returns {boolean} True if scrolled to bottom
 */
export function isScrolledToBottom(container = null) {
  if (container && container instanceof HTMLElement) {
    return (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 1
    );
  }
  return (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 1
  );
}
