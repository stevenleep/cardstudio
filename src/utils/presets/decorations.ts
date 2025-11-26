/**
 * 装饰类预设 - Neo-Brutalism 风格
 * 
 * Neo-Brutalism 特征：
 * - 粗黑边框
 * - 硬阴影
 * - 高饱和度色彩
 * - 几何形状
 */
import type { RectElement, CircleElement } from '../../types/customElements';
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

// Neo 经典配色
const NEO_COLORS = {
  yellow: '#FFE566',
  pink: '#FF90E8',
  blue: '#90D5FF',
  mint: '#A7F3D0',
  orange: '#FFAB5C',
  purple: '#C4B5FD',
  red: '#FCA5A5',
};

export const decorationPresets: ElementPreset[] = [
  {
    id: 'color-block',
    name: '色块',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 200,
      rotation: 0,
      zIndex: -1,
      fill: NEO_COLORS.yellow,
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'gradient-block',
    name: '渐变块',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 250,
      rotation: 0,
      zIndex: 0,
      fill: {
        type: 'linear',
        angle: 135,
        stops: [
          { offset: 0, color: NEO_COLORS.pink },
          { offset: 1, color: NEO_COLORS.purple },
        ],
      },
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0, // Neo 风格无圆角
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'ring',
    name: '圆环',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('circle'),
      type: 'circle',
      x, y,
      width: 160,
      height: 160,
      rotation: 0,
      zIndex: 0,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 5,
      radius: 80,
      shadow: { ...NEO_SHADOW },
    } as CircleElement)
  },
  {
    id: 'dot',
    name: '圆点',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('circle'),
      type: 'circle',
      x, y,
      width: 80,
      height: 80,
      rotation: 0,
      zIndex: 0,
      fill: NEO_COLORS.orange,
      stroke: '#000000',
      strokeWidth: 3,
      radius: 40,
      shadow: { ...NEO_SHADOW },
    } as CircleElement)
  },
  {
    id: 'stripe',
    name: '条纹块',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 120,
      rotation: 0,
      zIndex: 0,
      fill: {
        type: 'repeating-linear',
        angle: 45,
        stops: [
          { offset: 0, color: '#000000' },
          { offset: 0.1, color: '#000000' },
          { offset: 0.1, color: NEO_COLORS.yellow },
          { offset: 0.2, color: NEO_COLORS.yellow },
        ],
      },
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'divider',
    name: '分割线',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 4,
      rotation: 0,
      zIndex: 0,
      fill: '#000000',
      stroke: 'transparent',
      strokeWidth: 0,
      cornerRadius: 0,
    } as RectElement)
  },
  {
    id: 'divider-dashed',
    name: '虚线分割',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 4,
      rotation: 0,
      zIndex: 0,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 4,
      cornerRadius: 0,
      dashEnabled: true,
      dash: [16, 8],
    } as RectElement)
  },
  {
    id: 'checker',
    name: '棋盘格',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 200,
      height: 200,
      rotation: 0,
      zIndex: 0,
      fill: {
        type: 'conic',
        angle: 45,
        stops: [
          { offset: 0, color: '#000000' },
          { offset: 0.25, color: '#000000' },
          { offset: 0.25, color: '#FFFFFF' },
          { offset: 0.5, color: '#FFFFFF' },
          { offset: 0.5, color: '#000000' },
          { offset: 0.75, color: '#000000' },
          { offset: 0.75, color: '#FFFFFF' },
          { offset: 1, color: '#FFFFFF' },
        ],
      },
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'zigzag',
    name: '锯齿块',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 400,
      height: 100,
      rotation: 0,
      zIndex: 0,
      fill: {
        type: 'repeating-linear',
        angle: 135,
        stops: [
          { offset: 0, color: NEO_COLORS.pink },
          { offset: 0.15, color: NEO_COLORS.pink },
          { offset: 0.15, color: NEO_COLORS.blue },
          { offset: 0.3, color: NEO_COLORS.blue },
        ],
      },
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'corner',
    name: '装饰角',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 80,
      height: 80,
      rotation: 45,
      zIndex: 0,
      fill: NEO_COLORS.orange,
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'half-circle',
    name: '半圆',
    category: 'decoration',
    create: (x, y) => ({
      id: uid('circle'),
      type: 'circle',
      x, y,
      width: 200,
      height: 100,
      rotation: 0,
      zIndex: 0,
      fill: NEO_COLORS.purple,
      stroke: '#000000',
      strokeWidth: 3,
      radius: 100,
      shadow: { ...NEO_SHADOW },
    } as CircleElement)
  },
];
