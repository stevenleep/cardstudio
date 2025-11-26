/**
 * 预设面板 - Neo-Brutalism 风格
 * 展示可添加的元素预设，支持拖拽添加
 */
import React from 'react';
import { Square, Circle, Type, AlignLeft, Minus, Image, Tag, Hexagon, Sparkles, Plus } from 'lucide-react';
import { useCardStore } from '../../store/cardStore';
import { ELEMENT_PRESETS, PRESETS_BY_CATEGORY, CATEGORY_LABELS, type PresetCategory } from '../../utils/elementPresets';

// 图标配置
const ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  'rect': Square,
  'circle': Circle,
  'line': Minus,
  'image': Image,
  'title': Type,
  'body': AlignLeft,
  'tag': Tag,
  'color-block': Square,
  'gradient-block': Hexagon,
  'ring': Circle,
  'card': Square,
  'label-box': Tag,
  'capsule': Sparkles,
};

export const PresetsPanel: React.FC = () => {
  const { width, height, addCustomElement, customElements } = useCardStore();
  
  const handleAdd = (presetId: string) => {
    const preset = ELEMENT_PRESETS.find(p => p.id === presetId);
    if (!preset) return;
    const maxZ = customElements.length > 0 ? Math.max(...customElements.map(el => el.zIndex)) : 0;
    const element = preset.create(width / 2 - 150, height / 2 - 100, width, height);
    element.zIndex = maxZ + 1;
    addCustomElement(element);
  };
  
  const handleDragStart = (e: React.DragEvent, presetId: string) => {
    e.dataTransfer.setData('presetId', presetId);
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  const categories: PresetCategory[] = ['shape', 'text', 'decoration', 'card'];
  
  return (
    <div className="p-4 space-y-4">
      {categories.map((category) => {
        const presets = PRESETS_BY_CATEGORY[category];
        if (presets.length === 0) return null;
        
        return (
          <div key={category} className="space-y-2">
            <div className="text-xs font-black text-text/50 uppercase tracking-wider">
              {CATEGORY_LABELS[category]}
            </div>
            <div className="space-y-1.5">
              {presets.map(preset => {
                const Icon = ICONS[preset.id] || Square;
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleAdd(preset.id)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, preset.id)}
                    className="
                      w-full flex items-center gap-3 p-2.5
                      bg-bw border-2 border-border rounded-base
                      shadow-brutal-sm
                      hover:bg-main hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal
                      active:translate-x-0 active:translate-y-0 active:shadow-none
                      transition-all duration-75 cursor-pointer group
                    "
                  >
                    <div className="
                      w-8 h-8 flex items-center justify-center
                      bg-bg border-2 border-border rounded-base
                      group-hover:bg-bw
                    ">
                      <Icon size={16} strokeWidth={2.5} />
                    </div>
                    <span className="flex-1 text-left text-sm font-bold">
                      {preset.name}
                    </span>
                    <Plus size={14} strokeWidth={3} className="text-text/30 group-hover:text-text" />
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
      
      {/* 底部提示 */}
      <div className="pt-3 mt-4 border-t-2 border-border">
        <p className="text-[10px] font-bold text-text/40 text-center uppercase tracking-widest">
          Click to add · Drag to canvas
        </p>
      </div>
    </div>
  );
};
