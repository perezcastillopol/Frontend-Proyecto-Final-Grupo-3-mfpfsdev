export interface IUserProfile {
  id: string;
  name: string;
  username: string;
  rating: number;

  bio: string;
  interests: string[];

  phone: string;
  birthDate: string;  // formato 'YYYY-MM-DD'
  location: string;
  travelStyle: string;
}