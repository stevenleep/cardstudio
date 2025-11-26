import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 简约现代模版 - 主标题
 */
export const MainTitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { text } = colors;

  if (!moduleVisibility.mainTitle) return null;

  return (
    <Group x={margin} y={height * 0.12}>
      <Text
        id="main-title"
        width={contentWidth}
        text={data.mainTitle}
        fontSize={s(styles.mainTitle.fontSize)}
        fill={text}
        fontFamily={fonts.primary}
        fontStyle={styles.mainTitle.fontWeight}
        lineHeight={styles.mainTitle.lineHeight}
        letterSpacing={s(styles.mainTitle.letterSpacing)}
        wrap="word"
        onClick={() => onElementClick?.('main-title')}
      />
    </Group>
  );
};

