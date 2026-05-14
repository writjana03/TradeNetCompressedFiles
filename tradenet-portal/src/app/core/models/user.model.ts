export interface User {
  userID: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profilePicture?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  businessName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  userID?: number;
  userName?: string;
  token?: string;
}
