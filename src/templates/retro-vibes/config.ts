/**
 * 新中式复古模版配置
 */

// 布局配置
export const layout = {
  width: 1080,
  height: 1920,
  backgroundColor: '#F5F5F0',
  margin: 0.10,
  
  // 布局位置
  sections: {
    topBanner: 0.08,
    mainTitle: 0.12,
    subtitle: 0.14,
    divider: 0.30,
    features: 0.34,
    bottom: 0.82,
    footer: 0.965,
  },

  // 特点列表配置
  featureList: {
    itemHeight: 110,
  },
};

// 样式配置
export const styles = {
  topBanner: {
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 6,
    opacity: 0.5,
  },
  mainTitle: {
    fontSize: 78,
    fontWeight: '600',
    lineHeight: 90, // 字符高度
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
    lineHeight: 2.2,
    letterSpacing: 3,
    opacity: 0.55,
  },
  feature: {
    numberSize: 36,
    fontSize: 36,
    fontWeight: '400',
    letterSpacing: 2,
    lineHeight: 1.4,
    opacity: 0.9,
  },
  brand: {
    fontSize: 26,
    fontWeight: '600',
    letterSpacing: 6,
  },
  footer: {
    fontSize: 13,
    fontWeight: '300',
    letterSpacing: 2,
    lineHeight: 1.8,
    opacity: 0.4,
  },
  qrCode: {
    size: 135,
    innerSize: 119,
    innerPadding: 8,
    containerSize: 165,
  },
};

// 字体配置
export const fonts = {
  serif: '"Noto Serif SC", "Source Han Serif SC", "SimSun", serif',
};

// 中文数字映射
export const chineseNumerals = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾'];

