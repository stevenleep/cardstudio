/**
 * 像素风格模版配置
 */

// 布局配置
export const layout = {
  width: 1080,
  height: 1920,
  backgroundColor: '#FFFFFF',
  
  // 像素基础单位
  pixelSize: 12,
  
  // 布局位置
  sections: {
    topBanner: 0.07,
    mainTitle: 0.14,
    subtitle: 0.29,
    features: 0.36,
    divider: 0.70,
    bottom: 0.73,
  },

  // 特点列表配置
  featureList: {
    itemHeight: 90,
  },
};

// 样式配置
export const styles = {
  topBanner: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
    pillHeight: 4, // 像素单位
  },
  mainTitle: {
    fontSize: 54,
    fontWeight: '900',
    lineHeight: 1.15,
    shadowOffset: 0.6, // 像素单位
  },
  subtitle: {
    fontSize: 20,
    opacity: 0.7,
  },
  feature: {
    numberSize: 22,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 1.4,
    blockSize: 4, // 像素单位
  },
  brand: {
    fontSize: 26,
    fontWeight: '700',
    logoSize: 5, // 像素单位
  },
  footer: {
    fontSize: 13,
    opacity: 0.5,
  },
  qrCode: {
    size: 150,
    innerSize: 110,
    innerPadding: 20,
    labelSize: 14,
  },
};

// 字体配置
export const fonts = {
  pixel: 'monospace',
  text: '"Noto Sans SC", sans-serif',
};

