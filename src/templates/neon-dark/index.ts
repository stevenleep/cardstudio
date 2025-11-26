import { NeonDarkRenderer } from './renderer';
import { layout } from './config';
import { type ModuleId } from '../../types/modules';

export const neonDarkTemplate = {
  id: 'neon-dark',
  name: '霓虹暗夜',
  description: '暗黑渐变 · 潮流视觉',
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
  Renderer: NeonDarkRenderer
};
