/**
 * 渐变工具函数
 * 将 FillStyle 转换为 Konva 兼容的属性
 */
import type { FillStyle, GradientStyle, GradientStop } from '../types';

/**
 * 检查是否为渐变样式
 */
export function isGradient(fill: FillStyle): fill is GradientStyle {
  return typeof fill === 'object' && fill !== null && 'type' in fill;
}

/**
 * 将角度转换为起点和终点坐标
 * @param angle 角度（度）
 * @param width 元素宽度
 * @param height 元素高度
 */
function angleToPoints(angle: number, width: number, height: number) {
  // 将角度转换为弧度
  const rad = (angle - 90) * (Math.PI / 180);
  
  // 计算对角线长度的一半（确保渐变覆盖整个区域）
  const diagonal = Math.sqrt(width * width + height * height) / 2;
  
  const centerX = width / 2;
  const centerY = height / 2;
  
  const dx = Math.cos(rad) * diagonal;
  const dy = Math.sin(rad) * diagonal;
  
  return {
    start: { x: centerX - dx, y: centerY - dy },
    end: { x: centerX + dx, y: centerY + dy },
  };
}

/**
 * 将色标数组转换为 Konva 格式
 * Konva 格式: [offset1, color1, offset2, color2, ...]
 */
function stopsToKonva(stops: GradientStop[]): (number | string)[] {
  const result: (number | string)[] = [];
  const sortedStops = [...stops].sort((a, b) => a.offset - b.offset);
  
  for (const stop of sortedStops) {
    result.push(stop.offset, stop.color);
  }
  
  return result;
}

/**
 * 渐变填充属性接口
 */
export interface GradientFillProps {
  fill?: string;
  fillLinearGradientStartPoint?: { x: number; y: number };
  fillLinearGradientEndPoint?: { x: number; y: number };
  fillLinearGradientColorStops?: (number | string)[];
  fillRadialGradientStartPoint?: { x: number; y: number };
  fillRadialGradientEndPoint?: { x: number; y: number };
  fillRadialGradientStartRadius?: number;
  fillRadialGradientEndRadius?: number;
  fillRadialGradientColorStops?: (number | string)[];
}

/**
 * 获取 Konva 填充属性
 * @param fill 填充样式（纯色或渐变）
 * @param width 元素宽度
 * @param height 元素高度
 */
export function getKonvaFillProps(
  fill: FillStyle,
  width: number,
  height: number
): GradientFillProps {
  // 纯色
  if (typeof fill === 'string') {
    return { fill };
  }
  
  // 渐变
  const gradient = fill as GradientStyle;
  const colorStops = stopsToKonva(gradient.stops);
  
  switch (gradient.type) {
    case 'linear':
    case 'repeating-linear': {
      const { start, end } = angleToPoints(gradient.angle, width, height);
      return {
        fillLinearGradientStartPoint: start,
        fillLinearGradientEndPoint: end,
        fillLinearGradientColorStops: colorStops,
      };
    }
    
    case 'radial':
    case 'repeating-radial': {
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.max(width, height) / 2;
      
      return {
        fillRadialGradientStartPoint: { x: centerX, y: centerY },
        fillRadialGradientEndPoint: { x: centerX, y: centerY },
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndRadius: radius,
        fillRadialGradientColorStops: colorStops,
      };
    }
    
    case 'conic': {
      // Konva 不原生支持圆锥渐变，使用第一个颜色作为 fallback
      // 或者可以用多段线性渐变模拟，但这里简化处理
      const fallbackColor = gradient.stops[0]?.color || '#000000';
      return { fill: fallbackColor };
    }
    
    default:
      return { fill: '#000000' };
  }
}

/**
 * 获取圆形元素的渐变属性
 * 注意：Konva Circle 的坐标原点在圆心，而不是左上角
 */
export function getCircleGradientProps(
  fill: FillStyle,
  radius: number
): GradientFillProps {
  // 纯色
  if (typeof fill === 'string') {
    return { fill };
  }
  
  // 渐变
  const gradient = fill as GradientStyle;
  const colorStops = stopsToKonva(gradient.stops);
  const diameter = radius * 2;
  
  switch (gradient.type) {
    case 'linear':
    case 'repeating-linear': {
      // 将角度转换为弧度
      const rad = (gradient.angle - 90) * (Math.PI / 180);
      
      // 对于圆形，渐变点相对于圆心(0,0)
      const dx = Math.cos(rad) * radius;
      const dy = Math.sin(rad) * radius;
      
      return {
        fillLinearGradientStartPoint: { x: -dx, y: -dy },
        fillLinearGradientEndPoint: { x: dx, y: dy },
        fillLinearGradientColorStops: colorStops,
      };
    }
    
    case 'radial':
    case 'repeating-radial': {
      // 圆心在(0,0)
      return {
        fillRadialGradientStartPoint: { x: 0, y: 0 },
        fillRadialGradientEndPoint: { x: 0, y: 0 },
        fillRadialGradientStartRadius: 0,
        fillRadialGradientEndRadius: radius,
        fillRadialGradientColorStops: colorStops,
      };
    }
    
    case 'conic': {
      // Konva 不原生支持圆锥渐变
      const fallbackColor = gradient.stops[0]?.color || '#000000';
      return { fill: fallbackColor };
    }
    
    default:
      return { fill: '#000000' };
  }
}

