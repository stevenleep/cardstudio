import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import { QRCodeImage } from '../../../components/canvas/QRCodeImage';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';
import { Pixel, PixelCorner } from './primitives';

/**
 * 像素风格模版 - 底部区域
 */
export const BottomSection: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, height } = scaler;
  const { primary, secondary, bg, text, textOnPrimary } = colors;
  const px = s(layout.pixelSize);

  return (
    <Group y={height * layout.sections.bottom}>
      {/* 品牌 */}
      {moduleVisibility.brand && (
        <Group x={margin}>
          {/* 像素Logo框 */}
          <Rect 
            width={px * styles.brand.logoSize} 
            height={px * styles.brand.logoSize} 
            fill={primary} 
          />
          <Pixel x={0} y={0} color={bg} size={px * 0.7} />
          <Pixel 
            x={px * (styles.brand.logoSize - 0.7)} 
            y={px * (styles.brand.logoSize - 0.7)} 
            color={bg} 
            size={px * 0.7} 
          />
          <Text 
            width={px * styles.brand.logoSize} 
            y={px * 1.2} 
            text={data.brand.charAt(0)} 
            fontSize={s(styles.brand.fontSize)} 
            fill={textOnPrimary} 
            fontFamily={fonts.pixel} 
            fontStyle="bold" 
            align="center" 
          />
          
          <Text
            id="brand-name"
            x={px * 7}
            y={px * 1}
            text={data.brand}
            fontSize={s(styles.brand.fontSize)}
            fill={text}
            fontFamily={`${fonts.text}, ${fonts.pixel}`}
            fontStyle={styles.brand.fontWeight}
            onClick={() => onElementClick?.('brand-name')}
          />
          
          {/* 像素下划线 */}
          {Array.from({ length: Math.min(data.brand.length, 8) }).map((_, i) => (
            <Pixel key={i} x={px * 7 + i * px * 1.5} y={px * 4} color={secondary} size={px * 0.8} />
          ))}
        </Group>
      )}

      {/* Footer */}
      {moduleVisibility.footer && (
        <Text
          id="footer-desc"
          x={margin}
          y={px * 8}
          width={contentWidth * 0.5}
          text={data.footer}
          fontSize={s(styles.footer.fontSize)}
          fill={text}
          fontFamily={fonts.pixel}
          opacity={styles.footer.opacity}
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
  const { s, margin, width } = scaler;
  const { text } = colors;
  const { size, innerSize, innerPadding, labelSize } = styles.qrCode;

  return (
    <Group x={width - margin - s(size)} y={0}>
      {/* 像素角框 */}
      <PixelCorner x={0} y={0} color={text} />
      <PixelCorner x={s(size)} y={0} color={text} flip />
      <PixelCorner x={0} y={s(175) - s(layout.pixelSize) * 3} color={text} />
      <PixelCorner x={s(size)} y={s(175) - s(layout.pixelSize) * 3} color={text} flip />
      
      <Rect 
        x={s(innerPadding)} 
        y={s(innerPadding)} 
        width={s(innerSize)} 
        height={s(innerSize)} 
        fill="#FFF" 
      />
      
      <QRCodeImage
        qrCode={data.qrCode}
        qrCodeMode={data.qrCodeMode}
        x={s(25)}
        y={s(25)}
        size={s(100)}
        borderColor="transparent"
        borderWidth={0}
        backgroundColor="transparent"
        placeholderColor="#E0E0E0"
        cornerRadius={0}
      />
      
      <Text 
        y={s(145)} 
        width={s(size)} 
        text="SCAN" 
        fontSize={s(labelSize)} 
        fill={text} 
        fontFamily="monospace" 
        fontStyle="bold"
        align="center" 
        opacity={0.6} 
      />
    </Group>
  );
};

