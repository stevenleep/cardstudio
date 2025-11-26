import React, { useMemo } from 'react';
import { Group, Rect, Circle } from 'react-konva';
import { useTemplate } from '../../shared';
import { layout } from '../config';

/**
 * 星座占卜模版 - 背景层
 * 
 * 包含：深邃背景 + 柔和星云 + 星点
 */
export const Background: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { width, height, s } = scaler;
  const { primary, secondary, bg, text, isDark } = colors;

  // 生成柔和的星星
  const stars = useMemo(() => {
    const result = [];
    for (let i = 0; i < layout.starCount; i++) {
      const seed = i * 7919;
      result.push({
        x: ((seed * 13) % 1000) / 1000 * width,
        y: ((seed * 17) % 1000) / 1000 * height,
        size: ((seed * 23) % 100) / 100 * 1.2 + 0.4,
        opacity: ((seed * 29) % 100) / 100 * 0.25 + 0.08,
        isPrimary: i % 3 === 0,
      });
    }
    return result;
  }, [width, height]);

  return (
    <Group listening={false}>
      {/* 深邃背景 */}
      <Rect width={width} height={height} fill={bg} />

      {/* 极柔和的星云 - 营造深邃感 */}
      <Circle
        x={width * 0.25}
        y={height * 0.35}
        radius={width * 0.55}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.55}
        fillRadialGradientColorStops={[
          0, `${primary}${isDark ? '08' : '12'}`,
          0.4, `${primary}${isDark ? '03' : '06'}`,
          1, 'transparent'
        ]}
      />
      <Circle
        x={width * 0.8}
        y={height * 0.75}
        radius={width * 0.45}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={width * 0.45}
        fillRadialGradientColorStops={[
          0, `${secondary}${isDark ? '06' : '10'}`,
          0.5, `${secondary}02`,
          1, 'transparent'
        ]}
      />

      {/* 轻盈的星点 */}
      {stars.map((star, i) => (
        <Circle
          key={`star-${i}`}
          x={star.x}
          y={star.y}
          radius={star.size * s(1)}
          fill={star.isPrimary ? primary : text}
          opacity={star.opacity}
        />
      ))}
    </Group>
  );
};

