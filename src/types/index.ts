export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}
