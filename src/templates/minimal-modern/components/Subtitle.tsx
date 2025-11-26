import React from 'react';
import { Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 简约现代模版 - 副标题
 */
export const Subtitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { text } = colors;

  if (!moduleVisibility.subtitle || !data.subtitle) return null;

  return (
    <Text
      id="subtitle"
      x={margin}
      y={height * 0.29}
      width={contentWidth * 0.7}
      text={data.subtitle}
      fontSize={s(styles.subtitle.fontSize)}
      fill={text}
      fontFamily={fonts.primary}
      fontStyle={styles.subtitle.fontWeight}
      lineHeight={styles.subtitle.lineHeight}
      opacity={styles.subtitle.opacity}
      onClick={() => onElementClick?.('subtitle')}
    />
  );
};

