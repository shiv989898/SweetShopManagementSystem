export interface User {
  _id?: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt?: Date;
}

export interface Sweet {
  _id?: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface JwtPayload {
  userId: string;
  email: string;
  isAdmin: boolean;
}
