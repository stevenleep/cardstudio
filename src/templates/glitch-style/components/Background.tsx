import React from 'react';
import { Group, Rect } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 故障美学模版 - 背景层
 * 
 * 包含：背景底色 + 夸张渐变 + 扫描线
 */
export const Background: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { width, height } = scaler;
  const { primary, secondary, bg } = colors;

  return (
    <Group listening={false}>
      {/* 纯色背景底 */}
      <Rect width={width} height={height} fill={bg} />

      {/* 夸张渐变 - 品红色从左上 */}
      <Rect
        x={-width * 0.5}
        y={-height * 0.2}
        width={width * 2}
        height={height * 0.8}
        rotation={-20}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: width, y: height * 0.6 }}
        fillLinearGradientColorStops={[
          0, `${secondary}55`,
          0.25, `${secondary}30`,
          0.5, `${secondary}10`,
          0.7, 'transparent',
          1, 'transparent'
        ]}
      />
      
      {/* 夸张渐变 - 青色从右下 */}
      <Rect
        x={-width * 0.3}
        y={height * 0.3}
        width={width * 2}
        height={height}
        rotation={15}
        fillLinearGradientStartPoint={{ x: width * 2, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: height }}
        fillLinearGradientColorStops={[
          0, `${primary}50`,
          0.2, `${primary}25`,
          0.45, `${primary}08`,
          0.6, 'transparent',
          1, 'transparent'
        ]}
      />

      {/* 扫描线效果 */}
      {[...Array(15)].map((_, i) => (
        <Rect
          key={`scan-${i}`}
          y={i * (height / 15)}
          width={width}
          height={1}
          fill="rgba(255,255,255,0.015)"
        />
      ))}
    </Group>
  );
};

