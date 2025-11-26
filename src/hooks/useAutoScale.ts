/**
 * 自动缩放 Hook
 * 
 * 根据容器大小和目标尺寸自动计算缩放比例
 */
import { useState, useEffect, useRef, useCallback, type RefObject } from 'react';

export interface UseAutoScaleOptions {
  /** 目标宽度 */
  width: number;
  /** 目标高度 */
  height: number;
  /** 容器内边距 */
  padding?: number;
  /** 最小缩放比例 */
  minScale?: number;
  /** 最大缩放比例 */
  maxScale?: number;
  /** 是否启用 */
  enabled?: boolean;
}

export interface UseAutoScaleResult {
  /** 当前缩放比例 */
  scale: number;
  /** 容器 ref */
  containerRef: RefObject<HTMLDivElement | null>;
  /** 手动触发重新计算 */
  recalculate: () => void;
  /** 是否正在计算 */
  isCalculating: boolean;
}

/**
 * 自动计算画布缩放比例的 Hook
 * 
 * @example
 * ```tsx
 * const { scale, containerRef } = useAutoScale({
 *   width: 1080,
 *   height: 1920,
 *   padding: 40
 * });
 * ```
 */
export function useAutoScale({
  width,
  height,
  padding = 80,
  minScale = 0.1,
  maxScale = 1.2,
  enabled = true,
}: UseAutoScaleOptions): UseAutoScaleResult {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isCalculating, setIsCalculating] = useState(true);

  const calculateScale = useCallback(() => {
    if (!containerRef.current || !enabled) {
      setIsCalculating(false);
      return;
    }
    
    setIsCalculating(true);
    
    const containerWidth = containerRef.current.clientWidth - padding;
    const containerHeight = containerRef.current.clientHeight - padding;

    if (containerWidth <= 0 || containerHeight <= 0) {
      setIsCalculating(false);
      return;
    }

    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;
    
    // 取较小的缩放比例以确保完全可见
    const fitScale = Math.min(scaleX, scaleY, 1);
    const clampedScale = Math.min(Math.max(fitScale, minScale), maxScale);
    
    setScale(clampedScale);
    setIsCalculating(false);
  }, [width, height, padding, minScale, maxScale, enabled]);

  useEffect(() => {
    calculateScale();
    
    const handleResize = () => {
      // 使用 requestAnimationFrame 优化性能
      requestAnimationFrame(calculateScale);
    };

    window.addEventListener('resize', handleResize);
    
    // 使用 ResizeObserver 监听容器尺寸变化
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [calculateScale]);

  return { 
    scale, 
    containerRef, 
    recalculate: calculateScale,
    isCalculating 
  };
}
