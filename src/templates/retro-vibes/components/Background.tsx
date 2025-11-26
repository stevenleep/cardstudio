import React from 'react';
import { Group, Rect, Circle, Line } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 新中式复古模版 - 背景层
 * 
 * 包含：宣纸质感背景 + 水墨晕染效果 + 山水意境装饰
 */
export const Background: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { width, height, s } = scaler;
  const { primary, secondary, bg, isDark } = colors;

  // 水墨晕染颜色
  const inkColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)';

  return (
    <Group listening={false}>
      {/* 宣纸质感背景 */}
      <Rect width={width} height={height} fill={bg} />
      
      {/* 水墨晕染效果 - 右上角 */}
      <Circle
        x={width * 0.85}
        y={height * 0.08}
        radius={width * 0.25}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.25}
        fillRadialGradientColorStops={[0, primary, 0.4, primary, 1, 'transparent']}
        opacity={isDark ? 0.08 : 0.06}
      />
      
      {/* 水墨晕染 - 左下角 */}
      <Circle
        x={width * 0.15}
        y={height * 0.85}
        radius={width * 0.3}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.3}
        fillRadialGradientColorStops={[0, secondary, 0.3, secondary, 1, 'transparent']}
        opacity={isDark ? 0.06 : 0.04}
      />

      {/* 山水意境装饰 */}
      <Group y={height * 0.02}>
        <Line
          points={[
            width * 0.6, height * 0.12,
            width * 0.68, height * 0.08,
            width * 0.78, height * 0.11,
            width * 0.85, height * 0.06,
            width * 0.95, height * 0.10,
            width, height * 0.12,
          ]}
          stroke={inkColor}
          strokeWidth={s(40)}
          lineCap="round"
          lineJoin="round"
          tension={0.4}
        />
      </Group>
    </Group>
  );
};

