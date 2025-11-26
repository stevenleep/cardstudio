/**
 * 画笔设置面板 - Neo-Brutalism 风格
 * 
 * 在画笔工具激活时显示，提供全面的画笔配置选项
 */
import React from 'react';
import { useUIStore, type BrushSettings, type BrushTip, type LineCap, type LineJoin, type BrushBlendMode } from '../../store/uiStore';
import { 
  Pencil, Circle, Square, Minus, 
  Droplets, Wind, Sparkles, RotateCw,
  Target, Layers
} from 'lucide-react';

// === 选项配置 ===

const BRUSH_TIPS: { value: BrushTip; label: string; icon: React.ReactNode }[] = [
  { value: 'round', label: '圆形', icon: <Circle size={14} /> },
  { value: 'square', label: '方形', icon: <Square size={14} /> },
  { value: 'flat', label: '扁平', icon: <Minus size={14} /> },
];

const LINE_CAPS: { value: LineCap; label: string }[] = [
  { value: 'round', label: '圆' },
  { value: 'butt', label: '平' },
  { value: 'square', label: '方' },
];

const LINE_JOINS: { value: LineJoin; label: string }[] = [
  { value: 'round', label: '圆' },
  { value: 'miter', label: '尖' },
  { value: 'bevel', label: '斜' },
];

const BLEND_MODES: { value: BrushBlendMode; label: string }[] = [
  { value: 'source-over', label: '正常' },
  { value: 'multiply', label: '正片叠底' },
  { value: 'screen', label: '滤色' },
  { value: 'overlay', label: '叠加' },
  { value: 'darken', label: '变暗' },
  { value: 'lighten', label: '变亮' },
  { value: 'color-dodge', label: '颜色减淡' },
  { value: 'color-burn', label: '颜色加深' },
  { value: 'hard-light', label: '强光' },
  { value: 'soft-light', label: '柔光' },
  { value: 'difference', label: '差值' },
  { value: 'exclusion', label: '排除' },
];

// 预设颜色 - Neo 风格
const PRESET_COLORS = [
  '#000000', '#FFFFFF', '#FFE566', '#FF90E8', 
  '#90D5FF', '#A7F3D0', '#FFAB5C', '#C4B5FD',
  '#FCA5A5', '#6B7280', '#EF4444', '#3B82F6',
];

// === 组件 ===

/**
 * 画笔设置内容（纯内容，无头部，用于嵌入其他面板）
 */
