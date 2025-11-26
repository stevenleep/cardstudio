import { GlitchStyleRenderer } from './renderer';
import { layout } from './config';
import { type ModuleId } from '../../types/modules';

export const glitchStyleTemplate = {
  id: 'glitch-style',
  name: '故障美学',
  description: '抖音故障风 · 潮酷视觉',
  width: layout.width,
  height: layout.height,
  backgroundColor: layout.backgroundColor,
  showBorder: false,
  visibleModules: [
    'topBanner',
    'mainTitle',
    'subtitle',
    'features',
    'brand',
    'footer',
    'qrCode'
  ] as ModuleId[],
  Renderer: GlitchStyleRenderer
};
