/**
 * 画布相关类型定义
 */

/**
 * 元素类型
 */
export type ElementType = 'text' | 'rect' | 'circle' | 'image';

/**
 * 文本对齐方式
 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * 画布元素基础属性
 */
export interface CanvasElementBase {
  /** 唯一标识 */
  id: string;
  /** 元素类型 */
  type: ElementType;
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 宽度 */
  width: number;
  /** 高度（文本元素可选，自动计算） */
  height?: number;
  /** 旋转角度 */
  rotation: number;
  /** 填充颜色 */
  fill: string;
  /** 边框颜色 */
  stroke?: string;
  /** 边框宽度 */
  strokeWidth?: number;
  /** 阴影颜色 */
  shadowColor?: string;
  /** 阴影 X 偏移 */
  shadowOffsetX?: number;
  /** 阴影 Y 偏移 */
  shadowOffsetY?: number;
  /** 层级 */
  zIndex: number;
  /** 是否可见 */
  visible?: boolean;
}

/**
 * 文本元素特有属性
 */
export interface TextElementProps {
  /** 文本内容 */
  content?: string;
  /** 字体大小 */
  fontSize?: number;
  /** 字体族 */
  fontFamily?: string;
  /** 字体粗细 */
  fontWeight?: string;
  /** 行高倍数 */
  lineHeight?: number;
  /** 对齐方式 */
  align?: TextAlign;
}

/**
 * 画布元素完整类型
 */
export interface CanvasElement extends CanvasElementBase, TextElementProps {}

/**
 * 模板定义
 */
export interface Template {
  /** 模板 ID */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板描述 */
  description: string;
  /** 画布宽度 */
  width: number;
  /** 画布高度 */
  height: number;
  /** 背景色 */
  backgroundColor: string;
  /** 元素列表 */
  elements: Omit<CanvasElement, 'id'>[];
}

/**
 * 位置信息
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * 尺寸信息
 */
export interface Size {
  width: number;
  height: number;
}

/**
 * 边界框
 */
export interface BoundingBox extends Position, Size {
  rotation?: number;
}
