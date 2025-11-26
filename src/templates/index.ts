import { minimalModernTemplate } from './minimal-modern';
import { neonDarkTemplate } from './neon-dark';
import { glitchStyleTemplate } from './glitch-style';
import { zodiacStyleTemplate } from './zodiac-style';
import { retroVibesTemplate } from './retro-vibes';
import { neoMatrixTemplate } from './neo-matrix';
import { pixelStyleTemplate } from './pixel-style';

// 重新导出模板类型
export type { TemplateModule, TemplateRendererProps } from '../types/template';

export const TEMPLATE_REGISTRY = [
  neonDarkTemplate,       // 默认模板
  minimalModernTemplate,
  glitchStyleTemplate,
  zodiacStyleTemplate,
  retroVibesTemplate,
  neoMatrixTemplate,
  pixelStyleTemplate
];
