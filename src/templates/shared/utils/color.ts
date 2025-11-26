import type { ColorScheme } from '../../../types/store';

/**
 * 判断颜色是否为深色
 */
export const isDarkColor = (bg: string): boolean => {
  const lower = bg.toLowerCase();
  return (
    bg === '#000000' ||
    bg === '#1A1A1A' ||
    bg === '#0A0A0A' ||
    bg === '#0D0D1A' ||
    lower.startsWith('#0') ||
    lower.startsWith('#1')
  );
};

/**
 * 获取颜色亮度值 (0-255)
 */
export const getBrightness = (hex: string): number => {
  const c = hex.replace('#', '');
  const full = c.length === 3 ? c.split('').map(x => x + x).join('') : c;
  return (
    parseInt(full.slice(0, 2), 16) * 299 +
    parseInt(full.slice(2, 4), 16) * 587 +
    parseInt(full.slice(4, 6), 16) * 114
  ) / 1000;
};

/**
 * 根据背景色获取合适的文字颜色
 */
export const getTextOnColor = (bgColor: string): string => {
  return getBrightness(bgColor) < 128 ? '#FFFFFF' : '#000000';
};

/**
 * 生成玻璃态效果配色
 */
export const getGlassColors = (isDark: boolean) => ({
  bg: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.55)',
  bgStrong: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.75)',
  border: isDark ? 'rgba(255,255,255,0.20)' : 'rgba(255,255,255,1)',
  highlight: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.9)',
});

/**
 * 生成灰色文字颜色
 */
export const getTextGray = (isDark: boolean): string => {
  return isDark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)';
};

/**
 * 生成带透明度的颜色
 */
export const withAlpha = (color: string, alpha: number): string => {
  const hex = Math.round(alpha * 255).toString(16).padStart(2, '0');
  return `${color}${hex}`;
};

/**
 * 预置的颜色工具集
 */
export const createColorUtils = (colorScheme: ColorScheme) => {
  const { primary, secondary, bg, text } = colorScheme;
  const isDark = isDarkColor(bg);
  const glass = getGlassColors(isDark);
  const textGray = getTextGray(isDark);

  return {
    primary,
    secondary,
    bg,
    text,
    isDark,
    glass,
    textGray,
    textOnPrimary: getTextOnColor(primary),
    textOnSecondary: getTextOnColor(secondary),
    withAlpha: (color: string, alpha: number) => withAlpha(color, alpha),
  };
};

