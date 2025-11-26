import React from 'react';
import { Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 星座占卜模版 - 副标题
 */
export const Subtitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height, contentWidth } = scaler;
  const margin = width * layout.margin;
  const { text } = colors;

  if (!moduleVisibility.subtitle || !data.subtitle) return null;

  return (
    <Text
      id="subtitle"
      x={margin}
      y={height * layout.sections.subtitle}
      width={contentWidth * 0.75}
      text={data.subtitle}
      fontSize={s(styles.subtitle.fontSize)}
      fill={text}
      fontFamily={fonts.display}
      fontStyle={styles.subtitle.fontWeight}
      lineHeight={styles.subtitle.lineHeight}
      letterSpacing={s(styles.subtitle.letterSpacing)}
      opacity={styles.subtitle.opacity}
      onClick={() => onElementClick?.('subtitle')}
    />
  );
};

