import React from 'react';
import { Group, Rect, Circle, Text, Path } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 简约现代模版 - 特点列表
 */
export const FeatureList: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text, isDark, glass } = colors;

  if (!moduleVisibility.features) return null;

  const { itemHeight, spacing, cornerRadius } = layout.featureList;

  return (
    <Group x={margin} y={height * 0.37}>
      {data.features.map((feature, index) => {
        const y = index * (s(itemHeight) + s(spacing));
        const isEven = index % 2 === 0;
        const itemColor = isEven ? primary : secondary;
        
        return (
          <Group key={index} y={y}>
            {/* 底层阴影 */}
            <Rect
              x={s(4)}
              y={s(4)}
              width={contentWidth}
              height={s(itemHeight)}
              fill={itemColor}
              cornerRadius={s(cornerRadius)}
              opacity={0.08}
            />
            
            {/* 玻璃主体 */}
            <Rect
              width={contentWidth}
              height={s(itemHeight)}
              fill={glass.bgStrong}
              stroke={glass.border}
              strokeWidth={1.5}
              cornerRadius={s(cornerRadius)}
              shadowColor={itemColor}
              shadowBlur={s(25)}
              shadowOpacity={isDark ? 0.18 : 0.10}
              shadowOffsetY={s(6)}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />
            
            {/* 顶部高光 */}
            <Rect
              x={s(10)}
              y={s(3)}
              width={contentWidth - s(20)}
              height={s(20)}
              fill={glass.highlight}
              cornerRadius={[s(12), s(12), 0, 0] as any}
              opacity={0.4}
            />
            
            {/* 左侧渐变圆形序号 */}
            <Group x={s(24)} y={s(itemHeight) / 2}>
              <Circle
                radius={s(24)}
                fillRadialGradientStartPoint={{ x: -10, y: -10 }}
                fillRadialGradientEndPoint={{ x: 10, y: 10 }}
                fillRadialGradientStartRadius={0}
                fillRadialGradientEndRadius={s(30)}
                fillRadialGradientColorStops={[
                  0, itemColor, 
                  0.7, isEven ? secondary : primary, 
                  1, isEven ? secondary : primary
                ]}
                shadowColor={itemColor}
                shadowBlur={s(18)}
                shadowOpacity={0.45}
              />
              <Text
                x={s(-12)}
                y={s(-12)}
                width={s(24)}
                height={s(24)}
                text={String(index + 1)}
                fontSize={s(styles.feature.numberSize)}
                fill="#FFFFFF"
                fontFamily={fonts.mono}
                fontStyle="700"
                align="center"
                verticalAlign="middle"
              />
            </Group>
            
            {/* 文本 */}
            <Text
              id={`feature-${index + 1}-text`}
              x={s(70)}
              y={0}
              height={s(itemHeight)}
              width={contentWidth - s(130)}
              text={feature}
              fontSize={s(styles.feature.fontSize)}
              fill={text}
              fontFamily={fonts.primary}
              fontStyle={styles.feature.fontWeight}
              verticalAlign="middle"
              opacity={styles.feature.opacity}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />

            {/* 右侧玻璃装饰 */}
            <Circle
              x={contentWidth - s(35)}
              y={s(itemHeight) / 2}
              radius={s(16)}
              fill={glass.bg}
              stroke={glass.border}
              strokeWidth={1}
            />
            <Path
              x={contentWidth - s(42)}
              y={s(itemHeight) / 2 - s(6)}
              data="M0 6 L6 12 L15 0"
              stroke={itemColor}
              strokeWidth={s(2.5)}
              lineCap="round"
              lineJoin="round"
              opacity={0.8}
            />
          </Group>
        );
      })}
    </Group>
  );
};

