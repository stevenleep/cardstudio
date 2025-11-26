import React from 'react';
import { Group } from 'react-konva';
import { TemplateProvider } from '../shared';
import type { TemplateRendererProps } from '../../types';
import {
  Background,
  Decorations,
  FooterDecorations,
  TopBanner,
  MainTitle,
  Subtitle,
  FeatureList,
  BottomSection,
} from './components';

/**
 * 简约现代模版渲染器
 * 
 * 职责：组合各个分层组件
 */
export const MinimalRenderer: React.FC<TemplateRendererProps> = (props) => {
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
        <BottomSection />
        
        {/* 底部装饰 */}
        <FooterDecorations />
      </Group>
    </TemplateProvider>
  );
};
