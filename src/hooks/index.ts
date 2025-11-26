/**
 * Hooks 统一导出
 */

// 画布相关
export { useAutoScale, type UseAutoScaleOptions, type UseAutoScaleResult } from './useAutoScale';
export { useExportImage, type UseExportImageOptions, type UseExportImageResult, type ExportFormat } from './useExportImage';
export { useCanvasDrop, type UseCanvasDropOptions, type UseCanvasDropResult } from './useCanvasDrop';

// 通用 Hooks
export { useDebounce } from './useDebounce';
export { useKeyboardShortcuts, SHORTCUTS, type KeyboardShortcutHandler } from './useKeyboardShortcuts';
export { useClickOutside } from './useClickOutside';
export { useLocalStorage } from './useLocalStorage';
