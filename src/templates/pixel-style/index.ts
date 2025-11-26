import { PixelStyleRenderer } from './renderer';
import { layout } from './config';
import { type ModuleId } from '../../types/modules';

export const pixelStyleTemplate = {
  id: 'pixel-style',
  name: '像素复古',
  description: '8-bit 像素 · 游戏风格',
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
  Renderer: PixelStyleRenderer
};
