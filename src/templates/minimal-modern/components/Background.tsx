import React from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 简约现代模版 - 背景层
 * 
 * 包含：背景底色 + 渐变光晕
 */
export const Background: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { width, height } = scaler;
  const { primary, secondary, bg, isDark } = colors;

  return (
    <Group listening={false}>
      {/* 纯色背景底 */}
      <Rect width={width} height={height} fill={bg} />

      {/* 超大渐变光晕 - 右上角主色 */}
      <Circle
        x={width * 0.8}
        y={-height * 0.1}
        radius={width * 0.7}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.7}
        fillRadialGradientColorStops={[
          0, primary,
          0.2, primary,
          0.5, `${primary}50`,
          1, 'transparent'
        ]}
        opacity={isDark ? 0.30 : 0.25}
      />

      {/* 左侧中部副色光晕 */}
      <Circle
        x={-width * 0.2}
        y={height * 0.55}
        radius={width * 0.6}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.6}
        fillRadialGradientColorStops={[
          0, secondary,
          0.3, secondary,
          0.6, `${secondary}40`,
          1, 'transparent'
        ]}
        opacity={isDark ? 0.25 : 0.18}
      />

      {/* 右下角主色光晕 */}
      <Circle
        x={width * 0.9}
        y={height * 0.85}
        radius={width * 0.5}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.5}
        fillRadialGradientColorStops={[
          0, primary,
          0.25, `${primary}70`,
          1, 'transparent'
        ]}
        opacity={isDark ? 0.22 : 0.15}
      />
    </Group>
  );
};

