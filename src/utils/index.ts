/**
 * 工具函数统一导出
 */

// 预设元素
export {
  ELEMENT_PRESETS,
  PRESETS_BY_CATEGORY,
  CATEGORY_LABELS,
  findPresetById,
  getPresetsByCategory,
  type ElementPreset,
  type PresetCategory,
  type PresetsByCategory,
} from './presets';

// 填充样式工具
export {
  fillStyleToCSS,
  isSolidColor,
  isGradient,
  getFallbackColor,
} from './fillStyle';

