import React, { useCallback, useRef, useMemo } from 'react';
import { Text as KonvaText, Rect as KonvaRect, Group } from 'react-konva';
import type { TextElement as TextElementType, CustomElement, ShadowStyle } from '../../../types';
import { getKonvaFillProps } from '../../../utils/gradientUtils';

interface TextElementProps {
  element: TextElementType;
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

// 文字大小写转换
const transformText = (text: string, transform?: string): string => {
  if (!transform || transform === 'none') return text;
  switch (transform) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text.replace(/\b\w/g, (char) => char.toUpperCase());
    default:
      return text;
  }
};

export const TextElement: React.FC<TextElementProps> = ({
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
    return getKonvaFillProps(element.fill, element.width, element.height);
  }, [element.fill, element.width, element.height]);
  
  // 计算变换
  const transform = element.transform || {};
  const scaleX = (transform.scaleX ?? 1) * (transform.flipH ? -1 : 1);
  const scaleY = (transform.scaleY ?? 1) * (transform.flipV ? -1 : 1);
  
  // 获取混合模式
  const globalCompositeOperation = BLEND_MODE_MAP[element.blendMode || 'normal'] || 'source-over';
  
  // 处理文字大小写转换
  const displayText = useMemo(() => {
    return transformText(element.text, element.textTransform);
  }, [element.text, element.textTransform]);
  
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
  
  // 组合 fontStyle: "italic bold" 或 "bold" 或 "italic" 或 "normal"
  const fontStyle = useMemo(() => {
    const parts: string[] = [];
    if (element.fontStyle === 'italic') {
      parts.push('italic');
    }
    if (element.fontWeight && element.fontWeight !== '400') {
      parts.push(element.fontWeight);
    }
    return parts.length > 0 ? parts.join(' ') : 'normal';
  }, [element.fontStyle, element.fontWeight]);

  // 以中心点为旋转参考点
  const centerX = element.width / 2;
  const centerY = element.height / 2;

  // 背景相关
  const hasBackground = element.backgroundColor && element.backgroundColor !== '';
  const bgPadding = element.backgroundPadding || 0;
  const bgRadius = element.backgroundRadius || 0;

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
        const newWidth = node.width() * node.scaleX();
        const newHeight = node.height() * node.scaleY();
        // 将中心点坐标转换回左上角坐标
        onUpdate(element.id, {
          x: node.x() - newWidth / 2,
          y: node.y() - newHeight / 2,
          width: newWidth,
          height: newHeight,
          rotation: node.rotation(),
        });
        node.scaleX(1);
        node.scaleY(1);
      }}
    >
      {/* 背景矩形 */}
      {hasBackground && (
        <KonvaRect
          x={-bgPadding}
          y={-bgPadding}
          width={element.width + bgPadding * 2}
          height={element.height + bgPadding * 2}
          fill={element.backgroundColor}
          cornerRadius={bgRadius}
        />
      )}
      
      {/* 文本 */}
      <KonvaText
        id={element.id}
        x={0}
        y={0}
        width={element.width}
        height={element.height}
        text={displayText}
        fontSize={element.fontSize}
        fontFamily={element.fontFamily}
        fontStyle={fontStyle}
        {...fillProps}
        align={element.align}
        verticalAlign={element.verticalAlign || 'top'}
        lineHeight={element.lineHeight}
        letterSpacing={element.letterSpacing}
        opacity={element.opacity ?? 1}
        globalCompositeOperation={globalCompositeOperation}
        stroke={element.stroke}
        strokeWidth={element.strokeWidth || 0}
        textDecoration={element.textDecoration || ''}
        wrap={element.wrap || 'word'}
        ellipsis={element.ellipsis || false}
        padding={element.padding || 0}
        shadowEnabled={shadow?.enabled}
        shadowColor={shadow?.color}
        shadowBlur={shadow?.blur}
        shadowOffsetX={shadow?.offsetX}
        shadowOffsetY={shadow?.offsetY}
      />
    </Group>
  );
};
