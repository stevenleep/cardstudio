/**
 * 路径/画笔元素样式编辑器
 */
import React from 'react';
import { 
  CollapsibleSection, 
  PropertySlider, 
  ColorInput, 
  ButtonGroupSelector,
} from './CollapsibleSection';
import type { PathElement } from '../../../types';

interface PathStyleEditorProps {
  element: PathElement;
  onUpdate: (updates: Partial<PathElement>) => void;
}

const LINE_CAP_OPTIONS = [
  { value: 'butt' as const, label: '平' },
  { value: 'round' as const, label: '圆' },
  { value: 'square' as const, label: '方' },
];

const LINE_JOIN_OPTIONS = [
  { value: 'miter' as const, label: '尖' },
  { value: 'round' as const, label: '圆' },
  { value: 'bevel' as const, label: '斜' },
];

export const PathStyleEditor: React.FC<PathStyleEditorProps> = ({
  element,
  onUpdate,
}) => {
  return (
    <div className="space-y-5">
      {/* 描边 */}
      <CollapsibleSection title="描边" defaultOpen>
        <ColorInput
          value={element.stroke}
          onChange={(stroke) => onUpdate({ stroke })}
        />

        <PropertySlider
          label="粗细"
          value={element.strokeWidth}
          onChange={(strokeWidth) => onUpdate({ strokeWidth })}
          min={1}
          max={50}
          step={1}
          unit="px"
        />

        <ButtonGroupSelector
          label="线端"
          options={LINE_CAP_OPTIONS}
          value={element.lineCap || 'round'}
          onChange={(lineCap) => onUpdate({ lineCap })}
          compact
        />

        <ButtonGroupSelector
          label="拐角"
          options={LINE_JOIN_OPTIONS}
          value={element.lineJoin || 'round'}
          onChange={(lineJoin) => onUpdate({ lineJoin })}
          compact
        />
      </CollapsibleSection>

      {/* 平滑度 */}
      <CollapsibleSection title="曲线">
        <PropertySlider
          label="平滑度"
          value={element.tension ?? 0.5}
          onChange={(tension) => onUpdate({ tension })}
          min={0}
          max={1}
          step={0.1}
        />
      </CollapsibleSection>
    </div>
  );
};

