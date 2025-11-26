/**
 * 二维码字段 - Neo-Brutalism 风格
 */
import React from 'react';
import { Upload, Link as LinkIcon, X } from 'lucide-react';

interface QrCodeFieldProps {
  label: string;
  value: string;
  mode: 'text' | 'image';
  onModeChange: (mode: 'text' | 'image') => void;
  onValueChange: (value: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const QrCodeField: React.FC<QrCodeFieldProps> = ({
  value,
  mode,
  onModeChange,
  onValueChange,
  onFileUpload,
}) => (
  <div>
    {/* 模式切换 */}
    <div className="tabs mb-3">
      <button
        onClick={() => onModeChange('text')}
        className={`tab ${mode === 'text' ? 'active' : ''}`}
      >
        <LinkIcon size={14} strokeWidth={2.5} />
        <span>链接</span>
      </button>
      <button
        onClick={() => onModeChange('image')}
        className={`tab ${mode === 'image' ? 'active' : ''}`}
      >
        <Upload size={14} strokeWidth={2.5} />
        <span>图片</span>
      </button>
    </div>

    {mode === 'text' ? (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="输入网址或文本"
        className="input"
      />
    ) : (
      <ImageUpload 
        value={value} 
        onFileUpload={onFileUpload} 
        onClear={() => onValueChange('')} 
      />
    )}
  </div>
);

const ImageUpload: React.FC<{
  value: string;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}> = ({ value, onFileUpload, onClear }) => {
  const hasImage = value && value.startsWith('data:image');
  
  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileUpload} className="hidden" id="qr-upload" />
      
      {!hasImage ? (
        <label
          htmlFor="qr-upload"
          className="
            flex items-center justify-center gap-2 w-full py-8 
            border-2 border-dashed border-border/50 rounded-lg
            hover:border-border hover:bg-bg cursor-pointer transition-all
          "
        >
          <Upload size={18} strokeWidth={2.5} className="text-text/40" />
          <span className="text-sm font-semibold text-text/40">点击上传</span>
        </label>
      ) : (
        <div className="relative inline-block">
          <div className="w-20 h-20 border-2 border-border rounded-lg flex items-center justify-center overflow-hidden shadow-brutal-sm">
            <img src={value} alt="预览" className="max-w-full max-h-full object-contain" />
          </div>
          <button
            onClick={onClear}
            className="
              absolute -top-2 -right-2 w-6 h-6 
              bg-danger text-white border-2 border-border rounded-md
              flex items-center justify-center 
              hover:bg-danger/80 transition-colors
              shadow-brutal-sm
            "
          >
            <X size={12} strokeWidth={3} />
          </button>
        </div>
      )}
    </div>
  );
};
