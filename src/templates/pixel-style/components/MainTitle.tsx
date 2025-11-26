import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 像素风格模版 - 主标题（带像素阴影）
 */
export const MainTitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, text } = colors;
  const px = s(layout.pixelSize);

  if (!moduleVisibility.mainTitle) return null;

  const shadowOffset = px * styles.mainTitle.shadowOffset;

  const commonProps = {
    width: contentWidth,
    text: data.mainTitle,
    fontSize: s(styles.mainTitle.fontSize),
    fontFamily: fonts.text,
    fontStyle: styles.mainTitle.fontWeight,
    lineHeight: styles.mainTitle.lineHeight,
    wrap: 'word' as const,
  };

  return (
    <Group x={margin} y={height * layout.sections.mainTitle}>
      {/* 像素阴影 */}
      <Text
        x={shadowOffset}
        y={shadowOffset}
        {...commonProps}
        fill={primary}
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

