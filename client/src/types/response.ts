export interface ApiResponse {
  status: number;
  data: any;
  headers: Record<string, any>;
  time: string;
}