export const BrushSettingsContent: React.FC = () => {
  const { brushSettings, setBrushSettings } = useUIStore();

  const updateSetting = <K extends keyof BrushSettings>(
    key: K, 
    value: BrushSettings[K]
  ) => {
    setBrushSettings({ [key]: value });
  };

  return (
    <div className="px-5 pt-5 pb-8 space-y-6">
        
        {/* === 颜色 === */}
        <Section title="颜色" icon={<Droplets size={14} />}>
          {/* 当前颜色 + 颜色选择器 */}
          <div className="flex items-center gap-3 mb-3">
            <div 
              className="w-12 h-12 rounded-lg border-3 border-border shadow-brutal-sm"
              style={{ backgroundColor: brushSettings.color }}
            />
            <input
              type="color"
              value={brushSettings.color}
              onChange={(e) => updateSetting('color', e.target.value)}
              className="w-full h-10 rounded-lg border-2 border-border cursor-pointer"
            />
          </div>
          
          {/* 预设颜色 */}
          <div className="grid grid-cols-6 gap-2">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => updateSetting('color', color)}
                className={`
                  w-8 h-8 rounded-md border-2 transition-all
                  ${brushSettings.color === color 
                    ? 'border-text shadow-brutal-sm scale-110' 
                    : 'border-border hover:scale-105'
                  }
                `}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </Section>

        {/* === 基础设置 === */}
        <Section title="基础" icon={<Target size={14} />}>
          <Slider
            label="大小"
            value={brushSettings.size}
            onChange={(v) => updateSetting('size', v)}
            min={1}
            max={200}
            step={1}
            unit="px"
          />
          
          <Slider
            label="不透明度"
            value={brushSettings.opacity}
            onChange={(v) => updateSetting('opacity', v)}
            min={0}
            max={1}
            step={0.01}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          
          <Slider
            label="流量"
            value={brushSettings.flow}
            onChange={(v) => updateSetting('flow', v)}
            min={0}
            max={1}
            step={0.01}
            format={(v) => `${Math.round(v * 100)}%`}
          />
        </Section>

        {/* === 笔触设置 === */}
        <Section title="笔触" icon={<Wind size={14} />}>
          <Slider
            label="平滑度"
            value={brushSettings.smoothing}
            onChange={(v) => updateSetting('smoothing', v)}
            min={0}
            max={1}
            step={0.1}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          
          <Slider
            label="硬度"
            value={brushSettings.hardness}
            onChange={(v) => updateSetting('hardness', v)}
            min={0}
            max={1}
            step={0.1}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          
          <Slider
            label="间距"
            value={brushSettings.spacing}
            onChange={(v) => updateSetting('spacing', v)}
            min={0.1}
            max={5}
            step={0.1}
            format={(v) => `${Math.round(v * 100)}%`}
          />
        </Section>

        {/* === 笔尖形状 === */}
        <Section title="笔尖" icon={<Circle size={14} />}>
          <SegmentSelector
            options={BRUSH_TIPS}
            value={brushSettings.tip}
            onChange={(v) => updateSetting('tip', v)}
          />
          
          <div className="grid grid-cols-2 gap-3 mt-3">
            <ButtonGroup
              label="线端"
              options={LINE_CAPS}
              value={brushSettings.lineCap}
              onChange={(v) => updateSetting('lineCap', v)}
            />
            <ButtonGroup
              label="拐角"
              options={LINE_JOINS}
              value={brushSettings.lineJoin}
              onChange={(v) => updateSetting('lineJoin', v)}
            />
          </div>
        </Section>

        {/* === 形状动态 === */}
        <Section title="形状" icon={<RotateCw size={14} />}>
          <Slider
            label="角度"
            value={brushSettings.angle}
            onChange={(v) => updateSetting('angle', v)}
            min={0}
            max={360}
            step={1}
            unit="°"
          />
          
          <Slider
            label="圆度"
            value={brushSettings.roundness}
            onChange={(v) => updateSetting('roundness', v)}
            min={0.1}
            max={1}
            step={0.1}
            format={(v) => `${Math.round(v * 100)}%`}
          />
          
          <Slider
            label="抖动"
            value={brushSettings.jitter}
            onChange={(v) => updateSetting('jitter', v)}
            min={0}
            max={1}
            step={0.1}
            format={(v) => `${Math.round(v * 100)}%`}
          />
        </Section>

        {/* === 高级设置 === */}
        <Section title="混合" icon={<Layers size={14} />}>
          <SelectField
            label="混合模式"
            options={BLEND_MODES}
            value={brushSettings.blendMode}
            onChange={(v) => updateSetting('blendMode', v)}
          />
          
          {/* 压力感应开关 */}
          <div className="flex items-center justify-between mt-3">
            <span className="text-xs font-bold text-text/70">压力感应</span>
            <ToggleSwitch
              checked={brushSettings.pressureEnabled}
              onChange={(v) => updateSetting('pressureEnabled', v)}
            />
          </div>
          
          {brushSettings.pressureEnabled && (
            <Slider
              label="最小宽度"
              value={brushSettings.minWidthRatio}
              onChange={(v) => updateSetting('minWidthRatio', v)}
              min={0}
              max={1}
              step={0.1}
              format={(v) => `${Math.round(v * 100)}%`}
            />
          )}
        </Section>

        {/* === 预设 === */}
        <Section title="快捷预设" icon={<Sparkles size={14} />}>
          <div className="grid grid-cols-2 gap-2">
            <PresetButton
              label="钢笔"
              onClick={() => setBrushSettings({
                size: 3,
                smoothing: 0.8,
                hardness: 1,
                flow: 1,
                opacity: 1,
                tip: 'round',
                lineCap: 'round',
              })}
            />
            <PresetButton
              label="马克笔"
              onClick={() => setBrushSettings({
                size: 20,
                smoothing: 0.3,
                hardness: 0.8,
                flow: 0.8,
                opacity: 0.7,
                tip: 'flat',
                lineCap: 'square',
              })}
            />
            <PresetButton
              label="水彩"
              onClick={() => setBrushSettings({
                size: 30,
                smoothing: 0.6,
                hardness: 0.3,
                flow: 0.5,
                opacity: 0.4,
                tip: 'round',
                lineCap: 'round',
              })}
            />
            <PresetButton
              label="蜡笔"
              onClick={() => setBrushSettings({
                size: 15,
                smoothing: 0.2,
                hardness: 0.5,
                flow: 1,
                opacity: 0.9,
                jitter: 0.3,
                tip: 'round',
                lineCap: 'round',
              })}
            />
            <PresetButton
              label="喷枪"
              onClick={() => setBrushSettings({
                size: 50,
                smoothing: 0.5,
                hardness: 0,
                flow: 0.3,
                opacity: 0.2,
                tip: 'round',
                lineCap: 'round',
              })}
            />
            <PresetButton
              label="铅笔"
              onClick={() => setBrushSettings({
                size: 2,
                smoothing: 0,
                hardness: 1,
                flow: 1,
                opacity: 0.8,
                jitter: 0.1,
                tip: 'round',
                lineCap: 'round',
              })}
            />
          </div>
        </Section>
      </div>
  );
};

