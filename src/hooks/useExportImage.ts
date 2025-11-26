/**
 * 导出图片 Hook
 * 
 * 将 Konva Stage 导出为高清图片
 */
import { useCallback, useState, type RefObject } from 'react';
import type Konva from 'konva';

export type ExportFormat = 'png' | 'jpeg' | 'webp';

export interface UseExportImageOptions {
  /** Stage ref */
  stageRef: RefObject<Konva.Stage | null>;
  /** 画布宽度 */
  width: number;
  /** 画布高度 */
  height: number;
  /** 文件名前缀 */
  filename?: string;
  /** 模板名称（用于生成文件名）*/
  templateName?: string;
  /** 导出格式 */
  format?: ExportFormat;
  /** 图片质量 (0-1，仅 jpeg/webp) */
  quality?: number;
  /** 像素比例 */
  pixelRatio?: number;
}

export interface UseExportImageResult {
  /** 导出图片函数 */
  exportImage: () => Promise<void>;
  /** 获取 Data URL */
  getDataUrl: () => string | null;
  /** 获取 Blob */
  getBlob: () => Promise<Blob | null>;
  /** 是否正在导出 */
  isExporting: boolean;
  /** 导出进度 (0-100) */
  progress: number;
}

const MIME_TYPES: Record<ExportFormat, string> = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
};

/**
 * 导出图片 Hook
 * 
 * @example
 * ```tsx
 * const { exportImage, isExporting } = useExportImage({
 *   stageRef,
 *   width: 1080,
 *   height: 1920,
 *   filename: 'my-card'
 * });
 * ```
 */
export function useExportImage({
  stageRef,
  width,
  height,
  filename,
  templateName = 'neo-card',
  format = 'png',
  quality = 1,
  pixelRatio: customPixelRatio,
}: UseExportImageOptions): UseExportImageResult {
  // 文件名优先使用 filename，否则使用 templateName
  const effectiveFilename = filename ?? templateName;
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  // 计算实际像素比例
  const getPixelRatio = useCallback(() => {
    if (customPixelRatio) return customPixelRatio;
    const devicePixelRatio = window.devicePixelRatio || 1;
    return Math.max(3, devicePixelRatio * 2);
  }, [customPixelRatio]);

  // 获取 Data URL
  const getDataUrl = useCallback((): string | null => {
    if (!stageRef.current) return null;

    const stage = stageRef.current;
    const currentScale = stage.scaleX();
    
    // 临时重置缩放
    stage.scale({ x: 1, y: 1 });
    
    const uri = stage.toDataURL({
      pixelRatio: getPixelRatio(),
      mimeType: MIME_TYPES[format],
      quality: format === 'png' ? 1 : quality,
      width,
      height,
    });

    // 恢复缩放
    stage.scale({ x: currentScale, y: currentScale });
    
    return uri;
  }, [stageRef, width, height, format, quality, getPixelRatio]);

  // 获取 Blob
  const getBlob = useCallback(async (): Promise<Blob | null> => {
    const dataUrl = getDataUrl();
    if (!dataUrl) return null;

    const response = await fetch(dataUrl);
    return response.blob();
  }, [getDataUrl]);

  // 导出图片
  const exportImage = useCallback(async () => {
    if (!stageRef.current || isExporting) return;

    try {
      setIsExporting(true);
      setProgress(10);

      const uri = getDataUrl();
      if (!uri) {
        throw new Error('Failed to generate image');
      }
      
      setProgress(80);

      // 生成文件名
      const timestamp = new Date().toISOString().slice(0, 10);
      const extension = format;
      const fullFilename = `${effectiveFilename}-${width}x${height}-${timestamp}.${extension}`;

      // 创建下载链接
      const link = document.createElement('a');
      link.download = fullFilename;
      link.href = uri;
      
      setProgress(90);
      
      // 触发下载
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setProgress(100);
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    } finally {
      // 延迟重置状态，让用户看到完成状态
      setTimeout(() => {
        setIsExporting(false);
        setProgress(0);
      }, 500);
    }
  }, [stageRef, isExporting, getDataUrl, effectiveFilename, width, height, format]);

  return { 
    exportImage, 
    getDataUrl,
    getBlob,
    isExporting,
    progress
  };
}
