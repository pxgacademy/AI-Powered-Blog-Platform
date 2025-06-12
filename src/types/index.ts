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

export interface Blog {
  _id: string;
  content: string;
  category: string;
  image: string;
  email: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBlogInput {
  content: string;
  category: string;
  image: string;
  date: string;
  email: string;
}
