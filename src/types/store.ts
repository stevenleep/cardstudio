/**
 * Store 相关类型定义
 */

/**
 * 颜色方案
 */
export interface ColorScheme {
  /** 方案 ID */
  id: string;
  /** 背景色 */
  bg: string;
  /** 主色 */
  primary: string;
  /** 辅助色 */
  secondary: string;
  /** 文本色 */
  text: string;
}

/**
 * 编辑器模式
 */
export type EditorMode = 'template' | 'custom';

/**
 * 画布尺寸预设
 */
export interface CanvasDimension {
  /** 预设 ID */
  id: string;
  /** 显示名称 */
  name: string;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 描述 */
  description?: string;
}
