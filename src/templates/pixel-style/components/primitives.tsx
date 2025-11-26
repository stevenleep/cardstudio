import React from 'react';
import { Group, Rect } from 'react-konva';
import { useTemplate } from '../../shared';
import { layout } from '../config';

/**
 * 像素块组件
 */
export const Pixel: React.FC<{
  x: number;
  y: number;
  color: string;
  size?: number;
  opacity?: number;
}> = ({ x, y, color, size, opacity = 1 }) => {
  const { scaler } = useTemplate();
  const px = size ?? scaler.s(layout.pixelSize);
  
  return (
    <Rect x={x} y={y} width={px} height={px} fill={color} opacity={opacity} />
  );
};

/**
 * 像素L角装饰
 */
export const PixelCorner: React.FC<{
  x: number;
  y: number;
  color: string;
  flip?: boolean;
}> = ({ x, y, color, flip = false }) => {
  const { scaler } = useTemplate();
  const px = scaler.s(layout.pixelSize);

  return (
    <Group x={x} y={y} scaleX={flip ? -1 : 1}>
      <Pixel x={0} y={0} color={color} />
      <Pixel x={px} y={0} color={color} />
      <Pixel x={px * 2} y={0} color={color} />
      <Pixel x={0} y={px} color={color} />
      <Pixel x={0} y={px * 2} color={color} />
    </Group>
  );
};

