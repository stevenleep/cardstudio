/**
 * 模块显示控制 - Neo-Brutalism 风格
 */
import { useCardStore } from '../../store/cardStore';
import { ALL_MODULES, type ModuleId } from '../../types/modules';

export const ModuleVisibilityControl: React.FC = () => {
  const { moduleVisibility, toggleModuleVisibility, currentTemplate } = useCardStore();

  if (!currentTemplate) return null;

  const availableModules = currentTemplate.visibleModules || [];
  const modules = (Object.entries(ALL_MODULES) as [ModuleId, typeof ALL_MODULES[ModuleId]][])
    .filter(([id]) => availableModules.includes(id));

  return (
    <div className="section">
      <div className="label">模块</div>
      <div className="space-y-1">
        {modules.map(([moduleId, config]) => {
          const isVisible = moduleVisibility[moduleId];
          return (
            <button
              key={moduleId}
              onClick={() => toggleModuleVisibility(moduleId)}
              className={`
                w-full flex items-center justify-between py-2.5 px-3 
                rounded-lg border-2 transition-all
                ${isVisible 
                  ? 'border-border bg-main/20' 
                  : 'border-transparent hover:border-border/50 hover:bg-bg'
                }
              `}
            >
              <span className={`text-sm font-semibold ${isVisible ? 'text-text' : 'text-text/50'}`}>
                {config.label}
              </span>
              <div className={`switch ${isVisible ? 'on' : ''}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
};
