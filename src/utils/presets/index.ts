/**
 * 预设元素导出
 */
import { shapePresets } from './shapes';
import { textPresets } from './text';
import { decorationPresets } from './decorations';
import { cardPresets } from './cards';
import type { ElementPreset, PresetCategory, PresetsByCategory } from './types';

// 导出类型
export type { ElementPreset, PresetCategory, PresetsByCategory };

/**
 * 所有预设元素
 */
export const ELEMENT_PRESETS: ElementPreset[] = [
  ...shapePresets,
  ...textPresets,
  ...decorationPresets,
  ...cardPresets,
];

/**
 * 按分类分组的预设
 */
export const PRESETS_BY_CATEGORY: PresetsByCategory = {
  shape: shapePresets,
  text: textPresets,
  decoration: decorationPresets,
  card: cardPresets,
};

/**
 * 分类显示名称
 */
export const CATEGORY_LABELS: Record<PresetCategory, string> = {
  shape: '形状',
  text: '文字',
  decoration: '装饰',
  card: '卡片',
};

/**
 * 根据 ID 查找预设
 */
export function findPresetById(id: string): ElementPreset | undefined {
  return ELEMENT_PRESETS.find(p => p.id === id);
}

/**
 * 获取指定分类的预设
 */
export function getPresetsByCategory(category: PresetCategory): ElementPreset[] {
  return PRESETS_BY_CATEGORY[category];
}

