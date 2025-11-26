import React, { useState, useCallback } from 'react';
import { Link, Unlink } from 'lucide-react';
import { CollapsibleSection, PropertyInput, PropertySlider, PresetButton } from './CollapsibleSection';
import type { CustomElement, CircleElement } from '../../../types';

interface PositionSizeEditorProps {
  element: CustomElement;
  onUpdate: (updates: Partial<CustomElement>) => void;
}

const ROTATION_PRESETS = [0, 45, 90, 180, 270];

export const PositionSizeEditor: React.FC<PositionSizeEditorProps> = ({ element, onUpdate }) => {
  const [localLockRatio, setLocalLockRatio] = useState(element.lockAspectRatio ?? false);
  const aspectRatio = element.type === 'circle' ? 1 : element.width / element.height;

  const toggleLockRatio = () => {
    const newLock = !localLockRatio;
    setLocalLockRatio(newLock);
    onUpdate({ lockAspectRatio: newLock });
  };

  const handleWidthChange = useCallback((width: number) => {
    if (localLockRatio && element.type !== 'circle') {
      onUpdate({ width, height: Math.round(width / aspectRatio) });
    } else {
      onUpdate({ width });
    }
  }, [localLockRatio, aspectRatio, element.type, onUpdate]);

  const handleHeightChange = useCallback((height: number) => {
    if (localLockRatio && element.type !== 'circle') {
      onUpdate({ width: Math.round(height * aspectRatio), height });
    } else {
      onUpdate({ height });
    }
  }, [localLockRatio, aspectRatio, element.type, onUpdate]);

  return (
    <div className="space-y-5">
      {/* 位置 */}
      <CollapsibleSection title="位置">
        <div className="grid grid-cols-2 gap-3">
          <PropertyInput 
            label="X" 
            value={element.x} 
            onChange={(x) => onUpdate({ x })} 
            size="full"
          />
          <PropertyInput 
            label="Y" 
            value={element.y} 
            onChange={(y) => onUpdate({ y })} 
            size="full"
          />
        </div>
      </CollapsibleSection>

      {/* 尺寸 */}
      {element.type !== 'circle' ? (
        <CollapsibleSection 
          title="尺寸" 
          actions={
            <button
              onClick={toggleLockRatio}
              className={`
                p-1.5 rounded-lg transition-all
                ${localLockRatio 
                  ? 'bg-main text-text border-2 border-border' 
                  : 'text-text/40 hover:text-text/60 hover:bg-bg'
                }
              `}
              title={localLockRatio ? '解锁比例' : '锁定比例'}
            >
              {localLockRatio ? <Link size={14} strokeWidth={2.5} /> : <Unlink size={14} strokeWidth={2.5} />}
            </button>
          }
        >
          <div className="grid grid-cols-2 gap-3">
            <PropertyInput label="W" value={element.width} onChange={handleWidthChange} min={1} size="full" />
            <PropertyInput label="H" value={element.height} onChange={handleHeightChange} min={1} size="full" />
          </div>
        </CollapsibleSection>
      ) : (
        <CollapsibleSection title="尺寸">
          <PropertyInput 
            label="R" 
            value={(element as CircleElement).radius} 
            onChange={(r) => onUpdate({ radius: r })} 
            min={10} 
            size="full"
          />
        </CollapsibleSection>
      )}

      {/* 旋转 */}
      <CollapsibleSection title="旋转">
        <PropertySlider
          label=""
          value={element.rotation}
          onChange={(rotation) => onUpdate({ rotation })}
          min={0}
          max={360}
          step={1}
          unit="°"
        />
        <div className="flex gap-1.5 mt-3">
          {ROTATION_PRESETS.map((angle) => (
            <PresetButton
              key={angle}
              active={element.rotation === angle}
              onClick={() => onUpdate({ rotation: angle })}
            >
              {angle}°
            </PresetButton>
          ))}
        </div>
      </CollapsibleSection>

      {/* 不透明度 */}
      <CollapsibleSection title="透明度">
        <PropertySlider
          label=""
          value={(element.opacity ?? 1) * 100}
          onChange={(v) => onUpdate({ opacity: v / 100 })}
          min={0}
          max={100}
          step={1}
          unit="%"
        />
      </CollapsibleSection>
    </div>
  );
};
