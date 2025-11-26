import { Download, ChevronDown, Sparkles, MousePointer2, Pencil } from 'lucide-react';
import { useCardStore } from '../../store/cardStore';
import { useUIStore } from '../../store/uiStore';
import { DIMENSION_PRESETS, findMatchingPreset } from '../../config';

interface HeaderProps {
  onExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onExport }) => {
  const { width, height, setDimensions, editorMode } = useCardStore();
  const { currentTool, setCurrentTool } = useUIStore();
  const currentPreset = findMatchingPreset(width, height);
  const displayName = currentPreset?.name || '自定义';
  
  const isCustomMode = editorMode === 'custom';

  return (
    <header className="h-14 bg-bw border-b-3 border-border flex items-center justify-between px-5 shrink-0">
      <div className="flex items-center gap-4">
        {/* 尺寸选择器 */}
        <div className="relative group">
          <button className="btn btn-secondary btn-sm gap-2">
            <span className="font-bold">{displayName}</span>
            <ChevronDown size={14} strokeWidth={2.5} className="text-text/70" />
          </button>
          <div className="dropdown top-full left-0 mt-2 w-56 hidden group-hover:block animate-slide-down">
            {DIMENSION_PRESETS.map((preset) => (
              <button
                key={preset.name}
                onClick={() => setDimensions(preset.width, preset.height)}
                className={`dropdown-item ${currentPreset?.id === preset.id ? 'active' : ''}`}
              >
                <span className="font-semibold">{preset.name}</span>
                <span className="text-xs font-mono opacity-70">{preset.width}×{preset.height}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* 尺寸数值显示 */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-bg border-2 border-border rounded-lg">
          <span className="text-sm font-mono font-bold text-text">{width}</span>
          <span className="text-xs text-text/50">×</span>
          <span className="text-sm font-mono font-bold text-text">{height}</span>
        </div>
        
        {/* 工具栏（仅自定义模式） */}
        {isCustomMode && (
          <>
            <div className="w-px h-6 bg-border/30" />
            <div className="flex items-center gap-1 p-1 bg-bg border-2 border-border rounded-lg">
              <ToolButton 
                icon={<MousePointer2 size={16} strokeWidth={2.5} />}
                active={currentTool === 'select'}
                onClick={() => setCurrentTool('select')}
                title="选择工具 (V)"
              />
              <ToolButton 
                icon={<Pencil size={16} strokeWidth={2.5} />}
                active={currentTool === 'brush'}
                onClick={() => setCurrentTool('brush')}
                title="画笔工具 (B)"
              />
            </div>
          </>
        )}
      </div>

      {/* 导出按钮 */}
      <button onClick={onExport} className="btn btn-primary btn-sm gap-2">
        <Sparkles size={14} strokeWidth={2.5} />
        <span className="font-bold">导出图片</span>
        <Download size={14} strokeWidth={2.5} />
      </button>
    </header>
  );
};

/**
 * 工具按钮组件
 */
const ToolButton: React.FC<{
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  title: string;
}> = ({ icon, active, onClick, title }) => (
  <button
    onClick={onClick}
    title={title}
    className={`
      w-8 h-8 flex items-center justify-center rounded-md
      transition-all duration-150
      ${active 
        ? 'bg-main text-text border-2 border-border' 
        : 'text-text/60 hover:bg-bw hover:text-text'
      }
    `}
  >
    {icon}
  </button>
);
