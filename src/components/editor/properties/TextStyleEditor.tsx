import React from 'react';
import { GradientPicker } from '../../ui';
import { 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  AlignVerticalJustifyStart,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  Bold,
  Italic,
  Underline,
  Strikethrough,
} from 'lucide-react';
import { 
  CollapsibleSection, 
  PropertySlider, 
  PropertyInput, 
  ColorInput, 
  ButtonGroupSelector,
  SubLabel,
  PresetButton,
  SwitchRow,
} from './CollapsibleSection';
import type { TextElement, ShadowStyle } from '../../../types';

interface TextStyleEditorProps {
  element: TextElement;
  onUpdate: (updates: Partial<TextElement>) => void;
}

const FONT_OPTIONS: { value: string; label: string; category: string }[] = [
  { value: 'system-ui, -apple-system, sans-serif', label: '系统默认', category: '系统' },
  { value: '"PingFang SC", "Microsoft YaHei", sans-serif', label: '苹方/微软雅黑', category: '系统' },
  { value: '"Noto Sans SC", sans-serif', label: 'Noto Sans', category: '无衬线' },
  { value: '"Source Han Sans SC", sans-serif', label: '思源黑体', category: '无衬线' },
  { value: 'Inter, sans-serif', label: 'Inter', category: '无衬线' },
  { value: '"Noto Serif SC", serif', label: 'Noto Serif', category: '衬线' },
  { value: '"Source Han Serif SC", serif', label: '思源宋体', category: '衬线' },
  { value: 'Georgia, serif', label: 'Georgia', category: '衬线' },
  { value: '"JetBrains Mono", monospace', label: 'JetBrains Mono', category: '等宽' },
  { value: '"Fira Code", monospace', label: 'Fira Code', category: '等宽' },
  { value: '"ZCOOL KuaiLe", cursive', label: '站酷快乐体', category: '艺术' },
  { value: 'Impact, sans-serif', label: 'Impact', category: '艺术' },
];

const WEIGHT_OPTIONS = [
  { value: '300', label: '细体' },
  { value: '400', label: '常规' },
  { value: '500', label: '中等' },
  { value: '600', label: '半粗' },
  { value: '700', label: '粗体' },
  { value: '900', label: '黑体' },
];

const FONT_SIZE_PRESETS = [14, 18, 24, 32, 48, 64, 96];

const WRAP_OPTIONS = [
  { value: 'word' as const, label: '单词' },
  { value: 'char' as const, label: '字符' },
  { value: 'none' as const, label: '不换行' },
];

