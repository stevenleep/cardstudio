/**
 * 模板选择器 - Neo-Brutalism 风格
 */
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useCardStore } from '../../store/cardStore';
import { TEMPLATE_REGISTRY } from '../../templates';

export const TemplateSelector: React.FC = () => {
  const { currentTemplate, loadTemplate } = useCardStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!currentTemplate) return null;

  return (
    <div className="section" ref={containerRef}>
      <div className="label">版式</div>
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between h-10 px-3 
            bg-bw border-2 rounded-lg text-sm font-semibold
            transition-all
            ${isOpen 
              ? 'border-border shadow-brutal-sm' 
              : 'border-border/50 hover:border-border hover:shadow-brutal-sm'
            }
          `}
        >
          <span>{currentTemplate.name}</span>
          <ChevronDown 
            size={16} 
            strokeWidth={2.5}
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isOpen && (
          <div className="dropdown top-full left-0 mt-2 w-full animate-slide-down">
            {TEMPLATE_REGISTRY.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => { loadTemplate(tmpl); setIsOpen(false); }}
                className={`dropdown-item ${currentTemplate.id === tmpl.id ? 'active' : ''}`}
              >
                <span>{tmpl.name}</span>
                {currentTemplate.id === tmpl.id && <Check size={14} strokeWidth={2.5} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
