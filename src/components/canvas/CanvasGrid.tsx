/**
 * 画布网格组件
 * 
 * 显示对齐参考网格和安全区域
 */
import React from 'react';
import { Line, Rect } from 'react-konva';

interface CanvasGridProps {
  width: number;
  height: number;
  showGrid: boolean;
  gridSize: number;
  showSafeArea: boolean;
  safeAreaPadding: number;
}

export const CanvasGrid: React.FC<CanvasGridProps> = ({
  width,
  height,
  showGrid,
  gridSize,
  showSafeArea,
  safeAreaPadding,
}) => {
  // 生成网格线
  const renderGrid = () => {
    if (!showGrid) return null;
    
    const lines: React.ReactNode[] = [];
    
    // 垂直线
    for (let x = gridSize; x < width; x += gridSize) {
      lines.push(
        <Line
          key={`v-${x}`}
          points={[x, 0, x, height]}
          stroke="rgba(128, 128, 128, 0.3)"
          strokeWidth={1}
          listening={false}
        />
      );
    }
    
    // 水平线
    for (let y = gridSize; y < height; y += gridSize) {
      lines.push(
        <Line
          key={`h-${y}`}
          points={[0, y, width, y]}
          stroke="rgba(128, 128, 128, 0.3)"
          strokeWidth={1}
          listening={false}
        />
      );
    }
    
    return lines;
  };
  
  // 渲染安全区域
  const renderSafeArea = () => {
    if (!showSafeArea) return null;
    
    return (
      <>
        {/* 安全区域边框 */}
        <Rect
          x={safeAreaPadding}
          y={safeAreaPadding}
          width={width - safeAreaPadding * 2}
          height={height - safeAreaPadding * 2}
          stroke="#3B82F6"
          strokeWidth={2}
          dash={[10, 5]}
          listening={false}
        />
        
        {/* 四个角的标记 */}
        {/* 左上角 */}
        <Line
          points={[safeAreaPadding, safeAreaPadding + 20, safeAreaPadding, safeAreaPadding, safeAreaPadding + 20, safeAreaPadding]}
          stroke="#3B82F6"
          strokeWidth={3}
          listening={false}
        />
        
        {/* 右上角 */}
        <Line
          points={[width - safeAreaPadding - 20, safeAreaPadding, width - safeAreaPadding, safeAreaPadding, width - safeAreaPadding, safeAreaPadding + 20]}
          stroke="#3B82F6"
          strokeWidth={3}
          listening={false}
        />
        
        {/* 左下角 */}
        <Line
          points={[safeAreaPadding, height - safeAreaPadding - 20, safeAreaPadding, height - safeAreaPadding, safeAreaPadding + 20, height - safeAreaPadding]}
          stroke="#3B82F6"
          strokeWidth={3}
          listening={false}
        />
        
        {/* 右下角 */}
        <Line
          points={[width - safeAreaPadding - 20, height - safeAreaPadding, width - safeAreaPadding, height - safeAreaPadding, width - safeAreaPadding, height - safeAreaPadding - 20]}
          stroke="#3B82F6"
          strokeWidth={3}
          listening={false}
        />
      </>
    );
  };

  return (
    <>
      {renderGrid()}
      {renderSafeArea()}
    </>
  );
};

