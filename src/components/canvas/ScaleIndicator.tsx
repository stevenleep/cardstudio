/**
 * 缩放比例指示器 - Neo-Brutalism 风格
 */

interface ScaleIndicatorProps {
  /** 当前缩放比例 */
  scale: number;
}

export const ScaleIndicator: React.FC<ScaleIndicatorProps> = ({ scale }) => {
  return (
    <div className="absolute bottom-4 right-4 bg-text text-bw px-3 py-1.5 text-sm font-bold rounded-lg border-2 border-text shadow-brutal-sm">
      {Math.round(scale * 100)}%
    </div>
  );
};
