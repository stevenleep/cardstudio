/**
 * 卡片类预设 - Neo-Brutalism 风格
 * 
 * Neo-Brutalism 特征：
 * - 粗黑边框
 * - 硬阴影 (无模糊)
 * - 无圆角或小圆角
 * - 高对比度
 */
import type { RectElement } from '../../types/customElements';
import type { ElementPreset } from './types';

const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

// Neo-Brutalism 硬阴影
const NEO_SHADOW = {
  enabled: true,
  color: '#000000',
  blur: 0,
  offsetX: 5,
  offsetY: 5,
  spread: 0,
};

// Neo 大硬阴影（用于卡片）
const NEO_SHADOW_LG = {
  enabled: true,
  color: '#000000',
  blur: 0,
  offsetX: 8,
  offsetY: 8,
  spread: 0,
};

// Neo 经典配色
const NEO_COLORS = {
  yellow: '#FFE566',
  pink: '#FF90E8',
  blue: '#90D5FF',
  mint: '#A7F3D0',
  white: '#FFFFFF',
};

export const cardPresets: ElementPreset[] = [
  {
    id: 'card',
    name: '卡片',
    category: 'card',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 280,
      rotation: 0,
      zIndex: 0,
      fill: NEO_COLORS.white,
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0, // Neo 风格无圆角
      shadow: { ...NEO_SHADOW_LG },
    } as RectElement)
  },
  {
    id: 'card-colored',
    name: '彩色卡片',
    category: 'card',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 280,
      rotation: 0,
      zIndex: 0,
      fill: NEO_COLORS.blue,
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW_LG },
    } as RectElement)
  },
  {
    id: 'tag',
    name: '标签框',
    category: 'card',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 140,
      height: 48,
      rotation: 0,
      zIndex: 0,
      fill: '#000000',
      stroke: '#000000',
      strokeWidth: 0,
      cornerRadius: 0, // Neo 风格无圆角
    } as RectElement)
  },
  {
    id: 'button',
    name: '按钮',
    category: 'card',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 180,
      height: 56,
      rotation: 0,
      zIndex: 0,
      fill: NEO_COLORS.yellow,
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'pill',
    name: '胶囊',
    category: 'card',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 160,
      height: 48,
      rotation: 0,
      zIndex: 0,
      fill: NEO_COLORS.pink,
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 24, // 胶囊保留圆角
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'banner',
    name: '横幅',
    category: 'card',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 500,
      height: 100,
      rotation: 0,
      zIndex: 0,
      fill: NEO_COLORS.mint,
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
];
