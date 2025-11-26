/**
 * 霓虹暗夜模版配置
 */

// 布局配置
export const layout = {
  width: 1080,
  height: 1920,
  backgroundColor: '#000000',
  
  // 布局位置 (基于比例)
  sections: {
    topBanner: 0.065,
    mainTitle: 0.15,
    subtitle: 0.39,
    features: 0.48,
    bottom: 0.76,
  },

  // 特点列表配置
  featureList: {
    itemHeight: 82,
  },
};

// 样式配置
export const styles = {
  topBanner: {
    fontSize: 26,
    fontWeight: '500',
    letterSpacing: 4,
    lineHeight: 48,
    lineWidth: 5,
  },
  mainTitle: {
    fontSize: 125,
    fontWeight: '800',
    lineHeight: 1.08,
    glowBlur: 80,
    glowBlurSecondary: 60,
    glowOffset: 3,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '400',
    lineHeight: 1.6,
  },
  feature: {
    fontSize: 30,
    fontWeight: '500',
    numberSize: 22,
    lineHeight: 1.5,
  },
  brand: {
    fontSize: 60,
    fontWeight: '700',
    letterSpacing: -1,
    decorLineWidth: 120,
    decorLineHeight: 5,
  },
  footer: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 1.5,
  },
  qrCode: {
    size: 240,
    innerSize: 216,
    innerPadding: 12,
    cornerRadius: 14,
    glowRadius: 150,
  },
};

// 字体配置
export const fonts = {
  display: '"SF Pro Display", "PingFang SC", -apple-system, BlinkMacSystemFont, sans-serif',
  text: '"SF Pro Text", "PingFang SC", sans-serif',
  mono: '"SF Mono", "JetBrains Mono", monospace',
};

