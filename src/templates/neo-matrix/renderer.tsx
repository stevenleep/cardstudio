import React from 'react';
import { Group } from 'react-konva';
import { TemplateProvider } from '../shared';
import type { TemplateRendererProps } from '../../types';
import {
  Background,
  Decorations,
  FooterBar,
  TopBanner,
  MainTitle,
  Subtitle,
  FeatureList,
  BottomSection,
} from './components';

/**
 * Neo-Brutalism 模版渲染器
 * 
 * 职责：组合各个分层组件
 */
export const NeoBrutalismRenderer: React.FC<TemplateRendererProps> = (props) => {
  return (
    <TemplateProvider props={props}>
      <Group>
        {/* 背景层 */}
        <Background />
        
        {/* 内容层 */}
        <TopBanner />
        <MainTitle />
        <Subtitle />
        <FeatureList />
        <BottomSection />
        
        {/* 装饰层 */}
        <Decorations />
        <FooterBar />
      </Group>
    </TemplateProvider>
  );
};
