/**
 * 画布设置面板 - Neo-Brutalism 风格
 * 
 * 在画笔模式下显示双 Tab：画布/画笔
 */
import React, { useState } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { useUIStore } from '../../store/uiStore';
import { GradientPicker } from '../ui';
import { DIMENSION_PRESETS } from '../../config';
import { Settings, Pencil } from 'lucide-react';
import { BrushSettingsContent } from './BrushSettingsPanel';

type TabType = 'canvas' | 'brush';

export const CanvasSettingsPanel: React.FC = () => {
  const { 
    width, height, backgroundColor, setBackgroundColor, setDimensions,
    cornerRadius, setCornerRadius,
    showGrid, setShowGrid, gridSize, setGridSize,
    showSafeArea, setShowSafeArea, safeAreaPadding, setSafeAreaPadding,
  } = useCanvasStore();
  
  const { currentTool } = useUIStore();
  const isBrushMode = currentTool === 'brush';
  const [activeTab, setActiveTab] = useState<TabType>(isBrushMode ? 'brush' : 'canvas');
  
  // 当切换到画笔工具时，自动切换到画笔 Tab
  React.useEffect(() => {
    if (isBrushMode) {
      setActiveTab('brush');
    }
  }, [isBrushMode]);

  return (
    <div className="h-full flex flex-col">
      {/* Tab 切换（仅画笔模式显示） */}
      {isBrushMode && (
        <div className="px-4 pt-3 pb-2 border-b border-border/50">
          <div className="flex gap-1 p-1 bg-bg border-2 border-border rounded-lg">
            <TabButton
              active={activeTab === 'brush'}
              onClick={() => setActiveTab('brush')}
              icon={<Pencil size={14} strokeWidth={2.5} />}
              label="画笔"
            />
            <TabButton
              active={activeTab === 'canvas'}
              onClick={() => setActiveTab('canvas')}
              icon={<Settings size={14} strokeWidth={2.5} />}
              label="画布"
            />
          </div>
        </div>
      )}
      
      {/* Tab 内容 */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'brush' && isBrushMode ? (
          <BrushSettingsContent />
        ) : (
          <CanvasSettingsContent
            width={width}
            height={height}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
            setDimensions={setDimensions}
            cornerRadius={cornerRadius}
            setCornerRadius={setCornerRadius}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
            gridSize={gridSize}
            setGridSize={setGridSize}
            showSafeArea={showSafeArea}
            setShowSafeArea={setShowSafeArea}
            safeAreaPadding={safeAreaPadding}
            setSafeAreaPadding={setSafeAreaPadding}
          />
        )}
      </div>
    </div>
  );
};

/**
 * Tab 按钮
 */
const TabButton: React.FC<{
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md
      text-xs font-bold transition-all
      ${active
        ? 'bg-main text-text border-2 border-border shadow-brutal-sm'
        : 'text-text/50 hover:text-text hover:bg-bg'
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

/**
 * 画布设置内容（抽离出来便于复用）
 */
const CanvasSettingsContent: React.FC<{
  width: number;
  height: number;
  backgroundColor: any;
  setBackgroundColor: (color: any) => void;
  setDimensions: (w: number, h: number) => void;
  cornerRadius: number;
  setCornerRadius: (r: number) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
  gridSize: number;
  setGridSize: (size: number) => void;
  showSafeArea: boolean;
  setShowSafeArea: (show: boolean) => void;
  safeAreaPadding: number;
  setSafeAreaPadding: (padding: number) => void;
}> = ({
  width, height, backgroundColor, setBackgroundColor, setDimensions,
  cornerRadius, setCornerRadius,
  showGrid, setShowGrid, gridSize, setGridSize,
  showSafeArea, setShowSafeArea, safeAreaPadding, setSafeAreaPadding,
}) => (
  <div className="px-5 pt-5 pb-8 space-y-6">
      {/* 尺寸 */}
      <div>
        <div className="label">尺寸</div>
        
        {/* 预设选择 - 简洁的 2x2 网格 */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {DIMENSION_PRESETS.map((preset) => {
            const isActive = width === preset.width && height === preset.height;
            return (
              <button
                key={preset.id}
                onClick={() => setDimensions(preset.width, preset.height)}
                className={`
                  py-2 px-3 text-sm font-bold border-2 rounded-lg transition-all
                  ${isActive 
                    ? 'border-border bg-main text-text shadow-brutal-sm' 
                    : 'border-border/50 hover:border-border hover:bg-bg'
                  }
                `}
              >
                {preset.name}
              </button>
            );
          })}
        </div>
        
        {/* 自定义尺寸输入 - 简洁版 */}
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs font-bold text-text/50 w-5">W</span>
            <input
              type="number"
              value={width}
              onChange={(e) => setDimensions(Number(e.target.value), height)}
              className="input input-mono text-center font-bold"
            />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs font-bold text-text/50 w-5">H</span>
            <input
              type="number"
              value={height}
              onChange={(e) => setDimensions(width, Number(e.target.value))}
              className="input input-mono text-center font-bold"
            />
          </div>
        </div>
      </div>

      {/* 背景 */}
      <div>
        <div className="label">背景</div>
        <GradientPicker value={backgroundColor} onChange={setBackgroundColor} />
      </div>

      {/* 圆角 */}
      <div>
        <div className="label">圆角</div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="100"
            value={cornerRadius}
            onChange={(e) => setCornerRadius(Number(e.target.value))}
            className="flex-1"
          />
          <input
            type="number"
            value={cornerRadius}
            onChange={(e) => setCornerRadius(Number(e.target.value))}
            className="input input-mono text-center font-bold"
            style={{ width: '64px' }}
          />
        </div>
      </div>

      {/* 辅助 */}
      <div>
        <div className="label">辅助</div>
        <div className="space-y-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`
              w-full flex items-center justify-between py-2.5 px-3 
              rounded-lg border-2 transition-all
              ${showGrid 
                ? 'border-border bg-main/20' 
                : 'border-transparent hover:border-border/50 hover:bg-bg'
              }
            `}
          >
            <span className={`text-sm font-semibold ${showGrid ? 'text-text' : 'text-text/50'}`}>网格</span>
            <div className={`switch ${showGrid ? 'on' : ''}`} />
          </button>
          {showGrid && (
            <div className="flex items-center gap-2 pl-3 pb-2">
              <span className="text-xs font-bold text-text/50">间距</span>
              <input
                type="number"
                value={gridSize}
                onChange={(e) => setGridSize(Number(e.target.value))}
                className="input input-mono text-center font-bold"
                style={{ width: '64px' }}
              />
            </div>
          )}
          
          <button
            onClick={() => setShowSafeArea(!showSafeArea)}
            className={`
              w-full flex items-center justify-between py-2.5 px-3 
              rounded-lg border-2 transition-all
              ${showSafeArea 
                ? 'border-border bg-main/20' 
                : 'border-transparent hover:border-border/50 hover:bg-bg'
              }
            `}
          >
            <span className={`text-sm font-semibold ${showSafeArea ? 'text-text' : 'text-text/50'}`}>安全区</span>
            <div className={`switch ${showSafeArea ? 'on' : ''}`} />
          </button>
          {showSafeArea && (
            <div className="flex items-center gap-2 pl-3">
              <span className="text-xs font-bold text-text/50">边距</span>
              <input
                type="number"
                value={safeAreaPadding}
                onChange={(e) => setSafeAreaPadding(Number(e.target.value))}
                className="input input-mono text-center font-bold"
                style={{ width: '64px' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
);
