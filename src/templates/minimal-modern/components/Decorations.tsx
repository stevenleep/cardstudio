import React from 'react';
import { Group, Circle } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 简约现代模版 - 装饰层
 * 
 * 包含：浮动玻璃圆点装饰
 */
export const Decorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, margin, width, height } = scaler;
  const { primary, secondary, glass } = colors;

  return (
    <Group listening={false}>
      {/* 左上浮动圆 */}
      <Circle
        x={margin * 1.5}
        y={height * 0.25}
        radius={s(35)}
        fill={glass.bg}
        stroke={glass.border}
        strokeWidth={1}
        opacity={0.6}
      />
      
      {/* 右侧浮动圆 */}
      <Circle
        x={width - margin * 1.2}
        y={height * 0.45}
        radius={s(25)}
        fill={glass.bg}
        stroke={glass.border}
        strokeWidth={1}
        opacity={0.5}
      />
      
      {/* 小浮动点 - 主色 */}
      <Circle
        x={width - margin * 2}
        y={height * 0.15}
        radius={s(8)}
        fill={primary}
        opacity={0.3}
      />
      
      {/* 小浮动点 - 副色 */}
      <Circle
        x={margin * 2.5}
        y={height * 0.68}
        radius={s(6)}
        fill={secondary}
        opacity={0.35}
      />
    </Group>
  );
};

/**
 * 底部装饰圆点
 */
export const FooterDecorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const { glass } = colors;

  return (
    <Group x={width / 2} y={height * 0.97} listening={false}>
      {[-22, 0, 22].map((offset, i) => (
        <Circle
          key={i}
          x={s(offset)}
          radius={s(i === 1 ? 6 : 4)}
          fill={i === 1 ? glass.bgStrong : glass.bg}
          stroke={glass.border}
          strokeWidth={1}
        />
      ))}
    </Group>
  );
};

