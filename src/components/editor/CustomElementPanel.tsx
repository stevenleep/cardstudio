/**
 * 自定义元素面板 - Neo-Brutalism 风格
 */
import React from 'react';
import { useCardStore } from '../../store/cardStore';
import { useElementStore } from '../../store/elementStore';
import {
  Trash2, Copy, Square, Circle, Type, Lock, Unlock, Eye, EyeOff,
  ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, Image as ImageIcon, Pencil,
} from 'lucide-react';
import { PositionSizeEditor, ShapeStyleEditor, TextStyleEditor, ImageStyleEditor, PathStyleEditor } from './properties';
import { TransformEditor } from './properties/TransformEditor';
import { EffectsEditor } from './properties/EffectsEditor';
import type { CustomElement, ImageElement, PathElement } from '../../types';

export const CustomElementPanel: React.FC = () => {
  const { selectedId, customElements, updateCustomElement, removeCustomElement, selectElement, addCustomElement } = useCardStore();
  const { bringToFront, sendToBack, bringForward, sendBackward } = useElementStore();

  const selectedElement = customElements.find(el => el.id === selectedId);

  if (!selectedElement) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Square size={24} strokeWidth={2.5} />
        </div>
        <p className="empty-state-title">未选中元素</p>
        <p className="empty-state-desc">点击画布中的元素进行编辑</p>
      </div>
    );
  }

  const handleUpdate = (updates: Partial<CustomElement>) => updateCustomElement(selectedElement.id, updates);
  
  const handleDuplicate = () => {
    addCustomElement({
      ...selectedElement,
      id: `${selectedElement.type}-${Date.now()}`,
      x: selectedElement.x + 20,
      y: selectedElement.y + 20,
      zIndex: customElements.length,
    });
  };

  const handleDelete = () => {
    removeCustomElement(selectedElement.id);
    selectElement(null);
  };

  const elementTypeName = { rect: '矩形', circle: '圆形', text: '文字', line: '线条', image: '图片', path: '画笔' }[selectedElement.type] || '元素';
  const elementIcons: Record<string, React.ReactNode> = { 
    rect: <Square size={20} strokeWidth={2.5} />, 
    circle: <Circle size={20} strokeWidth={2.5} />, 
    text: <Type size={20} strokeWidth={2.5} />,
    image: <ImageIcon size={20} strokeWidth={2.5} />,
    path: <Pencil size={20} strokeWidth={2.5} />,
  };
  const elementIcon = elementIcons[selectedElement.type] || <Square size={20} strokeWidth={2.5} />;
  const isLocked = selectedElement.locked === true;
  const isHidden = selectedElement.visible === false;

  return (
    <div className="h-full">
      {/* 固定的元素头部区域 */}
      <div className="px-5 py-4 border-b-2 border-border bg-bg/30">
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 flex items-center justify-center rounded-lg
            border-2 border-border shadow-brutal-sm
            ${isLocked ? 'bg-bg text-text/50' : 'bg-main text-text'}
          `}>
            {elementIcon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text truncate">{selectedElement.name || elementTypeName}</h3>
            <p className="text-[10px] text-text/40 font-mono">{selectedElement.id.slice(-8)}</p>
          </div>
        </div>

        {/* 工具栏 - 紧凑布局 */}
        <div className="flex items-center gap-0.5 mt-3 pt-3 border-t border-border/50">
          <ToolBtn 
            icon={isHidden ? <EyeOff size={14} strokeWidth={2.5} /> : <Eye size={14} strokeWidth={2.5} />} 
            active={isHidden} 
            onClick={() => handleUpdate({ visible: !isHidden })} 
            title={isHidden ? '显示' : '隐藏'}
          />
          <ToolBtn 
            icon={isLocked ? <Lock size={14} strokeWidth={2.5} /> : <Unlock size={14} strokeWidth={2.5} />} 
            active={isLocked}
            onClick={() => handleUpdate({ locked: !isLocked })} 
            title={isLocked ? '解锁' : '锁定'}
          />
          <div className="w-px h-5 bg-border/50 mx-1" />
          <ToolBtn icon={<ChevronsUp size={14} strokeWidth={2.5} />} onClick={() => bringToFront(selectedElement.id)} title="置顶" />
          <ToolBtn icon={<ChevronUp size={14} strokeWidth={2.5} />} onClick={() => bringForward(selectedElement.id)} title="上移" />
          <ToolBtn icon={<ChevronDown size={14} strokeWidth={2.5} />} onClick={() => sendBackward(selectedElement.id)} title="下移" />
          <ToolBtn icon={<ChevronsDown size={14} strokeWidth={2.5} />} onClick={() => sendToBack(selectedElement.id)} title="置底" />
          <div className="flex-1" />
          <ToolBtn icon={<Copy size={14} strokeWidth={2.5} />} onClick={handleDuplicate} title="复制" />
          <ToolBtn icon={<Trash2 size={14} strokeWidth={2.5} />} danger onClick={handleDelete} title="删除" />
        </div>
        </div>

      {/* 滚动内容区域 - 与画布设置保持一致的结构 */}
      <div className="px-5 pt-5 pb-8 space-y-6">
        {isLocked && (
          <div className="flex items-center gap-3 p-3 bg-warning/10 border-2 border-warning/50 rounded-lg">
            <Lock size={16} strokeWidth={2.5} className="text-warning shrink-0" />
            <p className="text-xs font-bold text-warning">元素已锁定</p>
          </div>
        )}

        {/* 属性编辑区域 */}
        <div className={`space-y-6 ${isLocked ? 'opacity-40 pointer-events-none' : ''}`}>
          <PositionSizeEditor element={selectedElement} onUpdate={handleUpdate} />
          <TransformEditor element={selectedElement} onUpdate={handleUpdate} />
          {(selectedElement.type === 'rect' || selectedElement.type === 'circle') && (
            <ShapeStyleEditor element={selectedElement} onUpdate={handleUpdate} />
          )}
          {selectedElement.type === 'text' && (
            <TextStyleEditor element={selectedElement} onUpdate={handleUpdate} />
          )}
          {selectedElement.type === 'image' && (
            <ImageStyleEditor element={selectedElement as ImageElement} onUpdate={handleUpdate} />
          )}
          {selectedElement.type === 'path' && (
            <PathStyleEditor element={selectedElement as PathElement} onUpdate={handleUpdate} />
          )}
          <EffectsEditor element={selectedElement} onUpdate={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

const ToolBtn: React.FC<{
  icon: React.ReactNode;
  onClick: () => void;
  active?: boolean;
  danger?: boolean;
  title?: string;
}> = ({ icon, onClick, active, danger, title }) => (
  <button
    onClick={onClick}
    title={title}
    className={`tool-btn ${active ? 'active' : ''} ${danger ? 'danger' : ''}`}
  >
    {icon}
  </button>
);
