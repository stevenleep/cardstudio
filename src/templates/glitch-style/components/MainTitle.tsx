import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 故障美学模版 - 主标题
 * 
 * 带有明显的故障偏移效果
 */
export const MainTitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text } = colors;

  if (!moduleVisibility.mainTitle) return null;

  const glitchLg = s(styles.glitch.lg);
  const glitchMd = s(styles.glitch.md);

  const commonProps = {
    width: contentWidth + s(100),
    text: data.mainTitle,
    fontSize: s(styles.mainTitle.fontSize),
    fontFamily: fonts.display,
    fontStyle: styles.mainTitle.fontWeight,
    lineHeight: styles.mainTitle.lineHeight,
    wrap: 'word' as const,
  };

  return (
    <Group x={margin - s(20)} y={height * 0.14}>
      {/* 故障偏移 - 青色 */}
      <Text
        x={-glitchLg}
        y={-glitchMd}
        {...commonProps}
        fill={primary}
        opacity={0.7}
        listening={false}
      />
      {/* 故障偏移 - 品红 */}
      <Text
        x={glitchLg}
        y={glitchMd}
        {...commonProps}
        fill={secondary}
        opacity={0.7}
        listening={false}
      />
      {/* 主标题文字 */}
      <Text
        id="main-title"
        {...commonProps}
        fill={text}
        onClick={() => onElementClick?.('main-title')}
      />
    </Group>
  );
};

