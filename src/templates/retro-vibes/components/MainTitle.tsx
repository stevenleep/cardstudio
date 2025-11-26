import React from 'react';
import { Group, Text, Line } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 新中式复古模版 - 主标题（竖排大字）
 */
export const MainTitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const margin = width * layout.margin;
  const { text, primary } = colors;

  if (!moduleVisibility.mainTitle) return null;

  const titleChars = data.mainTitle.split('');
  const charHeight = s(styles.mainTitle.lineHeight);
  const titleHeight = titleChars.length * charHeight;

  return (
    <Group x={width - margin - s(100)} y={height * layout.sections.mainTitle}>
      {titleChars.map((char, i) => (
        <Text
          key={i}
          id={i === 0 ? "main-title" : undefined}
          y={i * charHeight}
          text={char}
          fontSize={s(styles.mainTitle.fontSize)}
          fill={text}
          fontFamily={fonts.serif}
          fontStyle={styles.mainTitle.fontWeight}
          letterSpacing={s(styles.mainTitle.letterSpacing)}
          onClick={i === 0 ? () => onElementClick?.('main-title') : undefined}
        />
      ))}
      
      {/* 标题旁的装饰线 */}
      <Line
        x={s(-30)}
        y={s(20)}
        points={[0, 0, 0, Math.min(titleHeight - s(40), height * 0.5)]}
        stroke={primary}
        strokeWidth={s(2)}
        opacity={0.3}
      />
    </Group>
  );
};

