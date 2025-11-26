import React, { useCallback, useRef, useMemo } from 'react';
import { Circle as KonvaCircle, Group } from 'react-konva';
import type { CircleElement as CircleElementType, CustomElement, ShadowStyle } from '../../../types';
import { getCircleGradientProps } from '../../../utils/gradientUtils';

interface CircleElementProps {
  element: CircleElementType;
  selectedIds: string[];
  allElements: CustomElement[];
  onSelect: (id: string, e?: MouseEvent | TouchEvent) => void;
  onUpdate: (id: string, updates: Partial<CustomElement>) => void;
}

// 混合模式映射
const BLEND_MODE_MAP: Record<string, GlobalCompositeOperation> = {
  'normal': 'source-over',
  'multiply': 'multiply',
  'screen': 'screen',
  'overlay': 'overlay',
  'darken': 'darken',
  'lighten': 'lighten',
  'color-dodge': 'color-dodge',
  'color-burn': 'color-burn',
  'hard-light': 'hard-light',
  'soft-light': 'soft-light',
  'difference': 'difference',
  'exclusion': 'exclusion',
  'hue': 'hue',
  'saturation': 'saturation',
  'color': 'color',
  'luminosity': 'luminosity',
};

export const CircleElement: React.FC<CircleElementProps> = ({
  element,
  selectedIds,
  allElements,
  onSelect,
  onUpdate,
}) => {
  // 获取阴影
  const shadow: ShadowStyle | undefined = useMemo(() => {
    if (element.shadows && element.shadows.length > 0) {
      return element.shadows.find(s => s.enabled);
    }
    return element.shadow;
  }, [element.shadow, element.shadows]);
  
  // 获取填充属性（支持渐变）
  const fillProps = useMemo(() => {
    return getCircleGradientProps(element.fill, element.radius);
  }, [element.fill, element.radius]);
  
  // 计算变换
  const transform = element.transform || {};
  const scaleX = (transform.scaleX ?? 1) * (transform.flipH ? -1 : 1);
  const scaleY = (transform.scaleY ?? 1) * (transform.flipV ? -1 : 1);
  
  // 获取混合模式
  const globalCompositeOperation = BLEND_MODE_MAP[element.blendMode || 'normal'] || 'source-over';
  
  // 同步拖动状态
  const dragStartPos = useRef<{ x: number; y: number } | null>(null);
  const initialPositions = useRef<Map<string, { x: number; y: number }>>(new Map());
  
  const isSelected = selectedIds.includes(element.id);
  const hasMultiSelection = selectedIds.length > 1;
  
  // 如果不可见，不渲染
  if (element.visible === false) {
    return null;
  }
  
  const handleDragStart = useCallback((e: { target: { x: () => number; y: () => number } }) => {
    if (isSelected && hasMultiSelection) {
      dragStartPos.current = { x: e.target.x(), y: e.target.y() };
      initialPositions.current.clear();
      selectedIds.forEach(id => {
        const el = allElements.find(e => e.id === id);
        if (el) {
          initialPositions.current.set(id, { x: el.x, y: el.y });
        }
      });
    }
  }, [isSelected, hasMultiSelection, selectedIds, allElements]);
  
  const handleDragMove = useCallback((e: { target: { x: () => number; y: () => number } }) => {
    if (!dragStartPos.current || !isSelected || !hasMultiSelection) return;
    
    const dx = e.target.x() - dragStartPos.current.x;
    const dy = e.target.y() - dragStartPos.current.y;
    
    selectedIds.forEach(id => {
      if (id === element.id) return;
      const initPos = initialPositions.current.get(id);
      if (initPos) {
        onUpdate(id, { x: initPos.x + dx, y: initPos.y + dy });
      }
    });
  }, [isSelected, hasMultiSelection, selectedIds, element.id, onUpdate]);
  
  const handleDragEnd = useCallback((e: { target: { x: () => number; y: () => number } }) => {
    // 将圆心坐标转换回左上角坐标
    onUpdate(element.id, { x: e.target.x() - element.radius, y: e.target.y() - element.radius });
    dragStartPos.current = null;
    initialPositions.current.clear();
  }, [element.id, element.radius, onUpdate]);

  // 以圆心为旋转参考点（圆心在边界框中心）
  const centerX = element.radius;
  const centerY = element.radius;
  
  return (
    <Group
      x={element.x + centerX}
      y={element.y + centerY}
      rotation={element.rotation}
      scaleX={scaleX}
      scaleY={scaleY}
      skewX={transform.skewX ? Math.tan((transform.skewX * Math.PI) / 180) : 0}
      skewY={transform.skewY ? Math.tan((transform.skewY * Math.PI) / 180) : 0}
      draggable={!element.locked}
      onClick={(e) => onSelect(element.id, e.evt as MouseEvent)}
      onTap={(e) => onSelect(element.id, e.evt as TouchEvent)}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
      onTransformEnd={(e) => {
        const node = e.target;
        const nodeScaleX = node.scaleX();
        const newRadius = element.radius * Math.abs(nodeScaleX);
        // 将圆心坐标转换回左上角坐标
        onUpdate(element.id, {
          x: node.x() - newRadius,
          y: node.y() - newRadius,
          radius: newRadius,
          rotation: node.rotation(),
        });
        node.scaleX(1);
        node.scaleY(1);
      }}
    >
      <KonvaCircle
        id={element.id}
        x={0}
        y={0}
        radius={element.radius}
        {...fillProps}
        stroke={element.stroke}
        strokeWidth={element.strokeWidth}
        opacity={element.opacity ?? 1}
        globalCompositeOperation={globalCompositeOperation}
        dash={element.dash}
        dashEnabled={element.dashEnabled}
        lineCap={element.lineCap}
        shadowEnabled={shadow?.enabled}
        shadowColor={shadow?.color}
        shadowBlur={shadow?.blur}
        shadowOffsetX={shadow?.offsetX}
        shadowOffsetY={shadow?.offsetY}
      />
    </Group>
  );
};
