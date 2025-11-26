/**
 * 多行文本输入字段 - Neo-Brutalism 风格
 */
import React from 'react';

interface TextAreaFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({ 
  label, 
  value, 
  placeholder, 
  onChange 
}) => (
  <div>
    <label className="label">{label}</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input resize-none leading-relaxed min-h-[80px] py-3"
      rows={2}
    />
  </div>
);
