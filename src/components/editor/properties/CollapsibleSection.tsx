/**
 * 可折叠区块组件 - Neo-Brutalism 风格
 */
import React from 'react';
import { Plus, Eye, EyeOff } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  showAddButton?: boolean;
  onAdd?: () => void;
  showVisibilityToggle?: boolean;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  actions?: React.ReactNode;
  className?: string;
  defaultOpen?: boolean; // 保留兼容性
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  showAddButton = false,
  onAdd,
  showVisibilityToggle = false,
  visible = true,
  onVisibilityChange,
  actions,
  className = '',
}) => {

  return (
    <div className={className}>
      {/* 标签行 */}
      <div className="flex items-center justify-between mb-3">
        <div className="label mb-0">{title}</div>
        <div className="flex items-center gap-1">
          {showVisibilityToggle && (
            <button
              onClick={() => onVisibilityChange?.(!visible)}
              className={`tool-btn ${visible ? '' : 'opacity-50'}`}
              style={{ width: '24px', height: '24px' }}
              title={visible ? '隐藏' : '显示'}
            >
              {visible 
                ? <Eye size={12} strokeWidth={2.5} /> 
                : <EyeOff size={12} strokeWidth={2.5} />
              }
            </button>
          )}
          {actions}
          {showAddButton && onAdd && (
            <button
              onClick={onAdd}
              className="tool-btn"
              style={{ width: '24px', height: '24px' }}
              title="添加"
            >
              <Plus size={12} strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* 内容区 */}
      <div className={`space-y-4 ${!visible && showVisibilityToggle ? 'opacity-40' : ''}`}>
        {children}
      </div>
    </div>
  );
};

/**
 * 子标签组件 - 统一样式
 */
interface SubLabelProps {
  children: React.ReactNode;
  className?: string;
}

export const SubLabel: React.FC<SubLabelProps> = ({ children, className = '' }) => (
  <div className={`text-[11px] font-bold text-text/50 mb-2 ${className}`}>{children}</div>
);

/**
 * 预设按钮组件 - 统一样式
 */
interface PresetButtonProps {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export const PresetButton: React.FC<PresetButtonProps> = ({ 
  active = false, 
  onClick, 
  children,
  className = '',
}) => (
  <button
    onClick={onClick}
    className={`
      flex-1 py-2 text-[11px] font-bold rounded-lg border-2 transition-all
      ${active 
        ? 'bg-main border-border text-text' 
        : 'bg-bw border-border/50 text-text/50 hover:border-border hover:text-text/70'
      }
      ${className}
    `}
  >
    {children}
  </button>
);

/**
 * 开关组件 - Neo-Brutalism 风格
 */
interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, disabled = false }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      className="sr-only peer"
    />
    <div className={`
      w-9 h-5 bg-bg border-2 border-border rounded-full peer 
      peer-checked:after:translate-x-full 
      after:content-[''] after:absolute after:top-[3px] after:left-[3px] 
      after:bg-bw after:border-2 after:border-border after:rounded-full 
      after:h-3.5 after:w-3.5 after:transition-all 
      peer-checked:bg-main
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `} />
  </label>
);

/**
 * 带标签的开关行组件
 */
interface SwitchRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const SwitchRow: React.FC<SwitchRowProps> = ({ label, checked, onChange, disabled }) => (
  <div className="flex items-center justify-between">
    <span className="text-[11px] font-bold text-text/50">{label}</span>
    <Switch checked={checked} onChange={onChange} disabled={disabled} />
  </div>
);

/**
 * 属性行组件
 */
interface PropertyRowProps {
  label: string;
  value?: string | number;
  unit?: string;
  children: React.ReactNode;
  showValue?: boolean;
}

export const PropertyRow: React.FC<PropertyRowProps> = ({
  label,
  value,
  unit = '',
  children,
  showValue = true,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-text/60">{label}</span>
        {showValue && value !== undefined && (
          <span className="text-xs font-mono font-bold text-text/50 bg-bg px-1.5 py-0.5 rounded border border-border/50">
            {typeof value === 'number' ? Math.round(value * 100) / 100 : value}
            {unit}
          </span>
        )}
      </div>
      {children}
    </div>
  );
};

