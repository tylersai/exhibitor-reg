export * from './company';
export * from './exhibitor';

export type ApiResponse<T> = {
  message: T;
  status: boolean;
};
