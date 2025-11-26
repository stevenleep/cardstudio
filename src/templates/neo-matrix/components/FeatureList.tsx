import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { getBrightness } from '../../shared/utils/color';
import { styles, fonts, layout } from '../config';

/**
 * Neo-Brutalism 模版 - 特点列表
 */
export const FeatureList: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, isDark } = colors;

  if (!moduleVisibility.features) return null;

  const borderColor = isDark ? '#FFFFFF' : '#000000';
  const shadowColor = isDark ? 'rgba(255,255,255,0.12)' : '#000000';
  const cardBg = isDark ? '#1A1A1A' : '#FFFFFF';
  const textOnCardBg = isDark ? '#FFFFFF' : '#000000';
  const borderWidth = s(layout.borderWidth);
  const shadowOffset = s(layout.shadowOffset);
  
  const { itemHeight, itemSpacing } = layout.featureList;
  const cardColors = [primary, secondary, primary, secondary];

  return (
    <Group x={margin} y={height * layout.sections.features}>
      {data.features.map((feature, index) => {
        const y = index * (s(itemHeight) + s(itemSpacing));
        const cardColor = cardColors[index % cardColors.length];
        const textOnCardColor = getBrightness(cardColor) < 128 ? '#FFFFFF' : '#000000';
        
        return (
          <Group key={index} y={y}>
            {/* 卡片阴影 */}
            <Rect
              x={shadowOffset}
              y={shadowOffset}
              width={contentWidth}
              height={s(itemHeight)}
              fill={shadowColor}
              listening={false}
            />
            {/* 卡片背景 */}
            <Rect
              width={contentWidth}
              height={s(itemHeight)}
              fill={cardBg}
              stroke={borderColor}
              strokeWidth={borderWidth}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />
            
            {/* 序号方块 */}
            <Rect
              width={s(itemHeight)}
              height={s(itemHeight)}
              fill={cardColor}
              stroke={borderColor}
              strokeWidth={borderWidth}
            />
            <Text
              width={s(itemHeight)}
              y={s(itemHeight) / 2 - s(18)}
              text={String(index + 1).padStart(2, '0')}
              fontSize={s(styles.feature.numberSize)}
              fill={textOnCardColor}
              fontFamily={fonts.mono}
              fontStyle="800"
              align="center"
              listening={false}
            />
            
            {/* 内容文字 */}
            <Text
              id={`feature-${index + 1}-text`}
              x={s(itemHeight) + s(28)}
              y={s(itemHeight) / 2 - s(14)}
              width={contentWidth - s(itemHeight) - s(50)}
              text={feature}
              fontSize={s(styles.feature.fontSize)}
              fill={textOnCardBg}
              fontFamily={fonts.display}
              fontStyle={styles.feature.fontWeight}
              lineHeight={styles.feature.lineHeight}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />
          </Group>
        );
      })}
    </Group>
  );
};

