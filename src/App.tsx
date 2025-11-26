import { useRef } from 'react';
import CardStage, { type CardStageRef } from './components/canvas/CardStage';
import Sidebar from './components/editor/Sidebar';
import { Header, EditorTabs } from './components/layout';
import { useCardStore } from './store/cardStore';
import { useUIStore } from './store/uiStore';
import { CustomElementPanel, CanvasSettingsPanel, TemplateContentPanel } from './components/editor';

function App() {
  const { editorMode, selectedId } = useCardStore();
  const { currentTool } = useUIStore();
  const cardStageRef = useRef<CardStageRef>(null);
  
  const isBrushMode = editorMode === 'custom' && currentTool === 'brush';

  const handleExport = () => {
    cardStageRef.current?.exportImage();
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg">
      {/* 左侧面板 */}
      <aside className="w-[320px] h-full bg-bw border-r-3 border-border flex flex-col shrink-0 z-20">
        {/* Logo区域 */}
        <div className="h-14 px-5 flex items-center border-b-3 border-border bg-main">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-9 h-9 relative">
              <div className="absolute -right-0.5 -bottom-0.5 w-9 h-9 bg-[var(--pink)] border-2 border-border" />
              <div className="absolute inset-0 bg-bw border-2 border-border flex items-center justify-center">
                <div className="w-4 h-4 bg-text rotate-45" />
              </div>
            </div>
            
            {/* 标题 */}
            <div className="flex flex-col">
              <span className="text-[17px] font-black text-text tracking-tight uppercase">CARD<span className="text-[var(--pink)]">.</span>STUDIO</span>
              <span className="text-[9px] text-text/50 font-bold tracking-[0.15em]">Design & Create</span>
            </div>
          </div>
        </div>
        
        {/* 标签切换 */}
        <div className="px-4 py-4 border-b-2 border-border">
          <EditorTabs />
        </div>
        
        {/* 主内容 */}
        <div className="flex-1 overflow-hidden">
          <Sidebar mode={editorMode} />
        </div>
      </aside>
      
      {/* 中间画布区域 */}
      <main className="flex-1 flex flex-col h-full">
        <Header onExport={handleExport} />
        <div className="flex-1 overflow-hidden">
          <CardStage ref={cardStageRef} />
        </div>
      </main>
          
      {/* 右侧属性面板 */}
      <aside className="w-[340px] h-full bg-bw border-l-3 border-border flex flex-col shrink-0 z-10">
        <div className="panel-header shrink-0">
          <span className="panel-title">
            {editorMode === 'template' 
              ? '内容编辑' 
              : selectedId 
                ? '元素属性' 
                : isBrushMode 
                  ? '画笔 / 画布' 
                  : '画布设置'
            }
          </span>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
          {editorMode === 'template' ? (
            <TemplateContentPanel />
          ) : selectedId ? (
            <CustomElementPanel />
          ) : (
            <CanvasSettingsPanel />
          )}
        </div>
      </aside>
    </div>
  );
}

export default App;
