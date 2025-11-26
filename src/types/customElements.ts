/**
 * 自定义元素类型定义
 * 
 * 用于自定义模式下的元素
 */

/**
 * 自定义元素类型
 */
export type CustomElementType = 'rect' | 'circle' | 'line' | 'text' | 'image' | 'path';

/**
 * 渐变色标
 */
export interface GradientStop {
  /** 位置 0-1 */
  offset: number;
  /** 颜色 */
  color: string;
}

/**
 * 线性渐变
 */
export interface LinearGradient {
  type: 'linear';
  /** 渐变角度（度） */
  angle: number;
  /** 色标 */
  stops: GradientStop[];
}

/**
 * 径向渐变
 */
export interface RadialGradient {
  type: 'radial';
  /** 色标 */
  stops: GradientStop[];
}

/**
 * 圆锥渐变
 */
export interface ConicGradient {
  type: 'conic';
  /** 起始角度（度） */
  angle: number;
  /** 色标 */
  stops: GradientStop[];
}

/**
 * 重复线性渐变
 */
export interface RepeatingLinearGradient {
  type: 'repeating-linear';
  /** 渐变角度（度） */
  angle: number;
  /** 色标 */
  stops: GradientStop[];
}

/**
 * 重复径向渐变
 */
export interface RepeatingRadialGradient {
  type: 'repeating-radial';
  /** 色标 */
  stops: GradientStop[];
}

/**
 * 渐变类型联合
 */
export type GradientStyle = 
  | LinearGradient 
  | RadialGradient 
  | ConicGradient 
  | RepeatingLinearGradient 
  | RepeatingRadialGradient;

/**
 * 填充样式 - 可以是纯色或渐变
 */
export type FillStyle = string | GradientStyle;

/**
 * 阴影样式
 */
export interface ShadowStyle {
  /** 是否启用阴影 */
  enabled: boolean;
  /** 阴影颜色 */
  color: string;
  /** 模糊半径 */
  blur: number;
  /** X 偏移 */
  offsetX: number;
  /** Y 偏移 */
  offsetY: number;
  /** 扩展半径 */
  spread?: number;
  /** 是否内阴影 */
  inset?: boolean;
}

/**
 * 模糊效果
 */
export interface BlurEffect {
  /** 是否启用 */
  enabled: boolean;
  /** 模糊类型 */
  type: 'gaussian' | 'background';
  /** 模糊半径 */
  radius: number;
}

/**
 * 混合模式
 */
export type BlendMode = 
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

/**
 * 独立圆角
 */
export interface IndependentCornerRadius {
  topLeft: number;
  topRight: number;
  bottomRight: number;
  bottomLeft: number;
}

/**
 * 变换属性
 */
export interface TransformStyle {
  /** 水平缩放 0-无限 (1=100%) */
  scaleX?: number;
  /** 垂直缩放 0-无限 (1=100%) */
  scaleY?: number;
  /** 水平倾斜（度） */
  skewX?: number;
  /** 垂直倾斜（度） */
  skewY?: number;
  /** 水平翻转 */
  flipH?: boolean;
  /** 垂直翻转 */
  flipV?: boolean;
}

/**
 * 边框样式
 */
export interface StrokeStyle {
  /** 边框颜色 */
  color: string;
  /** 边框宽度 */
  width: number;
  /** 是否启用虚线 */
  dashEnabled?: boolean;
  /** 虚线模式 [实线长度, 间隔长度] */
  dash?: number[];
  /** 线端样式 */
  lineCap?: 'butt' | 'round' | 'square';
  /** 线连接样式 */
  lineJoin?: 'miter' | 'round' | 'bevel';
}

/**
 * 基础元素属性
 */
export interface BaseElement {
  /** 唯一标识 */
  id: string;
  /** 元素类型 */
  type: CustomElementType;
  /** X 坐标 */
  x: number;
  /** Y 坐标 */
  y: number;
  /** 宽度 */
  width: number;
  /** 高度 */
  height: number;
  /** 旋转角度 */
  rotation: number;
  /** 层级 */
  zIndex: number;
  /** 不透明度 0-1 */
  opacity?: number;
  /** 阴影样式（支持多个） */
  shadow?: ShadowStyle;
  /** 多重阴影 */
  shadows?: ShadowStyle[];
  /** 模糊效果 */
  blur?: BlurEffect;
  /** 混合模式 */
  blendMode?: BlendMode;
  /** 变换属性 */
  transform?: TransformStyle;
  /** 锁定宽高比 */
  lockAspectRatio?: boolean;
  /** 是否锁定（不可编辑） */
  locked?: boolean;
  /** 是否可见 */
  visible?: boolean;
  /** 元素名称 */
  name?: string;
}

/**
 * 矩形元素
 */
