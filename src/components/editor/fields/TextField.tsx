/**
 * 文本输入字段 - Neo-Brutalism 风格
 */
import React from 'react';

interface TextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({ 
  label, 
  value, 
  placeholder, 
  onChange 
}) => (
  <div>
    <label className="label">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="input"
    />
  </div>
);
