import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 霓虹暗夜模版 - 特点列表
 */
export const FeatureList: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text } = colors;

  if (!moduleVisibility.features) return null;

  const { itemHeight } = layout.featureList;

  // 渐变分隔线组件
  const GradientDivider: React.FC<{ y: number }> = ({ y }) => (
    <Rect
      y={y}
      width={contentWidth}
      height={1.5}
      fillLinearGradientStartPoint={{ x: 0, y: 0 }}
      fillLinearGradientEndPoint={{ x: contentWidth, y: 0 }}
      fillLinearGradientColorStops={[
        0, `${primary}70`,
        0.3, `${primary}30`,
        0.5, 'rgba(255,255,255,0.1)',
        0.7, `${secondary}30`,
        1, `${secondary}70`
      ]}
      listening={false}
    />
  );

  return (
    <Group x={margin} y={height * 0.48}>
      {data.features.map((feature, index) => {
        const yPos = index * s(itemHeight);
        
        return (
          <Group key={index} y={yPos}>
            {/* 渐变分隔线 */}
            <GradientDivider y={0} />
            
            {/* 编号 */}
            <Text
              x={0}
              y={s(22)}
              text={String(index + 1).padStart(2, '0')}
              fontSize={s(styles.feature.numberSize)}
              fill={primary}
              fontFamily={fonts.mono}
              fontStyle="700"
              shadowColor={primary}
              shadowBlur={s(10)}
              shadowOpacity={0.5}
              listening={false}
            />
            
            {/* 特点文字 */}
            <Text
              id={`feature-${index + 1}-text`}
              x={s(70)}
              y={s(20)}
              width={contentWidth - s(70)}
              text={feature}
              fontSize={s(styles.feature.fontSize)}
              fill={text}
              fontFamily={fonts.text}
              fontStyle={styles.feature.fontWeight}
              onClick={() => onElementClick?.(`feature-${index + 1}-text`)}
            />
          </Group>
        );
      })}
      
      {/* 底部渐变分隔线 */}
      <GradientDivider y={data.features.length * s(itemHeight)} />
    </Group>
  );
};

