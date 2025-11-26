/**
 * 渐变选择器组件 - Neo-Brutalism 风格
 * Based on: https://www.neobrutalism.dev/
 */
import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import type { FillStyle, GradientStyle, GradientStop } from '../../types/customElements';

interface GradientPickerProps {
  label?: string;
  value: FillStyle;
  onChange: (value: FillStyle) => void;
}

type FillType = 'solid' | 'linear' | 'radial' | 'conic' | 'repeating-linear' | 'repeating-radial';

export const GradientPicker: React.FC<GradientPickerProps> = ({
  value,
  onChange,
}) => {
  const [fillType, setFillType] = useState<FillType>(() => {
    if (typeof value === 'string') return 'solid';
    return value.type as FillType;
  });
  
  const [selectedStopIndex, setSelectedStopIndex] = useState<number | null>(null);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const gradientBarRef = useRef<HTMLDivElement>(null);
  const colorInputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // 使用 ref 存储最新的值，解决闭包问题
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);
  
  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);
  
  // 同步 fillType 状态与 value prop
  useEffect(() => {
    const newFillType = typeof value === 'string' ? 'solid' : value.type as FillType;
    if (newFillType !== fillType) {
      setFillType(newFillType);
    }
  }, [value]);

  // 获取当前配置
  const getCurrentConfig = (): {
    color?: string;
    gradient?: GradientStyle;
  } => {
    if (typeof value === 'string') {
      return { color: value };
    }
    return { gradient: value };
  };

  const { color, gradient } = getCurrentConfig();

  // 判断是否有角度属性
  const hasAngle = gradient && (
    gradient.type === 'linear' || 
    gradient.type === 'conic' || 
    gradient.type === 'repeating-linear'
  );
  const currentAngle = hasAngle ? (gradient as { angle: number }).angle : 90;

  // 切换填充类型
  const handleTypeChange = (newType: FillType) => {
    setFillType(newType);
    setSelectedStopIndex(null);
    
    const defaultStops = gradient?.stops || [
      { offset: 0, color: color || '#000000' },
      { offset: 1, color: '#FFFFFF' },
    ];
    
    if (newType === 'solid') {
      const firstColor = gradient?.stops[0]?.color || '#000000';
      onChange(firstColor);
    } else if (newType === 'linear') {
      onChange({ type: 'linear', angle: currentAngle, stops: defaultStops });
    } else if (newType === 'radial') {
      onChange({ type: 'radial', stops: defaultStops });
    } else if (newType === 'conic') {
      onChange({ type: 'conic', angle: currentAngle, stops: defaultStops });
    } else if (newType === 'repeating-linear') {
      const repeatStops = gradient?.stops.length === 2 ? [
        { offset: 0, color: gradient.stops[0].color },
        { offset: 0.25, color: gradient.stops[1].color },
        { offset: 0.5, color: gradient.stops[0].color },
      ] : defaultStops;
      onChange({ type: 'repeating-linear', angle: currentAngle, stops: repeatStops });
    } else if (newType === 'repeating-radial') {
      const repeatStops = gradient?.stops.length === 2 ? [
        { offset: 0, color: gradient.stops[0].color },
        { offset: 0.25, color: gradient.stops[1].color },
        { offset: 0.5, color: gradient.stops[0].color },
      ] : defaultStops;
      onChange({ type: 'repeating-radial', stops: repeatStops });
    }
  };

  // 更新色标
  const updateStop = (index: number, updates: Partial<GradientStop>) => {
    if (!gradient) return;
    
    const newStops = [...gradient.stops];
    newStops[index] = { ...newStops[index], ...updates };
    
    // 按位置排序
    newStops.sort((a, b) => a.offset - b.offset);
    
    // 找到更新后的索引
    const newIndex = newStops.findIndex(s => 
      s.color === (updates.color ?? newStops[index].color) && 
      s.offset === (updates.offset ?? newStops[index].offset)
    );
    
    onChange({ ...gradient, stops: newStops });
    
    // 更新选中索引
    if (selectedStopIndex === index && newIndex !== -1) {
      setSelectedStopIndex(newIndex);
    }
  };

  // 点击渐变条添加色标
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!gradient || !gradientBarRef.current) return;
    
    const rect = gradientBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const offset = Math.max(0, Math.min(1, x / rect.width));
    
    // 检查是否点击在已有色标附近（避免重复添加）
    const clickThreshold = 0.03;
    const nearExisting = gradient.stops.some(stop => 
      Math.abs(stop.offset - offset) < clickThreshold
    );
    
    if (nearExisting) return;
    
    // 计算插值颜色
    const sortedStops = [...gradient.stops].sort((a, b) => a.offset - b.offset);
    let interpolatedColor = '#808080';
    
    for (let i = 0; i < sortedStops.length - 1; i++) {
      if (offset >= sortedStops[i].offset && offset <= sortedStops[i + 1].offset) {
        interpolatedColor = sortedStops[i].color;
        break;
      }
    }
    
    const newStops = [...gradient.stops, { offset, color: interpolatedColor }];
    newStops.sort((a, b) => a.offset - b.offset);
    
    const newIndex = newStops.findIndex(s => s.offset === offset);
    setSelectedStopIndex(newIndex);
    
    onChange({ ...gradient, stops: newStops });
  };

  // 开始拖动色标
  const handleStopMouseDown = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedStopIndex(index);
    
    const startX = e.clientX;
    const startY = e.clientY;
    let isDragging = false;
    const dragThreshold = 3;
    
    let currentIndex = index;
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      
      if (!isDragging && (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)) {
        isDragging = true;
        setDraggingIndex(index);
      }
      
      if (!isDragging || !gradientBarRef.current) return;
      
      const currentValue = valueRef.current;
      if (typeof currentValue === 'string') return;
      
      const rect = gradientBarRef.current.getBoundingClientRect();
      const x = moveEvent.clientX - rect.left;
      const offset = Math.max(0, Math.min(1, x / rect.width));
      
      const newStops = [...currentValue.stops];
      newStops[currentIndex] = { ...newStops[currentIndex], offset };
      
      onChangeRef.current({ ...currentValue, stops: newStops });
    };
    
    const handleMouseUp = () => {
      if (!isDragging) {
        colorInputRefs.current[index]?.click();
      } else {
        const currentValue = valueRef.current;
        if (typeof currentValue !== 'string') {
          const newStops = [...currentValue.stops].sort((a, b) => a.offset - b.offset);
          onChangeRef.current({ ...currentValue, stops: newStops });
        }
      }
      
      setDraggingIndex(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  // 键盘快捷键处理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedStopIndex === null || !gradient) return;
    
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      if (gradient.stops.length > 2) {
        removeStop(selectedStopIndex);
      }
    }
  };

  // 删除色标
  const removeStop = (index: number) => {
    if (!gradient || gradient.stops.length <= 2) return;
    
    const newStops = gradient.stops.filter((_, i) => i !== index);
    onChange({ ...gradient, stops: newStops });
    setSelectedStopIndex(null);
  };

  // 更新渐变角度
  const updateAngle = (angle: number) => {
    if (!gradient) return;
    if (gradient.type === 'linear' || gradient.type === 'conic' || gradient.type === 'repeating-linear') {
      onChange({ ...gradient, angle } as typeof gradient);
    }
  };

  // 生成渐变CSS
  const getGradientCSS = (): string => {
    if (fillType === 'solid' && color) {
      return color;
    }
    
    if (!gradient) return '#000000';
    
    const stopsStr = gradient.stops
      .map(stop => `${stop.color} ${stop.offset * 100}%`)
      .join(', ');
    
    switch (gradient.type) {
      case 'linear':
        return `linear-gradient(${gradient.angle}deg, ${stopsStr})`;
      case 'radial':
        return `radial-gradient(circle, ${stopsStr})`;
      case 'conic':
        return `conic-gradient(from ${gradient.angle}deg, ${stopsStr})`;
      case 'repeating-linear':
        return `repeating-linear-gradient(${gradient.angle}deg, ${stopsStr})`;
      case 'repeating-radial':
        return `repeating-radial-gradient(circle, ${stopsStr})`;
      default:
        return '#000000';
    }
  };

  return (
    <div 
      className="space-y-3 outline-none" 
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 第一行：类型下拉 + 预览 */}
      <div className="flex items-center gap-2">
        {/* 类型下拉选择 */}
        <select
          value={fillType}
          onChange={(e) => handleTypeChange(e.target.value as FillType)}
          className="input text-sm font-bold"
          style={{ width: 'auto', minWidth: '80px' }}
        >
          <option value="solid">纯色</option>
          <option value="linear">线性</option>
          <option value="radial">径向</option>
          <option value="conic">圆锥</option>
          <option value="repeating-linear">重复线性</option>
          <option value="repeating-radial">重复径向</option>
        </select>
        
        {/* 纯色：颜色选择器 + 输入框 */}
        {fillType === 'solid' && color && (
          <>
            <input
              type="color"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-10 h-10 border-2 border-border rounded-lg cursor-pointer flex-shrink-0 shadow-brutal-sm"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="input input-mono flex-1 uppercase"
              placeholder="#000000"
            />
          </>
        )}
        
        {/* 渐变：角度控制 */}
        {hasAngle && gradient && (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="range"
              min="0"
              max="360"
              value={currentAngle}
              onChange={(e) => updateAngle(Number(e.target.value))}
              className="flex-1 min-w-[60px]"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={currentAngle}
                onChange={(e) => updateAngle(Number(e.target.value))}
                className="input input-mono text-center font-bold"
                style={{ width: '56px', padding: '4px 8px' }}
                min="0"
                max="360"
              />
              <span className="text-sm font-bold text-text/60">°</span>
            </div>
          </div>
        )}
      </div>
      
      {/* 渐变编辑 */}
      {gradient && (
        <>
          {/* 渐变条 + 可拖动色标 */}
          <div className="relative pt-5 pb-1">
            {/* 色标指示器 */}
            {gradient.stops.map((stop, index) => (
              <div
                key={index}
                className={`
                  absolute top-0 -translate-x-1/2 cursor-pointer flex flex-col items-center
                  ${draggingIndex === index ? 'cursor-grabbing z-20' : 'z-10'}
                  ${selectedStopIndex === index ? 'z-20' : ''}
                `}
                style={{ left: `${stop.offset * 100}%` }}
                onMouseDown={(e) => handleStopMouseDown(e, index)}
              >
                <input
                  type="color"
                  ref={(el) => { colorInputRefs.current[index] = el; }}
                  value={stop.color}
                  onChange={(e) => updateStop(index, { color: e.target.value })}
                  className="absolute w-0 h-0 opacity-0 pointer-events-none"
                />
                <div
                  className={`
                    w-4 h-4 rounded border-2 shadow-brutal-sm transition-transform
                    ${selectedStopIndex === index 
                      ? 'border-main scale-125 ring-2 ring-main/30' 
                      : 'border-border hover:scale-110'
                    }
                  `}
                  style={{ backgroundColor: stop.color }}
                />
                <div className={`w-0.5 h-1.5 ${selectedStopIndex === index ? 'bg-main' : 'bg-border'}`} />
              </div>
            ))}
            
            <div
              ref={gradientBarRef}
              className="h-5 rounded-lg border-2 border-border cursor-crosshair shadow-brutal-sm"
              style={{ background: getGradientCSS() }}
              onClick={handleBarClick}
            />
          </div>
          
          {/* 色标列表 */}
          <div className="space-y-2">
            {gradient.stops.map((stop, index) => (
              <div 
                key={index} 
                className={`
                  flex items-center gap-2 p-2 rounded-lg transition-colors border-2
                  ${selectedStopIndex === index 
                    ? 'bg-main/20 border-main' 
                    : 'border-transparent hover:bg-bg hover:border-border'
                  }
                `}
                onClick={() => setSelectedStopIndex(index)}
              >
                <input
                  type="number"
                  value={Math.round(stop.offset * 100)}
                  onChange={(e) => updateStop(index, { offset: Math.max(0, Math.min(1, Number(e.target.value) / 100)) })}
                  className="input input-mono text-center font-bold"
                  style={{ width: '52px', padding: '4px' }}
                  min="0"
                  max="100"
                />
                <span className="text-sm font-bold text-text/60">%</span>
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => updateStop(index, { color: e.target.value })}
                  className="w-8 h-8 border-2 border-border rounded cursor-pointer shadow-brutal-sm"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => updateStop(index, { color: e.target.value })}
                  className="input input-mono flex-1 uppercase"
                  style={{ minWidth: 0 }}
                />
                {gradient.stops.length > 2 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeStop(index); }}
                    className="tool-btn danger"
                    style={{ width: '28px', height: '28px' }}
                  >
                    <X size={14} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <p className="text-xs font-medium text-text/50 text-center">
            点击色标选色 · 拖动调整位置 · Del 删除
          </p>
        </>
      )}
    </div>
  );
};
