import React from 'react';
import { Group } from 'react-konva';
import { TemplateProvider } from '../shared';
import type { TemplateRendererProps } from '../../types';
import {
  Background,
  Decorations,
  PixelDivider,
  TopBanner,
  MainTitle,
  Subtitle,
  FeatureList,
  BottomSection,
} from './components';

/**
 * 像素风格模版渲染器
 * 
 * 职责：组合各个分层组件
 */
export const PixelStyleRenderer: React.FC<TemplateRendererProps> = (props) => {
  return (
    <TemplateProvider props={props}>
      <Group>
        {/* 背景层 */}
        <Background />
        
        {/* 装饰层 */}
        <Decorations />
        
        {/* 内容层 */}
        <TopBanner />
        <MainTitle />
        <Subtitle />
        <FeatureList />
        <PixelDivider />
        <BottomSection />
      </Group>
    </TemplateProvider>
  );
};
