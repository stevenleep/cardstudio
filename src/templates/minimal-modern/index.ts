import { layout } from './config';
import { MinimalRenderer } from './renderer';
import { type ModuleId } from '../../types/modules';

export const minimalModernTemplate = {
  id: 'minimal-modern',
  name: '简约现代',
  description: '极简设计 · 专业传达',
  width: layout.width,
  height: layout.height,
  backgroundColor: layout.backgroundColor,
  showBorder: true,
  
  // 定义该模板默认显示的模块
  visibleModules: [
    'topBanner',
    'mainTitle',
    'subtitle',
    'features',
    'brand',
    'footer',
    'qrCode'
  ] as ModuleId[],
  
  Renderer: MinimalRenderer
};
