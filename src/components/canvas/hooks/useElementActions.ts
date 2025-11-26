/**
 * 元素操作 Hook
 * 
 * 提供复制、粘贴、删除、层级调整、移动等操作
 * 支持多选操作
 */
import { useCallback } from 'react';
import { useElementStore } from '../../../store/elementStore';
import { useUIStore } from '../../../store/uiStore';
import type { CustomElement } from '../../../types/customElements';

/** 移动方向 */
export type MoveDirection = 'up' | 'down' | 'left' | 'right';

export interface UseElementActionsReturn {
  // 基础操作
  copyElement: () => void;
  cutElement: () => void;
  pasteElement: () => void;
  duplicateElement: () => void;
  deleteElement: () => void;
  selectAllElements: () => void;
  
  // 移动操作
  moveElement: (direction: MoveDirection, distance?: number) => void;
  
  // 层级操作
  bringToFront: () => void;
  sendToBack: () => void;
  bringForward: () => void;
  sendBackward: () => void;
  
  // 状态
  hasSelection: boolean;
  hasMultiSelection: boolean;
  hasClipboard: boolean;
  hasElements: boolean;
  selectedIds: string[];
  selectedElements: CustomElement[];
}

export function useElementActions(): UseElementActionsReturn {
  const { 
    elements,
    addElement,
    removeElement,
    updateElement,
    getElementById,
    bringToFront: storeBringToFront,
    sendToBack: storeSendToBack,
    bringForward: storeBringForward,
    sendBackward: storeSendBackward,
  } = useElementStore();
  
  const {
    selectedIds,
    clipboard,
    setClipboard,
    clearSelection,
    selectElements,
  } = useUIStore();

  const hasSelection = selectedIds.length > 0;
  const hasMultiSelection = selectedIds.length > 1;
  const hasClipboard = clipboard.length > 0;
  const hasElements = elements.length > 0;
  
  // 获取所有选中的元素
  const selectedElements = selectedIds
    .map(id => getElementById(id))
    .filter((el): el is CustomElement => el !== undefined);

  // 复制选中元素（支持多选）
  const copyElement = useCallback(() => {
    if (selectedIds.length === 0) return;
    const elementsToCopy = selectedIds
      .map(id => getElementById(id))
      .filter((el): el is CustomElement => el !== undefined)
      .map(el => ({ ...el }));
    
    if (elementsToCopy.length > 0) {
      setClipboard(elementsToCopy);
    }
  }, [selectedIds, getElementById, setClipboard]);

  // 剪切选中元素（支持多选）
  const cutElement = useCallback(() => {
    if (selectedIds.length === 0) return;
    const elementsToCut = selectedIds
      .map(id => getElementById(id))
      .filter((el): el is CustomElement => el !== undefined)
      .map(el => ({ ...el }));
    
    if (elementsToCut.length > 0) {
      setClipboard(elementsToCut);
      selectedIds.forEach(id => removeElement(id));
      clearSelection();
    }
  }, [selectedIds, getElementById, setClipboard, removeElement, clearSelection]);

  // 粘贴元素（支持多个）
  const pasteElement = useCallback(() => {
    if (clipboard.length === 0) return;
    
    const maxZ = Math.max(...elements.map((el: CustomElement) => el.zIndex), 0);
    const newIds: string[] = [];
    
    clipboard.forEach((el, index) => {
      const newElement: CustomElement = {
        ...el,
        id: `${el.type}-${Date.now()}-${index}`,
        x: el.x + 20,
        y: el.y + 20,
        zIndex: maxZ + index + 1,
      };
      addElement(newElement);
      newIds.push(newElement.id);
    });
    
    // 选中所有粘贴的元素
    selectElements(newIds);
  }, [clipboard, elements, addElement, selectElements]);

  // 复制元素（原位偏移，支持多选）
  const duplicateElement = useCallback(() => {
    if (selectedIds.length === 0) return;
    
    const maxZ = Math.max(...elements.map((el: CustomElement) => el.zIndex), 0);
    const newIds: string[] = [];
    
    selectedIds.forEach((id, index) => {
      const element = getElementById(id);
      if (!element) return;
      
      const newElement: CustomElement = {
        ...element,
        id: `${element.type}-${Date.now()}-${index}`,
        x: element.x + 20,
        y: element.y + 20,
        zIndex: maxZ + index + 1,
      };
      addElement(newElement);
      newIds.push(newElement.id);
    });
    
    // 选中所有复制的元素
    if (newIds.length > 0) {
      selectElements(newIds);
    }
  }, [selectedIds, getElementById, elements, addElement, selectElements]);

  // 删除选中元素（支持多选）
  const deleteElement = useCallback(() => {
    if (selectedIds.length === 0) return;
    selectedIds.forEach(id => removeElement(id));
    clearSelection();
  }, [selectedIds, removeElement, clearSelection]);

  // 选择所有元素
  const selectAllElements = useCallback(() => {
    if (elements.length > 0) {
      selectElements(elements.map((el: CustomElement) => el.id));
    }
  }, [elements, selectElements]);

  // 移动元素（支持多选）
  const moveElement = useCallback((direction: MoveDirection, distance: number = 1) => {
    if (selectedIds.length === 0) return;

    selectedIds.forEach(id => {
      const element = getElementById(id);
      if (!element) return;

      const updates: Partial<CustomElement> = {};
      switch (direction) {
        case 'up':
          updates.y = element.y - distance;
          break;
        case 'down':
          updates.y = element.y + distance;
          break;
        case 'left':
          updates.x = element.x - distance;
          break;
        case 'right':
          updates.x = element.x + distance;
          break;
      }
      
      updateElement(id, updates);
    });
  }, [selectedIds, getElementById, updateElement]);

  // 层级操作（对多选时操作所有选中元素）
  const bringToFront = useCallback(() => {
    selectedIds.forEach(id => storeBringToFront(id));
  }, [selectedIds, storeBringToFront]);

  const sendToBack = useCallback(() => {
    selectedIds.forEach(id => storeSendToBack(id));
  }, [selectedIds, storeSendToBack]);

  const bringForward = useCallback(() => {
    selectedIds.forEach(id => storeBringForward(id));
  }, [selectedIds, storeBringForward]);

  const sendBackward = useCallback(() => {
    selectedIds.forEach(id => storeSendBackward(id));
  }, [selectedIds, storeSendBackward]);

  return {
    copyElement,
    cutElement,
    pasteElement,
    duplicateElement,
    deleteElement,
    selectAllElements,
    moveElement,
    bringToFront,
    sendToBack,
    bringForward,
    sendBackward,
    hasSelection,
    hasMultiSelection,
    hasClipboard,
    hasElements,
    selectedIds,
    selectedElements,
  };
}

