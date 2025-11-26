/**
 * 配色选择器 - Neo-Brutalism 风格
 */
import { Check } from 'lucide-react';
import { useCardStore } from '../../store/cardStore';
import { COLOR_SCHEMES } from '../../config';

export const ColorSchemePicker: React.FC = () => {
  const { backgroundColor, applyColorScheme } = useCardStore();

  return (
    <div className="section">
      <div className="label">配色</div>
      <div className="flex gap-2 flex-wrap">
        {COLOR_SCHEMES.map(scheme => {
          const isActive = backgroundColor === scheme.bg;
          return (
            <button
              key={scheme.id}
              onClick={() => applyColorScheme(scheme)}
              className={`
                relative w-9 h-9 border-2 rounded-lg transition-all
                ${isActive 
                  ? 'border-border shadow-brutal-sm scale-110' 
                  : 'border-border/50 hover:border-border hover:shadow-brutal-sm hover:scale-105'
                }
              `}
              style={{ background: `linear-gradient(135deg, ${scheme.primary} 50%, ${scheme.bg} 50%)` }}
            >
              {isActive && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-md">
                  <Check size={14} strokeWidth={3} className="text-white" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
