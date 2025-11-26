import React, { createContext, useContext, useMemo } from 'react';
import type { TemplateRendererProps } from '../../types/template';
import { createColorUtils } from './utils/color';
import { createScaler, type Scaler } from './utils/scale';

/**
 * 模版渲染上下文类型
 */
export interface TemplateContextValue {
  // 原始 props
  data: TemplateRendererProps['data'];
  moduleVisibility: TemplateRendererProps['moduleVisibility'];
  onElementClick?: TemplateRendererProps['onElementClick'];
  
  // 颜色工具
  colors: ReturnType<typeof createColorUtils>;
  
  // 缩放工具
  scaler: Scaler;
}

const TemplateContext = createContext<TemplateContextValue | null>(null);

/**
 * 模版上下文 Provider
 */
export const TemplateProvider: React.FC<{
  props: TemplateRendererProps;
  children: React.ReactNode;
}> = ({ props, children }) => {
  const { data, moduleVisibility, onElementClick, colorScheme, width, height } = props;

  const value = useMemo<TemplateContextValue>(() => ({
    data,
    moduleVisibility,
    onElementClick,
    colors: createColorUtils(colorScheme),
    scaler: createScaler(width, height),
  }), [data, moduleVisibility, onElementClick, colorScheme, width, height]);

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

/**
 * 使用模版上下文
 */
export const useTemplate = (): TemplateContextValue => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within TemplateProvider');
  }
  return context;
};

/**
 * 快捷获取缩放值
 */
export const useScaler = () => useTemplate().scaler;

/**
 * 快捷获取颜色值
 */
export const useColors = () => useTemplate().colors;

