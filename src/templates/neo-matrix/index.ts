import { NeoBrutalismRenderer } from './renderer';
import { layout } from './config';
import { type ModuleId } from '../../types/modules';

export const neoMatrixTemplate = {
  id: 'neo-matrix',
  name: '新拟态',
  description: 'Neo-Brutalism · 大胆撞色',
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
  Renderer: NeoBrutalismRenderer
};
