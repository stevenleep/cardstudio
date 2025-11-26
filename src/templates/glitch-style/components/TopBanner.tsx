import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 故障美学模版 - 顶部标签
 */
export const TopBanner: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { primary, secondary, text } = colors;

  if (!moduleVisibility.topBanner) return null;

  const glitchOffset = s(styles.glitch.sm);
  const bannerText = data.topBanner.toUpperCase();

  const commonProps = {
    text: bannerText,
    fontSize: s(styles.topBanner.fontSize),
    fontFamily: fonts.display,
    fontStyle: styles.topBanner.fontWeight,
    letterSpacing: s(styles.topBanner.letterSpacing),
  };

  return (
    <Group x={margin} y={height * 0.06}>
      {/* 故障偏移 - 青色 */}
      <Text
        x={-glitchOffset}
        {...commonProps}
        fill={primary}
        opacity={0.8}
        listening={false}
      />
      {/* 故障偏移 - 品红 */}
      <Text
        x={glitchOffset}
        {...commonProps}
        fill={secondary}
        opacity={0.8}
        listening={false}
      />
      {/* 主文字 */}
      <Text
        id="top-banner-text"
        {...commonProps}
        fill={text}
        onClick={() => onElementClick?.('top-banner-text')}
      />
    </Group>
  );
};