/**
 * 属性输入组件
 */
interface PropertyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const PropertyInput: React.FC<PropertyInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  disabled = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-14',
    md: 'w-18',
    lg: 'w-24',
    full: 'w-full',
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-bold uppercase text-text/40">{label}</label>
      <div className="relative flex items-center">
        <input
          type="number"
          value={Math.round(value * 100) / 100}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={`
            ${sizeClasses[size]}
            input input-mono text-center font-bold text-sm
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          style={{ padding: '8px 10px', height: '36px' }}
        />
        {unit && (
          <span className="absolute right-2.5 text-[10px] font-bold text-text/30 pointer-events-none">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * 属性滑块组件 - Neo-Brutalism 风格
 */
interface PropertySliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  showValue?: boolean;
  disabled?: boolean;
}

export const PropertySlider: React.FC<PropertySliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  showValue = true,
  disabled = false,
}) => {
  const displayValue = step < 1 ? value.toFixed(1) : Math.round(value);

  return (
    <div>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-[11px] font-bold text-text/50">{label}</span>}
          {showValue && (
            <span className="text-[11px] font-mono font-bold text-text/40 bg-bg/80 px-2 py-0.5 rounded border border-border/30">
              {displayValue}{unit}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full slider disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
};

/**
 * 按钮组选择器 - Neo-Brutalism 风格
 */
interface ButtonGroupOption<T> {
  value: T;
  label: string;
  icon?: React.ReactNode;
  title?: string;
}

interface ButtonGroupSelectorProps<T> {
  label?: string;
  options: ButtonGroupOption<T>[];
  value: T;
  onChange: (value: T) => void;
  compact?: boolean;
}

export function ButtonGroupSelector<T extends string | number>({
  label,
  options,
  value,
  onChange,
  compact = false,
}: ButtonGroupSelectorProps<T>) {
  return (
    <div>
      {label && (
        <label className="block text-[11px] font-bold text-text/50 mb-1.5">{label}</label>
      )}
      <div className="flex border-2 border-border rounded-lg overflow-hidden">
        {options.map((option, index) => (
          <button
            key={String(option.value)}
            onClick={() => onChange(option.value)}
            title={option.title || option.label}
            className={`
              flex-1 flex items-center justify-center gap-1
              ${compact ? 'py-1.5 px-1.5' : 'py-2 px-2'}
              text-[11px] font-bold transition-colors
              ${index > 0 ? 'border-l-2 border-border' : ''}
              ${value === option.value
                ? 'bg-main text-text'
                : 'bg-bw text-text/50 hover:bg-bg hover:text-text/70'
              }
            `}
          >
            {option.icon}
            {!compact && <span>{option.label}</span>}
            {compact && !option.icon && <span>{option.label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 颜色输入组件 - Neo-Brutalism 风格
 */
interface ColorInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  allowEmpty?: boolean;
  placeholder?: string;
}

export const ColorInput: React.FC<ColorInputProps> = ({
  label,
  value,
  onChange,
  allowEmpty = false,
  placeholder = '#000000',
}) => {
  return (
    <div>
      {label && (
        <label className="block text-[11px] font-bold text-text/50 mb-1.5">{label}</label>
      )}
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
          className="w-9 h-9 rounded-lg cursor-pointer border-2 border-border"
          style={{ padding: 0 }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={allowEmpty ? placeholder : undefined}
          className="input input-mono flex-1 uppercase text-sm"
          style={{ height: '36px' }}
        />
      </div>
    </div>
  );
};

/**
 * 分段控制器 - Neo-Brutalism 风格
 */
interface SegmentOption<T> {
  value: T;
  label: string;
}

interface SegmentControlProps<T> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function SegmentControl<T extends string | number>({
  options,
  value,
  onChange,
}: SegmentControlProps<T>) {
  return (
    <div className="flex bg-bg border-2 border-border rounded-lg p-0.5">
      {options.map((option) => (
        <button
          key={String(option.value)}
          onClick={() => onChange(option.value)}
          className={`
            flex-1 py-1.5 text-[11px] font-bold rounded transition-all
            ${value === option.value
              ? 'bg-bw text-text shadow-sm border border-border/50'
              : 'text-text/40 hover:text-text/70'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
