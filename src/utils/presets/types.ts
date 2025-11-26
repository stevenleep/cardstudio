/**
 * 预设元素类型定义
 */
import type { CustomElement } from '../../types/customElements';

/**
 * 预设分类
 */
export type PresetCategory = 'shape' | 'text' | 'card' | 'decoration';

/**
 * 元素创建函数
 */
export type ElementCreator = (
  x: number, 
  y: number, 
  canvasWidth: number, 
  canvasHeight: number
) => CustomElement;

/**
 * 预设元素定义
 */
export interface ElementPreset {
  /** 预设 ID */
  id: string;
  /** 显示名称 */
  name: string;
  /** 分类 */
  category: PresetCategory;
  /** 预览图 */
  preview?: string;
  /** 创建函数 */
  create: ElementCreator;
}

/**
 * 按分类分组的预设
 */
export type PresetsByCategory = Record<PresetCategory, ElementPreset[]>;

