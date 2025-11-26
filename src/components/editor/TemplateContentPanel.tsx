/**
 * 模板内容面板 - Neo-Brutalism 风格
 */
import React from 'react';
import { useCardStore } from '../../store/cardStore';
import { ALL_MODULES, type ModuleId } from '../../types/modules';
import { ListField, QrCodeField } from './fields';

export const TemplateContentPanel: React.FC = () => {
  const { globalData, moduleVisibility, updateGlobalData, addListItem, removeListItem } = useCardStore();

  const handleQrModeChange = (mode: 'text' | 'image') => {
    updateGlobalData('qrCodeMode', mode);
    if (globalData.qrCode) updateGlobalData('qrCode', '');
  };

  const handleQrCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { alert('请上传图片文件'); return; }
    if (file.size > 5 * 1024 * 1024) { alert('图片大小不能超过 5MB'); return; }
    const reader = new FileReader();
    reader.onload = (event) => updateGlobalData('qrCode', event.target?.result as string);
    reader.readAsDataURL(file);
  };

  const visibleModules = (Object.entries(ALL_MODULES) as [ModuleId, typeof ALL_MODULES[ModuleId]][])
    .filter(([moduleId]) => moduleVisibility[moduleId]);

  if (visibleModules.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">暂无模块</p>
        <p className="empty-state-desc">在左侧开启模块</p>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="px-5 pt-5 pb-8 space-y-6">
        {visibleModules.map(([moduleKey, field]) => (
          <div key={moduleKey} className="space-y-2">
            <div className="label">{field.label}</div>
            {moduleKey === 'qrCode' ? (
              <QrCodeField
                label=""
                value={globalData.qrCode as string}
                mode={globalData.qrCodeMode as 'text' | 'image'}
                onModeChange={handleQrModeChange}
                onValueChange={(value) => updateGlobalData(moduleKey, value)}
                onFileUpload={handleQrCodeUpload}
              />
            ) : field.type === 'text' ? (
              <input
                type="text"
                value={globalData[moduleKey] as string || ''}
                placeholder={field.placeholder}
                onChange={(e) => updateGlobalData(moduleKey, e.target.value)}
                className="input"
              />
            ) : field.type === 'textarea' ? (
              <textarea
                value={globalData[moduleKey] as string || ''}
                placeholder={field.placeholder}
                onChange={(e) => updateGlobalData(moduleKey, e.target.value)}
                rows={2}
                className="input resize-none min-h-[80px] py-3"
              />
            ) : field.type === 'list' ? (
              <ListField
                label=""
                items={(globalData[moduleKey] as string[]) || []}
                placeholder={field.placeholder}
                onAdd={() => addListItem(moduleKey)}
                onRemove={(index) => removeListItem(moduleKey, index)}
                onChange={(newList) => updateGlobalData(moduleKey, newList)}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};
