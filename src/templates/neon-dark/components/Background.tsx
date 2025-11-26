import React from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 霓虹暗夜模版 - 背景层
 * 
 * 包含：背景底色 + 大面积渐变光晕
 */
export const Background: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { width, height } = scaler;
  const { primary, secondary, bg } = colors;

  return (
    <Group listening={false}>
      {/* 纯色背景底 */}
      <Rect width={width} height={height} fill={bg} />

      {/* 左上巨型主色光晕 - 覆盖上半部分 */}
      <Circle
        x={-width * 0.2}
        y={-height * 0.1}
        radius={width * 1.2}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 1.2}
        fillRadialGradientColorStops={[
          0, `${primary}50`,
          0.2, `${primary}35`,
          0.4, `${primary}18`,
          0.6, `${primary}08`,
          1, 'transparent'
        ]}
      />

      {/* 右下巨型副色光晕 - 覆盖下半部分 */}
      <Circle
        x={width * 1.1}
        y={height * 1.0}
        radius={width * 1.3}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 1.3}
        fillRadialGradientColorStops={[
          0, `${secondary}45`,
          0.15, `${secondary}30`,
          0.35, `${secondary}15`,
          0.5, `${secondary}06`,
          1, 'transparent'
        ]}
      />

      {/* 中央混合光晕 - 让两种颜色柔和过渡 */}
      <Circle
        x={width * 0.6}
        y={height * 0.45}
        radius={width * 0.8}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.8}
        fillRadialGradientColorStops={[
          0, `${primary}15`,
          0.4, `${secondary}10`,
          0.7, 'rgba(255,255,255,0.02)',
          1, 'transparent'
        ]}
      />

      {/* 顶部横向大渐变 */}
      <Rect
        y={0}
        width={width}
        height={height * 0.5}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: width, y: height * 0.3 }}
        fillLinearGradientColorStops={[
          0, `${primary}25`,
          0.4, `${primary}08`,
          0.6, 'transparent',
          0.8, `${secondary}05`,
          1, `${secondary}15`
        ]}
      />

      {/* 底部大渐变 */}
      <Rect
        y={height * 0.5}
        width={width}
        height={height * 0.5}
        fillLinearGradientStartPoint={{ x: width, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: height * 0.5 }}
        fillLinearGradientColorStops={[
          0, `${secondary}20`,
          0.3, `${secondary}08`,
          0.7, 'transparent',
          1, `${primary}10`
        ]}
      />

      {/* 对角线渐变条纹 - 增加动感 */}
      <Rect
        x={-width * 0.5}
        y={height * 0.2}
        width={width * 2}
        height={height * 0.15}
        rotation={-15}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: width * 2, y: 0 }}
        fillLinearGradientColorStops={[
          0, 'transparent',
          0.3, `${primary}12`,
          0.5, `${secondary}08`,
          0.7, `${primary}10`,
          1, 'transparent'
        ]}
      />
    </Group>
  );
};

