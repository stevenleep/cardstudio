/**
 * 故障美学模版配置
 */

// 布局配置
export const layout = {
  width: 1080,
  height: 1920,
  backgroundColor: '#000000',
  
  // 特点列表配置
  featureList: {
    itemHeight: 80,
    minY: 0.42,
    maxY: 0.58,
    bottomY: 0.84,
    bottomMargin: 50,
  },
};

// 样式配置
export const styles = {
  // 故障偏移量
  glitch: {
    lg: 15,
    md: 10,
    sm: 6,
  },
  topBanner: {
    fontSize: 22,
    fontWeight: 'italic 700',
    letterSpacing: 8,
  },
  mainTitle: {
    fontSize: 170,
    fontWeight: 'italic 900',
    lineHeight: 0.95,
  },
  subtitle: {
    fontSize: 26,
    fontWeight: 'italic 400',
    lineHeight: 1.8,
  },
  feature: {
    numberSize: 40,
    fontSize: 30,
    fontWeight: 'italic 600',
    noteSize: 38,
  },
  brand: {
    fontSize: 56,
    fontWeight: 'italic 800',
  },
  footer: {
    fontSize: 18,
    fontWeight: 'italic 400',
  },
  qrCode: {
    size: 220,
    borderOffset: 12,
    borderWidth: 2,
  },
};

// 字体配置
export const fonts = {
  display: '"SF Pro Display", "PingFang SC", -apple-system, sans-serif',
  text: '"SF Pro Text", "PingFang SC", sans-serif',
  mono: '"SF Mono", monospace',
  note: 'Arial, sans-serif',
};

// 音符符号
export const musicNotes = ['♪', '♫', '♬', '♩'];

// 右侧音符装饰配置
export const noteDecorations = [
  { y: 0.12, note: '♪', size: 48, opacity: 0.7 },
  { y: 0.22, note: '♫', size: 36, opacity: 0.5 },
  { y: 0.35, note: '♬', size: 42, opacity: 0.4 },
  { y: 0.50, note: '♪', size: 32, opacity: 0.35 },
];

