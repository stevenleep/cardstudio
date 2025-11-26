/**
 * 背景矩形组件
 * 
 * 支持纯色和渐变背景
 */
import { useEffect, useRef } from 'react';
import { Rect } from 'react-konva';
import type Konva from 'konva';
import type { FillStyle } from '../../types/customElements';
import { isSolidColor, getFallbackColor } from '../../utils/fillStyle';

interface BackgroundRectProps {
  width: number;
  height: number;
  fill: FillStyle;
}

export const BackgroundRect: React.FC<BackgroundRectProps> = ({
  width,
  height,
  fill,
}) => {
  const rectRef = useRef<Konva.Rect>(null);

  useEffect(() => {
    const rect = rectRef.current;
    if (!rect) return;

    // 如果是纯色，直接设置
    if (isSolidColor(fill)) {
      rect.fillLinearGradientStartPoint(undefined);
      rect.fillLinearGradientEndPoint(undefined);
      rect.fillRadialGradientStartPoint(undefined);
      rect.fillRadialGradientEndPoint(undefined);
      rect.fill(fill);
      return;
    }

    // 渐变处理
    if (fill.type === 'linear') {
      // 计算线性渐变的起点和终点
      const angleRad = (fill.angle * Math.PI) / 180;
      const diagonal = Math.sqrt(width * width + height * height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      
      const startX = centerX - (Math.cos(angleRad) * diagonal) / 2;
      const startY = centerY - (Math.sin(angleRad) * diagonal) / 2;
      const endX = centerX + (Math.cos(angleRad) * diagonal) / 2;
      const endY = centerY + (Math.sin(angleRad) * diagonal) / 2;

      rect.fillLinearGradientStartPoint({ x: startX, y: startY });
      rect.fillLinearGradientEndPoint({ x: endX, y: endY });
      
      // 设置色标
      const colorStops: (string | number)[] = [];
      fill.stops.forEach(stop => {
        colorStops.push(stop.offset, stop.color);
      });
      rect.fillLinearGradientColorStops(colorStops);
      
      // 清除径向渐变
      rect.fillRadialGradientStartPoint(undefined);
      rect.fillRadialGradientEndPoint(undefined);
      rect.fill(undefined);
    } else {
      // 径向渐变
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(width, height) / 2;

      rect.fillRadialGradientStartPoint({ x: centerX, y: centerY });
      rect.fillRadialGradientStartRadius(0);
      rect.fillRadialGradientEndPoint({ x: centerX, y: centerY });
      rect.fillRadialGradientEndRadius(radius);
      
      // 设置色标
      const colorStops: (string | number)[] = [];
      fill.stops.forEach(stop => {
        colorStops.push(stop.offset, stop.color);
      });
      rect.fillRadialGradientColorStops(colorStops);
      
      // 清除线性渐变
      rect.fillLinearGradientStartPoint(undefined);
      rect.fillLinearGradientEndPoint(undefined);
      rect.fill(undefined);
    }
  }, [fill, width, height]);

  return (
    <Rect
      ref={rectRef}
      x={0}
      y={0}
      width={width}
      height={height}
      listening={false}
      fill={getFallbackColor(fill)}
    />
  );
};

