/**
 * UI 状态管理
 * 
 * 职责：管理编辑器 UI 状态（选中项、编辑模式、工具状态等）
 */
import { create } from 'zustand';
import type { EditorMode } from '../types/store';
import type { CustomElement } from '../types/customElements';

export interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

/**
 * 工具类型
 */
export type ToolType = 'select' | 'brush' | 'eraser';

/**
 * 画笔笔尖类型
 */
export type BrushTip = 'round' | 'square' | 'flat';

/**
 * 线端样式
 */
export type LineCap = 'round' | 'butt' | 'square';

/**
 * 线连接样式
 */
export type LineJoin = 'round' | 'miter' | 'bevel';

/**
 * 混合模式
 */
export type BrushBlendMode = 
  | 'source-over'      // 正常
  | 'multiply'         // 正片叠底
  | 'screen'           // 滤色
  | 'overlay'          // 叠加
  | 'darken'           // 变暗
  | 'lighten'          // 变亮
  | 'color-dodge'      // 颜色减淡
  | 'color-burn'       // 颜色加深
  | 'hard-light'       // 强光
  | 'soft-light'       // 柔光
  | 'difference'       // 差值
  | 'exclusion';       // 排除

/**
 * 画笔设置
 */
export interface BrushSettings {
  // === 基础设置 ===
  /** 画笔颜色 */
  color: string;
  /** 画笔大小 (1-200) */
  size: number;
  /** 透明度 0-1 */
  opacity: number;
  
  // === 笔触设置 ===
  /** 平滑度/张力 0-1 (越高越平滑) */
  smoothing: number;
  /** 最小宽度比例 0-1 (用于压力感应) */
  minWidthRatio: number;
  /** 笔尖类型 */
  tip: BrushTip;
  /** 线端样式 */
  lineCap: LineCap;
  /** 线连接样式 */
  lineJoin: LineJoin;
  
  // === 高级设置 ===
  /** 混合模式 */
  blendMode: BrushBlendMode;
  /** 是否启用压力感应 */
  pressureEnabled: boolean;
  /** 抖动/随机偏移 0-1 */
  jitter: number;
  /** 流量 0-1 (影响颜色堆叠) */
  flow: number;
  /** 硬度 0-1 (边缘柔和度，仅圆形笔尖) */
  hardness: number;
  
  // === 形状设置 ===
  /** 笔刷角度 (度) */
  angle: number;
  /** 圆度 0-1 (1=正圆，<1=椭圆) */
  roundness: number;
  /** 间距 0.1-10 (笔刷点之间的距离，以笔刷大小的倍数计) */
  spacing: number;
}

export interface UIState {
  // 状态
  editorMode: EditorMode;
  selectedIds: string[];  // 支持多选
  isExporting: boolean;
  previewScale: number;
  clipboard: CustomElement[];  // 支持多个元素
  contextMenu: ContextMenuState;
  
  // 工具状态
  currentTool: ToolType;
  brushSettings: BrushSettings;
  isDrawing: boolean;

  // Computed - 兼容单选
  /** @deprecated 使用 selectedIds 代替 */
  selectedId: string | null;

  // Actions
  setEditorMode: (mode: EditorMode) => void;
  /** 选择单个元素（替换当前选择） */
  selectElement: (id: string | null) => void;
  /** 添加到选择（Ctrl+点击） */
  addToSelection: (id: string) => void;
  /** 从选择中移除 */
  removeFromSelection: (id: string) => void;
  /** 切换选择状态 */
  toggleSelection: (id: string) => void;
  /** 选择多个元素（替换当前选择） */
  selectElements: (ids: string[]) => void;
  /** 清除所有选择 */
  clearSelection: () => void;
  setExporting: (isExporting: boolean) => void;
  setPreviewScale: (scale: number) => void;
  setClipboard: (elements: CustomElement[]) => void;
  showContextMenu: (x: number, y: number) => void;
  hideContextMenu: () => void;
  
  // 工具 Actions
  setCurrentTool: (tool: ToolType) => void;
  setBrushSettings: (settings: Partial<BrushSettings>) => void;
  setIsDrawing: (isDrawing: boolean) => void;
}

// 默认画笔设置 - Neo 风格
const DEFAULT_BRUSH_SETTINGS: BrushSettings = {
  // 基础
  color: '#000000',
  size: 8,
  opacity: 1,
  // 笔触
  smoothing: 0.5,
  minWidthRatio: 0.1,
  tip: 'round',
  lineCap: 'round',
  lineJoin: 'round',
  // 高级
  blendMode: 'source-over',
  pressureEnabled: false,
  jitter: 0,
  flow: 1,
  hardness: 1,
  // 形状
  angle: 0,
  roundness: 1,
  spacing: 0.1,
};

export const useUIStore = create<UIState>((set, get) => ({
  editorMode: 'template',
  selectedIds: [],
  isExporting: false,
  previewScale: 1,
  clipboard: [],
  contextMenu: { visible: false, x: 0, y: 0 },
  
  // 工具状态
  currentTool: 'select',
  brushSettings: { ...DEFAULT_BRUSH_SETTINGS },
  isDrawing: false,

  // Computed getter - 兼容单选 API
  get selectedId() {
    const ids = get().selectedIds;
    return ids.length > 0 ? ids[ids.length - 1] : null;
  },

  setEditorMode: (mode) => set({ 
    editorMode: mode,
    selectedIds: [], // 切换模式时清除选中
    currentTool: 'select', // 切换模式时重置工具
  }),

  selectElement: (id) => set({ 
    selectedIds: id ? [id] : [] 
  }),

  addToSelection: (id) => set((state) => ({
    selectedIds: state.selectedIds.includes(id) 
      ? state.selectedIds 
      : [...state.selectedIds, id]
  })),

  removeFromSelection: (id) => set((state) => ({
    selectedIds: state.selectedIds.filter(i => i !== id)
  })),

  toggleSelection: (id) => set((state) => ({
    selectedIds: state.selectedIds.includes(id)
      ? state.selectedIds.filter(i => i !== id)
      : [...state.selectedIds, id]
  })),

  selectElements: (ids) => set({ selectedIds: ids }),

  clearSelection: () => set({ selectedIds: [] }),

  setExporting: (isExporting) => set({ isExporting }),

  setPreviewScale: (scale) => set({ previewScale: scale }),

  setClipboard: (elements) => set({ clipboard: elements }),

  showContextMenu: (x, y) => set({ contextMenu: { visible: true, x, y } }),

  hideContextMenu: () => set({ contextMenu: { visible: false, x: 0, y: 0 } }),
  
  // 工具 Actions
  setCurrentTool: (tool) => set({ 
    currentTool: tool,
    selectedIds: [], // 切换工具时清除选中
  }),
  
  setBrushSettings: (settings) => set((state) => ({
    brushSettings: { ...state.brushSettings, ...settings }
  })),
  
  setIsDrawing: (isDrawing) => set({ isDrawing }),
}));

