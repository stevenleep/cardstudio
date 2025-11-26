/**
 * Stage Selection Hook
 * 
 * 管理画布元素选中状态，支持单选和多选
 */
import { useCallback } from 'react';
import type Konva from 'konva';

interface UseStageSelectionOptions {
  /** 选中单个元素（替换当前选择） */
  onSelect: (id: string | null) => void;
  /** 切换选择状态（用于 Ctrl+点击） */
  onToggleSelect?: (id: string) => void;
  /** 添加到选择（用于框选） */
  onSelectMultiple?: (ids: string[]) => void;
}

/**
 * Selection Hook
 * 
 * 支持：
 * - 单击选择元素
 * - Ctrl/Cmd+点击 切换选择
 * - 点击空白处清除选择
 */
export function useStageSelection({ 
  onSelect,
  onToggleSelect,
  onSelectMultiple,
}: UseStageSelectionOptions) {
  // 点击空白处取消选中
  const handleStageClick = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelect(null);
    }
  }, [onSelect]);

  // 选中元素（支持 Ctrl+点击多选）
  const handleElementSelect = useCallback((id: string, e?: MouseEvent | TouchEvent) => {
    // 检查是否按住了 Ctrl/Cmd 键
    const isMultiSelectKey = e && ('ctrlKey' in e || 'metaKey' in e) && 
      ((e as MouseEvent).ctrlKey || (e as MouseEvent).metaKey);
    
    if (isMultiSelectKey && onToggleSelect) {
      // Ctrl/Cmd + 点击：切换选择
      onToggleSelect(id);
    } else {
      // 普通点击：单选
      onSelect(id);
    }
  }, [onSelect, onToggleSelect]);

  // 框选多个元素
  const handleSelectMultiple = useCallback((ids: string[]) => {
    if (onSelectMultiple) {
      onSelectMultiple(ids);
    }
  }, [onSelectMultiple]);

  return {
    handleStageClick,
    handleElementSelect,
    handleSelectMultiple,
  };
}

