/**
 * 模板相关类型定义
 */
import type { GlobalCardData, ModuleId } from './modules';
import type { ColorScheme } from './store';

/**
 * 模板渲染器属性
 */
export interface TemplateRendererProps {
  /** 卡片数据 */
  data: GlobalCardData;
  /** 模块可见性 */
  moduleVisibility: Record<string, boolean>;
  /** 元素点击回调 */
  onElementClick?: (id: string) => void;
  /** 颜色方案 */
  colorScheme: ColorScheme;
  /** 画布宽度 */
  width: number;
  /** 画布高度 */
  height: number;
}

/**
 * 模板模块定义
 */
export interface TemplateModule {
  /** 模板 ID */
  id: string;
  /** 模板名称 */
  name: string;
  /** 模板描述 */
  description: string;
  /** 默认宽度 */
  width: number;
  /** 默认高度 */
  height: number;
  /** 背景色 */
  backgroundColor: string;
  /** 是否显示边框 */
  showBorder?: boolean;
  /** 可见模块列表 */
  visibleModules: ModuleId[];
  /** 布局配置 */
  layout?: unknown;
  /** 样式配置 */
  styles?: unknown;
  /** 渲染组件 */
  Renderer: React.FC<TemplateRendererProps>;
}

/**
 * 模板注册项
 */
export type TemplateRegistry = TemplateModule[];

/**
 * 模板配置基础属性
 */
export interface TemplateConfigBase {
  /** 边距 */
  margin: number;
  /** 内容宽度 */
  contentWidth: number;
}
