/**
 * 右键上下文菜单 - Neo-Brutalism 风格
 */
import React, { useEffect, useRef } from 'react';
import { Copy, Clipboard, Trash2, CopyPlus, Scissors, ArrowUpToLine, ArrowDownToLine, ArrowUp, ArrowDown } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  shortcut?: string;
  onClick: () => void;
  disabled?: boolean;
  divider?: boolean;
}

interface ContextMenuProps {
  onCopy: () => void;
  onCut: () => void;
  onPaste: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  hasSelection: boolean;
  hasClipboard: boolean;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  onCopy, onCut, onPaste, onDuplicate, onDelete,
  onBringToFront, onSendToBack, onBringForward, onSendBackward,
  hasSelection, hasClipboard,
}) => {
  const { contextMenu, hideContextMenu } = useUIStore();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) hideContextMenu();
    };
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') hideContextMenu(); };

    if (contextMenu.visible) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [contextMenu.visible, hideContextMenu]);

  useEffect(() => {
    if (contextMenu.visible && menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      let x = contextMenu.x, y = contextMenu.y;
      if (x + rect.width > window.innerWidth) x = window.innerWidth - rect.width - 8;
      if (y + rect.height > window.innerHeight) y = window.innerHeight - rect.height - 8;
      menuRef.current.style.left = `${x}px`;
      menuRef.current.style.top = `${y}px`;
    }
  }, [contextMenu]);

  if (!contextMenu.visible) return null;

  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const mod = isMac ? '⌘' : 'Ctrl+';

  const items: MenuItem[] = [
    { label: '复制', icon: <Copy size={14} strokeWidth={2.5} />, shortcut: `${mod}C`, onClick: () => { onCopy(); hideContextMenu(); }, disabled: !hasSelection },
    { label: '剪切', icon: <Scissors size={14} strokeWidth={2.5} />, shortcut: `${mod}X`, onClick: () => { onCut(); hideContextMenu(); }, disabled: !hasSelection },
    { label: '粘贴', icon: <Clipboard size={14} strokeWidth={2.5} />, shortcut: `${mod}V`, onClick: () => { onPaste(); hideContextMenu(); }, disabled: !hasClipboard },
    { label: '复制元素', icon: <CopyPlus size={14} strokeWidth={2.5} />, shortcut: `${mod}D`, onClick: () => { onDuplicate(); hideContextMenu(); }, disabled: !hasSelection, divider: true },
    { label: '置于顶层', icon: <ArrowUpToLine size={14} strokeWidth={2.5} />, onClick: () => { onBringToFront(); hideContextMenu(); }, disabled: !hasSelection },
    { label: '上移一层', icon: <ArrowUp size={14} strokeWidth={2.5} />, onClick: () => { onBringForward(); hideContextMenu(); }, disabled: !hasSelection },
    { label: '下移一层', icon: <ArrowDown size={14} strokeWidth={2.5} />, onClick: () => { onSendBackward(); hideContextMenu(); }, disabled: !hasSelection },
    { label: '置于底层', icon: <ArrowDownToLine size={14} strokeWidth={2.5} />, onClick: () => { onSendToBack(); hideContextMenu(); }, disabled: !hasSelection, divider: true },
    { label: '删除', icon: <Trash2 size={14} strokeWidth={2.5} />, shortcut: 'Del', onClick: () => { onDelete(); hideContextMenu(); }, disabled: !hasSelection },
  ];

  return (
    <div
      ref={menuRef}
      className="dropdown fixed z-50 min-w-[180px] animate-fade-in"
      style={{ left: contextMenu.x, top: contextMenu.y }}
    >
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          <button
            className={`
              w-full px-3 h-9 flex items-center gap-2.5 text-left text-sm font-semibold 
              rounded-md transition-all
              ${item.disabled 
                ? 'text-text/30 cursor-not-allowed' 
                : 'text-text hover:bg-main'
              }
            `}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            <span className={item.disabled ? 'text-text/30' : 'text-text/60'}>{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.shortcut && (
              <span className={`text-xs font-mono ${item.disabled ? 'text-text/30' : 'text-text/40'}`}>
                {item.shortcut}
              </span>
            )}
          </button>
          {item.divider && idx < items.length - 1 && <div className="divider my-1" />}
        </React.Fragment>
      ))}
    </div>
  );
};
