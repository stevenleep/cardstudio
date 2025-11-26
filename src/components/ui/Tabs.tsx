/**
 * 标签页组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */

interface Tab<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps<T extends string = string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
  variant?: 'pill' | 'underline';
  fullWidth?: boolean;
  className?: string;
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pill',
  fullWidth = false,
  className = '',
}: TabsProps<T>) {
  if (variant === 'underline') {
    return (
      <div className={`flex border-b-2 border-border ${fullWidth ? 'w-full' : ''} ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && onTabChange(tab.id)}
            disabled={tab.disabled}
            className={`
              flex items-center justify-center gap-2 px-4 py-3 -mb-[2px]
              text-sm font-bold transition-all border-b-2
              ${activeTab === tab.id 
                ? 'border-main text-text bg-main' 
                : 'border-transparent text-text/60 hover:text-text hover:bg-bg'
              }
              ${fullWidth ? 'flex-1' : ''}
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`tabs ${fullWidth ? 'w-full' : ''} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => !tab.disabled && onTabChange(tab.id)}
          disabled={tab.disabled}
          className={`
            tab
            ${activeTab === tab.id ? 'active' : ''}
            ${fullWidth ? 'flex-1' : ''}
            ${tab.disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
