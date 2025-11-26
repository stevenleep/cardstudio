import React, { useState } from 'react';
import { GradientPicker } from '../../ui';
import { Link, Unlink } from 'lucide-react';
import { 
  CollapsibleSection, 
  PropertySlider, 
  PropertyInput, 
  ColorInput, 
  ButtonGroupSelector,
  SegmentControl,
  SubLabel,
} from './CollapsibleSection';
import type { 
  RectElement, 
  CircleElement, 
  IndependentCornerRadius 
} from '../../../types';

type ShapeElement = RectElement | CircleElement;

interface ShapeStyleEditorProps {
  element: ShapeElement;
  onUpdate: (updates: Partial<ShapeElement>) => void;
}

const DASH_PRESETS = [
  { label: '实线', value: [] },
  { label: '虚线', value: [10, 5] },
  { label: '点线', value: [2, 4] },
  { label: '点划线', value: [10, 5, 2, 5] },
];

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

export const ShapeStyleEditor: React.FC<ShapeStyleEditorProps> = ({
  element,
  onUpdate,
}) => {
  const [isIndependentCorners, setIsIndependentCorners] = useState(
    (element as RectElement).independentCorners ?? false
  );

  const getCurrentDashIndex = () => {
    if (!element.dashEnabled || !element.dash || element.dash.length === 0) {
      return 0;
    }
    const idx = DASH_PRESETS.findIndex(
      (preset) => JSON.stringify(preset.value) === JSON.stringify(element.dash)
    );
    return idx >= 0 ? idx : 0;
  };

  const getCornerRadii = (): IndependentCornerRadius => {
    const rectEl = element as RectElement;
    if (rectEl.cornerRadii) {
      return rectEl.cornerRadii;
    }
    const r = rectEl.cornerRadius || 0;
    return { topLeft: r, topRight: r, bottomRight: r, bottomLeft: r };
  };

  const toggleIndependentCorners = () => {
    const newMode = !isIndependentCorners;
    setIsIndependentCorners(newMode);
    
    if (newMode) {
      const r = (element as RectElement).cornerRadius || 0;
      onUpdate({
        independentCorners: true,
        cornerRadii: { topLeft: r, topRight: r, bottomRight: r, bottomLeft: r },
      } as Partial<RectElement>);
    } else {
      const radii = getCornerRadii();
      const avg = Math.round((radii.topLeft + radii.topRight + radii.bottomRight + radii.bottomLeft) / 4);
      onUpdate({
        independentCorners: false,
        cornerRadius: avg,
      } as Partial<RectElement>);
    }
  };

  const updateCornerRadius = (corner: keyof IndependentCornerRadius, value: number) => {
    const radii = getCornerRadii();
    onUpdate({
      cornerRadii: { ...radii, [corner]: value },
    } as Partial<RectElement>);
  };

  return (
    <div className="space-y-5">
      {/* 填充 */}
      <CollapsibleSection title="填充">
        <GradientPicker
          value={element.fill}
          onChange={(fill) => onUpdate({ fill })}
        />
      </CollapsibleSection>

      {/* 边框 */}
      <CollapsibleSection title="描边">
        <ColorInput
          value={element.stroke}
          onChange={(stroke) => onUpdate({ stroke })}
        />

        <PropertySlider
          label="粗细"
          value={element.strokeWidth}
          onChange={(strokeWidth) => onUpdate({ strokeWidth })}
          min={0}
          max={20}
          step={1}
          unit="px"
        />

        {/* 虚线样式 */}
        <div>
          <SubLabel>线条样式</SubLabel>
          <SegmentControl
            options={DASH_PRESETS.map((preset, index) => ({
              value: index,
              label: preset.label,
            }))}
            value={getCurrentDashIndex()}
            onChange={(index) => {
              const preset = DASH_PRESETS[index];
              onUpdate({
                dashEnabled: preset.value.length > 0,
                dash: preset.value,
              });
            }}
          />
        </div>

        <ButtonGroupSelector
          label="线端"
          options={LINE_CAP_OPTIONS}
          value={element.lineCap || 'butt'}
          onChange={(lineCap) => onUpdate({ lineCap })}
          compact
        />

        {element.type === 'rect' && (
          <ButtonGroupSelector
            label="拐角"
            options={LINE_JOIN_OPTIONS}
            value={(element as RectElement).lineJoin || 'miter'}
            onChange={(lineJoin) => onUpdate({ lineJoin } as Partial<RectElement>)}
            compact
          />
        )}
      </CollapsibleSection>

      {/* 圆角 - 仅矩形 */}
      {element.type === 'rect' && (
        <CollapsibleSection title="圆角">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-text/50">
              {isIndependentCorners ? '独立圆角' : '统一圆角'}
            </span>
            <button
              onClick={toggleIndependentCorners}
              className={`
                p-1.5 rounded-lg transition-all
                ${isIndependentCorners
                  ? 'bg-main text-text border-2 border-border'
                  : 'text-text/40 hover:text-text/60 hover:bg-bg'
                }
              `}
              title={isIndependentCorners ? '切换为统一圆角' : '切换为独立圆角'}
            >
              {isIndependentCorners ? <Unlink size={14} strokeWidth={2.5} /> : <Link size={14} strokeWidth={2.5} />}
            </button>
          </div>

          {!isIndependentCorners ? (
            <PropertySlider
              label="半径"
              value={(element as RectElement).cornerRadius || 0}
              onChange={(cornerRadius) => onUpdate({ cornerRadius } as Partial<RectElement>)}
              min={0}
              max={Math.min(element.width, element.height) / 2}
              step={1}
              unit="px"
            />
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <PropertyInput
                label="左上"
                value={getCornerRadii().topLeft}
                onChange={(v) => updateCornerRadius('topLeft', v)}
                min={0}
                size="full"
              />
              <PropertyInput
                label="右上"
                value={getCornerRadii().topRight}
                onChange={(v) => updateCornerRadius('topRight', v)}
                min={0}
                size="full"
              />
              <PropertyInput
                label="左下"
                value={getCornerRadii().bottomLeft}
                onChange={(v) => updateCornerRadius('bottomLeft', v)}
                min={0}
                size="full"
              />
              <PropertyInput
                label="右下"
                value={getCornerRadii().bottomRight}
                onChange={(v) => updateCornerRadius('bottomRight', v)}
                min={0}
                size="full"
              />
            </div>
          )}
        </CollapsibleSection>
      )}
    </div>
  );
};
