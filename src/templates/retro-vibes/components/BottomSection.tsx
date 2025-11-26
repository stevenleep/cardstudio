import React from 'react';
import { Group, Rect, Line, Text } from 'react-konva';
import { QRCodeImage } from '../../../components/canvas/QRCodeImage';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * 新中式复古模版 - 底部区域
 */
export const BottomSection: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, width, height, contentWidth } = scaler;
  const margin = width * layout.margin;
  const { text, primary } = colors;

  return (
    <Group y={height * layout.sections.bottom}>
      {/* 品牌 - 印章风格 */}
      {moduleVisibility.brand && (
        <Group x={margin} y={s(25)}>
          <Rect
            x={s(-12)}
            y={s(-10)}
            width={Math.min(data.brand.length * s(38) + s(24), s(200))}
            height={s(52)}
            stroke={primary}
            strokeWidth={s(1.5)}
            opacity={0.7}
          />
          <Text
            id="brand-name"
            text={data.brand}
            fontSize={s(styles.brand.fontSize)}
            fill={primary}
            fontFamily={fonts.serif}
            fontStyle={styles.brand.fontWeight}
            letterSpacing={s(styles.brand.letterSpacing)}
            onClick={() => onElementClick?.('brand-name')}
          />
        </Group>
      )}

      {/* Footer */}
      {moduleVisibility.footer && (
        <Text
          id="footer-desc"
          x={margin}
          y={s(95)}
          width={contentWidth * 0.5}
          text={data.footer}
          fontSize={s(styles.footer.fontSize)}
          fill={text}
          fontFamily={fonts.serif}
          fontStyle={styles.footer.fontWeight}
          opacity={styles.footer.opacity}
          letterSpacing={s(styles.footer.letterSpacing)}
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
 * 二维码区域
 */
const QRCodeSection: React.FC = () => {
  const { data, colors, scaler } = useTemplate();
  const { s, width } = scaler;
  const margin = width * layout.margin;
  const { primary, isDark } = colors;
  const { size, innerSize, innerPadding, containerSize } = styles.qrCode;

  return (
    <Group x={width - margin - s(150)} y={s(10)}>
      {/* 外框 */}
      <Rect
        x={s(-15)}
        y={s(-15)}
        width={s(containerSize)}
        height={s(containerSize)}
        stroke={isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'}
        strokeWidth={s(1)}
      />
      
      {/* 四角装饰 */}
      <Line points={[s(-15), s(10), s(-15), s(-15), s(10), s(-15)]} stroke={primary} strokeWidth={s(1.5)} opacity={0.6} />
      <Line points={[s(125), s(-15), s(150), s(-15), s(150), s(10)]} stroke={primary} strokeWidth={s(1.5)} opacity={0.6} />
      <Line points={[s(-15), s(125), s(-15), s(150), s(10), s(150)]} stroke={primary} strokeWidth={s(1.5)} opacity={0.6} />
      <Line points={[s(125), s(150), s(150), s(150), s(150), s(125)]} stroke={primary} strokeWidth={s(1.5)} opacity={0.6} />
      
      <Rect
        width={s(size)}
        height={s(size)}
        fill="#FFFFFF"
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
        placeholderColor="#F5F5F5"
        cornerRadius={0}
      />
    </Group>
  );
};

