import React from 'react';
import { FlipHorizontal, FlipVertical, RotateCcw } from 'lucide-react';
import { CollapsibleSection, PropertyInput, SubLabel, PresetButton } from './CollapsibleSection';
import type { CustomElement, TransformStyle } from '../../../types';

interface TransformEditorProps {
  element: CustomElement;
  onUpdate: (updates: Partial<CustomElement>) => void;
}

export const TransformEditor: React.FC<TransformEditorProps> = ({
  element,
  onUpdate,
}) => {
  const transform: TransformStyle = element.transform || {};

  const handleTransformUpdate = (updates: Partial<TransformStyle>) => {
    onUpdate({
      transform: { ...transform, ...updates },
    });
  };

  const handleReset = () => {
    onUpdate({
      transform: {
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        flipH: false,
        flipV: false,
      },
    });
  };

  return (
    <CollapsibleSection
      title="变换"
      defaultOpen={false}
      actions={
        <button
          onClick={handleReset}
          className="p-1.5 rounded-lg text-text/40 hover:text-text/60 hover:bg-bg transition-colors"
          title="重置"
        >
          <RotateCcw size={14} strokeWidth={2.5} />
        </button>
      }
    >
      {/* 缩放 */}
      <div>
        <SubLabel>缩放</SubLabel>
        <div className="grid grid-cols-2 gap-3">
          <PropertyInput
            label="X"
            value={(transform.scaleX ?? 1) * 100}
            onChange={(v) => handleTransformUpdate({ scaleX: v / 100 })}
            min={1}
            max={500}
            step={1}
            unit="%"
            size="full"
          />
          <PropertyInput
            label="Y"
            value={(transform.scaleY ?? 1) * 100}
            onChange={(v) => handleTransformUpdate({ scaleY: v / 100 })}
            min={1}
            max={500}
            step={1}
            unit="%"
            size="full"
          />
        </div>
      </div>

      {/* 倾斜 */}
      <div>
        <SubLabel>倾斜</SubLabel>
        <div className="grid grid-cols-2 gap-3">
          <PropertyInput
            label="X"
            value={transform.skewX ?? 0}
            onChange={(v) => handleTransformUpdate({ skewX: v })}
            min={-89}
            max={89}
            step={1}
            unit="°"
            size="full"
          />
          <PropertyInput
            label="Y"
            value={transform.skewY ?? 0}
            onChange={(v) => handleTransformUpdate({ skewY: v })}
            min={-89}
            max={89}
            step={1}
            unit="°"
            size="full"
          />
        </div>
      </div>

      {/* 翻转 */}
      <div>
        <SubLabel>翻转</SubLabel>
        <div className="flex gap-1.5">
          <PresetButton
            active={transform.flipH || false}
            onClick={() => handleTransformUpdate({ flipH: !transform.flipH })}
            className="flex items-center justify-center gap-1.5"
          >
            <FlipHorizontal size={14} strokeWidth={2.5} />
            <span>水平</span>
          </PresetButton>
          <PresetButton
            active={transform.flipV || false}
            onClick={() => handleTransformUpdate({ flipV: !transform.flipV })}
            className="flex items-center justify-center gap-1.5"
          >
            <FlipVertical size={14} strokeWidth={2.5} />
            <span>垂直</span>
          </PresetButton>
        </div>
      </div>
    </CollapsibleSection>
  );
};