/**
 * 完整的画笔设置面板（带头部）
 */
export const BrushSettingsPanel: React.FC = () => {
  return (
    <div className="h-full">
      {/* 头部 */}
      <div className="px-5 py-4 border-b-2 border-border bg-bg/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-border shadow-brutal-sm bg-main text-text">
            <Pencil size={20} strokeWidth={2.5} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text">画笔设置</h3>
            <p className="text-[10px] text-text/40">自定义画笔属性</p>
          </div>
        </div>
      </div>

      {/* 滚动内容区域 */}
      <div className="flex-1 overflow-y-auto">
        <BrushSettingsContent />
      </div>
    </div>
  );
};

// === 子组件 ===

const Section: React.FC<{
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, icon, children }) => (
  <div className="space-y-3">
    <div className="flex items-center gap-2">
      {icon && <span className="text-text/50">{icon}</span>}
      <h4 className="text-xs font-bold text-text/70 uppercase tracking-wide">{title}</h4>
    </div>
    <div className="space-y-3">
      {children}
    </div>
  </div>
);

const Slider: React.FC<{
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  format?: (value: number) => string;
}> = ({ label, value, onChange, min, max, step, unit, format }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold text-text/50">{label}</span>
      <span className="text-[11px] font-mono font-bold text-text/70">
        {format ? format(value) : `${value}${unit || ''}`}
      </span>
    </div>
    <input
      type="range"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      min={min}
      max={max}
      step={step}
      className="w-full h-2 bg-bg border-2 border-border rounded-full appearance-none cursor-pointer
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:w-4
        [&::-webkit-slider-thumb]:h-4
        [&::-webkit-slider-thumb]:bg-main
        [&::-webkit-slider-thumb]:border-2
        [&::-webkit-slider-thumb]:border-border
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:shadow-brutal-sm
        [&::-webkit-slider-thumb]:cursor-pointer
        [&::-webkit-slider-thumb]:transition-transform
        [&::-webkit-slider-thumb]:hover:scale-110
      "
    />
  </div>
);

const SegmentSelector = <T extends string>({ 
  options, 
  value, 
  onChange 
}: {
  options: { value: T; label: string; icon?: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
}) => (
  <div className="flex gap-1 p-1 bg-bg border-2 border-border rounded-lg">
    {options.map((opt) => (
      <button
        key={opt.value}
        onClick={() => onChange(opt.value)}
        className={`
          flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-md
          text-xs font-bold transition-all
          ${value === opt.value
            ? 'bg-main text-text border-2 border-border shadow-brutal-sm'
            : 'text-text/50 hover:text-text hover:bg-bg'
          }
        `}
      >
        {opt.icon}
        <span>{opt.label}</span>
      </button>
    ))}
  </div>
);

const ButtonGroup = <T extends string>({ 
  label, 
  options, 
  value, 
  onChange 
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) => (
  <div className="space-y-1.5">
    <span className="text-[11px] font-bold text-text/50">{label}</span>
    <div className="flex gap-0.5 p-0.5 bg-bg border-2 border-border rounded-lg">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`
            flex-1 px-2 py-1.5 rounded text-[10px] font-bold transition-all
            ${value === opt.value
              ? 'bg-main text-text'
              : 'text-text/50 hover:text-text'
            }
          `}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const SelectField = <T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) => (
  <div className="space-y-1.5">
    <span className="text-[11px] font-bold text-text/50">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full px-3 py-2 bg-bg border-2 border-border rounded-lg
        text-xs font-bold text-text cursor-pointer
        focus:outline-none focus:border-main
      "
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
}> = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`
      relative w-10 h-6 rounded-full border-2 border-border transition-all
      ${checked ? 'bg-main' : 'bg-bg'}
    `}
  >
    <div
      className={`
        absolute top-0.5 w-4 h-4 bg-text rounded-full transition-all
        ${checked ? 'left-[18px]' : 'left-0.5'}
      `}
    />
  </button>
);

const PresetButton: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick }) => (
  <button
    onClick={onClick}
    className="px-3 py-2 bg-bg border-2 border-border rounded-lg
      text-xs font-bold text-text hover:bg-main hover:shadow-brutal-sm
      transition-all active:translate-y-0.5
    "
  >
    {label}
  </button>
);

export default BrushSettingsPanel;

