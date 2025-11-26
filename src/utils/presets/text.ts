/**
 * 文字类预设 - Neo-Brutalism 风格
 * 
 * Neo-Brutalism 特征：
 * - 粗字体 (bold/black)
 * - 文字描边
 * - 高对比度
 */
import type { TextElement } from '../../types/customElements';
import type { ElementPreset } from './types';

const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
const FONT = '"PingFang SC", "Microsoft YaHei", sans-serif';

// Neo-Brutalism 硬阴影
const NEO_TEXT_SHADOW = {
  enabled: true,
  color: '#000000',
  blur: 0,
  offsetX: 3,
  offsetY: 3,
  spread: 0,
};

export const textPresets: ElementPreset[] = [
  {
    id: 'title',
    name: '标题',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 500,
      height: 100,
      rotation: 0,
      zIndex: 0,
      text: '标题文字',
      fontSize: 72,
      fontFamily: FONT,
      fontWeight: '900',
      fill: '#000000',
      align: 'left',
      lineHeight: 1.2,
      stroke: '#000000',
      strokeWidth: 0,
    } as TextElement)
  },
  {
    id: 'body',
    name: '正文',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 500,
      height: 100,
      rotation: 0,
      zIndex: 0,
      text: '正文内容',
      fontSize: 32,
      fontFamily: FONT,
      fontWeight: '700', // Neo 风格用粗体
      fill: '#000000',
      align: 'left',
      lineHeight: 1.5,
    } as TextElement)
  },
  {
    id: 'label',
    name: '标签',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 150,
      height: 50,
      rotation: 0,
      zIndex: 0,
      text: '标签',
      fontSize: 28,
      fontFamily: FONT,
      fontWeight: '800',
      fill: '#FFFFFF',
      align: 'center',
      lineHeight: 1.2,
      backgroundColor: '#000000',
      backgroundPadding: 12,
      backgroundRadius: 0, // Neo 风格无圆角
    } as TextElement)
  },
  {
    id: 'highlight',
    name: '高亮文字',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 300,
      height: 70,
      rotation: 0,
      zIndex: 0,
      text: '高亮',
      fontSize: 48,
      fontFamily: FONT,
      fontWeight: '900',
      fill: '#000000',
      align: 'center',
      lineHeight: 1.2,
      backgroundColor: '#FFE566', // Neo 黄色背景
      backgroundPadding: 16,
      backgroundRadius: 0,
      shadow: { ...NEO_TEXT_SHADOW },
    } as TextElement)
  },
  {
    id: 'subtitle',
    name: '副标题',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 400,
      height: 60,
      rotation: 0,
      zIndex: 0,
      text: '副标题文字',
      fontSize: 36,
      fontFamily: FONT,
      fontWeight: '700',
      fill: '#000000',
      align: 'left',
      lineHeight: 1.3,
    } as TextElement)
  },
  {
    id: 'caption',
    name: '注释',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 300,
      height: 40,
      rotation: 0,
      zIndex: 0,
      text: '注释说明文字',
      fontSize: 24,
      fontFamily: FONT,
      fontWeight: '500',
      fill: '#666666',
      align: 'left',
      lineHeight: 1.4,
    } as TextElement)
  },
  {
    id: 'badge',
    name: '徽章',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 100,
      height: 40,
      rotation: 0,
      zIndex: 0,
      text: 'NEW',
      fontSize: 20,
      fontFamily: FONT,
      fontWeight: '800',
      fill: '#FFFFFF',
      align: 'center',
      lineHeight: 1,
      backgroundColor: '#FF4444',
      backgroundPadding: 10,
      backgroundRadius: 0,
      shadow: { ...NEO_TEXT_SHADOW },
    } as TextElement)
  },
  {
    id: 'number',
    name: '数字',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 150,
      height: 120,
      rotation: 0,
      zIndex: 0,
      text: '01',
      fontSize: 96,
      fontFamily: '"SF Mono", "JetBrains Mono", monospace',
      fontWeight: '900',
      fill: '#000000',
      align: 'center',
      lineHeight: 1,
      stroke: '#000000',
      strokeWidth: 2,
    } as TextElement)
  },
  {
    id: 'quote',
    name: '引用',
    category: 'text',
    create: (x, y) => ({
      id: uid('text'),
      type: 'text',
      x, y,
      width: 500,
      height: 150,
      rotation: 0,
      zIndex: 0,
      text: '"这是一段引用文字，可以用来展示重要的话语。"',
      fontSize: 28,
      fontFamily: FONT,
      fontWeight: '600',
      fontStyle: 'italic',
      fill: '#000000',
      align: 'left',
      lineHeight: 1.6,
      backgroundColor: '#F5F5F5',
      backgroundPadding: 24,
      backgroundRadius: 0,
    } as TextElement)
  },
];
