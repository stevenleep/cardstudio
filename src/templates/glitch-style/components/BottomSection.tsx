import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { QRCodeImage } from '../../../components/canvas/QRCodeImage';
import { useTemplate } from '../../shared';
import { styles, fonts } from '../config';

/**
 * 故障美学模版 - 底部区域
 */
export const BottomSection: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, text } = colors;

  const glitchMd = s(styles.glitch.md);
  const glitchSm = s(styles.glitch.sm);

  return (
    <Group y={height * 0.84}>
      {/* 品牌信息 */}
      {moduleVisibility.brand && (
        <Group x={margin} y={0}>
          {/* 故障偏移 */}
          <Text
            x={-glitchMd}
            y={-glitchSm * 0.5}
            text={data.brand}
            fontSize={s(styles.brand.fontSize)}
            fill={primary}
            fontFamily={fonts.display}
            fontStyle={styles.brand.fontWeight}
            opacity={0.7}
            listening={false}
          />
          <Text
            x={glitchMd}
            y={glitchSm * 0.5}
            text={data.brand}
            fontSize={s(styles.brand.fontSize)}
            fill={secondary}
            fontFamily={fonts.display}
            fontStyle={styles.brand.fontWeight}
            opacity={0.7}
            listening={false}
          />
          {/* 主文字 */}
          <Text
            id="brand-name"
            text={data.brand}
            fontSize={s(styles.brand.fontSize)}
            fill={text}
            fontFamily={fonts.display}
            fontStyle={styles.brand.fontWeight}
            onClick={() => onElementClick?.('brand-name')}
          />
        </Group>
      )}

      {/* Footer */}
      {moduleVisibility.footer && (
        <Text
          id="footer-desc"
          x={margin}
          y={s(75)}
          width={contentWidth * 0.5}
          text={data.footer}
          fontSize={s(styles.footer.fontSize)}
          fill="rgba(255,255,255,0.4)"
          fontFamily={fonts.text}
          fontStyle={styles.footer.fontWeight}
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
  const { primary, secondary } = colors;
  const { size, borderOffset, borderWidth } = styles.qrCode;

  return (
    <Group x={width - margin - s(235)} y={s(-35)}>
      {/* 故障边框 - 青色 */}
      <Rect
        x={s(-borderOffset)}
        y={s(-borderOffset)}
        width={s(size + borderOffset * 2)}
        height={s(size + borderOffset * 2)}
        stroke={primary}
        strokeWidth={s(borderWidth)}
        listening={false}
      />
      {/* 故障边框 - 品红 */}
      <Rect
        x={s(borderOffset)}
        y={s(borderOffset)}
        width={s(size + borderOffset * 2)}
        height={s(size + borderOffset * 2)}
        stroke={secondary}
        strokeWidth={s(borderWidth)}
        listening={false}
      />
      
      {/* 白色底 */}
      <Rect
        width={s(size)}
        height={s(size)}
        fill="#FFFFFF"
        listening={false}
      />
      
      {/* 二维码 */}
      <QRCodeImage
        qrCode={data.qrCode}
        qrCodeMode={data.qrCodeMode}
        x={s(12)}
        y={s(12)}
        size={s(196)}
        borderColor="transparent"
        borderWidth={0}
        backgroundColor="transparent"
        placeholderColor="#F0F0F0"
        cornerRadius={0}
      />
    </Group>
  );
};

