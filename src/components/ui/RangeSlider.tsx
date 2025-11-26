/**
 * 范围滑块组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */
import React from 'react';

interface RangeSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  decimals?: number;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  unit = '',
  decimals = 0,
}) => {
  const displayValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-bold uppercase tracking-wide text-text">{label}</label>
        <span className="text-sm font-mono font-bold text-text bg-bg px-2 py-0.5 rounded border border-border">
          {displayValue}{unit}
        </span>
      </div>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};
