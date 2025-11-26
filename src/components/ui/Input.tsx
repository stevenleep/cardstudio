/**
 * 输入框组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix'> {
  value: string | number;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: 'default' | 'mono';
  inputSize?: 'default' | 'sm';
}

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  error,
  startAdornment,
  endAdornment,
  variant = 'default',
  inputSize = 'default',
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="label">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {startAdornment && (
          <span className="absolute left-3 text-text/60">
            {startAdornment}
          </span>
        )}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            input
            ${variant === 'mono' ? 'input-mono' : ''}
            ${inputSize === 'sm' ? 'input-sm' : ''}
            ${startAdornment ? 'pl-10' : ''}
            ${endAdornment ? 'pr-10' : ''}
            ${error ? 'border-danger focus:border-danger' : ''}
            ${className}
          `}
          {...props}
        />
        {endAdornment && (
          <span className="absolute right-3 text-text/60">
            {endAdornment}
          </span>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm font-medium text-danger">{error}</p>
      )}
    </div>
  );
};
