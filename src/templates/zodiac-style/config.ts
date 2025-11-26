/**
 * 星座占卜模版配置
 */

// 布局配置
export const layout = {
  width: 1080,
  height: 1920,
  backgroundColor: '#0A0A1A',
  margin: 0.10,
  
  // 布局位置
  sections: {
    topBanner: 0.08,
    mainTitle: 0.14,
    subtitle: 0.30,
    features: 0.40,
    bottom: 0.84,
    footer: 0.96,
  },

  // 特点列表配置
  featureList: {
    itemHeight: 75,
    spacing: 12,
    cornerRadius: 6,
  },
  
  // 星星数量
  starCount: 35,
};

// 样式配置
export const styles = {
  topBanner: {
    fontSize: 14,
    fontWeight: 'italic 400',
    letterSpacing: 8,
    opacity: 0.45,
  },
  mainTitle: {
    fontSize: 78,
    fontWeight: '300',
    lineHeight: 1.2,
    letterSpacing: 3,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'italic 300',
    lineHeight: 1.8,
    letterSpacing: 1,
    opacity: 0.5,
  },
  feature: {
    fontSize: 22,
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.8,
    lineWidth: 2,
  },
  brand: {
    fontSize: 32,
    fontWeight: '400',
    letterSpacing: 4,
    opacity: 0.85,
  },
  footer: {
    fontSize: 13,
    fontWeight: 'italic 300',
    letterSpacing: 1,
    opacity: 0.35,
  },
  qrCode: {
    size: 150,
    innerSize: 134,
    innerPadding: 8,
    cornerRadius: 4,
  },
};

// 字体配置
export const fonts = {
  display: '"Cormorant Garamond", "Noto Serif SC", Georgia, serif',
};

