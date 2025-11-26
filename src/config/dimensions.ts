/**
 * 尺寸预设配置
 */

export interface DimensionPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

/**
 * 预设尺寸列表
 */
export const DIMENSION_PRESETS: DimensionPreset[] = [
  { 
    id: 'poster-vertical', 
    name: '竖屏海报', 
    width: 1080, 
    height: 1920, 
    aspectRatio: '9:16' 
  },
  { 
    id: 'xiaohongshu', 
    name: '小红书', 
    width: 1080, 
    height: 1440, 
    aspectRatio: '3:4' 
  },
  { 
    id: 'wechat-moments', 
    name: '朋友圈', 
    width: 900, 
    height: 1200, 
    aspectRatio: '3:4' 
  },
  { 
    id: 'square', 
    name: '正方形', 
    width: 1080, 
    height: 1080, 
    aspectRatio: '1:1' 
  },
];

/**
 * 根据 ID 查找预设
 */
export function findPresetById(id: string): DimensionPreset | undefined {
  return DIMENSION_PRESETS.find(p => p.id === id);
}

/**
 * 根据宽高查找匹配的预设
 */
export function findMatchingPreset(width: number, height: number): DimensionPreset | null {
  return DIMENSION_PRESETS.find(p => p.width === width && p.height === height) || null;
}

/**
 * 根据宽高计算宽高比字符串
 */
export function calculateAspectRatio(width: number, height: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(width, height);
  return `${width / divisor}:${height / divisor}`;
}

/**
 * 获取默认尺寸预设
 */
export function getDefaultPreset(): DimensionPreset {
  return DIMENSION_PRESETS[0];
}

/**
 * 判断尺寸是否为竖向
 */
export function isPortrait(width: number, height: number): boolean {
  return height > width;
}

/**
 * 判断尺寸是否为横向
 */
export function isLandscape(width: number, height: number): boolean {
  return width > height;
}

/**
 * 判断尺寸是否为正方形
 */
export function isSquare(width: number, height: number): boolean {
  return width === height;
}
