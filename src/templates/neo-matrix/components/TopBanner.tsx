import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * Neo-Brutalism 模版 - 顶部标签卡片
 */
export const TopBanner: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { primary, textOnPrimary, isDark } = colors;

  if (!moduleVisibility.topBanner) return null;

  const borderColor = isDark ? '#FFFFFF' : '#000000';
  const shadowColor = isDark ? 'rgba(255,255,255,0.12)' : '#000000';
  const borderWidth = s(layout.borderWidth);
  const shadowOffset = s(layout.shadowOffset);
  
  const cardWidth = data.topBanner.length * s(16) + s(45);
  const cardHeight = s(styles.topBanner.height);

  return (
    <Group x={margin} y={height * layout.sections.topBanner}>
      {/* 阴影 */}
      <Rect
        x={shadowOffset}
        y={shadowOffset}
        width={cardWidth}
        height={cardHeight}
        fill={shadowColor}
        listening={false}
      />
      {/* 卡片 */}
      <Rect
        width={cardWidth}
        height={cardHeight}
        fill={primary}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      <Text
        id="top-banner-text"
        x={s(22)}
        y={s(12)}
        text={data.topBanner}
        fontSize={s(styles.topBanner.fontSize)}
        fill={textOnPrimary}
        fontFamily={fonts.display}
        fontStyle={styles.topBanner.fontWeight}
        letterSpacing={s(styles.topBanner.letterSpacing)}
        onClick={() => onElementClick?.('top-banner-text')}
      />
    </Group>
  );
};

