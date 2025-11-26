/**
 * 数字输入组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */
import React from 'react';

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
}) => {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type="number"
        value={Math.round(value)}
        onChange={(e) => onChange(Number(e.target.value))}
        className="input input-mono text-center font-bold"
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};
