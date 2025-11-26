import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 星座占卜模版 - 主标题（轻盈优雅）
 */
export const MainTitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height, contentWidth } = scaler;
  const margin = width * layout.margin;
  const { text } = colors;

  if (!moduleVisibility.mainTitle) return null;

  return (
    <Group x={margin} y={height * layout.sections.mainTitle}>
      <Text
        id="main-title"
        width={contentWidth}
        text={data.mainTitle}
        fontSize={s(styles.mainTitle.fontSize)}
        fill={text}
        fontFamily={fonts.display}
        fontStyle={styles.mainTitle.fontWeight}
        lineHeight={styles.mainTitle.lineHeight}
        letterSpacing={s(styles.mainTitle.letterSpacing)}
        wrap="word"
        onClick={() => onElementClick?.('main-title')}
      />
    </Group>
  );
};

