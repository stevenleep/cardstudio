import React, { useState, useEffect } from 'react';
import { Group, Rect, Image as KonvaImage } from 'react-konva';
import QRCode from 'qrcode';

interface QRCodeImageProps {
  qrCode: string;
  qrCodeMode: 'text' | 'image'; // 二维码类型：文本/链接 或 上传的图片
  x: number;
  y: number;
  size: number;
  borderColor?: string;
  borderWidth?: number;
  cornerRadius?: number;
  backgroundColor?: string;
  placeholderColor?: string;
}

export const QRCodeImage: React.FC<QRCodeImageProps> = ({
  qrCode,
  qrCodeMode,
  x,
  y,
  size,
  borderColor = '#000000',
  borderWidth = 4,
  cornerRadius = 0,
  backgroundColor = '#FFFFFF',
  placeholderColor = '#F5F5F5'
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // 清空之前的状态
    setImage(null);
    setImageLoaded(false);

    if (!qrCode) return;

    const loadImage = async () => {
      try {
        let imageUrl: string;
        
        // 根据传入的 mode 决定如何处理
        if (qrCodeMode === 'image') {
          // 模式是图片，直接使用上传的 base64 图片
          imageUrl = qrCode;
        } else {
          // 模式是文本/链接，使用 qrcode 包本地生成二维码
          imageUrl = await QRCode.toDataURL(qrCode, {
            width: 500,           // 高分辨率
            margin: 1,            // 边距
            errorCorrectionLevel: 'M', // 纠错级别
            color: {
              dark: '#000000',    // 二维码颜色
              light: '#FFFFFF'    // 背景色
            }
          });
        }

        // 加载图片
        const img = new window.Image();
        
        img.onload = () => {
          setImage(img);
          setImageLoaded(true);
        };

        img.onerror = () => {
          console.error('二维码图片加载失败');
          setImage(null);
          setImageLoaded(false);
        };

        img.src = imageUrl;
      } catch (error) {
        console.error('二维码生成失败:', error);
        setImage(null);
        setImageLoaded(false);
      }
    };

    loadImage();
  }, [qrCode, qrCodeMode]);

  const padding = 20;
  const innerSize = size - padding * 2;

  return (
    <Group>
      {/* 外边框 */}
      <Rect
        x={x}
        y={y}
        width={size}
        height={size}
        fill={backgroundColor}
        stroke={borderColor}
        strokeWidth={borderWidth}
        cornerRadius={cornerRadius}
      />

      {/* 显示图片或占位符 */}
      {imageLoaded && image ? (
        <KonvaImage
          image={image}
          x={x + padding}
          y={y + padding}
          width={innerSize}
          height={innerSize}
          listening={false}
        />
      ) : (
        <Rect
          x={x + padding}
          y={y + padding}
          width={innerSize}
          height={innerSize}
          fill={placeholderColor}
          listening={false}
        />
      )}
    </Group>
  );
};

