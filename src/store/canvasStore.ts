/**
 * 画布状态管理
 * 
 * 职责：管理画布尺寸、背景色、配色方案等画布属性
 */
import { create } from 'zustand';
import type { ColorScheme } from '../types/store';
import type { FillStyle } from '../types/customElements';
import { getDefaultColorScheme, getColorSchemeForBackground, CANVAS_DEFAULTS } from '../config';

export interface CanvasState {
  // 状态
  width: number;
  height: number;
  backgroundColor: FillStyle;
  colorScheme: ColorScheme;
  
  // 扩展属性
  cornerRadius: number;
  showGrid: boolean;
  gridSize: number;
  showSafeArea: boolean;
  safeAreaPadding: number;
  canvasName: string;

  // Actions
  setDimensions: (width: number, height: number) => void;
  setBackgroundColor: (color: FillStyle) => void;
  applyColorScheme: (scheme: ColorScheme) => void;
  setCornerRadius: (radius: number) => void;
  setShowGrid: (show: boolean) => void;
  setGridSize: (size: number) => void;
  setShowSafeArea: (show: boolean) => void;
  setSafeAreaPadding: (padding: number) => void;
  setCanvasName: (name: string) => void;
  
  // 内部使用
  _reset: (width: number, height: number, backgroundColor: FillStyle) => void;
}

export const useCanvasStore = create<CanvasState>((set) => ({
  width: CANVAS_DEFAULTS.width,
  height: CANVAS_DEFAULTS.height,
  backgroundColor: CANVAS_DEFAULTS.backgroundColor,
  colorScheme: getDefaultColorScheme(),
  
  // 扩展属性默认值
  cornerRadius: 0,
  showGrid: false,
  gridSize: 50,
  showSafeArea: false,
  safeAreaPadding: 50,
  canvasName: '未命名设计',

  setDimensions: (width, height) => set({ width, height }),
  
  setBackgroundColor: (backgroundColor) => set({ backgroundColor }),
  
  applyColorScheme: (scheme) => set({
    backgroundColor: scheme.bg,
    colorScheme: scheme
  }),
  
  setCornerRadius: (cornerRadius) => set({ cornerRadius }),
  
  setShowGrid: (showGrid) => set({ showGrid }),
  
  setGridSize: (gridSize) => set({ gridSize }),
  
  setShowSafeArea: (showSafeArea) => set({ showSafeArea }),
  
  setSafeAreaPadding: (safeAreaPadding) => set({ safeAreaPadding }),
  
  setCanvasName: (canvasName) => set({ canvasName }),
  
  _reset: (width, height, backgroundColor) => set({
    width,
    height,
    backgroundColor,
    // 如果背景是纯色则计算配色方案，否则使用默认配色
    colorScheme: typeof backgroundColor === 'string' 
      ? getColorSchemeForBackground(backgroundColor)
      : getDefaultColorScheme()
  }),
}));

