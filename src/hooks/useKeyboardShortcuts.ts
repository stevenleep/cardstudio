/**
 * 键盘快捷键 Hook
 * 
 * 处理编辑器中的键盘快捷键
 */
import { useEffect, useCallback } from 'react';

export interface KeyboardShortcutHandler {
  /** 快捷键组合 (如 'ctrl+z', 'cmd+shift+s') */
  key: string;
  /** 处理函数 */
  handler: (e: KeyboardEvent) => void;
  /** 是否阻止默认行为 */
  preventDefault?: boolean;
}

/**
 * 解析快捷键字符串
 */
function parseShortcut(shortcut: string): {
  key: string;
  ctrl: boolean;
  shift: boolean;
  alt: boolean;
  meta: boolean;
} {
  const parts = shortcut.toLowerCase().split('+');
  const key = parts[parts.length - 1];
  
  return {
    key,
    ctrl: parts.includes('ctrl'),
    shift: parts.includes('shift'),
    alt: parts.includes('alt'),
    meta: parts.includes('cmd') || parts.includes('meta'),
  };
}

/**
 * Shift 键按下时字符的映射（美式键盘）
 * 用于匹配如 ctrl+shift+] 这样的快捷键
 */
const SHIFT_KEY_MAP: Record<string, string> = {
  '}': ']',
  '{': '[',
  '|': '\\',
  ':': ';',
  '"': "'",
  '<': ',',
  '>': '.',
  '?': '/',
  '~': '`',
  '!': '1',
  '@': '2',
  '#': '3',
  '$': '4',
  '%': '5',
  '^': '6',
  '&': '7',
  '*': '8',
  '(': '9',
  ')': '0',
  '_': '-',
  '+': '=',
};

/**
 * 获取按键的规范化值（处理 Shift 键的影响）
 */
function normalizeKey(key: string, shiftKey: boolean): string {
  const lowerKey = key.toLowerCase();
  if (shiftKey && SHIFT_KEY_MAP[key]) {
    return SHIFT_KEY_MAP[key];
  }
  return lowerKey;
}

/**
 * 检查事件是否匹配快捷键
 */
function matchesShortcut(e: KeyboardEvent, shortcut: string): boolean {
  const parsed = parseShortcut(shortcut);
  
  // 跨平台支持：Mac 用 metaKey，Windows/Linux 用 ctrlKey
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  
  // 在 Mac 上，Ctrl 和 Cmd 都应该匹配 ctrl+ 前缀的快捷键
  // 例如 ctrl+c 在 Mac 上可以用 Cmd+C 触发
  let modifierMatches: boolean;
  if (isMac) {
    // Mac: ctrl+快捷键 => 用户按 Cmd+快捷键
    const needsCtrlOrCmd = parsed.ctrl || parsed.meta;
    const hasCtrlOrCmd = e.metaKey || e.ctrlKey;
    modifierMatches = needsCtrlOrCmd === hasCtrlOrCmd;
  } else {
    // Windows/Linux: ctrl+快捷键 => 用户按 Ctrl+快捷键
    modifierMatches = (parsed.ctrl || parsed.meta) === e.ctrlKey;
  }

  // 规范化按键（处理 Shift 时字符变化的情况）
  const normalizedKey = normalizeKey(e.key, e.shiftKey);

  return (
    normalizedKey === parsed.key &&
    modifierMatches &&
    parsed.shift === e.shiftKey &&
    parsed.alt === e.altKey
  );
}

/**
 * 键盘快捷键 Hook
 * 
 * @example
 * ```tsx
 * useKeyboardShortcuts([
 *   { key: 'ctrl+z', handler: undo },
 *   { key: 'ctrl+shift+z', handler: redo },
 *   { key: 'delete', handler: deleteSelected },
 *   { key: 'escape', handler: clearSelection },
 * ]);
 * ```
 */
export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcutHandler[],
  enabled: boolean = true
): void {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!enabled) return;
    
    // 忽略输入框中的快捷键
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      return;
    }

    for (const shortcut of shortcuts) {
      if (matchesShortcut(e, shortcut.key)) {
        if (shortcut.preventDefault !== false) {
          e.preventDefault();
        }
        shortcut.handler(e);
        break;
      }
    }
  }, [shortcuts, enabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * 常用快捷键常量
 */
export const SHORTCUTS = {
  // 编辑操作
  UNDO: 'ctrl+z',
  REDO: 'ctrl+shift+z',
  DELETE: 'delete',
  BACKSPACE: 'backspace',
  ESCAPE: 'escape',
  SELECT_ALL: 'ctrl+a',
  COPY: 'ctrl+c',
  PASTE: 'ctrl+v',
  CUT: 'ctrl+x',
  DUPLICATE: 'ctrl+d',
  SAVE: 'ctrl+s',
  EXPORT: 'ctrl+e',
  
  // 移动操作
  MOVE_UP: 'arrowup',
  MOVE_DOWN: 'arrowdown',
  MOVE_LEFT: 'arrowleft',
  MOVE_RIGHT: 'arrowright',
  MOVE_UP_FAST: 'shift+arrowup',
  MOVE_DOWN_FAST: 'shift+arrowdown',
  MOVE_LEFT_FAST: 'shift+arrowleft',
  MOVE_RIGHT_FAST: 'shift+arrowright',
  
  // 层级操作
  BRING_FORWARD: 'ctrl+]',
  SEND_BACKWARD: 'ctrl+[',
  BRING_TO_FRONT: 'ctrl+shift+]',
  SEND_TO_BACK: 'ctrl+shift+[',
  
  // 锁定
  LOCK: 'ctrl+l',
  
  // 工具切换
  TOOL_SELECT: 'v',
  TOOL_BRUSH: 'b',
} as const;

