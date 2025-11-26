import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * Neo-Brutalism 模版 - 主标题
 */
export const MainTitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { text, isDark } = colors;

  if (!moduleVisibility.mainTitle) return null;

  const shadowColor = isDark ? 'rgba(255,255,255,0.12)' : '#000000';
  const shadowOffset = s(styles.mainTitle.shadowOffset);

  const commonProps = {
    width: contentWidth,
    text: data.mainTitle,
    fontSize: s(styles.mainTitle.fontSize),
    fontFamily: fonts.display,
    fontStyle: styles.mainTitle.fontWeight,
    lineHeight: styles.mainTitle.lineHeight,
    letterSpacing: s(styles.mainTitle.letterSpacing),
    wrap: 'word' as const,
  };

  return (
    <Group x={margin} y={height * layout.sections.mainTitle}>
      {/* 标题阴影 */}
      <Text
        x={shadowOffset}
        y={shadowOffset}
        {...commonProps}
        fill={shadowColor}
        listening={false}
      />
      {/* 主标题 */}
      <Text
        id="main-title"
        {...commonProps}
        fill={text}
        onClick={() => onElementClick?.('main-title')}
      />
    </Group>
  );
};

