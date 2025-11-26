import React from 'react';
import { Group, Rect, Line, Text } from 'react-konva';
import { QRCodeImage } from '../../../components/canvas/QRCodeImage';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 星座占卜模版 - 底部区域
 */
export const BottomSection: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height, contentWidth } = scaler;
  const margin = width * layout.margin;
  const { text, primary } = colors;

  return (
    <Group y={height * layout.sections.bottom}>
      {/* 细线分隔 */}
      <Line
        points={[margin, 0, margin + s(80), 0]}
        stroke={primary}
        strokeWidth={s(0.5)}
        opacity={0.3}
      />

      {/* 品牌信息 */}
      {moduleVisibility.brand && (
        <Text
          id="brand-name"
          x={margin}
          y={s(25)}
          text={data.brand}
          fontSize={s(styles.brand.fontSize)}
          fill={text}
          fontFamily={fonts.display}
          fontStyle={styles.brand.fontWeight}
          letterSpacing={s(styles.brand.letterSpacing)}
          opacity={styles.brand.opacity}
          onClick={() => onElementClick?.('brand-name')}
        />
      )}

      {/* Footer */}
      {moduleVisibility.footer && (
        <Text
          id="footer-desc"
          x={margin}
          y={s(70)}
          width={contentWidth * 0.45}
          text={data.footer}
          fontSize={s(styles.footer.fontSize)}
          fill={text}
          fontFamily={fonts.display}
          fontStyle={styles.footer.fontWeight}
          letterSpacing={s(styles.footer.letterSpacing)}
          opacity={styles.footer.opacity}
          onClick={() => onElementClick?.('footer-desc')}
        />
      )}

      {/* QR Code - 极简 */}
      {moduleVisibility.qrCode && (
        <QRCodeSection />
      )}
    </Group>
  );
};

/**
 * 二维码区域
 */
const QRCodeSection: React.FC = () => {
  const { data, scaler } = useTemplate();
  const { s, width } = scaler;
  const margin = width * layout.margin;
  const { size, innerSize, innerPadding, cornerRadius } = styles.qrCode;

  return (
    <Group x={width - margin - s(170)} y={s(-10)}>
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
    </Group>
  );
};

