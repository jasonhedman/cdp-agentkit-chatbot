import { useEffect, useRef, type RefObject } from 'react';

export function useScrollToBottom<T extends HTMLElement>(): [
  RefObject<T>,
  RefObject<T>,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);
  const isNearBottomRef = useRef(true);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      const checkIfNearBottom = () => {
        const threshold = 200; // pixels from bottom
        const containerBottom = container.scrollTop + container.clientHeight;
        const scrollHeight = container.scrollHeight;
        isNearBottomRef.current = scrollHeight - containerBottom <= threshold;
      };

      // Add scroll listener to track if user is near bottom
      container.addEventListener('scroll', checkIfNearBottom);

      const observer = new MutationObserver(() => {
        // Use setTimeout to ensure DOM has updated
        setTimeout(() => {
          if (isNearBottomRef.current) {
            end.scrollIntoView({ behavior: 'instant', block: 'end' });
          }
        }, 0);
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      return () => {
        observer.disconnect();
        container.removeEventListener('scroll', checkIfNearBottom);
      };
    }
  }, []);

  return [containerRef, endRef];
}
