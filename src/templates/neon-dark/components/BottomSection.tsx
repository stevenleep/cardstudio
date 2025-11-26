import React from 'react';
import { Group, Rect, Circle, Text } from 'react-konva';
import { QRCodeImage } from '../../../components/canvas/QRCodeImage';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 霓虹暗夜模版 - 底部区域
 */
export const BottomSection: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text, textGray } = colors;

  return (
    <Group y={height * 0.76}>
      {/* 品牌信息 */}
      {moduleVisibility.brand && (
        <Group x={margin} y={0}>
          {/* 品牌名 */}
          <Text
            id="brand-name"
            text={data.brand}
            fontSize={s(styles.brand.fontSize)}
            fill={text}
            fontFamily={fonts.display}
            fontStyle={styles.brand.fontWeight}
            letterSpacing={s(styles.brand.letterSpacing)}
            shadowColor={primary}
            shadowBlur={s(20)}
            shadowOpacity={0.3}
            onClick={() => onElementClick?.('brand-name')}
          />
          
          {/* 渐变装饰线 */}
          <Rect
            x={0}
            y={s(75)}
            width={s(styles.brand.decorLineWidth)}
            height={s(styles.brand.decorLineHeight)}
            fillLinearGradientStartPoint={{ x: 0, y: 0 }}
            fillLinearGradientEndPoint={{ x: s(styles.brand.decorLineWidth), y: 0 }}
            fillLinearGradientColorStops={[
              0, primary,
              0.5, secondary,
              1, primary
            ]}
            cornerRadius={s(2.5)}
            shadowColor={primary}
            shadowBlur={s(12)}
            shadowOpacity={0.6}
            listening={false}
          />
        </Group>
      )}

      {/* Footer */}
      {moduleVisibility.footer && (
        <Text
          id="footer-desc"
          x={margin}
          y={s(110)}
          width={contentWidth * 0.55}
          text={data.footer}
          fontSize={s(styles.footer.fontSize)}
          fill={textGray}
          fontFamily={fonts.text}
          fontStyle={styles.footer.fontWeight}
          lineHeight={styles.footer.lineHeight}
          onClick={() => onElementClick?.('footer-desc')}
        />
      )}

      {/* QR Code */}
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
  const { s, margin, width } = scaler;
  const { textGray } = colors;
  const { size, innerSize, innerPadding, cornerRadius, glowRadius } = styles.qrCode;

  return (
    <Group x={width - margin - s(245)} y={s(-30)}>
      {/* 二维码发光背景 */}
      <Circle
        x={s(120)}
        y={s(120)}
        radius={s(glowRadius)}
        fillRadialGradientStartPoint={{ x: 0, y: 0 }}
        fillRadialGradientEndPoint={{ x: 0, y: 0 }}
        fillRadialGradientStartRadius={0}
        fillRadialGradientEndRadius={s(glowRadius)}
        fillRadialGradientColorStops={[
          0, 'rgba(255,255,255,0.15)',
          0.5, 'rgba(255,255,255,0.05)',
          1, 'transparent'
        ]}
        listening={false}
      />
      
      {/* 二维码容器 */}
      <Rect
        width={s(size)}
        height={s(size)}
        fill="#FFFFFF"
        cornerRadius={s(cornerRadius)}
        listening={false}
      />
      
      <QRCodeImage
        qrCode={data.qrCode}
        qrCodeMode={data.qrCodeMode}
        x={s(innerPadding)}
        y={s(innerPadding)}
        size={s(innerSize)}
        borderColor="transparent"
        borderWidth={0}
        backgroundColor="transparent"
        placeholderColor="#F0F0F0"
        cornerRadius={0}
      />
      
      {/* 扫码提示 */}
      <Text
        y={s(258)}
        width={s(size)}
        text="扫码了解更多"
        fontSize={s(17)}
        fill={textGray}
        fontFamily={fonts.text}
        fontStyle="400"
        align="center"
        listening={false}
      />
    </Group>
  );
};

