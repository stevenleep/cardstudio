import React from 'react';
import { Group, Rect, Line, Text } from 'react-konva';
import { QRCodeImage } from '../../../components/canvas/QRCodeImage';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 简约现代模版 - 底部区域
 * 
 * 包含：玻璃卡片、品牌信息、footer、二维码
 */
export const BottomSection: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text, isDark, glass } = colors;

  return (
    <Group x={margin} y={height * 0.80}>
      {/* 底层光晕 */}
      <Rect
        x={s(-15)}
        y={s(-15)}
        width={contentWidth + s(30)}
        height={height * 0.16 + s(30)}
        fillRadialGradientStartPoint={{ x: contentWidth / 2, y: height * 0.08 }}
        fillRadialGradientEndPoint={{ x: contentWidth / 2, y: height * 0.08 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={contentWidth * 0.6}
        fillRadialGradientColorStops={[
          0, `${primary}30`, 
          0.5, `${secondary}15`, 
          1, 'transparent'
        ]}
        cornerRadius={s(35)}
        listening={false}
      />
      
      {/* 玻璃主卡片 */}
      <Rect
        width={contentWidth}
        height={height * 0.155}
        fill={glass.bgStrong}
        stroke={glass.border}
        strokeWidth={2}
        cornerRadius={s(30)}
        shadowColor={primary}
        shadowBlur={s(50)}
        shadowOpacity={isDark ? 0.20 : 0.12}
        shadowOffsetY={s(12)}
        listening={false}
      />
      
      {/* 高光层 */}
      <Rect
        x={s(15)}
        y={s(4)}
        width={contentWidth - s(30)}
        height={s(35)}
        fill={glass.highlight}
        cornerRadius={[s(20), s(20), 0, 0] as any}
        opacity={0.5}
        listening={false}
      />

      {/* 渐变装饰线 */}
      <Line
        points={[s(30), height * 0.08, contentWidth - s(220), height * 0.08]}
        stroke={glass.border}
        strokeWidth={1}
        opacity={0.4}
        listening={false}
      />
      
      {/* 品牌信息 */}
      <Group x={s(35)} y={s(32)}>
        {moduleVisibility.brand && (
          <Text
            id="brand-name"
            text={data.brand}
            fontSize={s(styles.brand.fontSize)}
            fill={text}
            fontFamily={fonts.primary}
            fontStyle={styles.brand.fontWeight}
            onClick={() => onElementClick?.('brand-name')}
          />
        )}
        {moduleVisibility.footer && (
          <Text
            id="footer-desc"
            y={s(48)}
            text={data.footer}
            fontSize={s(styles.footer.fontSize)}
            fill={text}
            opacity={styles.footer.opacity}
            width={contentWidth * 0.4}
            fontFamily={fonts.primary}
            fontStyle={styles.footer.fontWeight}
            wrap="word"
            lineHeight={styles.footer.lineHeight}
            onClick={() => onElementClick?.('footer-desc')}
          />
        )}
      </Group>

      {/* 二维码玻璃框 */}
      {moduleVisibility.qrCode && (
        <QRCodeSection />
      )}
    </Group>
  );
};

/**
 * 二维码区域 (内部组件)
 */
const QRCodeSection: React.FC = () => {
  const { data, colors, scaler } = useTemplate();
  const { s, contentWidth } = scaler;
  const { secondary, glass } = colors;
  const { size, containerSize, innerPadding, cornerRadius } = styles.qrCode;

  return (
    <Group x={contentWidth - s(190)} y={s(8)}>
      {/* 玻璃外框 */}
      <Rect
        x={s(-15)}
        y={s(-15)}
        width={s(containerSize)}
        height={s(containerSize)}
        fill={glass.bg}
        stroke={glass.border}
        strokeWidth={1.5}
        cornerRadius={s(22)}
        shadowColor={secondary}
        shadowBlur={s(20)}
        shadowOpacity={0.15}
      />
      
      {/* 高光 */}
      <Rect
        x={s(-8)}
        y={s(-12)}
        width={s(181)}
        height={s(30)}
        fill={glass.highlight}
        cornerRadius={[s(18), s(18), 0, 0] as any}
        opacity={0.4}
      />
      
      {/* 白色底 */}
      <Rect
        width={s(size)}
        height={s(size)}
        fill="#FFFFFF"
        cornerRadius={s(cornerRadius)}
      />
      
      {/* 二维码 */}
      <QRCodeImage
        qrCode={data.qrCode}
        qrCodeMode={data.qrCodeMode}
        x={s(innerPadding)}
        y={s(innerPadding)}
        size={s(size - innerPadding * 2 - 3)}
        borderColor="transparent"
        borderWidth={0}
        backgroundColor="transparent"
        placeholderColor="#F0F0F0"
      />
    </Group>
  );
};

