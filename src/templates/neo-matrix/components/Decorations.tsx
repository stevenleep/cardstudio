import React from 'react';
import { Group, Rect, Line, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { layout, styles } from '../config';

/**
 * Neo-Brutalism 模版 - 装饰层（星星）
 */
export const Decorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const { primary, secondary } = colors;

  return (
    <Group listening={false}>
      <Text
        x={width * 0.82}
        y={height * 0.28}
        text="✦"
        fontSize={s(styles.decoration.starSizeLarge)}
        fill={secondary}
        fontFamily="Arial"
      />
      <Text
        x={width * 0.10}
        y={height * 0.58}
        text="✦"
        fontSize={s(styles.decoration.starSizeSmall)}
        fill={primary}
        fontFamily="Arial"
      />
    </Group>
  );
};

/**
 * 底部装饰条
 */
export const FooterBar: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const { primary, isDark } = colors;
  
  const borderColor = isDark ? '#FFFFFF' : '#000000';
  const borderWidth = s(layout.borderWidth);
  const barHeight = s(styles.decoration.footerBarHeight);

  return (
    <Group y={height - barHeight} listening={false}>
      <Rect
        width={width}
        height={barHeight}
        fill={primary}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      {/* 简化波浪线 */}
      <Line
        points={[
          0, barHeight / 2,
          width * 0.15, barHeight * 0.33,
          width * 0.35, barHeight * 0.66,
          width * 0.5, barHeight * 0.33,
          width * 0.65, barHeight * 0.66,
          width * 0.85, barHeight * 0.33,
          width, barHeight / 2
        ]}
        stroke={borderColor}
        strokeWidth={s(2.5)}
        tension={0.5}
      />
    </Group>
  );
};

