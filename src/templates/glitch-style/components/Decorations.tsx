import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { fonts, noteDecorations } from '../config';

/**
 * 故障美学模版 - 装饰层
 * 
 * 包含：右侧音符装饰
 */
export const Decorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, margin, width, height } = scaler;
  const { primary, secondary } = colors;

  return (
    <Group listening={false}>
      {/* 右侧音符装饰 */}
      {noteDecorations.map((item, i) => {
        const isEven = i % 2 === 0;
        const color = isEven ? primary : secondary;
        
        return (
          <Group key={`note-${i}`} x={width - margin * 1.2} y={height * item.y}>
            {/* 故障偏移 - 青色 */}
            <Text
              x={s(-4)}
              text={item.note}
              fontSize={s(item.size)}
              fill={primary}
              fontFamily={fonts.note}
              opacity={item.opacity * 0.6}
            />
            {/* 故障偏移 - 品红 */}
            <Text
              x={s(4)}
              text={item.note}
              fontSize={s(item.size)}
              fill={secondary}
              fontFamily={fonts.note}
              opacity={item.opacity * 0.6}
            />
            {/* 主音符 */}
            <Text
              text={item.note}
              fontSize={s(item.size)}
              fill={color}
              fontFamily={fonts.note}
              opacity={item.opacity}
              shadowColor={color}
              shadowBlur={s(15)}
              shadowOpacity={0.5}
            />
          </Group>
        );
      })}
    </Group>
  );
};

/**
 * 底部装饰音符
 */
export const FooterDecorations: React.FC = () => {
  const { colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { primary, secondary, text } = colors;

  return (
    <Group y={height * 0.94} listening={false}>
      <Text
        x={margin * 0.5}
        text="♪"
        fontSize={s(28)}
        fill={primary}
        fontFamily={fonts.note}
        opacity={0.6}
        shadowColor={primary}
        shadowBlur={s(10)}
      />
      <Text
        x={margin * 0.5 + s(40)}
        text="♫"
        fontSize={s(22)}
        fill={secondary}
        fontFamily={fonts.note}
        opacity={0.5}
      />
      <Text
        x={margin * 0.5 + s(72)}
        text="♬"
        fontSize={s(18)}
        fill={text}
        fontFamily={fonts.note}
        opacity={0.3}
      />
    </Group>
  );
};

