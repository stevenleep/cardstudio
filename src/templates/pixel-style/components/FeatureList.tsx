import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { getBrightness } from '../../shared/utils/color';
import { styles, fonts, layout } from '../config';
import { Pixel } from './primitives';

/**
 * 像素风格模版 - 特点列表
 */
export const FeatureList: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, bg, text } = colors;
  const px = s(layout.pixelSize);

  if (!moduleVisibility.features) return null;

  const { itemHeight, blockSize } = { 
    itemHeight: layout.featureList.itemHeight, 
    blockSize: styles.feature.blockSize 
  };

  return (
    <Group x={margin} y={height * layout.sections.features}>
      {data.features.map((feature, i) => {
        const isFirst = i === 0;
        const blockColor = isFirst ? primary : secondary;
        const textOnBlockColor = getBrightness(blockColor) < 128 ? '#FFF' : '#000';
        
        return (
          <Group key={i} y={i * s(itemHeight)}>
            {/* 像素序号块 */}
            <Rect 
              width={px * blockSize} 
              height={px * blockSize} 
              fill={blockColor} 
            />
            <Pixel x={0} y={0} color={bg} size={px * 0.8} />
            <Pixel x={px * (blockSize - 0.8)} y={px * (blockSize - 0.8)} color={bg} size={px * 0.8} />
            
            <Text
              width={px * blockSize}
              y={px * 0.8}
              text={String(i + 1)}
              fontSize={s(styles.feature.numberSize)}
              fill={textOnBlockColor}
              fontFamily={fonts.pixel}
              fontStyle="bold"
              align="center"
            />
            
            <Text
              id={`feature-${i + 1}-text`}
              x={px * 6}
              y={px * 0.5}
              width={contentWidth - px * 6}
              text={feature}
              fontSize={s(styles.feature.fontSize)}
              fill={text}
              fontFamily={fonts.text}
              fontStyle={styles.feature.fontWeight}
              lineHeight={styles.feature.lineHeight}
              onClick={() => onElementClick?.(`feature-${i + 1}-text`)}
            />
          </Group>
        );
      })}
    </Group>
  );
};

