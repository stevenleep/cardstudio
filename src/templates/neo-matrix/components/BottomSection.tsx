import React from 'react';
import { Group, Rect, Line, Text } from 'react-konva';
import { QRCodeImage } from '../../../components/canvas/QRCodeImage';
import { useTemplate } from '../../shared';
import { styles, fonts, layout } from '../config';

/**
 * Neo-Brutalism 模版 - 底部区域
 */
export const BottomSection: React.FC = () => {
  const { data, moduleVisibility, onElementClick, colors, scaler } = useTemplate();
  const { s, margin, contentWidth, width, height } = scaler;
  const { primary, secondary, text, textOnPrimary, isDark } = colors;

  const borderColor = isDark ? '#FFFFFF' : '#000000';
  const shadowColor = isDark ? 'rgba(255,255,255,0.12)' : '#000000';
  const borderWidth = s(layout.borderWidth);
  const shadowOffset = s(layout.shadowOffset);

  return (
    <Group y={height * layout.sections.bottom}>
      {/* 粗分隔线 */}
      <Line
        points={[margin, 0, width - margin, 0]}
        stroke={borderColor}
        strokeWidth={borderWidth}
        listening={false}
      />

      {/* 品牌信息 */}
      <Group x={margin} y={s(45)}>
        {moduleVisibility.brand && (
          <Group>
            {/* Logo 方块 */}
            <Rect
              x={shadowOffset * 0.7}
              y={shadowOffset * 0.7}
              width={s(styles.brand.logoSize)}
              height={s(styles.brand.logoSize)}
              fill={shadowColor}
              listening={false}
            />
            <Rect
              width={s(styles.brand.logoSize)}
              height={s(styles.brand.logoSize)}
              fill={primary}
              stroke={borderColor}
              strokeWidth={borderWidth}
            />
            <Text
              width={s(styles.brand.logoSize)}
              y={s(16)}
              text={data.brand.charAt(0)}
              fontSize={s(styles.brand.letterSize)}
              fill={textOnPrimary}
              fontFamily={fonts.display}
              fontStyle="800"
              align="center"
            />
            
            {/* 品牌名 */}
            <Text
              id="brand-name"
              x={s(85)}
              y={s(10)}
              text={data.brand}
              fontSize={s(styles.brand.fontSize)}
              fill={text}
              fontFamily={fonts.display}
              fontStyle={styles.brand.fontWeight}
              onClick={() => onElementClick?.('brand-name')}
            />
            
            {/* 下划线 */}
            <Rect
              x={s(85)}
              y={s(50)}
              width={Math.min(data.brand.length * s(22), contentWidth * 0.35)}
              height={s(styles.brand.underlineHeight)}
              fill={secondary}
            />
          </Group>
        )}

        {/* Footer */}
        {moduleVisibility.footer && (
          <Text
            id="footer-desc"
            y={s(90)}
            width={contentWidth * 0.5}
            text={data.footer}
            fontSize={s(styles.footer.fontSize)}
            fill={text}
            fontFamily={fonts.display}
            fontStyle={styles.footer.fontWeight}
            lineHeight={styles.footer.lineHeight}
            opacity={styles.footer.opacity}
            onClick={() => onElementClick?.('footer-desc')}
          />
        )}
      </Group>

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
  const { primary, isDark } = colors;
  
  const borderColor = isDark ? '#FFFFFF' : '#000000';
  const shadowColor = isDark ? 'rgba(255,255,255,0.12)' : '#000000';
  const cardBg = isDark ? '#1A1A1A' : '#FFFFFF';
  const textOnCardBg = isDark ? '#FFFFFF' : '#000000';
  const borderWidth = s(layout.borderWidth);
  const shadowOffset = s(layout.shadowOffset);
  
  const { cardWidth, cardHeight, topBarHeight, innerSize, innerPadding, qrSize, qrPadding, labelSize } = styles.qrCode;

  return (
    <Group x={width - margin - s(195)} y={s(30)}>
      {/* 阴影 */}
      <Rect
        x={shadowOffset}
        y={shadowOffset}
        width={s(cardWidth)}
        height={s(cardHeight)}
        fill={shadowColor}
        listening={false}
      />
      {/* 卡片 */}
      <Rect
        width={s(cardWidth)}
        height={s(cardHeight)}
        fill={cardBg}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      
      {/* 顶部色条 */}
      <Rect
        width={s(cardWidth)}
        height={s(topBarHeight)}
        fill={primary}
        stroke={borderColor}
        strokeWidth={borderWidth}
      />
      
      {/* 二维码白底 */}
      <Rect
        x={s(innerPadding)}
        y={s(32)}
        width={s(innerSize)}
        height={s(innerSize)}
        fill="#FFFFFF"
        stroke={borderColor}
        strokeWidth={s(2)}
      />
      <QRCodeImage
        qrCode={data.qrCode}
        qrCodeMode={data.qrCodeMode}
        x={s(qrPadding)}
        y={s(40)}
        size={s(qrSize)}
        borderColor="transparent"
        borderWidth={0}
        backgroundColor="transparent"
        placeholderColor="#E8E8E8"
        cornerRadius={0}
      />
      
      {/* 扫码文字 */}
      <Text
        y={s(186)}
        width={s(cardWidth)}
        text="SCAN ME →"
        fontSize={s(labelSize)}
        fill={textOnCardBg}
        fontFamily={fonts.display}
        fontStyle="700"
        align="center"
      />
    </Group>
  );
};

