import React, { useRef, useState } from 'react';
import { Upload, X, QrCode, RefreshCw } from 'lucide-react';
import { CollapsibleSection, PropertySlider, SegmentControl } from './CollapsibleSection';
import type { ImageElement } from '../../../types';

interface ImageStyleEditorProps {
  element: ImageElement;
  onUpdate: (updates: Partial<ImageElement>) => void;
}

type ImageSourceMode = 'upload' | 'url' | 'qrcode';

export const ImageStyleEditor: React.FC<ImageStyleEditorProps> = ({
  element,
  onUpdate,
}) => {
  // 根据当前 src 判断模式
  const getInitialMode = (): ImageSourceMode => {
    if (!element.src) return 'upload';
    if (element.src.startsWith('data:image')) return 'upload';
    return 'url';
  };

  const [mode, setMode] = useState<ImageSourceMode>(getInitialMode);
  const [urlInput, setUrlInput] = useState(
    element.src && !element.src.startsWith('data:image') ? element.src : ''
  );
  const [qrText, setQrText] = useState('');
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const hasImage = element.src && element.src.length > 0;

  // 处理文件上传
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      onUpdate({ src: base64 });
    };
    reader.readAsDataURL(file);

    // 清空 input 以便重复上传同一文件
    e.target.value = '';
  };

  // 处理 URL 输入
  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onUpdate({ src: urlInput.trim() });
    }
  };

  // 生成二维码
  const handleGenerateQrCode = async () => {
    if (!qrText.trim()) return;
    
    setIsGeneratingQr(true);
    try {
      // 动态导入 qrcode 库
      const QRCode = (await import('qrcode')).default;
      const dataUrl = await QRCode.toDataURL(qrText.trim(), {
        width: 500,
        margin: 1,
        errorCorrectionLevel: 'M',
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      onUpdate({ src: dataUrl });
    } catch (error) {
      console.error('二维码生成失败:', error);
    } finally {
      setIsGeneratingQr(false);
    }
  };

  // 清除图片
  const handleClearImage = () => {
    onUpdate({ src: '' });
    setUrlInput('');
    setQrText('');
  };

  return (
    <div className="space-y-5">
      <CollapsibleSection title="图片源">
        {/* 模式切换 */}
        <SegmentControl
          options={[
            { value: 'upload' as ImageSourceMode, label: '上传' },
            { value: 'url' as ImageSourceMode, label: 'URL' },
            { value: 'qrcode' as ImageSourceMode, label: '二维码' },
          ]}
          value={mode}
          onChange={setMode}
        />

        {/* 图片上传模式 */}
        {mode === 'upload' && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            {!hasImage || !element.src?.startsWith('data:image') ? (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full py-8 border-2 border-dashed border-border/50 rounded-xl hover:border-border hover:bg-bg transition-all cursor-pointer group"
              >
                <Upload size={18} strokeWidth={2.5} className="text-text/30 group-hover:text-text/50 transition-colors" />
                <span className="text-[11px] font-bold text-text/40 group-hover:text-text/60 transition-colors">
                  点击上传图片
                </span>
              </button>
            ) : (
              <ImagePreview src={element.src} onClear={handleClearImage} onReupload={() => fileInputRef.current?.click()} />
            )}
          </div>
        )}

        {/* URL 输入模式 */}
        {mode === 'url' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
                placeholder="输入图片 URL"
                className="input flex-1"
              />
              <button
                onClick={handleUrlSubmit}
                disabled={!urlInput.trim()}
                className="btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                加载
              </button>
            </div>
            
            {hasImage && !element.src?.startsWith('data:image') && (
              <ImagePreview src={element.src} onClear={handleClearImage} />
            )}
          </div>
        )}

        {/* 二维码生成模式 */}
        {mode === 'qrcode' && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={qrText}
                onChange={(e) => setQrText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGenerateQrCode()}
                placeholder="输入链接或文字"
                className="input flex-1"
              />
              <button
                onClick={handleGenerateQrCode}
                disabled={!qrText.trim() || isGeneratingQr}
                className="btn btn-primary btn-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
              >
                {isGeneratingQr ? (
                  <RefreshCw size={14} strokeWidth={2.5} className="animate-spin" />
                ) : (
                  <QrCode size={14} strokeWidth={2.5} />
                )}
                生成
              </button>
            </div>
            
            {hasImage && element.src?.startsWith('data:image') && (
              <ImagePreview src={element.src} onClear={handleClearImage} onRegenerate={handleGenerateQrCode} />
            )}
          </div>
        )}
      </CollapsibleSection>

      {/* 图片适配 */}
      {hasImage && (
        <CollapsibleSection title="显示设置">
          <PropertySlider
            label="不透明度"
            value={(element.opacity ?? 1) * 100}
            onChange={(v) => onUpdate({ opacity: v / 100 })}
            min={0}
            max={100}
            step={1}
            unit="%"
          />
        </CollapsibleSection>
      )}
    </div>
  );
};

// 图片预览组件
const ImagePreview: React.FC<{
  src: string;
  onClear: () => void;
  onReupload?: () => void;
  onRegenerate?: () => void;
}> = ({ src, onClear, onReupload, onRegenerate }) => (
  <div className="relative group">
    <div className="w-full aspect-video bg-bg rounded-xl border-2 border-border/50 flex items-center justify-center overflow-hidden">
      <img
        src={src}
        alt="预览"
        className="max-w-full max-h-full object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
    </div>
    
    {/* 操作按钮 */}
    <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
      {onReupload && (
        <button
          onClick={onReupload}
          className="w-7 h-7 bg-text/80 text-bw rounded-lg flex items-center justify-center hover:bg-text transition-colors border-2 border-border"
          title="重新上传"
        >
          <RefreshCw size={13} strokeWidth={2.5} />
        </button>
      )}
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="w-7 h-7 bg-text/80 text-bw rounded-lg flex items-center justify-center hover:bg-text transition-colors border-2 border-border"
          title="重新生成"
        >
          <RefreshCw size={13} strokeWidth={2.5} />
        </button>
      )}
      <button
        onClick={onClear}
        className="w-7 h-7 bg-danger/80 text-bw rounded-lg flex items-center justify-center hover:bg-danger transition-colors border-2 border-border"
        title="删除"
      >
        <X size={13} strokeWidth={2.5} />
      </button>
    </div>
  </div>
);
