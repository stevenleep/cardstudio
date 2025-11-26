import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 霓虹暗夜模版 - 主标题
 * 
 * 带有双色霓虹发光效果
 */
export const MainTitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text } = colors;

  if (!moduleVisibility.mainTitle) return null;

  const commonProps = {
    width: contentWidth,
    text: data.mainTitle,
    fontSize: s(styles.mainTitle.fontSize),
    fontFamily: fonts.display,
    fontStyle: styles.mainTitle.fontWeight,
    lineHeight: styles.mainTitle.lineHeight,
    wrap: 'word' as const,
  };

  return (
    <Group x={margin} y={height * 0.15}>
      {/* 文字外发光 - 主色 */}
      <Text
        {...commonProps}
        fill="transparent"
        shadowColor={primary}
        shadowBlur={s(styles.mainTitle.glowBlur)}
        shadowOpacity={0.4}
        listening={false}
      />
      
      {/* 文字外发光 - 副色偏移 */}
      <Text
        {...commonProps}
        x={s(styles.mainTitle.glowOffset)}
        y={s(styles.mainTitle.glowOffset)}
        fill="transparent"
        shadowColor={secondary}
        shadowBlur={s(styles.mainTitle.glowBlurSecondary)}
        shadowOpacity={0.3}
        listening={false}
      />
      
      {/* 主标题文字 */}
      <Text
        {...commonProps}
        id="main-title"
        fill={text}
        onClick={() => onElementClick?.('main-title')}
      />
    </Group>
  );
};

