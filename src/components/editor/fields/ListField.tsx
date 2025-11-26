/**
 * 列表字段 - Neo-Brutalism 风格
 */
import React from 'react';
import { Plus, X } from 'lucide-react';

interface ListFieldProps {
  label: string;
  items: string[];
  placeholder?: string;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (items: string[]) => void;
}

export const ListField: React.FC<ListFieldProps> = ({ 
  label,
  items, 
  placeholder, 
  onAdd, 
  onRemove, 
  onChange 
}) => (
  <div>
    {/* 标题行：标签 + 添加按钮 */}
    <div className="flex items-center justify-between mb-2">
      <label className="label !mb-0">{label}</label>
      <button 
        onClick={onAdd}
        className="tool-btn"
        style={{ width: '28px', height: '28px' }}
        title="添加项目"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
    
    {/* 列表项 */}
    <div className="space-y-2">
      {items.length === 0 ? (
        <div className="border-2 border-dashed border-border/30 rounded-lg py-4 text-center">
          <span className="text-xs text-text/40">点击 + 添加项目</span>
        </div>
      ) : (
        items.map((item, index) => (
          <div key={index} className="flex gap-2 items-center group">
            <span className="text-xs font-mono font-bold text-text/40 w-4 text-center">
              {index + 1}
            </span>
            <input
              type="text"
              value={item}
              onChange={(e) => {
                const newList = [...items];
                newList[index] = e.target.value;
                onChange(newList);
              }}
              placeholder={placeholder}
              className="input flex-1"
            />
            <button
              onClick={() => onRemove(index)}
              className="tool-btn danger opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ width: '32px', height: '32px' }}
            >
              <X size={14} strokeWidth={2.5} />
            </button>
          </div>
        ))
      )}
    </div>
  </div>
);
