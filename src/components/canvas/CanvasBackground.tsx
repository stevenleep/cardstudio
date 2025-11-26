/**
 * 画布背景组件
 * 
 * 显示网格背景和阴影效果
 */

interface CanvasBackgroundProps {
  children: React.ReactNode;
}

/**
 * 画布容器背景
 */
export const CanvasBackground: React.FC<CanvasBackgroundProps> = ({ children }) => {
  return (
    <div 
      className="flex justify-center items-center w-full h-full overflow-hidden"
      style={{
        backgroundColor: '#f5f5f5',
        backgroundImage: `
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px'
      }}
    >
      {children}
    </div>
  );
};

/**
 * 画布阴影包装
 */
export const CanvasShadow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div 
      className="origin-center transition-transform duration-200 ease-out"
      style={{
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 8px 40px rgba(0, 0, 0, 0.06)'
      }}
    >
      {children}
    </div>
  );
};

