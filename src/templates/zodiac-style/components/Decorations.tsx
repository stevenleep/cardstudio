import React from 'react';
import { Group, Circle } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 星座占卜模版 - 底部装饰（三个淡点）
 */
export const FooterDecorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const { primary } = colors;

  return (
    <Group x={width / 2} y={height * 0.96} listening={false}>
      {[-1, 0, 1].map((i) => (
        <Circle
          key={i}
          x={i * s(12)}
          radius={s(1.5)}
          fill={primary}
          opacity={0.3}
        />
      ))}
    </Group>
  );
};

