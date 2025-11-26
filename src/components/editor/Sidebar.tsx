import type { EditorMode } from '../../types';
import { ConfigPanel } from './ConfigPanel';
import { PresetsPanel } from './PresetsPanel';

interface SidebarProps {
  mode: EditorMode;
}

const Sidebar: React.FC<SidebarProps> = ({ mode }) => {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      {/* 模板模式 */}
      {mode === 'template' && (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <ConfigPanel />
        </div>
      )}
      
      {/* 自定义模式 */}
      {mode === 'custom' && (
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <PresetsPanel />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
