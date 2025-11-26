import React from 'react';
import { Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 星座占卜模版 - 顶部标签
 */
export const TopBanner: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height } = scaler;
  const margin = width * layout.margin;
  const { text } = colors;

  if (!moduleVisibility.topBanner) return null;

  return (
    <Text
      id="top-banner-text"
      x={margin}
      y={height * layout.sections.topBanner}
      text={data.topBanner}
      fontSize={s(styles.topBanner.fontSize)}
      fill={text}
      fontFamily={fonts.display}
      fontStyle={styles.topBanner.fontWeight}
      letterSpacing={s(styles.topBanner.letterSpacing)}
      opacity={styles.topBanner.opacity}
      onClick={() => onElementClick?.('top-banner-text')}
    />
  );
};

