/**
 * 自定义元素渲染器
 * 
 * 根据元素类型渲染对应的 Konva 组件
 * 支持多选同步拖动
 */
import type { CustomElement, ImageElement as ImageElementType, PathElement as PathElementType } from '../../types';
import { RectElement, CircleElement, TextElement, ImageElement, PathElement } from './elements';

interface CustomElementRendererProps {
  /** 元素列表 */
  elements: CustomElement[];
  /** 选中的元素 ID 列表 */
  selectedIds: string[];
  /** 选中回调（支持传递事件用于多选检测） */
  onSelect: (id: string, e?: MouseEvent | TouchEvent) => void;
  /** 更新回调 */
  onUpdate: (id: string, updates: Partial<CustomElement>) => void;
}

/**
 * 自定义元素渲染器
 */
export const CustomElementRenderer: React.FC<CustomElementRendererProps> = ({
  elements,
  selectedIds,
  onSelect,
  onUpdate,
}) => {
  // 按 zIndex 排序
  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <>
      {sortedElements.map((element) => {
        switch (element.type) {
          case 'rect':
            return (
              <RectElement
                key={element.id}
                element={element}
                selectedIds={selectedIds}
                allElements={elements}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            );
          case 'circle':
            return (
              <CircleElement
                key={element.id}
                element={element}
                selectedIds={selectedIds}
                allElements={elements}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            );
          case 'text':
            return (
              <TextElement
                key={element.id}
                element={element}
                selectedIds={selectedIds}
                allElements={elements}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            );
          case 'image':
            return (
              <ImageElement
                key={element.id}
                element={element as ImageElementType}
                selectedIds={selectedIds}
                allElements={elements}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            );
          case 'path':
            return (
              <PathElement
                key={element.id}
                element={element as PathElementType}
                selectedIds={selectedIds}
                allElements={elements}
                onSelect={onSelect}
                onUpdate={onUpdate}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

