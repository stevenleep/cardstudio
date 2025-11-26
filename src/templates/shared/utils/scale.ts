/**
 * 模版缩放工具
 * 
 * 基于标准设计尺寸 1080 进行缩放计算
 */

const BASE_WIDTH = 1080;

/**
 * 创建缩放计算器
 */
export const createScaler = (width: number, height: number) => {
  const scale = width / BASE_WIDTH;
  const margin = width * 0.08;
  const contentWidth = width - margin * 2;

  return {
    // 基础值
    scale,
    margin,
    contentWidth,
    width,
    height,

    // 缩放函数
    s: (value: number) => value * scale,

    // 常用布局位置 (基于比例)
    pos: {
      topBanner: height * 0.06,
      mainTitle: height * 0.12,
      subtitle: height * 0.29,
      features: height * 0.37,
      bottom: height * 0.80,
      footer: height * 0.94,
    },
  };
};

export type Scaler = ReturnType<typeof createScaler>;

