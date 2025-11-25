export interface Trip {
  tripId: number;
  creatorId: number;
  title: string;
  description: string;
  destination: string;
  startDate: string;
  endDate: string;
  costPerPerson: number;
  minParticipants: number;
  accommodation: string;
  transport: string;
  itinerary: string;
  status: string;
  createdAt: string;
  modalityId: number;
}