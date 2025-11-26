/**
 * 简约现代模版配置
 */

// 布局配置
export const layout = {
  width: 1080,
  height: 1920,
  backgroundColor: '#FFFFFF',
  
  // 装饰角框
  corners: {
    size: 60,
    strokeWidth: 4,
    offset: 80
  },
  
  // 布局区域 (基于比例)
  sections: {
    topBanner: 0.06,
    mainTitle: 0.12,
    subtitle: 0.29,
    features: 0.37,
    bottom: 0.80,
    footer: 0.97,
  },

  // 特点列表配置
  featureList: {
    itemHeight: 88,
    spacing: 18,
    cornerRadius: 24,
  },
};

// 样式配置
export const styles = {
  topBanner: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
    pillRadius: 22,
    pillPadding: { x: 18, y: 12 },
  },
  mainTitle: {
    fontSize: 100,
    fontWeight: '800',
    lineHeight: 1.05,
    letterSpacing: -2,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 1.7,
    opacity: 0.5,
  },
  feature: {
    fontSize: 28,
    fontWeight: '600',
    numberSize: 20,
    opacity: 0.9,
  },
  brand: {
    fontSize: 34,
    fontWeight: '700',
  },
  footer: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.45,
    lineHeight: 1.6,
  },
  qrCode: {
    size: 165,
    containerSize: 195,
    innerPadding: 12,
    cornerRadius: 14,
  },
};

// 字体配置
export const fonts = {
  primary: '"Inter", "Noto Sans SC", sans-serif',
  mono: '"Inter", monospace',
};

