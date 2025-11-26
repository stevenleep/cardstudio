import React from 'react';
import { Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 霓虹暗夜模版 - 副标题
 */
export const Subtitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { textGray } = colors;

  if (!moduleVisibility.subtitle || !data.subtitle) return null;

  return (
    <Text
      id="subtitle"
      x={margin}
      y={height * 0.39}
      width={contentWidth * 0.8}
      text={data.subtitle}
      fontSize={s(styles.subtitle.fontSize)}
      fill={textGray}
      fontFamily={fonts.text}
      fontStyle={styles.subtitle.fontWeight}
      lineHeight={styles.subtitle.lineHeight}
      onClick={() => onElementClick?.('subtitle')}
    />
  );
};

