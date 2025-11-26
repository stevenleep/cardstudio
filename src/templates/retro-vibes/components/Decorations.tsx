import React from 'react';
import { Group, Line, Circle, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { layout, fonts } from '../config';

/**
 * 新中式复古模版 - 装饰层
 */
export const Decorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const margin = width * layout.margin;
  const { primary } = colors;

  return (
    <Group x={margin} y={height * layout.sections.divider} listening={false}>
      <Line
        points={[0, 0, s(60), 0]}
        stroke={primary}
        strokeWidth={s(1.5)}
        opacity={0.5}
      />
      <Circle
        x={s(70)}
        radius={s(3)}
        fill={primary}
        opacity={0.4}
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
  const { primary } = colors;

  return (
    <Group x={width / 2} y={height * layout.sections.footer} listening={false}>
      <Circle x={s(-20)} radius={s(2)} fill={primary} opacity={0.3} />
      <Circle radius={s(3)} fill={primary} opacity={0.5} />
      <Circle x={s(20)} radius={s(2)} fill={primary} opacity={0.3} />
    </Group>
  );
};

/**
 * 左侧竖排点缀
 */
export const SideDecorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const margin = width * layout.margin;
  const { text } = colors;

  return (
    <Group x={margin * 0.5} y={height * 0.5} listening={false}>
      {['雅', '致'].map((char, i) => (
        <Text
          key={i}
          y={i * s(45)}
          text={char}
          fontSize={s(16)}
          fill={text}
          fontFamily={fonts.serif}
          opacity={0.12}
        />
      ))}
    </Group>
  );
};

