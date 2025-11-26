/**
 * 画布主组件
 * 
 * 负责渲染画布内容，支持模板模式和自定义模式
 * 支持多选：Ctrl+点击、拖动框选
 */
import { useRef, useEffect, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { Stage, Layer, Transformer } from 'react-konva';
import type Konva from 'konva';

import { useCardStore } from '../../store/cardStore';
import { useCanvasStore } from '../../store/canvasStore';
import { useUIStore } from '../../store/uiStore';
import { TEMPLATE_REGISTRY } from '../../templates';
import { useAutoScale, useExportImage, useCanvasDrop, useKeyboardShortcuts, SHORTCUTS } from '../../hooks';

import { CanvasBackground, CanvasShadow } from './CanvasBackground';
import { ScaleIndicator } from './ScaleIndicator';
import { CustomElementRenderer } from './CustomElementRenderer';
import { BackgroundRect } from './BackgroundRect';
import { CanvasGrid } from './CanvasGrid';
import { ContextMenu } from './ContextMenu';
import { SelectionRect } from './SelectionRect';
import { DrawingLayer } from './DrawingLayer';
import { useStageTransformer, useStageSelection, useElementActions, useMarqueeSelection } from './hooks';
import { Package } from 'lucide-react';

export interface CardStageRef {
  exportImage: () => void;
}

/**
 * 画布主组件
 */
const CardStage = forwardRef<CardStageRef>((_, ref) => {
  const { 
    width, height, backgroundColor, colorScheme,
    currentTemplate, globalData, moduleVisibility,
    customElements, editorMode,
    selectElement, selectElements, toggleSelection, selectedIds,
    updateCustomElement, addCustomElement, loadTemplate
  } = useCardStore();
  
  const { 
    showGrid, gridSize, 
    showSafeArea, safeAreaPadding
  } = useCanvasStore();
  
  const { currentTool, isDrawing } = useUIStore();
  
  const stageRef = useRef<Konva.Stage>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  // 自动加载默认模板
  useEffect(() => {
    if (!currentTemplate && TEMPLATE_REGISTRY.length > 0) {
      loadTemplate(TEMPLATE_REGISTRY[0]);
    }
  }, [currentTemplate, loadTemplate]);

  // 自动缩放 Hook
  const { scale, containerRef } = useAutoScale({ width, height });

  // 导出图片 Hook
  const { exportImage } = useExportImage({
    stageRef,
    width,
    height,
    templateName: currentTemplate?.name,
  });

  // 画布拖放 Hook
  const { handleDrop, handleDragOver, handleDragEnter, handleDragLeave } = useCanvasDrop({
    stageRef,
    scale,
    canvasWidth: width,
    canvasHeight: height,
    onAddElement: addCustomElement,
    isEnabled: editorMode === 'custom',
  });
  
  // 拖拽状态处理
  const onDragEnter = (e: React.DragEvent) => {
    handleDragEnter(e);
    if (editorMode === 'custom') setIsDragOver(true);
  };
  
  const onDragLeave = (e: React.DragEvent) => {
    handleDragLeave(e);
    // 只有当离开画布容器时才清除状态
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
    }
  };
  
  const onDrop = (e: React.DragEvent) => {
    handleDrop(e);
    setIsDragOver(false);
  };

  // 是否处于选择模式（非画笔工具）
  const isSelectMode = currentTool === 'select';
  
  // Transformer Hook（支持多选）
  const { transformerRef } = useStageTransformer({
    stageRef,
    selectedIds,
    enabled: editorMode === 'custom' && isSelectMode,
  });

  // 选中逻辑 Hook（支持 Ctrl+点击多选）
  const { handleStageClick, handleElementSelect } = useStageSelection({
    onSelect: selectElement,
    onToggleSelect: toggleSelection,
    onSelectMultiple: selectElements,
  });

  // 框选 Hook（支持 Shift+框选追加）
  const {
    selectionRect,
    handleMouseDown: handleMarqueeMouseDown,
    handleMouseMove: handleMarqueeMouseMove,
    handleMouseUp: handleMarqueeMouseUp,
  } = useMarqueeSelection({
    stageRef,
    scale,
    elements: customElements,
    currentSelectedIds: selectedIds,
    onSelect: selectElements,
    onAddToSelection: selectElements,
    enabled: editorMode === 'custom' && isSelectMode,
  });

  // 元素操作 Hook
  const {
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
    hasClipboard,
  } = useElementActions();

  const { showContextMenu, hideContextMenu, setCurrentTool } = useUIStore();

  // 右键菜单处理
  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    if (editorMode !== 'custom') return;
    
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY);
  }, [editorMode, showContextMenu]);

  // 点击画布时隐藏右键菜单
  const handleContainerClick = useCallback(() => {
    hideContextMenu();
  }, [hideContextMenu]);

  // 键盘快捷键（仅在自定义模式生效）
  useKeyboardShortcuts([
    // 删除
    { key: SHORTCUTS.DELETE, handler: deleteElement },
    { key: SHORTCUTS.BACKSPACE, handler: deleteElement },
    
    // 复制/剪切/粘贴
    { key: SHORTCUTS.COPY, handler: copyElement },
    { key: SHORTCUTS.CUT, handler: cutElement },
    { key: SHORTCUTS.PASTE, handler: pasteElement },
    { key: SHORTCUTS.DUPLICATE, handler: duplicateElement },
    
    // 选择
    { key: SHORTCUTS.ESCAPE, handler: () => {
      selectElement(null);
      setCurrentTool('select'); // ESC 也切回选择工具
    }},
    { key: SHORTCUTS.SELECT_ALL, handler: selectAllElements },
    
    // 移动（1px）
    { key: SHORTCUTS.MOVE_UP, handler: () => moveElement('up', 1) },
    { key: SHORTCUTS.MOVE_DOWN, handler: () => moveElement('down', 1) },
    { key: SHORTCUTS.MOVE_LEFT, handler: () => moveElement('left', 1) },
    { key: SHORTCUTS.MOVE_RIGHT, handler: () => moveElement('right', 1) },
    
    // 快速移动（10px）
    { key: SHORTCUTS.MOVE_UP_FAST, handler: () => moveElement('up', 10) },
    { key: SHORTCUTS.MOVE_DOWN_FAST, handler: () => moveElement('down', 10) },
    { key: SHORTCUTS.MOVE_LEFT_FAST, handler: () => moveElement('left', 10) },
    { key: SHORTCUTS.MOVE_RIGHT_FAST, handler: () => moveElement('right', 10) },
    
    // 层级操作
    { key: SHORTCUTS.BRING_FORWARD, handler: bringForward },
    { key: SHORTCUTS.SEND_BACKWARD, handler: sendBackward },
    { key: SHORTCUTS.BRING_TO_FRONT, handler: bringToFront },
    { key: SHORTCUTS.SEND_TO_BACK, handler: sendToBack },
    
    // 工具切换
    { key: SHORTCUTS.TOOL_SELECT, handler: () => setCurrentTool('select') },
    { key: SHORTCUTS.TOOL_BRUSH, handler: () => setCurrentTool('brush') },
  ], editorMode === 'custom');

  // 暴露导出方法
  useImperativeHandle(ref, () => ({ exportImage }));

  return (
    <CanvasBackground>
      <div 
        ref={containerRef}
        className={`
          flex justify-center items-center w-full h-full
          transition-all duration-200
          ${isDragOver ? 'bg-blue-50/30' : ''}
        `}
        onDrop={onDrop}
        onDragOver={handleDragOver}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onContextMenu={handleContextMenu}
        onClick={handleContainerClick}
      >
        {/* 拖拽提示遮罩 */}
        {isDragOver && editorMode === 'custom' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10">
            <div className="bg-blue-500/90 text-white px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-2 border-white rounded-lg flex items-center justify-center">
                  <Package size={18} />
                </div>
                <span className="text-[15px] font-semibold">释放以添加元素</span>
              </div>
            </div>
          </div>
        )}
        <CanvasShadow>
          <Stage
            width={width * scale}
            height={height * scale}
            scale={{ x: scale, y: scale }}
            style={{ 
              backgroundColor: typeof backgroundColor === 'string' ? backgroundColor : '#ffffff',
              cursor: currentTool === 'brush' ? 'crosshair' : 'default',
            }}
            onMouseDown={(e) => {
              if (isSelectMode) {
                handleStageClick(e);
                handleMarqueeMouseDown(e);
              }
            }}
            onMouseMove={isSelectMode ? handleMarqueeMouseMove : undefined}
            onMouseUp={isSelectMode ? handleMarqueeMouseUp : undefined}
            onMouseLeave={isSelectMode ? handleMarqueeMouseUp : undefined}
            onTouchStart={isSelectMode ? handleStageClick : undefined}
            ref={stageRef}
          >
            <Layer>
              {/* 背景 */}
              <BackgroundRect 
                width={width}
                height={height}
                fill={backgroundColor} 
              />

              {/* 模板模式：渲染当前模板 */}
              {editorMode === 'template' && currentTemplate && (
                <currentTemplate.Renderer 
                  data={globalData}
                  moduleVisibility={moduleVisibility}
                  onElementClick={handleElementSelect}
                  colorScheme={colorScheme}
                  width={width}
                  height={height}
                />
              )}
              
              {/* 自定义模式：渲染自定义元素 */}
              {editorMode === 'custom' && (
                <CustomElementRenderer
                  elements={customElements}
                  selectedIds={selectedIds}
                  onSelect={handleElementSelect}
                  onUpdate={updateCustomElement}
                />
              )}
              
              {/* 网格和安全区域（仅在自定义模式显示） */}
              {editorMode === 'custom' && (
                <CanvasGrid
                  width={width}
                  height={height}
                  showGrid={showGrid}
                  gridSize={gridSize}
                  showSafeArea={showSafeArea}
                  safeAreaPadding={safeAreaPadding}
                />
              )}

              {/* 框选矩形 */}
              {editorMode === 'custom' && isSelectMode && (
                <SelectionRect rect={selectionRect} />
              )}
              
              {/* 绘图层 */}
              {editorMode === 'custom' && currentTool === 'brush' && (
                <DrawingLayer scale={scale} enabled={true} width={width} height={height} />
              )}
              
              {/* Transformer（自定义模式，支持多选） */}
              {editorMode === 'custom' && isSelectMode && (
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    if (newBox.width < 20 || newBox.height < 20) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              )}
            </Layer>
          </Stage>
        </CanvasShadow>
      </div>
      
      <ScaleIndicator scale={scale} />
      
      {/* 右键菜单 */}
      {editorMode === 'custom' && (
        <ContextMenu
          onCopy={copyElement}
          onCut={cutElement}
          onPaste={pasteElement}
          onDuplicate={duplicateElement}
          onDelete={deleteElement}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
          onBringForward={bringForward}
          onSendBackward={sendBackward}
          hasSelection={hasSelection}
          hasClipboard={hasClipboard}
        />
      )}
    </CanvasBackground>
  );
});

CardStage.displayName = 'CardStage';

export default CardStage;
