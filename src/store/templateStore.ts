/**
 * 模板状态管理
 * 
 * 职责：管理当前模板、模块可见性
 */
import { create } from 'zustand';
import type { TemplateModule } from '../types/template';
import type { ModuleId, ModuleVisibility } from '../types/modules';

// 所有模块 ID 列表
const ALL_MODULE_IDS: ModuleId[] = [
  'topBanner', 'mainTitle', 'subtitle', 'features', 'brand', 'footer', 'qrCode'
];

/**
 * 创建默认的模块可见性（所有模块默认不可见）
 */
export const createDefaultVisibility = (): ModuleVisibility => {
  const visibility: Partial<ModuleVisibility> = {};
  ALL_MODULE_IDS.forEach(id => visibility[id] = false);
  return visibility as ModuleVisibility;
};

/**
 * 根据模板创建模块可见性
 */
export const createVisibilityFromTemplate = (template: TemplateModule): ModuleVisibility => {
  const visibility = createDefaultVisibility();
  if (template.visibleModules) {
    template.visibleModules.forEach(moduleId => {
      visibility[moduleId] = true;
    });
  }
  return visibility;
};

export interface TemplateState {
  // 状态
  currentTemplate: TemplateModule | null;
  moduleVisibility: ModuleVisibility;

  // Actions
  setTemplate: (template: TemplateModule | null) => void;
  toggleModuleVisibility: (moduleId: ModuleId) => void;
  setModuleVisibility: (moduleId: ModuleId, visible: boolean) => void;
  resetModuleVisibility: (template?: TemplateModule) => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  currentTemplate: null,
  moduleVisibility: createDefaultVisibility(),

  setTemplate: (template) => set({
    currentTemplate: template,
    moduleVisibility: template ? createVisibilityFromTemplate(template) : createDefaultVisibility()
  }),

  toggleModuleVisibility: (moduleId) => set((state) => ({
    moduleVisibility: {
      ...state.moduleVisibility,
      [moduleId]: !state.moduleVisibility[moduleId]
    }
  })),

  setModuleVisibility: (moduleId, visible) => set((state) => ({
    moduleVisibility: {
      ...state.moduleVisibility,
      [moduleId]: visible
    }
  })),

  resetModuleVisibility: (template) => set((state) => ({
    moduleVisibility: template 
      ? createVisibilityFromTemplate(template) 
      : state.currentTemplate 
        ? createVisibilityFromTemplate(state.currentTemplate)
        : createDefaultVisibility()
  })),
}));

