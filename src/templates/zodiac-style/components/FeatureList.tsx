import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 星座占卜模版 - 特点列表（极简轻盈）
 */
export const FeatureList: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height, contentWidth } = scaler;
  const margin = width * layout.margin;
  const { text, primary, isDark } = colors;

  if (!moduleVisibility.features) return null;

  const { itemHeight, spacing, cornerRadius } = layout.featureList;

  return (
    <Group x={margin} y={height * layout.sections.features}>
      {data.features.map((feature, index) => {
        const y = index * (s(itemHeight) + s(spacing));
        
        return (
          <Group key={index} y={y}>
            {/* 极淡的背景 */}
            <Rect
              width={contentWidth}
              height={s(itemHeight)}
              fill={text}
              cornerRadius={s(cornerRadius)}
              opacity={isDark ? 0.03 : 0.04}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />
            
            {/* 左侧细线装饰 */}
            <Rect
              x={0}
              y={s(itemHeight) * 0.25}
              width={s(styles.feature.lineWidth)}
              height={s(itemHeight) * 0.5}
              fill={primary}
              opacity={0.4}
            />
            
            {/* 文本 */}
            <Text
              id={`feature-${index + 1}-text`}
              x={s(24)}
              y={0}
              height={s(itemHeight)}
              width={contentWidth - s(40)}
              text={feature}
              fontSize={s(styles.feature.fontSize)}
              fill={text}
              fontFamily={fonts.display}
              fontStyle={styles.feature.fontWeight}
              verticalAlign="middle"
              letterSpacing={s(styles.feature.letterSpacing)}
              opacity={styles.feature.opacity}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />
          </Group>
        );
      })}
    </Group>
  );
};

