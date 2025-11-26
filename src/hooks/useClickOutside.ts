/**
 * 点击外部 Hook
 * 
 * 检测点击是否发生在指定元素外部
 */
import { useEffect, useRef, type RefObject } from 'react';

/**
 * 点击外部 Hook
 * 
 * @param handler 点击外部时的处理函数
 * @param enabled 是否启用
 * @returns ref 绑定到需要检测的元素
 * 
 * @example
 * ```tsx
 * const ref = useClickOutside(() => {
 *   setIsOpen(false);
 * });
 * 
 * return <div ref={ref}>Dropdown Content</div>;
 * ```
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void,
  enabled: boolean = true
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      
      // 如果点击的是元素内部，不处理
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, enabled]);

  return ref;
}

