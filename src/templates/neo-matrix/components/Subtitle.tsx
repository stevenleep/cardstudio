import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * Neo-Brutalism 模版 - 副标题卡片
 */
export const Subtitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { secondary, textOnSecondary, isDark } = colors;

  if (!moduleVisibility.subtitle || !data.subtitle) return null;

  const borderColor = isDark ? '#FFFFFF' : '#000000';
  const shadowColor = isDark ? 'rgba(255,255,255,0.12)' : '#000000';
  const borderWidth = s(layout.borderWidth);
  const shadowOffset = s(layout.shadowOffset);
  
  const cardWidth = contentWidth * 0.8;
  const cardHeight = s(styles.subtitle.height);
  const padding = s(styles.subtitle.padding);

  return (
    <Group x={margin} y={height * layout.sections.subtitle}>
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
        fill={secondary}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      <Text
        id="subtitle"
        x={padding}
        y={s(20)}
        width={cardWidth - padding * 2}
        text={data.subtitle}
        fontSize={s(styles.subtitle.fontSize)}
        fill={textOnSecondary}
        fontFamily={fonts.display}
        fontStyle={styles.subtitle.fontWeight}
        lineHeight={styles.subtitle.lineHeight}
        onClick={() => onElementClick?.('subtitle')}
      />
    </Group>
  );
};

