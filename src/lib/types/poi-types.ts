export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
  type?: string;
}
export interface categories {
    title: string;
    user: User | string;
    image: string;
    _id?: string;
}

export interface places {
    name: string;
    description: string;
    location: string;
    latitude: number;
    longitude: number;
    category: categories | string;
    image: string,
    id?: string;
}
