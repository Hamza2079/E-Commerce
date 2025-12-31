export interface AuthResponse {
  statusMsg?: string;
  message?: string;
  token?: string;
  status?: string;
  errors?: { msg: string; param: string; location: string }[];
}
