/**
 * FillStyle 工具函数
 * 
 * 处理纯色和渐变填充的转换
 */
import type { FillStyle, GradientStyle } from '../types/customElements';

/**
 * 将 FillStyle 转换为 CSS 样式
 */
export function fillStyleToCSS(fill: FillStyle): string {
  if (typeof fill === 'string') {
    return fill;
  }
  
  const stopsStr = fill.stops
    .map(stop => `${stop.color} ${stop.offset * 100}%`)
    .join(', ');
  
  switch (fill.type) {
    case 'linear':
      return `linear-gradient(${fill.angle}deg, ${stopsStr})`;
    case 'radial':
      return `radial-gradient(circle, ${stopsStr})`;
    case 'conic':
      return `conic-gradient(from ${fill.angle}deg, ${stopsStr})`;
    case 'repeating-linear':
      return `repeating-linear-gradient(${fill.angle}deg, ${stopsStr})`;
    case 'repeating-radial':
      return `repeating-radial-gradient(circle, ${stopsStr})`;
    default:
      return '#000000';
  }
}

/**
 * 判断是否为纯色
 */
export function isSolidColor(fill: FillStyle): fill is string {
  return typeof fill === 'string';
}

/**
 * 判断是否为渐变
 */
export function isGradient(fill: FillStyle): fill is GradientStyle {
  return typeof fill === 'object' && 'type' in fill;
}

/**
 * 获取 FillStyle 的第一个颜色（用于降级显示）
 */
export function getFallbackColor(fill: FillStyle): string {
  if (typeof fill === 'string') {
    return fill;
  }
  return fill.stops[0]?.color || '#000000';
}

