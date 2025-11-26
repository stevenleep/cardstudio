import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';
import { Pixel } from './primitives';

/**
 * 像素风格模版 - 副标题
 */
export const Subtitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { secondary, text } = colors;
  const px = s(layout.pixelSize);

  if (!moduleVisibility.subtitle || !data.subtitle) return null;

  return (
    <Group x={margin} y={height * layout.sections.subtitle}>
      {/* 像素点前缀 */}
      <Pixel x={0} y={s(6)} color={secondary} size={px * 0.8} />
      <Pixel x={px} y={s(6)} color={secondary} size={px * 0.8} />
      
      <Text
        id="subtitle"
        x={px * 3}
        width={contentWidth - px * 3}
        text={data.subtitle}
        fontSize={s(styles.subtitle.fontSize)}
        fill={text}
        fontFamily={fonts.pixel}
        opacity={styles.subtitle.opacity}
        onClick={() => onElementClick?.('subtitle')}
      />
    </Group>
  );
};

