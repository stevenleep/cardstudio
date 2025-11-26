/**
 * 按钮组组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */

interface ButtonGroupOption<T extends string> {
  value: T;
  label: string;
}

interface ButtonGroupProps<T extends string> {
  label: string;
  value: T;
  options: ButtonGroupOption<T>[];
  onChange: (value: T) => void;
}

export function ButtonGroup<T extends string>({
  label,
  value,
  options,
  onChange,
}: ButtonGroupProps<T>) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex border-2 border-border rounded-lg overflow-hidden shadow-brutal-sm">
        {options.map((option, index) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`
              flex-1 py-2 text-sm font-bold transition-colors
              ${index > 0 ? 'border-l-2 border-border' : ''}
              ${value === option.value 
                ? 'bg-main text-text' 
                : 'bg-bw text-text/70 hover:bg-bg'
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
