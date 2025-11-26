/**
 * 配置面板 - Neo-Brutalism 风格
 */
import React from 'react';
import { useCardStore } from '../../store/cardStore';
import { TemplateSelector } from './TemplateSelector';
import { ColorSchemePicker } from './ColorSchemePicker';
import { ModuleVisibilityControl } from './ModuleVisibilityControl';

export const ConfigPanel: React.FC = () => {
  const { currentTemplate } = useCardStore();

  if (!currentTemplate) return null;

  return (
    <div>
      <TemplateSelector />
      <ColorSchemePicker />
      <ModuleVisibilityControl />
    </div>
  );
};
