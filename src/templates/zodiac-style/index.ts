import { ZodiacStyleRenderer } from './renderer';
import { layout } from './config';
import { type ModuleId } from '../../types/modules';

export const zodiacStyleTemplate = {
  id: 'zodiac-style',
  name: '星座占卜',
  description: '神秘深邃 · 轻盈优雅',
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
  Renderer: ZodiacStyleRenderer
};
