import React from 'react';
import { Group } from 'react-konva';
import { useTemplate } from '../../shared';
import { layout } from '../config';
import { Pixel, PixelCorner } from './primitives';

/**
 * 像素风格模版 - 装饰层
 */
export const Decorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, margin, width, height } = scaler;
  const { primary, secondary } = colors;
  const px = s(layout.pixelSize);

  return (
    <Group listening={false}>
      {/* 四角像素装饰 */}
      <PixelCorner x={margin} y={margin} color={primary} />
      <PixelCorner x={width - margin} y={margin} color={secondary} flip />
      <PixelCorner x={margin} y={height - margin - px * 3} color={secondary} />
      <PixelCorner x={width - margin} y={height - margin - px * 3} color={primary} flip />

      {/* 散落的像素装饰 */}
      <Pixel x={width * 0.85} y={height * 0.25} color={secondary} size={px * 1.5} opacity={0.5} />
      <Pixel x={width * 0.87} y={height * 0.27} color={primary} size={px} opacity={0.3} />
      <Pixel x={width * 0.15} y={height * 0.55} color={primary} size={px * 1.2} opacity={0.4} />
    </Group>
  );
};

/**
 * 像素分隔线
 */
export const PixelDivider: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { text } = colors;
  const px = s(layout.pixelSize);

  return (
    <Group x={margin} y={height * layout.sections.divider} listening={false}>
      {Array.from({ length: 12 }).map((_, i) => (
        <Pixel key={i} x={i * px * 2} y={0} color={text} opacity={0.15} />
      ))}
    </Group>
  );
};

