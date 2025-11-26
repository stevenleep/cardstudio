/**
 * 模块相关类型定义
 * 
 * 定义卡片内容模块的数据结构
 */

/**
 * 模块 ID
 */
export type ModuleId = 
  | 'topBanner'
  | 'mainTitle'
  | 'subtitle'
  | 'features'
  | 'brand'
  | 'footer'
  | 'qrCode';

/**
 * 二维码模式
 */
export type QRCodeMode = 'text' | 'image';

/**
 * 全局卡片数据
 */
export interface GlobalCardData {
  /** 顶部横幅 */
  topBanner: string;
  /** 主标题 */
  mainTitle: string;
  /** 副标题 */
  subtitle: string;
  /** 特点列表 */
  features: string[];
  /** 品牌名称 */
  brand: string;
  /** 页脚文本 */
  footer: string;
  /** 二维码内容/图片 URL */
  qrCode: string;
  /** 二维码模式 */
  qrCodeMode: QRCodeMode;
}

/**
 * 模块配置类型
 */
export type ModuleInputType = 'text' | 'textarea' | 'list';

/**
 * 模块配置
 */
export interface ModuleConfig {
  /** 模块 ID */
  id: ModuleId;
  /** 显示标签 */
  label: string;
  /** 输入类型 */
  type: ModuleInputType;
  /** 占位符 */
  placeholder?: string;
  /** 是否可见 */
  visible: boolean;
}

/**
 * 模块可见性映射
 */
export type ModuleVisibility = Record<ModuleId, boolean>;

/**
 * 模块元数据
 */
export interface ModuleMeta {
  label: string;
  type: ModuleInputType;
  placeholder?: string;
}

// ============================================================================
// 默认值
// ============================================================================

/**
 * 默认卡片数据
 */
export const defaultGlobalData: GlobalCardData = {
  topBanner: '限时活动',
  mainTitle: '邀请好友 享好礼',
  subtitle: '分享越多 奖励越多',
  features: ['新用户立享优惠', '邀请好友得奖励', '扫码立即参与'],
  brand: 'YOUR BRAND',
  footer: '长按识别二维码 立即参与活动',
  qrCode: '',
  qrCodeMode: 'text'
};

/**
 * 所有模块配置
 */
export const ALL_MODULES: Record<ModuleId, ModuleMeta> = {
  topBanner: { 
    label: '顶部标签', 
    type: 'text', 
    placeholder: 'NEW' 
  },
  mainTitle: { 
    label: '主标题', 
    type: 'textarea', 
    placeholder: '输入主标题' 
  },
  subtitle: { 
    label: '副标题', 
    type: 'text', 
    placeholder: '输入副标题' 
  },
  features: { 
    label: '特点列表', 
    type: 'list', 
    placeholder: '输入特点' 
  },
  brand: { 
    label: '品牌名称', 
    type: 'text', 
    placeholder: '你的品牌' 
  },
  footer: { 
    label: '页脚文本', 
    type: 'text', 
    placeholder: '页脚信息' 
  },
  qrCode: { 
    label: '二维码', 
    type: 'text', 
    placeholder: '输入链接或文本' 
  }
};

/**
 * 默认模块可见性
 */
export const defaultModuleVisibility: ModuleVisibility = {
  topBanner: true,
  mainTitle: true,
  subtitle: true,
  features: true,
  brand: true,
  footer: true,
  qrCode: true,
};
