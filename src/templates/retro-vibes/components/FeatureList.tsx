import React from 'react';
import { Group, Line, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout, chineseNumerals } from '../config';

/**
 * 新中式复古模版 - 特点列表（中文数字序号）
 */
export const FeatureList: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height, contentWidth } = scaler;
  const margin = width * layout.margin;
  const { text, primary, isDark } = colors;

  if (!moduleVisibility.features) return null;

  const { itemHeight } = layout.featureList;

  return (
    <Group x={margin} y={height * layout.sections.features}>
      {data.features.map((feature, index) => {
        const y = index * s(itemHeight);
        const numeral = chineseNumerals[index] || String(index + 1);
        
        return (
          <Group key={index} y={y}>
            {/* 中文数字序号 */}
            <Text
              text={numeral}
              fontSize={s(styles.feature.numberSize)}
              fill={primary}
              fontFamily={fonts.serif}
              fontStyle="600"
              opacity={0.8}
            />
            
            {/* 竖线分隔 */}
            <Line
              points={[s(52), s(6), s(52), s(38)]}
              stroke={isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)'}
              strokeWidth={s(1)}
            />
            
            {/* 文本 */}
            <Text
              id={`feature-${index + 1}-text`}
              x={s(68)}
              width={contentWidth - s(180)}
              text={feature}
              fontSize={s(styles.feature.fontSize)}
              fill={text}
              fontFamily={fonts.serif}
              fontStyle={styles.feature.fontWeight}
              letterSpacing={s(styles.feature.letterSpacing)}
              lineHeight={styles.feature.lineHeight}
              opacity={styles.feature.opacity}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />
          </Group>
        );
      })}
    </Group>
  );
};

