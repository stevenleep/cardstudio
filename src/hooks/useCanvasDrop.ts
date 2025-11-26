/**
 * 画布拖放 Hook
 * 
 * 处理元素拖放到画布的逻辑
 */
import { useCallback, type RefObject } from 'react';
import type Konva from 'konva';
import { ELEMENT_PRESETS } from '../utils/elementPresets';
import type { CustomElement } from '../types';

export interface UseCanvasDropOptions {
  /** Stage ref */
  stageRef: RefObject<Konva.Stage | null>;
  /** 当前缩放比例 */
  scale: number;
  /** 画布宽度 */
  canvasWidth: number;
  /** 画布高度 */
  canvasHeight: number;
  /** 添加元素回调 */
  onAddElement: (element: CustomElement) => void;
  /** 是否启用拖放 */
  isEnabled: boolean;
}

export interface UseCanvasDropResult {
  /** 处理 drop 事件 */
  handleDrop: (e: React.DragEvent) => void;
  /** 处理 dragover 事件 */
  handleDragOver: (e: React.DragEvent) => void;
  /** 处理 dragenter 事件 */
  handleDragEnter: (e: React.DragEvent) => void;
  /** 处理 dragleave 事件 */
  handleDragLeave: (e: React.DragEvent) => void;
}

/**
 * 计算元素居中偏移
 */
function getCenterOffset(element: CustomElement): { x: number; y: number } {
  switch (element.type) {
    case 'rect':
    case 'text':
      return { x: element.width / 2, y: element.height / 2 };
    case 'circle':
      return { x: 0, y: 0 }; // 圆形以中心点定位
    default:
      return { x: element.width / 2, y: element.height / 2 };
  }
}

/**
 * 画布拖放 Hook
 * 
 * @example
 * ```tsx
 * const { handleDrop, handleDragOver } = useCanvasDrop({
 *   stageRef,
 *   scale,
 *   canvasWidth: 1080,
 *   canvasHeight: 1920,
 *   onAddElement: addElement,
 *   isEnabled: true
 * });
 * ```
 */
export function useCanvasDrop({
  stageRef,
  scale,
  canvasWidth,
  canvasHeight,
  onAddElement,
  isEnabled,
}: UseCanvasDropOptions): UseCanvasDropResult {
  
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isEnabled) return;
    
    // 获取预设 ID
    const presetId = e.dataTransfer.getData('presetId');
    if (!presetId) return;
    
    // 查找预设
    const preset = ELEMENT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    
    // 获取 Stage 容器
    const stageContainer = stageRef.current?.container();
    if (!stageContainer) return;
    
    const rect = stageContainer.getBoundingClientRect();
    
    // 计算相对于 Stage 的坐标（考虑缩放）
    const dropX = (e.clientX - rect.left) / scale;
    const dropY = (e.clientY - rect.top) / scale;
    
    // 创建元素
    const element = preset.create(dropX, dropY, canvasWidth, canvasHeight);
    
    // 调整位置使元素居中于鼠标位置
    const offset = getCenterOffset(element);
    element.x = dropX - offset.x;
    element.y = dropY - offset.y;
    
    // 确保元素在画布范围内
    element.x = Math.max(0, Math.min(element.x, canvasWidth - element.width));
    element.y = Math.max(0, Math.min(element.y, canvasHeight - element.height));
    
    onAddElement(element);
  }, [stageRef, scale, canvasWidth, canvasHeight, onAddElement, isEnabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = isEnabled ? 'copy' : 'none';
  }, [isEnabled]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return { 
    handleDrop, 
    handleDragOver,
    handleDragEnter,
    handleDragLeave
  };
}
