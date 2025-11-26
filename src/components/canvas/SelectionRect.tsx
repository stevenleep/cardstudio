/**
 * 框选矩形组件
 * 
 * 用于显示拖动框选的区域
 */
import React from 'react';
import { Rect } from 'react-konva';
import type { SelectionRect as SelectionRectType } from './hooks';

interface SelectionRectProps {
  rect: SelectionRectType;
}

export const SelectionRect: React.FC<SelectionRectProps> = ({ rect }) => {
  if (!rect.visible) return null;

  // 处理负宽高（用户从右下往左上拖动）
  const x = rect.width >= 0 ? rect.x : rect.x + rect.width;
  const y = rect.height >= 0 ? rect.y : rect.y + rect.height;
  const width = Math.abs(rect.width);
  const height = Math.abs(rect.height);

  return (
    <Rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgba(59, 130, 246, 0.1)"
      stroke="rgba(59, 130, 246, 0.8)"
      strokeWidth={1}
      dash={[4, 4]}
      listening={false}
    />
  );
};

