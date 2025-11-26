/**
 * 自定义元素状态管理
 * 
 * 职责：管理自定义模式下的元素列表
 */
import { create } from 'zustand';
import type { CustomElement } from '../types/customElements';

export interface ElementState {
  // 状态
  elements: CustomElement[];

  // Actions
  addElement: (element: CustomElement) => void;
  updateElement: (id: string, updates: Partial<CustomElement>) => void;
  removeElement: (id: string) => void;
  clearElements: () => void;
  reorderElements: (fromIndex: number, toIndex: number) => void;
  duplicateElement: (id: string) => CustomElement | null;
  
  // Layer manipulation
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  
  // Get element
  getElementById: (id: string) => CustomElement | undefined;
}

export const useElementStore = create<ElementState>((set) => ({
  elements: [],

  addElement: (element) => set((state) => ({
    elements: [...state.elements, element]
  })),

  updateElement: (id, updates) => set((state) => ({
    elements: state.elements.map(el => 
      el.id === id ? { ...el, ...updates } as CustomElement : el
    )
  })),

  removeElement: (id) => set((state) => ({
    elements: state.elements.filter(el => el.id !== id)
  })),

  clearElements: () => set({ elements: [] }),

  reorderElements: (fromIndex, toIndex) => set((state) => {
    const newElements = [...state.elements];
    const [removed] = newElements.splice(fromIndex, 1);
    newElements.splice(toIndex, 0, removed);
    return { elements: newElements };
  }),

  duplicateElement: (id) => {
    const state = useElementStore.getState();
    const element = state.elements.find(el => el.id === id);
    if (!element) return null;
    
    const newElement: CustomElement = {
      ...element,
      id: `${element.type}-${Date.now()}`,
      x: element.x + 20,
      y: element.y + 20,
    };
    
    useElementStore.setState({ elements: [...state.elements, newElement] });
    return newElement;
  },

  bringToFront: (id) => set((state) => {
    const maxZ = Math.max(...state.elements.map(el => el.zIndex), 0);
    return {
      elements: state.elements.map(el =>
        el.id === id ? { ...el, zIndex: maxZ + 1 } as CustomElement : el
      )
    };
  }),

  sendToBack: (id) => set((state) => {
    const minZ = Math.min(...state.elements.map(el => el.zIndex), 0);
    return {
      elements: state.elements.map(el =>
        el.id === id ? { ...el, zIndex: minZ - 1 } as CustomElement : el
      )
    };
  }),

  bringForward: (id) => set((state) => {
    const currentElement = state.elements.find(el => el.id === id);
    if (!currentElement) return {};
    
    // 找到比当前元素 zIndex 大的最小 zIndex
    const higherElements = state.elements.filter(el => el.zIndex > currentElement.zIndex);
    if (higherElements.length === 0) return {};
    
    const nextHigher = higherElements.reduce((min, el) => 
      el.zIndex < min.zIndex ? el : min
    );
    
    // 交换 zIndex
    return {
      elements: state.elements.map(el => {
        if (el.id === id) return { ...el, zIndex: nextHigher.zIndex } as CustomElement;
        if (el.id === nextHigher.id) return { ...el, zIndex: currentElement.zIndex } as CustomElement;
        return el;
      })
    };
  }),

  sendBackward: (id) => set((state) => {
    const currentElement = state.elements.find(el => el.id === id);
    if (!currentElement) return {};
    
    // 找到比当前元素 zIndex 小的最大 zIndex
    const lowerElements = state.elements.filter(el => el.zIndex < currentElement.zIndex);
    if (lowerElements.length === 0) return {};
    
    const nextLower = lowerElements.reduce((max, el) => 
      el.zIndex > max.zIndex ? el : max
    );
    
    // 交换 zIndex
    return {
      elements: state.elements.map(el => {
        if (el.id === id) return { ...el, zIndex: nextLower.zIndex } as CustomElement;
        if (el.id === nextLower.id) return { ...el, zIndex: currentElement.zIndex } as CustomElement;
        return el;
      })
    };
  }),

  getElementById: (id) => {
    return useElementStore.getState().elements.find(el => el.id === id);
  },
}));

