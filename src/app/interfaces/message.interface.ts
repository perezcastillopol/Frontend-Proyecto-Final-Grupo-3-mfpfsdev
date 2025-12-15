export interface IMessage {
  id: number;
  trip_id: number;
  user_id: number;
  user_nickname?: string;
  content: string;
  created_at: string;
  parent_message_id: number | null;
  
  replies?: IMessage[];
  replyText?: string;
}