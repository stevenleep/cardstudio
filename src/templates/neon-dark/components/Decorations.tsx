import React from 'react';
import { Group, Circle, Rect } from 'react-konva';
import { useTemplate } from '../../shared';

/**
 * 霓虹暗夜模版 - 装饰层
 * 
 * 包含：右侧渐变线、角落装饰光点
 */
export const Decorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, margin, width, height } = scaler;
  const { primary, secondary } = colors;

  return (
    <Group listening={false}>
      {/* 右侧渐变装饰线 */}
      <Rect
        x={width - margin * 0.5}
        y={height * 0.1}
        width={s(4)}
        height={height * 0.35}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: height * 0.35 }}
        fillLinearGradientColorStops={[
          0, 'transparent',
          0.15, `${primary}80`,
          0.4, secondary,
          0.6, primary,
          0.85, `${secondary}80`,
          1, 'transparent'
        ]}
        cornerRadius={s(2)}
        shadowColor={primary}
        shadowBlur={s(15)}
        shadowOpacity={0.5}
      />
    </Group>
  );
};

/**
 * 底部装饰光点
 */
export const FooterDecorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { primary, secondary, text } = colors;

  return (
    <Group listening={false}>
      <Circle
        x={margin * 0.6}
        y={height * 0.94}
        radius={s(8)}
        fill={primary}
        shadowColor={primary}
        shadowBlur={s(20)}
        shadowOpacity={0.8}
      />
      <Circle
        x={margin * 0.6 + s(28)}
        y={height * 0.94}
        radius={s(5)}
        fill={secondary}
        shadowColor={secondary}
        shadowBlur={s(15)}
        shadowOpacity={0.7}
      />
      <Circle
        x={margin * 0.6 + s(48)}
        y={height * 0.94}
        radius={s(3)}
        fill={text}
        opacity={0.5}
      />
    </Group>
  );
};

