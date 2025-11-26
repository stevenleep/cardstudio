/**
 * 卡片状态管理 - 组合 Store
 * 
 * 这个文件保持向后兼容，同时内部使用拆分后的小 store
 * 新代码建议直接使用具体的小 store
 */
import { useCanvasStore } from './canvasStore';
import { useTemplateStore } from './templateStore';
import { useContentStore } from './contentStore';
import { useElementStore } from './elementStore';
import { useUIStore } from './uiStore';
import { CANVAS_DEFAULTS } from '../config';
import type { TemplateModule } from '../types/template';
import type { ColorScheme, EditorMode } from '../types/store';
import type { GlobalCardData } from '../types/modules';

// 重新导出类型供外部使用
export type { ColorScheme, EditorMode };

/**
 * 兼容旧 API 的组合 hook
 * 
 * @deprecated 建议直接使用具体的 store:
 * - useCanvasStore - 画布状态
 * - useTemplateStore - 模板状态
 * - useContentStore - 内容数据
 * - useElementStore - 自定义元素
 * - useUIStore - UI 状态
 */
export function useCardStore() {
  const canvas = useCanvasStore();
  const template = useTemplateStore();
  const content = useContentStore();
  const element = useElementStore();
  const ui = useUIStore();

  return {
    // Canvas state
    width: canvas.width,
    height: canvas.height,
    backgroundColor: canvas.backgroundColor,
    colorScheme: canvas.colorScheme,
    
    // Template state
    currentTemplate: template.currentTemplate,
    moduleVisibility: template.moduleVisibility,
    
    // Content state
    globalData: content.globalData,
    
    // Element state
    customElements: element.elements,
    
    // UI state
    editorMode: ui.editorMode,
    selectedId: ui.selectedIds.length > 0 ? ui.selectedIds[ui.selectedIds.length - 1] : null,
    selectedIds: ui.selectedIds,

    // Canvas actions
    setDimensions: canvas.setDimensions,
    setBackgroundColor: canvas.setBackgroundColor,
    applyColorScheme: canvas.applyColorScheme,
    
    // UI actions
    selectElement: ui.selectElement,
    selectElements: ui.selectElements,
    addToSelection: ui.addToSelection,
    toggleSelection: ui.toggleSelection,
    setEditorMode: (mode: import('../types/store').EditorMode) => {
      ui.setEditorMode(mode);
      // 切换到自定义模式时重置背景为默认值
      if (mode === 'custom') {
        canvas.setBackgroundColor(CANVAS_DEFAULTS.backgroundColor);
      }
    },
    
    // Element actions
    addCustomElement: (el: import('../types/customElements').CustomElement) => {
      element.addElement(el);
      ui.selectElement(el.id);  // 自动选中新添加的元素
    },
    updateCustomElement: element.updateElement,
    removeCustomElement: (id: string) => {
      element.removeElement(id);
      if (ui.selectedIds.includes(id)) {
        ui.removeFromSelection(id);
      }
    },
    clearCustomElements: () => {
      element.clearElements();
      ui.clearSelection();
    },
    
    // Template actions
    loadTemplate: (tmpl: TemplateModule) => {
      canvas._reset(tmpl.width, tmpl.height, tmpl.backgroundColor);
      template.setTemplate(tmpl);
      ui.setEditorMode('template');
      ui.clearSelection();
    },
    
    // Content actions
    updateGlobalData: content.updateField as (key: keyof GlobalCardData, value: unknown) => void,
    addListItem: content.addListItem,
    removeListItem: content.removeListItem,
    
    // Module visibility actions
    toggleModuleVisibility: template.toggleModuleVisibility,
    setModuleVisibility: template.setModuleVisibility,
  };
}

// 为了支持 create() 方式的旧代码，也导出一个假的 create 接口
// 注意：这不是真正的 zustand store，只是为了兼容
export const cardStoreActions = {
  getState: () => ({
    ...useCanvasStore.getState(),
    ...useTemplateStore.getState(),
    globalData: useContentStore.getState().globalData,
    customElements: useElementStore.getState().elements,
    ...useUIStore.getState(),
  }),
};
