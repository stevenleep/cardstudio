/**
 * 内容数据状态管理
 * 
 * 职责：管理卡片的文本内容数据
 */
import { create } from 'zustand';
import { type GlobalCardData, defaultGlobalData } from '../types/modules';

export interface ContentState {
  // 状态
  globalData: GlobalCardData;

  // Actions
  updateField: <K extends keyof GlobalCardData>(key: K, value: GlobalCardData[K]) => void;
  addListItem: (key: keyof GlobalCardData) => void;
  removeListItem: (key: keyof GlobalCardData, index: number) => void;
  updateListItem: (key: keyof GlobalCardData, index: number, value: string) => void;
  resetToDefault: () => void;
}

export const useContentStore = create<ContentState>((set) => ({
  globalData: { ...defaultGlobalData },

  updateField: (key, value) => set((state) => ({
    globalData: {
      ...state.globalData,
      [key]: value
    }
  })),

  addListItem: (key) => set((state) => {
    const currentValue = state.globalData[key];
    if (!Array.isArray(currentValue)) return {};
    
    return {
      globalData: {
        ...state.globalData,
        [key]: [...currentValue, '新项目']
      }
    };
  }),

  removeListItem: (key, index) => set((state) => {
    const currentValue = state.globalData[key];
    if (!Array.isArray(currentValue)) return {};
    
    const newArray = [...currentValue];
    newArray.splice(index, 1);
    
    return {
      globalData: {
        ...state.globalData,
        [key]: newArray
      }
    };
  }),

  updateListItem: (key, index, value) => set((state) => {
    const currentValue = state.globalData[key];
    if (!Array.isArray(currentValue)) return {};
    
    const newArray = [...currentValue];
    newArray[index] = value;
    
    return {
      globalData: {
        ...state.globalData,
        [key]: newArray
      }
    };
  }),

  resetToDefault: () => set({ globalData: { ...defaultGlobalData } }),
}));

