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
  title: string;
  content: string;
  category: string;
  image: string;
  email: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBlogInput {
  title: string;
  content: string;
  category: string;
  image: string;
  date: string;
  email: string;
}

export type GeminiResponse = {
  candidates: {
    content: {
      parts: [{ text: string }];
      role: string;
    };
    finishReason: string;
    avgLogprobs: number;
  }[];
  modelVersion: string;
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: {
      modality: string;
      tokenCount: number;
    }[];
    candidatesTokensDetails: {
      modality: string;
      tokenCount: number;
    }[];
  };
};
