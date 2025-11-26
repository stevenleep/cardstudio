import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';
import { Pixel } from './primitives';

/**
 * 像素风格模版 - 顶部标签
 */
export const TopBanner: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { primary, bg, textOnPrimary } = colors;
  const px = s(layout.pixelSize);

  if (!moduleVisibility.topBanner) return null;

  const bannerWidth = data.topBanner.length * s(16) + px * 6;

  return (
    <Group x={margin} y={height * layout.sections.topBanner}>
      {/* 像素标签背景 */}
      <Rect 
        width={bannerWidth} 
        height={px * styles.topBanner.pillHeight} 
        fill={primary} 
      />
      {/* 像素缺角 */}
      <Pixel x={0} y={0} color={bg} />
      <Pixel x={bannerWidth - px} y={px * (styles.topBanner.pillHeight - 1)} color={bg} />
      
      <Text
        id="top-banner-text"
        x={px * 2}
        y={px * 0.8}
        text={data.topBanner.toUpperCase()}
        fontSize={s(styles.topBanner.fontSize)}
        fill={textOnPrimary}
        fontFamily={fonts.pixel}
        fontStyle={styles.topBanner.fontWeight}
        letterSpacing={s(styles.topBanner.letterSpacing)}
        onClick={() => onElementClick?.('top-banner-text')}
      />
    </Group>
  );
};

