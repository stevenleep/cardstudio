/**
 * 卡片组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */

interface CardProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'default' | 'static' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

const variantStyles = {
  default: 'card',
  static: 'card-static',
  flat: 'card-flat',
};

export const Card: React.FC<CardProps> = ({
  children,
  title,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
}) => {
  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {title && (
        <h3 className="text-base font-bold text-text mb-3 pb-3 border-b-2 border-border">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};
