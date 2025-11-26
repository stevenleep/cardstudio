/**
 * Stage Transformer Hook
 * 
 * 管理 Konva Transformer 的选中和变换逻辑
 * 支持单选和多选
 */
import { useEffect, useRef, useMemo } from 'react';
import type Konva from 'konva';

interface UseStageTransformerOptions {
  /** Stage ref */
  stageRef: React.RefObject<Konva.Stage | null>;
  /** 当前选中的元素 ID（支持单个ID或数组） */
  selectedId?: string | null;
  selectedIds?: string[];
  /** 是否启用 */
  enabled: boolean;
}

/**
 * Transformer Hook - 支持单选和多选
 */
export function useStageTransformer({
  stageRef,
  selectedId,
  selectedIds,
  enabled,
}: UseStageTransformerOptions) {
  const transformerRef = useRef<Konva.Transformer>(null);
  
  // 使用 useMemo 避免每次渲染都创建新数组
  // 将数组转为稳定的字符串 key 用于依赖比较
  const idsKey = useMemo(() => {
    const ids = selectedIds ?? (selectedId ? [selectedId] : []);
    return ids.join(',');
  }, [selectedIds, selectedId]);

  useEffect(() => {
    if (!transformerRef.current) return;
    
    const ids = idsKey ? idsKey.split(',').filter(Boolean) : [];
    
    if (ids.length > 0 && enabled) {
      const stage = stageRef.current;
      const selectedNodes = ids
        .map(id => stage?.findOne(`#${id}`))
        .filter((node): node is Konva.Node => node !== undefined && node !== null);
      
      if (selectedNodes.length > 0) {
        transformerRef.current.nodes(selectedNodes);
        transformerRef.current.getLayer()?.batchDraw();
      } else {
        transformerRef.current.nodes([]);
      }
    } else {
      transformerRef.current.nodes([]);
    }
  }, [idsKey, enabled, stageRef]);

  return { transformerRef };
}

