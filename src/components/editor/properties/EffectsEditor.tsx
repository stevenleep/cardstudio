import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronRight, Eye, EyeOff, Copy } from 'lucide-react';
import { CollapsibleSection, PropertySlider, SegmentControl, SubLabel, PresetButton, SwitchRow, Switch } from './CollapsibleSection';
import type { CustomElement, ShadowStyle, BlurEffect, BlendMode } from '../../../types';

interface EffectsEditorProps {
  element: CustomElement;
  onUpdate: (updates: Partial<CustomElement>) => void;
}

const defaultShadow: ShadowStyle = {
  enabled: true,
  color: 'rgba(0,0,0,0.15)',
  blur: 10,
  offsetX: 0,
  offsetY: 4,
  spread: 0,
  inset: false,
};

const defaultBlur: BlurEffect = {
  enabled: false,
  type: 'gaussian',
  radius: 10,
};

const BLEND_MODE_OPTIONS: { value: BlendMode; label: string }[] = [
  { value: 'normal', label: '正常' },
  { value: 'multiply', label: '正片叠底' },
  { value: 'screen', label: '滤色' },
  { value: 'overlay', label: '叠加' },
  { value: 'darken', label: '变暗' },
  { value: 'lighten', label: '变亮' },
  { value: 'soft-light', label: '柔光' },
  { value: 'difference', label: '差值' },
];

const SHADOW_PRESETS = [
  { name: '无', shadow: null },
  { name: '小', shadow: { ...defaultShadow, blur: 4, offsetY: 2, color: 'rgba(0,0,0,0.1)' } },
  { name: '中', shadow: { ...defaultShadow, blur: 10, offsetY: 4, color: 'rgba(0,0,0,0.15)' } },
  { name: '大', shadow: { ...defaultShadow, blur: 20, offsetY: 8, color: 'rgba(0,0,0,0.2)' } },
];

