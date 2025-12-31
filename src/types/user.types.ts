export interface User {
  name: string;
  email: string;
  role: string;
  _id?: string;
}

export interface AuthError {
  msg: string;
  param?: string;
  location?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  password: string;
  rePassword: string;
}

export interface ChangePasswordResponse {
  message?: string;
  token?: string;
  user?: User;
  statusMsg?: string;
  errors?: AuthError;
}