export interface RectElement extends BaseElement {
  type: 'rect';
  /** 填充样式 - 可以是纯色或渐变 */
  fill: FillStyle;
  /** 边框样式 */
  stroke: string;
  /** 边框宽度 */
  strokeWidth: number;
  /** 圆角半径（统一） */
  cornerRadius?: number;
  /** 独立圆角（四个角分别设置） */
  independentCorners?: boolean;
  /** 独立圆角值 */
  cornerRadii?: IndependentCornerRadius;
  /** 是否启用虚线边框 */
  dashEnabled?: boolean;
  /** 虚线模式 */
  dash?: number[];
  /** 线端样式 */
  lineCap?: 'butt' | 'round' | 'square';
  /** 线连接样式 */
  lineJoin?: 'miter' | 'round' | 'bevel';
  /** 内边框对齐 */
  strokeAlign?: 'inside' | 'center' | 'outside';
}

/**
 * 圆形元素
 */
export interface CircleElement extends BaseElement {
  type: 'circle';
  /** 填充样式 - 可以是纯色或渐变 */
  fill: FillStyle;
  /** 边框颜色 */
  stroke: string;
  /** 边框宽度 */
  strokeWidth: number;
  /** 半径 */
  radius: number;
  /** 是否启用虚线边框 */
  dashEnabled?: boolean;
  /** 虚线模式 */
  dash?: number[];
  /** 线端样式 */
  lineCap?: 'butt' | 'round' | 'square';
}

/**
 * 线条元素
 */
export interface LineElement extends BaseElement {
  type: 'line';
  /** 线条颜色 */
  stroke: string;
  /** 线条宽度 */
  strokeWidth: number;
  /** 端点坐标 [x1, y1, x2, y2] */
  points: number[];
}

/**
 * 文本元素
 */
export interface TextElement extends BaseElement {
  type: 'text';
  /** 文本内容 */
  text: string;
  /** 字体大小 */
  fontSize: number;
  /** 字体族 */
  fontFamily: string;
  /** 字体粗细 */
  fontWeight: string;
  /** 字体样式（正常/斜体） */
  fontStyle?: 'normal' | 'italic';
  /** 填充样式 - 可以是纯色或渐变 */
  fill: FillStyle;
  /** 水平对齐方式 */
  align: 'left' | 'center' | 'right';
  /** 垂直对齐方式 */
  verticalAlign?: 'top' | 'middle' | 'bottom';
  /** 行高倍数 */
  lineHeight: number;
  /** 字间距 */
  letterSpacing?: number;
  /** 文字描边颜色 */
  stroke?: string;
  /** 文字描边宽度 */
  strokeWidth?: number;
  /** 文字装饰 */
  textDecoration?: 'none' | 'underline' | 'line-through' | 'overline';
  /** 换行方式 */
  wrap?: 'word' | 'char' | 'none';
  /** 是否省略超出内容 */
  ellipsis?: boolean;
  /** 内边距 */
  padding?: number;
  /** 大小写转换 */
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  /** 段落间距 */
  paragraphSpacing?: number;
  /** 首行缩进 */
  textIndent?: number;
  /** 背景色 */
  backgroundColor?: string;
  /** 背景圆角 */
  backgroundRadius?: number;
  /** 背景内边距 */
  backgroundPadding?: number;
}

/**
 * 图片元素
 */
export interface ImageElement extends BaseElement {
  type: 'image';
  /** 图片源 */
  src: string;
  /** 裁剪 X */
  cropX?: number;
  /** 裁剪 Y */
  cropY?: number;
  /** 裁剪宽度 */
  cropWidth?: number;
  /** 裁剪高度 */
  cropHeight?: number;
}

/**
 * 路径点
 */
export interface PathPoint {
  x: number;
  y: number;
}

/**
 * 路径/画笔元素
 */
export interface PathElement extends BaseElement {
  type: 'path';
  /** 路径点数组 */
  points: number[];
  /** 线条颜色 */
  stroke: string;
  /** 线条宽度 */
  strokeWidth: number;
  /** 线端样式 */
  lineCap?: 'butt' | 'round' | 'square';
  /** 线连接样式 */
  lineJoin?: 'miter' | 'round' | 'bevel';
  /** 张力（用于平滑曲线，0-1） */
  tension?: number;
  /** 是否闭合路径 */
  closed?: boolean;
  /** 填充颜色（闭合路径时可用） */
  fill?: FillStyle;
}

/**
 * 自定义元素联合类型
 */
export type CustomElement = 
  | RectElement 
  | CircleElement 
  | LineElement 
  | TextElement 
  | ImageElement
  | PathElement;

/**
 * 根据类型获取元素
 */
export type ElementByType<T extends CustomElementType> = Extract<CustomElement, { type: T }>;

/**
 * 可编辑的元素属性（排除只读属性）
 */
export type EditableElementProps<T extends CustomElement> = Omit<T, 'id' | 'type'>;
