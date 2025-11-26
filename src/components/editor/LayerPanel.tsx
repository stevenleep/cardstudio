/**
 * 图层面板 - Neo-Brutalism 风格
 */
import { Trash2, ChevronUp, ChevronDown, Square, Circle, Type, Layers, ArrowUpToLine, ArrowDownToLine } from 'lucide-react';
import { useCardStore } from '../../store/cardStore';
import type { CustomElement } from '../../types/customElements';

export const LayerPanel: React.FC = () => {
  const { 
    customElements, 
    selectedId, 
    selectElement, 
    removeCustomElement,
    updateCustomElement
  } = useCardStore();
  
  // 按 zIndex 排序（从高到低）
  const sortedElements = [...customElements].sort((a, b) => b.zIndex - a.zIndex);
  
  // 获取元素显示名称
  const getElementName = (element: CustomElement) => {
    if (element.type === 'text') {
      const preview = element.text.substring(0, 12);
      return preview + (element.text.length > 12 ? '...' : '');
    }
    const typeNames: Record<string, string> = {
      rect: '矩形',
      circle: '圆形',
      text: '文本'
    };
    return typeNames[element.type] || '元素';
  };
  
  // 获取元素图标
  const getElementIcon = (type: string) => {
    if (type === 'rect') return <Square size={14} strokeWidth={2.5} />;
    if (type === 'circle') return <Circle size={14} strokeWidth={2.5} />;
    if (type === 'text') return <Type size={14} strokeWidth={2.5} />;
    return <Square size={14} strokeWidth={2.5} />;
  };
  
  // 上移一层
  const moveUp = (element: CustomElement) => {
    const currentIndex = element.zIndex;
    const elementsAbove = customElements.filter(el => el.zIndex > currentIndex);
    if (elementsAbove.length === 0) return;
    
    const minAboveIndex = Math.min(...elementsAbove.map(el => el.zIndex));
    const elementToSwap = customElements.find(el => el.zIndex === minAboveIndex);
    
    if (elementToSwap) {
      updateCustomElement(element.id, { zIndex: minAboveIndex });
      updateCustomElement(elementToSwap.id, { zIndex: currentIndex });
    }
  };
  
  // 下移一层
  const moveDown = (element: CustomElement) => {
    const currentIndex = element.zIndex;
    const elementsBelow = customElements.filter(el => el.zIndex < currentIndex);
    if (elementsBelow.length === 0) return;
    
    const maxBelowIndex = Math.max(...elementsBelow.map(el => el.zIndex));
    const elementToSwap = customElements.find(el => el.zIndex === maxBelowIndex);
    
    if (elementToSwap) {
      updateCustomElement(element.id, { zIndex: maxBelowIndex });
      updateCustomElement(elementToSwap.id, { zIndex: currentIndex });
    }
  };
  
  // 置顶
  const bringToFront = (element: CustomElement) => {
    const maxZ = Math.max(...customElements.map(el => el.zIndex));
    if (element.zIndex < maxZ) {
      updateCustomElement(element.id, { zIndex: maxZ + 1 });
    }
  };
  
  // 置底
  const sendToBack = (element: CustomElement) => {
    const minZ = Math.min(...customElements.map(el => el.zIndex));
    if (element.zIndex > minZ) {
      updateCustomElement(element.id, { zIndex: minZ - 1 });
    }
  };
  
  if (customElements.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <Layers size={24} strokeWidth={2.5} />
        </div>
        <p className="empty-state-title">暂无图层</p>
        <p className="empty-state-desc">添加元素开始创作</p>
      </div>
    );
  }
  
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      {/* 头部 */}
      <div className="flex items-center justify-between py-3 px-4 border-b-2 border-border shrink-0">
        <span className="text-xs font-bold uppercase tracking-wide text-text/60">图层列表</span>
        <span className="badge badge-secondary text-xs">
          {customElements.length}
        </span>
      </div>
      
      {/* 图层列表 */}
      <div className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-1">
        {sortedElements.map((element, visualIndex) => {
          const isSelected = element.id === selectedId;
          const isTop = visualIndex === 0;
          const isBottom = visualIndex === sortedElements.length - 1;
          
          return (
            <div
              key={element.id}
              onClick={() => selectElement(element.id)}
              className={`
                group flex items-center gap-2 py-2 px-2 rounded-lg
                cursor-pointer border-2 transition-all
                ${isSelected 
                  ? 'border-border bg-main/20 shadow-brutal-sm' 
                  : 'border-transparent hover:border-border/50 hover:bg-bg'
                }
              `}
            >
              {/* 图标 */}
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                border-2 transition-all
                ${isSelected 
                  ? 'bg-text text-bw border-text' 
                  : 'bg-bg text-text/60 border-border/50'
                }
              `}>
                {getElementIcon(element.type)}
              </div>
              
              {/* 名称 */}
              <div className="flex-1 min-w-0">
                <div className={`text-sm truncate font-semibold ${isSelected ? 'text-text' : 'text-text/70'}`}>
                  {getElementName(element)}
                </div>
              </div>
              
              {/* 操作按钮 */}
              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => { e.stopPropagation(); moveUp(element); }}
                  disabled={isTop}
                  className={`tool-btn ${isTop ? 'opacity-30 cursor-not-allowed' : ''}`}
                  style={{ width: '28px', height: '28px' }}
                  title="上移"
                >
                  <ChevronUp size={14} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); moveDown(element); }}
                  disabled={isBottom}
                  className={`tool-btn ${isBottom ? 'opacity-30 cursor-not-allowed' : ''}`}
                  style={{ width: '28px', height: '28px' }}
                  title="下移"
                >
                  <ChevronDown size={14} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    removeCustomElement(element.id);
                    selectElement(null);
                  }}
                  className="tool-btn danger"
                  style={{ width: '28px', height: '28px' }}
                  title="删除"
                >
                  <Trash2 size={14} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 快捷操作 */}
      {selectedId && (
        <div className="p-3 border-t-2 border-border shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                const element = customElements.find(el => el.id === selectedId);
                if (element) bringToFront(element);
              }}
              className="btn btn-secondary btn-sm"
            >
              <ArrowUpToLine size={14} strokeWidth={2.5} />
              <span>置顶</span>
            </button>
            <button
              onClick={() => {
                const element = customElements.find(el => el.id === selectedId);
                if (element) sendToBack(element);
              }}
              className="btn btn-secondary btn-sm"
            >
              <ArrowDownToLine size={14} strokeWidth={2.5} />
              <span>置底</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
