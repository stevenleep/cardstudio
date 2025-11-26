/**
 * 配色方案配置 - 含 Neo-Brutalism 风格
 */
import type { ColorScheme } from '../types';
import { getBrightness, isDarkColor } from '../templates/shared/utils/color';

/**
 * 预设配色方案列表
 */
export const COLOR_SCHEMES: ColorScheme[] = [
  // === Neo-Brutalism 风格 ===
  // Neo 经典 - 黄黑高对比
  { 
    id: 'neo-classic', 
    bg: '#FFE566', 
    primary: '#000000', 
    secondary: '#FF90E8', 
    text: '#000000' 
  },
  // Neo 薄荷 - 清新绿色
  { 
    id: 'neo-mint', 
    bg: '#A7F3D0', 
    primary: '#000000', 
    secondary: '#FFE566', 
    text: '#000000' 
  },
  // Neo 粉彩 - 粉蓝配色
  { 
    id: 'neo-candy', 
    bg: '#FF90E8', 
    primary: '#000000', 
    secondary: '#90D5FF', 
    text: '#000000' 
  },
  // Neo 天空 - 明亮蓝色
  { 
    id: 'neo-sky', 
    bg: '#90D5FF', 
    primary: '#000000', 
    secondary: '#FFE566', 
    text: '#000000' 
  },
  // Neo 纯白 - 黑白高对比
  { 
    id: 'neo-mono', 
    bg: '#FFFFFF', 
    primary: '#000000', 
    secondary: '#FFE566', 
    text: '#000000' 
  },
  // Neo 暗黑 - 黑底彩色
  { 
    id: 'neo-dark', 
    bg: '#1A1A1A', 
    primary: '#FFE566', 
    secondary: '#FF90E8', 
    text: '#FFFFFF' 
  },

  // === 经典风格 ===
  // 经典优雅 - 米白与深灰的高级感
  { 
    id: 'classic', 
    bg: '#FAFAF8', 
    primary: '#2D2D2D', 
    secondary: '#8B8B8B', 
    text: '#1A1A1A' 
  },
  // 珊瑚暖阳 - 温暖的珊瑚粉配奶油白
  { 
    id: 'neo-pink', 
    bg: '#FDF6F3', 
    primary: '#E07A5F', 
    secondary: '#F2CC8F', 
    text: '#3D405B' 
  },
  // 海洋深蓝 - 深邃的蓝绿色调
  { 
    id: 'neo-blue', 
    bg: '#F0F7F8', 
    primary: '#2A6F6F', 
    secondary: '#81B29A', 
    text: '#264653' 
  },
  // 琥珀金橙 - 温暖的橙黄色调
  { 
    id: 'neo-yellow', 
    bg: '#FFFBF0', 
    primary: '#E9A820', 
    secondary: '#F4D58D', 
    text: '#3D3D3D' 
  },
  // 霓虹暗夜 - 抖音风的青红对比
  { 
    id: 'neon-dark', 
    bg: '#000000', 
    primary: '#00F5D4', 
    secondary: '#FF006E', 
    text: '#FFFFFF' 
  },
  // 星空幻紫 - 深邃的紫蓝星空
  { 
    id: 'zodiac', 
    bg: '#0D0D1A', 
    primary: '#C9B8FF', 
    secondary: '#7B68EE', 
    text: '#E8E8F0' 
  },
];

/**
 * 根据 ID 查找配色方案
 */
export function findColorScheme(id: string): ColorScheme | undefined {
  return COLOR_SCHEMES.find(s => s.id === id);
}

/**
 * 获取默认配色方案 - 默认使用 Neo 经典黄黑配色
 */
export function getDefaultColorScheme(): ColorScheme {
  return findColorScheme('neo-classic') ?? COLOR_SCHEMES[0];
}

/**
 * 根据背景色亮度生成合适的配色方案
 */
export function getColorSchemeForBackground(backgroundColor: string): ColorScheme {
  const isDark = isDarkColor(backgroundColor);
  const isBlack = backgroundColor === '#000000' || backgroundColor === '#000';
  
  if (isBlack) {
    // 纯黑背景使用星空幻紫
    return findColorScheme('zodiac')!;
  } 
  
  if (isDark) {
    // 深色背景
    return { 
      id: 'dark-auto', 
      bg: backgroundColor, 
      primary: '#333333', 
      secondary: '#FFFFFF', 
      text: '#FFFFFF' 
    };
  }
  
  // 浅色背景
  return { 
    id: 'light-auto', 
    bg: backgroundColor, 
    primary: '#FFFFFF', 
    secondary: '#000000', 
    text: '#000000' 
  };
}

/**
 * 判断配色方案是否为深色主题
 */
export function isColorSchemeDark(scheme: ColorScheme): boolean {
  return isDarkColor(scheme.bg);
}

/**
 * 获取配色方案的对比文字颜色
 */
export function getContrastText(scheme: ColorScheme, forElement: 'primary' | 'secondary' | 'bg' = 'bg'): string {
  const color = scheme[forElement];
  return getBrightness(color) < 128 ? '#FFFFFF' : '#000000';
}
