/**
 * Neo-Brutalism 模版配置
 */

// 布局配置
export const layout = {
  width: 1080,
  height: 1920,
  backgroundColor: '#FFFF00',
  
  // 布局位置
  sections: {
    topBanner: 0.055,
    mainTitle: 0.125,
    subtitle: 0.30,
    features: 0.40,
    bottom: 0.77,
    footer: -55, // 从底部算起
  },

  // 特点列表配置
  featureList: {
    itemHeight: 85,
    itemSpacing: 18,
  },
  
  // 边框与阴影
  borderWidth: 3.5,
  shadowOffset: 6,
};

// 样式配置
export const styles = {
  topBanner: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    height: 44,
  },
  mainTitle: {
    fontSize: 78,
    fontWeight: '800',
    lineHeight: 1.08,
    letterSpacing: -1,
    shadowOffset: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 1.3,
    height: 65,
    padding: 22,
  },
  feature: {
    numberSize: 32,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 1.35,
  },
  brand: {
    logoSize: 65,
    fontSize: 32,
    fontWeight: '700',
    letterSize: 32,
    underlineHeight: 5,
  },
  footer: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 1.7,
    opacity: 0.65,
  },
  qrCode: {
    cardWidth: 185,
    cardHeight: 225,
    topBarHeight: 18,
    innerSize: 141,
    innerPadding: 22,
    qrSize: 125,
    qrPadding: 30,
    labelSize: 14,
  },
  decoration: {
    circleSmall: 60,
    circleLarge: 90,
    starSizeSmall: 22,
    starSizeLarge: 28,
    footerBarHeight: 55,
  },
};

// 字体配置
export const fonts = {
  display: '"Space Grotesk", "Noto Sans SC", sans-serif',
  mono: '"Space Grotesk", monospace',
};

