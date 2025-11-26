/**
 * 颜色选择器组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */
import React from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  presets?: string[];
  showTransparent?: boolean;
}

const DEFAULT_PRESETS = [
  '#FFE566', '#FFC800', '#ff6b9d', '#c084fc', 
  '#22d3d1', '#4ade80', '#facc15', '#fb923c', 
  '#ffffff', '#000000'
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  presets = DEFAULT_PRESETS,
  showTransparent = false,
}) => {
  const allPresets = showTransparent ? [...presets, 'transparent'] : presets;
  const isTransparent = value === 'transparent';

  return (
    <div>
      {label && <label className="label">{label}</label>}
      <div className="flex gap-2">
        <div className="relative">
          <input
            type="color"
            value={isTransparent ? '#FFFFFF' : value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-10 cursor-pointer opacity-0 absolute inset-0"
          />
          <div 
            className="w-10 h-10 rounded-lg border-2 border-border pointer-events-none shadow-brutal-sm"
            style={{ 
              backgroundColor: isTransparent ? '#FFFFFF' : value,
              backgroundImage: isTransparent 
                ? 'linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%), linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%)' 
                : undefined,
              backgroundSize: isTransparent ? '8px 8px' : undefined,
              backgroundPosition: isTransparent ? '0 0, 4px 4px' : undefined
            }}
          />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input input-mono flex-1 uppercase"
          placeholder={showTransparent ? 'transparent' : '#000000'}
        />
      </div>
      
      {/* 预设颜色 */}
      <div className="flex gap-2 mt-3 flex-wrap">
        {allPresets.map(color => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`
              w-7 h-7 rounded-md border-2 border-border transition-all
              ${value === color 
                ? 'ring-2 ring-main ring-offset-2 shadow-brutal-sm scale-110' 
                : 'hover:scale-110 hover:shadow-brutal-sm'
              }
            `}
            style={{ 
              backgroundColor: color === 'transparent' ? '#fff' : color,
              backgroundImage: color === 'transparent' 
                ? 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)' 
                : undefined,
              backgroundSize: color === 'transparent' ? '6px 6px' : undefined,
              backgroundPosition: color === 'transparent' ? '0 0, 3px 3px' : undefined
            }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
};
