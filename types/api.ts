export interface ApiResponse<T> {
  success: boolean;
  data: T;
  limit?: number;
  page?: number;
  total?: number;
}
