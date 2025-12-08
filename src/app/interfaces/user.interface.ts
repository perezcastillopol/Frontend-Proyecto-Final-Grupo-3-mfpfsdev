export interface ApiUser {
  id: string;
  name: string;
  email: string;
  photo_url?: string;
  bio?: string;
  interests: string | string[];
  birthDate?: string;
  phone?: string;
  location?: string;
  travelStyle?: string;
  rating?: number;
}
