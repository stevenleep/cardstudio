/**
 * Store 统一导出
 */

// 推荐：使用具体的小 store
export { useCanvasStore, type CanvasState } from './canvasStore';
export { useTemplateStore, type TemplateState, createDefaultVisibility, createVisibilityFromTemplate } from './templateStore';
export { useContentStore, type ContentState } from './contentStore';
export { useElementStore, type ElementState } from './elementStore';
export { useUIStore, type UIState } from './uiStore';

// 兼容：组合 hook（建议逐步迁移到具体 store）
export { useCardStore, type ColorScheme, type EditorMode } from './cardStore';

