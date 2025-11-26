/**
 * 路径/画笔元素组件
 */
import React, { useCallback, useRef, useMemo } from 'react';
import { Line, Group } from 'react-konva';
import type { PathElement as PathElementType, CustomElement, ShadowStyle } from '../../../types';

interface PathElementProps {
  element: PathElementType;
  selectedIds: string[];
  allElements: CustomElement[];
  onSelect: (id: string, e?: MouseEvent | TouchEvent) => void;
  onUpdate: (id: string, updates: Partial<CustomElement>) => void;
}

// 混合模式映射到 Konva globalCompositeOperation
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

export const PathElement: React.FC<PathElementProps> = ({
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
    // 将中心点坐标转换回左上角坐标
    const centerX = element.width / 2;
    const centerY = element.height / 2;
    onUpdate(element.id, { x: e.target.x() - centerX, y: e.target.y() - centerY });
    dragStartPos.current = null;
    initialPositions.current.clear();
  }, [element.id, element.width, element.height, onUpdate]);

  // 以中心点为旋转参考点
  const centerX = element.width / 2;
  const centerY = element.height / 2;
  
  return (
    <Group
      x={element.x + centerX}
      y={element.y + centerY}
      rotation={element.rotation}
      scaleX={scaleX}
      scaleY={scaleY}
      offsetX={centerX}
      offsetY={centerY}
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
        const nodeScaleY = node.scaleY();
        
        // 更新路径的缩放
        const newPoints = element.points.map((val, i) => 
          i % 2 === 0 ? val * Math.abs(nodeScaleX) : val * Math.abs(nodeScaleY)
        );
        
        const newWidth = element.width * Math.abs(nodeScaleX);
        const newHeight = element.height * Math.abs(nodeScaleY);
        // 将中心点坐标转换回左上角坐标
        onUpdate(element.id, {
          x: node.x() - newWidth / 2,
          y: node.y() - newHeight / 2,
          width: newWidth,
          height: newHeight,
          rotation: node.rotation(),
          points: newPoints,
        });
        node.scaleX(scaleX);
        node.scaleY(scaleY);
      }}
    >
      <Line
        id={element.id}
        points={element.points}
        stroke={element.stroke}
        strokeWidth={element.strokeWidth}
        lineCap={element.lineCap || 'round'}
        lineJoin={element.lineJoin || 'round'}
        tension={element.tension ?? 0.5}
        closed={element.closed}
        opacity={element.opacity ?? 1}
        globalCompositeOperation={globalCompositeOperation}
        shadowEnabled={shadow?.enabled}
        shadowColor={shadow?.color}
        shadowBlur={shadow?.blur}
        shadowOffsetX={shadow?.offsetX}
        shadowOffsetY={shadow?.offsetY}
      />
    </Group>
  );
};

