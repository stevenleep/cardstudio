import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 霓虹暗夜模版 - 顶部标签
 */
export const TopBanner: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, height } = scaler;
  const { primary, secondary, textGray } = colors;

  if (!moduleVisibility.topBanner) return null;

  return (
    <Group x={margin} y={height * 0.065}>
      {/* 渐变竖线装饰 */}
      <Rect
        x={0}
        y={0}
        width={s(styles.topBanner.lineWidth)}
        height={s(styles.topBanner.lineHeight)}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: s(styles.topBanner.lineHeight) }}
        fillLinearGradientColorStops={[
          0, primary,
          0.5, secondary,
          1, primary
        ]}
        cornerRadius={s(2.5)}
        shadowColor={primary}
        shadowBlur={s(15)}
        shadowOpacity={0.5}
        listening={false}
      />
      <Text
        id="top-banner-text"
        x={s(26)}
        y={s(10)}
        text={data.topBanner}
        fontSize={s(styles.topBanner.fontSize)}
        fill={textGray}
        fontFamily={fonts.display}
        fontStyle={styles.topBanner.fontWeight}
        letterSpacing={s(styles.topBanner.letterSpacing)}
        onClick={() => onElementClick?.('top-banner-text')}
      />
    </Group>
  );
};

