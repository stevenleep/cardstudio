import React from 'react';
import { Group, Rect } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 像素风格模版 - 背景层
 */
export const Background: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { width, height } = scaler;
  const { bg } = colors;

  return (
    <Group listening={false}>
      <Rect width={width} height={height} fill={bg} />
    </Group>
  );
};

