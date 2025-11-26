/**
 * 工具类型定义
 */

/**
 * 深度 Partial - 递归将所有属性变为可选
 */
export type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

/**
 * 深度 Required - 递归将所有属性变为必需
 */
export type DeepRequired<T> = T extends object ? {
  [P in keyof T]-?: DeepRequired<T[P]>;
} : T;

/**
 * 获取对象值类型
 */
export type ValueOf<T> = T[keyof T];

/**
 * 可空类型
 */
export type Nullable<T> = T | null;

/**
 * 可选类型
 */
export type Optional<T> = T | undefined;

/**
 * 只读深度
 */
export type DeepReadonly<T> = T extends object ? {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
} : T;

/**
 * 提取函数参数类型
 */
export type FunctionArgs<T> = T extends (...args: infer P) => unknown ? P : never;

/**
 * 提取函数返回类型
 */
export type FunctionReturn<T> = T extends (...args: unknown[]) => infer R ? R : never;

/**
 * 排除 null 和 undefined
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 至少包含一个属性
 */
export type AtLeastOne<T, Keys extends keyof T = keyof T> =
  Pick<T, Exclude<keyof T, Keys>> & {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
  }[Keys];

/**
 * 精确类型（禁止额外属性）
 */
export type Exact<T, Shape> = T & Record<Exclude<keyof T, keyof Shape>, never>;

