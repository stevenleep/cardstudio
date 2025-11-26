import React from 'react';
import { useCardStore } from '../../store/cardStore';
import { ALL_MODULES, type ModuleId, type GlobalCardData } from '../../types/modules';
import { TextField, TextAreaField, ListField, QrCodeField } from './fields';

export const ContentForm: React.FC = () => {
  const { 
    globalData,
    moduleVisibility,
    updateGlobalData,
    addListItem,
    removeListItem,
  } = useCardStore();

  const handleQrModeChange = (mode: 'text' | 'image') => {
    updateGlobalData('qrCodeMode', mode);
    if (globalData.qrCode) {
      updateGlobalData('qrCode', '');
    }
  };

  const handleQrCodeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('请上传图片文件');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      updateGlobalData('qrCode', base64);
    };
    reader.readAsDataURL(file);
  };

  const visibleModules = (Object.entries(ALL_MODULES) as [ModuleId, typeof ALL_MODULES[ModuleId]][])
    .filter(([moduleId]) => moduleVisibility[moduleId]);

  if (visibleModules.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="px-5 py-4 pb-24">
      {/* 标题 */}
      <div className="text-[11px] font-semibold text-gray-400 mb-5">
        内容编辑
      </div>

      {/* 表单字段 */}
      <div className="space-y-6">
        {visibleModules.map(([key, field]) => (
          <FieldRenderer
            key={key}
            moduleKey={key}
            field={field}
            globalData={globalData}
            updateGlobalData={updateGlobalData}
            addListItem={addListItem}
            removeListItem={removeListItem}
            handleQrModeChange={handleQrModeChange}
            handleQrCodeUpload={handleQrCodeUpload}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// Sub-components
// ============================================================================

const EmptyState: React.FC = () => (
  <div className="px-5 py-8">
    <div className="border border-dashed border-gray-200 rounded-xl py-12 text-center">
      <div className="text-[13px] text-gray-400">
        请在上方开启模块
      </div>
    </div>
  </div>
);

interface FieldRendererProps {
  moduleKey: ModuleId;
  field: typeof ALL_MODULES[ModuleId];
  globalData: GlobalCardData;
  updateGlobalData: (key: keyof GlobalCardData, value: unknown) => void;
  addListItem: (key: keyof GlobalCardData) => void;
  removeListItem: (key: keyof GlobalCardData, index: number) => void;
  handleQrModeChange: (mode: 'text' | 'image') => void;
  handleQrCodeUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  moduleKey,
  field,
  globalData,
  updateGlobalData,
  addListItem,
  removeListItem,
  handleQrModeChange,
  handleQrCodeUpload,
}) => {
  if (moduleKey === 'qrCode') {
    return (
      <QrCodeField
        label={field.label}
        value={globalData.qrCode as string}
        mode={globalData.qrCodeMode as 'text' | 'image'}
        onModeChange={handleQrModeChange}
        onValueChange={(value) => updateGlobalData(moduleKey, value)}
        onFileUpload={handleQrCodeUpload}
      />
    );
  }

  if (field.type === 'text') {
    return (
      <TextField
        label={field.label}
        value={globalData[moduleKey] as string || ''}
        placeholder={field.placeholder}
        onChange={(value) => updateGlobalData(moduleKey, value)}
      />
    );
  }

  if (field.type === 'textarea') {
    return (
      <TextAreaField
        label={field.label}
        value={globalData[moduleKey] as string || ''}
        placeholder={field.placeholder}
        onChange={(value) => updateGlobalData(moduleKey, value)}
      />
    );
  }

  if (field.type === 'list') {
    const listValue = globalData[moduleKey] as string[];
    return (
      <ListField
        label={field.label}
        items={listValue || []}
        placeholder={field.placeholder}
        onAdd={() => addListItem(moduleKey)}
        onRemove={(index) => removeListItem(moduleKey, index)}
        onChange={(newList) => updateGlobalData(moduleKey, newList)}
      />
    );
  }

  return null;
};
