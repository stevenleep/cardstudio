import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, musicNotes, layout } from '../config';

/**
 * 故障美学模版 - 特点列表
 * 
 * 带有音符装饰和故障效果
 */
export const FeatureList: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text } = colors;

  if (!moduleVisibility.features) return null;

  const { itemHeight, minY, maxY, bottomY, bottomMargin } = layout.featureList;

  // 动态计算特点列表位置
  const featureCount = data.features?.length || 0;
  const scaledItemHeight = s(itemHeight);
  const featuresHeight = featureCount * scaledItemHeight;
  const calculatedFeaturesY = height * bottomY - featuresHeight - s(bottomMargin);
  const featuresY = Math.max(height * minY, Math.min(height * maxY, calculatedFeaturesY));

  return (
    <Group x={margin} y={featuresY}>
      {data.features.map((feature, index) => {
        const yPos = index * scaledItemHeight;
        const isEven = index % 2 === 0;
        const note = musicNotes[index % musicNotes.length];
        const noteColor = isEven ? primary : secondary;
        
        return (
          <Group key={index} y={yPos}>
            {/* 音符图标 - 故障偏移 */}
            <Text
              x={s(-3)}
              y={s(12)}
              text={note}
              fontSize={s(styles.feature.noteSize)}
              fill={isEven ? primary : secondary}
              fontFamily={fonts.note}
              opacity={0.4}
              listening={false}
            />
            <Text
              x={s(3)}
              y={s(12)}
              text={note}
              fontSize={s(styles.feature.noteSize)}
              fill={isEven ? secondary : primary}
              fontFamily={fonts.note}
              opacity={0.4}
              listening={false}
            />
            <Text
              y={s(12)}
              text={note}
              fontSize={s(styles.feature.noteSize)}
              fill={noteColor}
              fontFamily={fonts.note}
              shadowColor={noteColor}
              shadowBlur={s(12)}
              shadowOpacity={0.4}
              listening={false}
            />
            
            {/* 编号 */}
            <Text
              x={s(55)}
              y={s(10)}
              text={String(index + 1).padStart(2, '0')}
              fontSize={s(styles.feature.numberSize)}
              fill={noteColor}
              fontFamily={fonts.mono}
              fontStyle="italic 800"
              opacity={0.9}
              listening={false}
            />
            
            {/* 特点文字 */}
            <Text
              id={`feature-${index + 1}-text`}
              x={s(140)}
              y={s(18)}
              width={contentWidth - s(160)}
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
    </Group>
  );
};

