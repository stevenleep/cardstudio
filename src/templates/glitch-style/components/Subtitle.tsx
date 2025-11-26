import React from 'react';
import { Group, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 故障美学模版 - 副标题
 */
export const Subtitle: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary } = colors;

  if (!moduleVisibility.subtitle || !data.subtitle) return null;

  const glitchOffset = s(styles.glitch.sm) * 0.5;

  return (
    <Group x={margin} y={height * 0.50}>
      {/* 故障偏移 */}
      <Text
        x={-glitchOffset}
        text={data.subtitle}
        fontSize={s(styles.subtitle.fontSize)}
        fill={primary}
        fontFamily={fonts.text}
        fontStyle={styles.subtitle.fontWeight}
        opacity={0.5}
        listening={false}
      />
      {/* 主文字 */}
      <Text
        id="subtitle"
        width={contentWidth * 0.7}
        text={data.subtitle}
        fontSize={s(styles.subtitle.fontSize)}
        fill="rgba(255,255,255,0.6)"
        fontFamily={fonts.text}
        fontStyle={styles.subtitle.fontWeight}
        lineHeight={styles.subtitle.lineHeight}
        onClick={() => onElementClick?.('subtitle')}
      />
    </Group>
  );
};

