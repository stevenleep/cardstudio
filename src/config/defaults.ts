/**
 * 默认值配置 - Neo-Brutalism 风格
 */

// Neo-Brutalism 经典配色
export const NEO_COLORS = {
  yellow: '#FFE566',
  pink: '#FF90E8',
  blue: '#90D5FF',
  mint: '#A7F3D0',
  orange: '#FFAB5C',
  purple: '#C4B5FD',
  red: '#FCA5A5',
  white: '#FFFFFF',
  black: '#000000',
} as const;

// 画布默认值
export const CANVAS_DEFAULTS = {
  width: 1080,
  height: 1920,
  backgroundColor: NEO_COLORS.white,
} as const;

// 导出默认值
export const EXPORT_DEFAULTS = {
  format: 'png' as const,
  quality: 1,
  pixelRatio: 2,
  filename: 'card',
} as const;

// 动画默认值
export const ANIMATION_DEFAULTS = {
  duration: 200,
  easing: 'ease-out',
} as const;

// 字体默认值
export const FONT_DEFAULTS = {
  primary: '"Inter", "Noto Sans SC", sans-serif',
  serif: '"Noto Serif SC", "Source Han Serif SC", Georgia, serif',
  mono: '"SF Mono", "JetBrains Mono", monospace',
} as const;

// Z-Index 层级
export const Z_INDEX = {
  background: 0,
  content: 10,
  decoration: 20,
  overlay: 100,
  modal: 1000,
} as const;

