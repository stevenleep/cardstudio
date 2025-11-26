/**
 * 绘图层组件
 * 
 * 处理画笔工具的绘制逻辑
 */
import React, { useRef, useCallback, useState } from 'react';
import { Line, Rect } from 'react-konva';
import type Konva from 'konva';
import { useUIStore } from '../../store/uiStore';
import { useElementStore } from '../../store/elementStore';
import type { PathElement } from '../../types/customElements';

interface DrawingLayerProps {
  /** 画布缩放比例 */
  scale: number;
  /** 是否启用绘图 */
  enabled: boolean;
  /** 画布宽度 */
  width?: number;
  /** 画布高度 */
  height?: number;
}

// 生成唯一 ID
const uid = () => `path-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

/**
 * 绘图层组件
 */
export const DrawingLayer: React.FC<DrawingLayerProps> = ({ scale, enabled, width = 1080, height = 1920 }) => {
  const { 
    currentTool, 
    brushSettings, 
    isDrawing, 
    setIsDrawing 
  } = useUIStore();
  const { addElement, elements } = useElementStore();
  
  // 使用 state 跟踪当前绘制的点，确保 React 重新渲染
  const [drawingPoints, setDrawingPoints] = useState<number[]>([]);
  const isDrawingRef = useRef(false);
  
  const isBrushTool = currentTool === 'brush';
  const isActive = enabled && isBrushTool;

  /**
   * 开始绘制
   */
  const handleMouseDown = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isActive) return;
    
    // 阻止事件冒泡，避免触发选择逻辑
    e.cancelBubble = true;
    
    const stage = e.target.getStage();
    if (!stage) return;
    
    const pos = stage.getPointerPosition();
    if (!pos) return;
    
    // 转换为画布坐标
    const x = pos.x / scale;
    const y = pos.y / scale;
    
    isDrawingRef.current = true;
    setDrawingPoints([x, y]);
    setIsDrawing(true);
  }, [isActive, scale, setIsDrawing]);

  /**
   * 绘制中
   */
  const handleMouseMove = useCallback((e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (!isActive || !isDrawingRef.current) return;
    
    e.cancelBubble = true;
    
    const stage = e.target.getStage();
    if (!stage) return;
    
    const pos = stage.getPointerPosition();
    if (!pos) return;
    
    // 转换为画布坐标
    const x = pos.x / scale;
    const y = pos.y / scale;
    
    // 添加新点
    setDrawingPoints(prev => [...prev, x, y]);
  }, [isActive, scale]);

  /**
   * 结束绘制
   */
  const handleMouseUp = useCallback(() => {
    if (!isActive || !isDrawingRef.current) return;
    
    // 如果点数足够，创建路径元素
    if (drawingPoints.length >= 4) {
      // 计算边界框
      const xs = drawingPoints.filter((_, i) => i % 2 === 0);
      const ys = drawingPoints.filter((_, i) => i % 2 === 1);
      const minX = Math.min(...xs);
      const maxX = Math.max(...xs);
      const minY = Math.min(...ys);
      const maxY = Math.max(...ys);
      
      // 将点相对于边界框左上角偏移
      const normalizedPoints = drawingPoints.map((val, i) => 
        i % 2 === 0 ? val - minX : val - minY
      );
      
      const pathElement: PathElement = {
        id: uid(),
        type: 'path',
        x: minX,
        y: minY,
        width: Math.max(maxX - minX, 1),
        height: Math.max(maxY - minY, 1),
        rotation: 0,
        zIndex: elements.length,
        points: normalizedPoints,
        stroke: brushSettings.color,
        strokeWidth: brushSettings.size,
        opacity: brushSettings.opacity * brushSettings.flow, // 结合透明度和流量
        lineCap: brushSettings.lineCap,
        lineJoin: brushSettings.lineJoin,
        tension: brushSettings.smoothing,
        blendMode: brushSettings.blendMode === 'source-over' ? undefined : brushSettings.blendMode as PathElement['blendMode'],
      };
      
      addElement(pathElement);
    }
    
    // 重置状态
    isDrawingRef.current = false;
    setDrawingPoints([]);
    setIsDrawing(false);
  }, [isActive, drawingPoints, brushSettings, elements.length, addElement, setIsDrawing]);

  if (!isActive) return null;

  return (
    <>
      {/* 透明的事件捕获层 */}
      <Rect
        x={0}
        y={0}
        width={width}
        height={height}
        fill="transparent"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      />
      
      {/* 当前正在绘制的线条 */}
      {isDrawing && drawingPoints.length >= 2 && (
        <Line
          points={drawingPoints}
          stroke={brushSettings.color}
          strokeWidth={brushSettings.size}
          opacity={brushSettings.opacity * brushSettings.flow}
          lineCap={brushSettings.lineCap}
          lineJoin={brushSettings.lineJoin}
          tension={brushSettings.smoothing}
          globalCompositeOperation={brushSettings.blendMode}
          listening={false}
        />
      )}
    </>
  );
};

export default DrawingLayer;

