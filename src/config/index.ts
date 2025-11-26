/**
 * 配置统一导出
 */

// 尺寸配置
export {
  DIMENSION_PRESETS,
  findPresetById,
  findMatchingPreset,
  calculateAspectRatio,
  getDefaultPreset,
  isPortrait,
  isLandscape,
  isSquare,
  type DimensionPreset,
} from './dimensions';

// 配色方案配置
export {
  COLOR_SCHEMES,
  findColorScheme,
  getDefaultColorScheme,
  getColorSchemeForBackground,
  isColorSchemeDark,
  getContrastText,
} from './colorSchemes';

// 默认值配置
export {
  CANVAS_DEFAULTS,
  EXPORT_DEFAULTS,
  ANIMATION_DEFAULTS,
  FONT_DEFAULTS,
  Z_INDEX,
} from './defaults';
