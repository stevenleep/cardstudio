import { RetroVibesRenderer } from './renderer';
import { layout } from './config';
import { type ModuleId } from '../../types/modules';

export const retroVibesTemplate = {
  id: 'retro-vibes',
  name: '新中式',
  description: '传统韵味 · 现代表达',
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
  Renderer: RetroVibesRenderer
};
