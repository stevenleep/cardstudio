/**
 * Marquee Selection Hook
 * 
 * 实现拖动框选功能
 * - 普通拖动：替换当前选择
 * - Shift+拖动：添加到当前选择
 */
import { useState, useCallback, useRef } from 'react';
import type Konva from 'konva';
import type { CustomElement, CircleElement } from '../../../types/customElements';

export interface SelectionRect {
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
}

interface UseMarqueeSelectionOptions {
  /** Stage ref */
  stageRef: React.RefObject<Konva.Stage | null>;
  /** 画布缩放比例 */
  scale: number;
  /** 元素列表 */
  elements: CustomElement[];
  /** 当前已选中的元素 ID */
  currentSelectedIds: string[];
  /** 选择回调（替换选择） */
  onSelect: (ids: string[]) => void;
  /** 添加到选择回调 */
  onAddToSelection?: (ids: string[]) => void;
  /** 是否启用 */
  enabled: boolean;
}

/**
 * 检查元素是否在选择框内
 * 支持不同类型元素的精确碰撞检测
 */
function isElementInRect(
  element: CustomElement,
  rect: { x: number; y: number; width: number; height: number }
): boolean {
  // 计算选择框的规范化边界（处理负宽高）
  const rectLeft = rect.width >= 0 ? rect.x : rect.x + rect.width;
  const rectRight = rect.width >= 0 ? rect.x + rect.width : rect.x;
  const rectTop = rect.height >= 0 ? rect.y : rect.y + rect.height;
  const rectBottom = rect.height >= 0 ? rect.y + rect.height : rect.y;

  // 圆形元素特殊处理
  if (element.type === 'circle') {
    const circle = element as CircleElement;
    // 圆心就是 x, y（Konva 圆形的坐标是圆心）
    const centerX = circle.x;
    const centerY = circle.y;
    const radius = circle.radius;
    
    // 找到选择框中离圆心最近的点
    const closestX = Math.max(rectLeft, Math.min(centerX, rectRight));
    const closestY = Math.max(rectTop, Math.min(centerY, rectBottom));
    
    // 计算最近点到圆心的距离
    const distanceX = centerX - closestX;
    const distanceY = centerY - closestY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;
    
    // 如果距离小于半径，则相交
    return distanceSquared <= radius * radius;
  }

  // 矩形和其他元素使用边界框检测
  const elLeft = element.x;
  const elRight = element.x + element.width;
  const elTop = element.y;
  const elBottom = element.y + element.height;

  // 检查是否相交
  return !(
    elRight < rectLeft ||
    elLeft > rectRight ||
    elBottom < rectTop ||
    elTop > rectBottom
  );
}

/**
 * Marquee Selection Hook
 */
export function useMarqueeSelection({
  stageRef,
  scale,
  elements,
  currentSelectedIds,
  onSelect,
  onAddToSelection,
  enabled,
}: UseMarqueeSelectionOptions) {
  const [selectionRect, setSelectionRect] = useState<SelectionRect>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    visible: false,
  });
  
  const startPoint = useRef<{ x: number; y: number } | null>(null);
  const isSelecting = useRef(false);
  const isShiftKeyDown = useRef(false);

  // 开始框选
  const handleMouseDown = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!enabled) return;
    
    // 只在点击空白处时开始框选
    const clickedOnEmpty = e.target === e.target.getStage();
    if (!clickedOnEmpty) return;

    const stage = stageRef.current;
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    // 记录是否按住了 Shift 键
    isShiftKeyDown.current = e.evt.shiftKey;

    // 转换为画布坐标
    const x = pos.x / scale;
    const y = pos.y / scale;

    startPoint.current = { x, y };
    isSelecting.current = true;
    
    setSelectionRect({
      x,
      y,
      width: 0,
      height: 0,
      visible: true,
    });
  }, [enabled, scale, stageRef]);

  // 更新框选区域
  const handleMouseMove = useCallback((e: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isSelecting.current || !startPoint.current || !enabled) return;

    const stage = stageRef.current;
    if (!stage) return;

    const pos = stage.getPointerPosition();
    if (!pos) return;

    // 转换为画布坐标
    const x = pos.x / scale;
    const y = pos.y / scale;

    setSelectionRect({
      x: startPoint.current.x,
      y: startPoint.current.y,
      width: x - startPoint.current.x,
      height: y - startPoint.current.y,
      visible: true,
    });
  }, [enabled, scale, stageRef]);

  // 结束框选
  const handleMouseUp = useCallback(() => {
    if (!isSelecting.current || !startPoint.current || !enabled) {
      return;
    }

    // 查找在选择框内的元素
    const newSelectedIds = elements
      .filter(el => isElementInRect(el, selectionRect))
      .map(el => el.id);

    // 只有框选区域有一定大小时才触发选择
    if (Math.abs(selectionRect.width) > 5 || Math.abs(selectionRect.height) > 5) {
      if (isShiftKeyDown.current && onAddToSelection) {
        // Shift+框选：添加到现有选择（去重）
        const mergedIds = [...new Set([...currentSelectedIds, ...newSelectedIds])];
        onSelect(mergedIds);
      } else {
        // 普通框选：替换选择
        onSelect(newSelectedIds);
      }
    }

    // 重置状态
    startPoint.current = null;
    isSelecting.current = false;
    isShiftKeyDown.current = false;
    setSelectionRect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      visible: false,
    });
  }, [enabled, elements, selectionRect, currentSelectedIds, onSelect, onAddToSelection]);

  // 取消框选（例如鼠标离开画布）
  const cancelSelection = useCallback(() => {
    startPoint.current = null;
    isSelecting.current = false;
    isShiftKeyDown.current = false;
    setSelectionRect({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      visible: false,
    });
  }, []);

  return {
    selectionRect,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    cancelSelection,
    isSelecting: isSelecting.current,
  };
}

