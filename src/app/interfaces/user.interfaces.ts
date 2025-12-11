export interface IUser {
  id: number | string;
  name: string;
  last_name: string;
  email: string;
  photo_url?: string;
  bio?: string;
  birthDate?: string;
  phone?: string;
  location?: string;
  nickname?: string;
  average_rating?: number;
  created_at?: string;
  updated_at?: string;
  interests?: Array<{
    id: number;
    name: string;
  }>;
}
