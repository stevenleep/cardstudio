import React from 'react';
import { Group, Rect, Circle, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 简约现代模版 - 顶部标签
 */
export const TopBanner: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { primary, text, isDark, glass } = colors;

  if (!moduleVisibility.topBanner) return null;

  const bannerWidth = data.topBanner.length * s(15) + s(60);

  return (
    <Group x={margin} y={height * 0.06}>
      {/* 玻璃背景 */}
      <Rect
        x={s(-18)}
        y={s(-12)}
        width={bannerWidth}
        height={s(44)}
        fill={glass.bgStrong}
        stroke={glass.border}
        strokeWidth={1.5}
        cornerRadius={s(styles.topBanner.pillRadius)}
        shadowColor={primary}
        shadowBlur={s(20)}
        shadowOpacity={isDark ? 0.15 : 0.08}
      />
      
      {/* 高光条 */}
      <Rect
        x={s(-10)}
        y={s(-8)}
        width={bannerWidth - s(16)}
        height={s(16)}
        fill={glass.highlight}
        cornerRadius={[s(12), s(12), 0, 0] as any}
        opacity={0.5}
      />
      
      {/* 指示圆点 */}
      <Circle
        radius={s(5)}
        fill={primary}
        shadowColor={primary}
        shadowBlur={s(10)}
        shadowOpacity={0.5}
      />
      
      {/* 文字 */}
      <Text
        id="top-banner-text"
        x={s(16)}
        text={data.topBanner}
        fontSize={s(styles.topBanner.fontSize)}
        fill={text}
        fontFamily={fonts.primary}
        fontStyle={styles.topBanner.fontWeight}
        letterSpacing={s(styles.topBanner.letterSpacing)}
        opacity={0.8}
        onClick={() => onElementClick?.('top-banner-text')}
      />
    </Group>
  );
};

