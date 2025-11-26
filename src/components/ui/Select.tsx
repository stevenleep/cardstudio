/**
 * 下拉选择组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */
import { ChevronDown } from 'lucide-react';

interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

interface SelectProps<T extends string = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function Select<T extends string = string>({
  options,
  value,
  onChange,
  label,
  placeholder = '请选择',
  disabled = false,
  className = '',
}: SelectProps<T>) {
  return (
    <div className="w-full">
      {label && (
        <label className="label">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as T)}
          disabled={disabled}
          className={`
            input appearance-none pr-10 cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown 
          size={16} 
          strokeWidth={2.5}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-text pointer-events-none" 
        />
      </div>
    </div>
  );
}