export const TextStyleEditor: React.FC<TextStyleEditorProps> = ({
  element,
  onUpdate,
}) => {
  const defaultShadow: ShadowStyle = {
    enabled: false,
    color: 'rgba(0,0,0,0.3)',
    blur: 4,
    offsetX: 2,
    offsetY: 2,
  };

  const shadow = element.shadow || defaultShadow;

  const handleShadowUpdate = (updates: Partial<ShadowStyle>) => {
    onUpdate({ shadow: { ...shadow, ...updates } });
  };

  const groupedFonts = FONT_OPTIONS.reduce((acc, font) => {
    if (!acc[font.category]) acc[font.category] = [];
    acc[font.category].push(font);
    return acc;
  }, {} as Record<string, typeof FONT_OPTIONS>);

  return (
    <div className="space-y-5">
      {/* 文字内容 */}
      <CollapsibleSection title="内容">
        <textarea
          value={element.text}
          onChange={(e) => onUpdate({ text: e.target.value })}
          className="input resize-none min-h-[80px] py-3 leading-relaxed"
          placeholder="输入文字内容..."
          rows={3}
        />
      </CollapsibleSection>

      {/* 字体设置 */}
      <CollapsibleSection title="字体">
        {/* 字体选择 */}
        <div>
          <SubLabel>字体</SubLabel>
          <select
            value={element.fontFamily}
            onChange={(e) => onUpdate({ fontFamily: e.target.value })}
            className="input cursor-pointer"
          >
            {Object.entries(groupedFonts).map(([category, fonts]) => (
              <optgroup key={category} label={category}>
                {fonts.map((font) => (
                  <option key={font.value} value={font.value}>
                    {font.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* 字号 */}
        <div>
          <PropertySlider
            label="字号"
            value={element.fontSize}
            onChange={(fontSize) => onUpdate({ fontSize })}
            min={12}
            max={200}
            step={1}
            unit="px"
          />
          <div className="flex gap-1.5 mt-3">
            {FONT_SIZE_PRESETS.map((size) => (
              <PresetButton
                key={size}
                active={element.fontSize === size}
                onClick={() => onUpdate({ fontSize: size })}
              >
                {size}
              </PresetButton>
            ))}
          </div>
        </div>

        {/* 字重 */}
        <div>
          <SubLabel>字重</SubLabel>
          <select
            value={element.fontWeight}
            onChange={(e) => onUpdate({ fontWeight: e.target.value })}
            className="input cursor-pointer"
          >
            {WEIGHT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* 样式快捷按钮 */}
        <div>
          <SubLabel>样式</SubLabel>
          <div className="flex gap-1.5">
            <StyleButton
              active={element.fontWeight === '700'}
              onClick={() => onUpdate({ fontWeight: element.fontWeight === '700' ? '400' : '700' })}
              icon={<Bold size={14} strokeWidth={2.5} />}
              title="粗体"
            />
            <StyleButton
              active={element.fontStyle === 'italic'}
              onClick={() => onUpdate({ fontStyle: element.fontStyle === 'italic' ? 'normal' : 'italic' })}
              icon={<Italic size={14} strokeWidth={2.5} />}
              title="斜体"
            />
            <StyleButton
              active={element.textDecoration === 'underline'}
              onClick={() => onUpdate({ textDecoration: element.textDecoration === 'underline' ? 'none' : 'underline' })}
              icon={<Underline size={14} strokeWidth={2.5} />}
              title="下划线"
            />
            <StyleButton
              active={element.textDecoration === 'line-through'}
              onClick={() => onUpdate({ textDecoration: element.textDecoration === 'line-through' ? 'none' : 'line-through' })}
              icon={<Strikethrough size={14} strokeWidth={2.5} />}
              title="删除线"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* 颜色 */}
      <CollapsibleSection title="颜色">
        <GradientPicker
          value={element.fill}
          onChange={(fill) => onUpdate({ fill })}
        />

        <ColorInput
          label="描边"
          value={element.stroke || ''}
          onChange={(stroke) => onUpdate({ stroke })}
          allowEmpty
          placeholder="无"
        />

        {element.stroke && (
          <PropertySlider
            label="描边宽度"
            value={element.strokeWidth || 0}
            onChange={(strokeWidth) => onUpdate({ strokeWidth })}
            min={0}
            max={10}
            step={0.5}
            unit="px"
          />
        )}
      </CollapsibleSection>

      {/* 对齐 */}
      <CollapsibleSection title="对齐">
        <div>
          <SubLabel>水平</SubLabel>
          <div className="flex border-2 border-border rounded-lg overflow-hidden">
            {[
              { value: 'left', icon: <AlignLeft size={14} strokeWidth={2.5} /> },
              { value: 'center', icon: <AlignCenter size={14} strokeWidth={2.5} /> },
              { value: 'right', icon: <AlignRight size={14} strokeWidth={2.5} /> },
            ].map(({ value, icon }, index) => (
              <button
                key={value}
                onClick={() => onUpdate({ align: value as 'left' | 'center' | 'right' })}
                className={`
                  flex-1 flex items-center justify-center py-2 transition-colors
                  ${index > 0 ? 'border-l-2 border-border' : ''}
                  ${element.align === value
                    ? 'bg-main text-text'
                    : 'bg-bw text-text/50 hover:bg-bg hover:text-text/70'
                  }
                `}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <SubLabel>垂直</SubLabel>
          <div className="flex border-2 border-border rounded-lg overflow-hidden">
            {[
              { value: 'top', icon: <AlignVerticalJustifyStart size={14} strokeWidth={2.5} /> },
              { value: 'middle', icon: <AlignVerticalJustifyCenter size={14} strokeWidth={2.5} /> },
              { value: 'bottom', icon: <AlignVerticalJustifyEnd size={14} strokeWidth={2.5} /> },
            ].map(({ value, icon }, index) => (
              <button
                key={value}
                onClick={() => onUpdate({ verticalAlign: value as 'top' | 'middle' | 'bottom' })}
                className={`
                  flex-1 flex items-center justify-center py-2 transition-colors
                  ${index > 0 ? 'border-l-2 border-border' : ''}
                  ${(element.verticalAlign || 'top') === value
                    ? 'bg-main text-text'
                    : 'bg-bw text-text/50 hover:bg-bg hover:text-text/70'
                  }
                `}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </CollapsibleSection>

      {/* 间距 */}
      <CollapsibleSection title="间距" defaultOpen={false}>
        <PropertySlider
          label="字间距"
          value={element.letterSpacing || 0}
          onChange={(letterSpacing) => onUpdate({ letterSpacing })}
          min={-5}
          max={30}
          step={0.5}
          unit="px"
        />
        <PropertySlider
          label="行高"
          value={element.lineHeight}
          onChange={(lineHeight) => onUpdate({ lineHeight })}
          min={0.8}
          max={3}
          step={0.1}
        />
      </CollapsibleSection>

      {/* 布局 */}
      <CollapsibleSection title="布局" defaultOpen={false}>
        <ButtonGroupSelector
          label="换行"
          options={WRAP_OPTIONS}
          value={element.wrap || 'word'}
          onChange={(wrap) => onUpdate({ wrap })}
        />

        <SwitchRow
          label="超出显示省略号"
          checked={element.ellipsis || false}
          onChange={(checked) => onUpdate({ ellipsis: checked })}
        />

        <PropertySlider
          label="内边距"
          value={element.padding || 0}
          onChange={(padding) => onUpdate({ padding })}
          min={0}
          max={50}
          step={1}
          unit="px"
        />
      </CollapsibleSection>

      {/* 阴影 */}
      <CollapsibleSection title="阴影" defaultOpen={false}>
        <SwitchRow
          label="启用阴影"
          checked={shadow.enabled}
          onChange={(checked) => handleShadowUpdate({ enabled: checked })}
        />

        {shadow.enabled && (
          <>
            <ColorInput
              label="颜色"
              value={shadow.color}
              onChange={(color) => handleShadowUpdate({ color })}
            />
            <PropertySlider
              label="模糊"
              value={shadow.blur}
              onChange={(blur) => handleShadowUpdate({ blur })}
              min={0}
              max={30}
              step={1}
              unit="px"
            />
            <div className="grid grid-cols-2 gap-3">
              <PropertyInput
                label="X偏移"
                value={shadow.offsetX}
                onChange={(offsetX) => handleShadowUpdate({ offsetX })}
                size="full"
              />
              <PropertyInput
                label="Y偏移"
                value={shadow.offsetY}
                onChange={(offsetY) => handleShadowUpdate({ offsetY })}
                size="full"
              />
            </div>
          </>
        )}
      </CollapsibleSection>
    </div>
  );
};

// 样式按钮组件 - 统一风格
const StyleButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
}> = ({ active, onClick, icon, title }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 flex items-center justify-center py-2 rounded-lg border-2 transition-all
      ${active
        ? 'bg-main border-border text-text'
        : 'bg-bw border-border/50 text-text/50 hover:border-border hover:text-text/70'
      }
    `}
    title={title}
  >
    {icon}
  </button>
);
