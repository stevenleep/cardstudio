/**
 * 通用 UI 样式常量 - Neo-Brutalism 设计系统
 * Based on: https://www.neobrutalism.dev/
 */

/**
 * Neo-Brutalism 风格类名
 */
export const brutal = {
  // 基础容器效果
  base: 'bg-bw border-2 border-border',
  elevated: 'bg-bw border-2 border-border shadow-brutal',
  
  // 边框
  border: 'border-2 border-border',
  borderLight: 'border-2 border-border/50',
  
  // 按钮样式
  button: 'btn',
  buttonPrimary: 'btn btn-primary',
  buttonSecondary: 'btn btn-secondary',
  buttonGhost: 'btn btn-ghost',
  buttonDanger: 'btn btn-danger',
  
  // 输入框样式
  input: 'input',
  inputMono: 'input input-mono',
  inputSm: 'input input-sm',
  
  // 卡片样式
  card: 'card',
  cardStatic: 'card-static',
  cardFlat: 'card-flat',
  
  // 标签样式
  label: 'label',
  
  // 徽章
  badge: 'badge',
  badgePrimary: 'badge badge-primary',
  badgeSecondary: 'badge badge-secondary',
} as const;

/**
 * 保持向后兼容的 glass 别名
 */
export const glass = brutal;

/**
 * 组合样式生成器
 */
export const cn = (...classes: (string | undefined | false | null)[]) => 
  classes.filter(Boolean).join(' ');

/**
 * 间距常量
 */
export const spacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
} as const;

/**
 * 颜色常量 - Neo-Brutalism 主题
 */
export const colors = {
  // 背景色
  bg: '#e3dff2',
  bgSecondary: '#ddd6fe',
  bw: '#ffffff',
  
  // 文字色
  text: '#000000',
  textSecondary: '#666666',
  textMuted: '#888888',
  
  // 边框色
  border: '#000000',
  
  // 主强调色 - 明亮黄
  main: '#FFE566',
  mainAccent: '#FFC800',
  
  // 功能色
  success: '#22c55e',
  warning: '#eab308',
  danger: '#ef4444',
  info: '#3b82f6',
  
  // 额外色板
  pink: '#ff6b9d',
  purple: '#c084fc',
  cyan: '#22d3d1',
  orange: '#fb923c',
  yellow: '#facc15',
} as const;

/**
 * 阴影常量 - Neo-Brutalism 硬阴影
 */
export const shadows = {
  brutal: '4px 4px 0px 0px #000000',
  brutalSm: '2px 2px 0px 0px #000000',
  brutalLg: '6px 6px 0px 0px #000000',
  brutalXl: '8px 8px 0px 0px #000000',
  none: 'none',
} as const;

/**
 * 动画过渡
 */
export const transitions = {
  fast: 'transition-all duration-100 ease-out',
  normal: 'transition-all duration-150 ease-out',
  slow: 'transition-all duration-200 ease-out',
} as const;