export const EffectsEditor: React.FC<EffectsEditorProps> = ({
  element,
  onUpdate,
}) => {
  const shadows = element.shadows || (element.shadow ? [element.shadow] : []);
  const blur = element.blur || { ...defaultBlur };
  const blendMode = element.blendMode || 'normal';

  const handleShadowsUpdate = (newShadows: ShadowStyle[]) => {
    onUpdate({
      shadows: newShadows,
      shadow: newShadows.length > 0 ? newShadows[0] : undefined,
    });
  };

  const addShadow = () => {
    handleShadowsUpdate([...shadows, { ...defaultShadow }]);
  };

  const updateShadow = (index: number, updates: Partial<ShadowStyle>) => {
    const newShadows = [...shadows];
    newShadows[index] = { ...newShadows[index], ...updates };
    handleShadowsUpdate(newShadows);
  };

  const removeShadow = (index: number) => {
    handleShadowsUpdate(shadows.filter((_, i) => i !== index));
  };

  const duplicateShadow = (index: number) => {
    const newShadows = [...shadows];
    newShadows.splice(index + 1, 0, { ...shadows[index] });
    handleShadowsUpdate(newShadows);
  };

  const handleBlurUpdate = (updates: Partial<BlurEffect>) => {
    onUpdate({ blur: { ...blur, ...updates } });
  };

  const applyPreset = (preset: typeof SHADOW_PRESETS[0]) => {
    if (preset.shadow) {
      handleShadowsUpdate([{ ...preset.shadow, enabled: true }]);
    } else {
      handleShadowsUpdate([]);
    }
  };

  return (
    <CollapsibleSection
      title="效果"
      defaultOpen={shadows.length > 0 || blur.enabled}
    >
      {/* 混合模式 */}
      <div>
        <SubLabel>混合模式</SubLabel>
        <select
          value={blendMode}
          onChange={(e) => onUpdate({ blendMode: e.target.value as BlendMode })}
          className="input cursor-pointer"
        >
          {BLEND_MODE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* 阴影 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-text/50">阴影</span>
          <button
            onClick={addShadow}
            className="p-1.5 rounded-lg text-text/40 hover:text-text/60 hover:bg-bg transition-colors"
            title="添加阴影"
          >
            <Plus size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* 阴影预设 */}
        <div className="flex gap-1.5 mb-3">
          {SHADOW_PRESETS.map((preset, idx) => (
            <PresetButton
              key={idx}
              onClick={() => applyPreset(preset)}
            >
              {preset.name}
            </PresetButton>
          ))}
        </div>

        {/* 阴影列表 */}
        {shadows.length === 0 ? (
          <div className="py-4 text-center text-[11px] font-bold text-text/40">
            无阴影
          </div>
        ) : (
          <div className="space-y-2">
            {shadows.map((shadow, index) => (
              <ShadowItem
                key={index}
                shadow={shadow}
                index={index}
                onUpdate={(updates) => updateShadow(index, updates)}
                onRemove={() => removeShadow(index)}
                onDuplicate={() => duplicateShadow(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 模糊效果 */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-text/50">模糊</span>
          <Switch
            checked={blur.enabled}
            onChange={(checked) => handleBlurUpdate({ enabled: checked })}
          />
        </div>

        {blur.enabled && (
          <div className="space-y-4">
            <SegmentControl
              options={[
                { value: 'gaussian', label: '高斯模糊' },
                { value: 'background', label: '背景模糊' },
              ]}
              value={blur.type}
              onChange={(type) => handleBlurUpdate({ type })}
            />

            <PropertySlider
              label="半径"
              value={blur.radius}
              onChange={(radius) => handleBlurUpdate({ radius })}
              min={0}
              max={50}
              step={1}
              unit="px"
            />
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};

// 单个阴影项
interface ShadowItemProps {
  shadow: ShadowStyle;
  index: number;
  onUpdate: (updates: Partial<ShadowStyle>) => void;
  onRemove: () => void;
  onDuplicate: () => void;
}

const ShadowItem: React.FC<ShadowItemProps> = ({
  shadow,
  index,
  onUpdate,
  onRemove,
  onDuplicate,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`rounded-lg p-3 border-2 transition-all ${shadow.enabled ? 'bg-bg border-border/50' : 'bg-bg/50 border-border/30 opacity-60'}`}>
      {/* 头部 */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-left"
        >
          <span className="text-text/40">
            {isExpanded ? <ChevronDown size={14} strokeWidth={2.5} /> : <ChevronRight size={14} strokeWidth={2.5} />}
          </span>
          <span className="text-[11px] font-bold text-text/50">
            {shadow.inset ? '内阴影' : '投影'} {index + 1}
          </span>
        </button>
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => onUpdate({ enabled: !shadow.enabled })}
            className="p-1.5 rounded-lg hover:bg-bw transition-colors"
            title={shadow.enabled ? '隐藏' : '显示'}
          >
            {shadow.enabled ? (
              <Eye size={12} strokeWidth={2.5} className="text-text/50" />
            ) : (
              <EyeOff size={12} strokeWidth={2.5} className="text-text/40" />
            )}
          </button>
          <button
            onClick={onDuplicate}
            className="p-1.5 rounded-lg hover:bg-bw transition-colors"
            title="复制"
          >
            <Copy size={12} strokeWidth={2.5} className="text-text/50" />
          </button>
          <button
            onClick={onRemove}
            className="p-1.5 rounded-lg hover:bg-danger/20 transition-colors"
            title="删除"
          >
            <Trash2 size={12} strokeWidth={2.5} className="text-danger" />
          </button>
        </div>
      </div>

      {/* 展开内容 */}
      {isExpanded && (
        <div className="mt-3 space-y-4">
          {/* 类型切换 */}
          <SegmentControl
            options={[
              { value: false, label: '外阴影' },
              { value: true, label: '内阴影' },
            ]}
            value={shadow.inset || false}
            onChange={(inset) => onUpdate({ inset })}
          />

          {/* 颜色 */}
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={shadow.color.startsWith('rgba') ? '#000000' : shadow.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="w-9 h-9 rounded-lg cursor-pointer border-2 border-border"
              style={{ padding: 0 }}
            />
            <input
              type="text"
              value={shadow.color}
              onChange={(e) => onUpdate({ color: e.target.value })}
              className="input input-mono flex-1 text-sm"
              placeholder="rgba(0,0,0,0.15)"
              style={{ height: '36px' }}
            />
          </div>

          {/* 参数网格 */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'X', value: shadow.offsetX, key: 'offsetX' },
              { label: 'Y', value: shadow.offsetY, key: 'offsetY' },
              { label: '模糊', value: shadow.blur, key: 'blur' },
              { label: '扩展', value: shadow.spread ?? 0, key: 'spread' },
            ].map(({ label, value, key }) => (
              <div key={key}>
                <label className="text-[10px] font-bold text-text/40 mb-1 block uppercase">{label}</label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => onUpdate({ [key]: Number(e.target.value) })}
                  className="input input-mono text-center w-full text-sm font-bold"
                  style={{ padding: '8px 4px', height: '36px' }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
