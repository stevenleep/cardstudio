/**
 * 形状类预设 - Neo-Brutalism 风格
 * 
 * Neo-Brutalism 特征：
 * - 粗黑边框 (3-5px)
 * - 硬阴影 (无模糊，纯色偏移)
 * - 高饱和度色彩
 * - 无圆角或小圆角
 */
import type { RectElement, CircleElement, ImageElement } from '../../types/customElements';
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

export const shapePresets: ElementPreset[] = [
  {
    id: 'rect',
    name: '矩形',
    category: 'shape',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 300,
      height: 200,
      rotation: 0,
      zIndex: 0,
      fill: '#FFE566', // Neo 经典黄
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'circle',
    name: '圆形',
    category: 'shape',
    create: (x, y) => ({
      id: uid('circle'),
      type: 'circle',
      x, y,
      width: 200,
      height: 200,
      rotation: 0,
      zIndex: 0,
      fill: '#A7F3D0', // Neo 薄荷绿
      stroke: '#000000',
      strokeWidth: 3,
      radius: 100,
      shadow: { ...NEO_SHADOW },
    } as CircleElement)
  },
  {
    id: 'line',
    name: '线条',
    category: 'shape',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 300,
      height: 5,
      rotation: 0,
      zIndex: 0,
      fill: '#000000',
      stroke: 'transparent',
      strokeWidth: 0,
      cornerRadius: 0,
    } as RectElement)
  },
  {
    id: 'image',
    name: '图片/二维码',
    category: 'shape',
    create: (x, y) => ({
      id: uid('image'),
      type: 'image',
      x, y,
      width: 200,
      height: 200,
      rotation: 0,
      zIndex: 0,
      src: '',
      opacity: 1,
      shadow: { ...NEO_SHADOW },
    } as ImageElement)
  },
  {
    id: 'rect-rounded',
    name: '圆角矩形',
    category: 'shape',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 300,
      height: 200,
      rotation: 0,
      zIndex: 0,
      fill: '#90D5FF', // Neo 天空蓝
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 16,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'square',
    name: '正方形',
    category: 'shape',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 200,
      height: 200,
      rotation: 0,
      zIndex: 0,
      fill: '#FF90E8', // Neo 粉色
      stroke: '#000000',
      strokeWidth: 3,
      cornerRadius: 0,
      shadow: { ...NEO_SHADOW },
    } as RectElement)
  },
  {
    id: 'rect-outline',
    name: '边框矩形',
    category: 'shape',
    create: (x, y) => ({
      id: uid('rect'),
      type: 'rect',
      x, y,
      width: 300,
      height: 200,
      rotation: 0,
      zIndex: 0,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 4,
      cornerRadius: 0,
    } as RectElement)
  },
  {
    id: 'circle-outline',
    name: '边框圆形',
    category: 'shape',
    create: (x, y) => ({
      id: uid('circle'),
      type: 'circle',
      x, y,
      width: 200,
      height: 200,
      rotation: 0,
      zIndex: 0,
      fill: 'transparent',
      stroke: '#000000',
      strokeWidth: 4,
      radius: 100,
    } as CircleElement)
  },
];
