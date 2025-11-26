import { Layout, Layers } from 'lucide-react';
import { useCardStore } from '../../store/cardStore';
import type { EditorMode } from '../../types';

export const EditorTabs: React.FC = () => {
  const { editorMode, setEditorMode } = useCardStore();

  const tabs: { mode: EditorMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'template', label: '模板', icon: <Layout size={15} /> },
    { mode: 'custom', label: '自定义', icon: <Layers size={15} /> },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.mode}
          onClick={() => setEditorMode(tab.mode)}
          className={`tab ${editorMode === tab.mode ? 'active' : ''}`}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
};
