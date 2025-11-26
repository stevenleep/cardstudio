import React from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { useTemplate } from '../../shared';
import { layout, styles } from '../config';

/**
 * Neo-Brutalism 模版 - 背景层
 */
export const Background: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { width, height, s } = scaler;
  const { primary, secondary, bg } = colors;
  
  const borderColor = colors.isDark ? '#FFFFFF' : '#000000';
  const borderWidth = s(layout.borderWidth);

  return (
    <Group listening={false}>
      {/* 背景 */}
      <Rect width={width} height={height} fill={bg} />

      {/* 背景装饰圆形 */}
      <Circle
        x={width * 0.88}
        y={height * 0.08}
        radius={s(styles.decoration.circleLarge)}
        fill={primary}
        opacity={0.85}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      <Circle
        x={width * 0.08}
        y={height * 0.92}
        radius={s(styles.decoration.circleSmall)}
        fill={secondary}
        opacity={0.85}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
    </Group>
  );
};

