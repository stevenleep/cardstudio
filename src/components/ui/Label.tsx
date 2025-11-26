/**
 * 标签组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */

interface LabelProps {
  /** 标签文本 */
  children: React.ReactNode;
  /** 是否必填 */
  required?: boolean;
  /** 关联的表单元素 ID */
  htmlFor?: string;
  /** 额外类名 */
  className?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  required,
  htmlFor,
  className = '',
}) => {
  return (
    <label 
      htmlFor={htmlFor}
      className={`label ${className}`}
    >
      {children}
      {required && <span className="text-danger ml-1 font-black">*</span>}
    </label>
  );
};
