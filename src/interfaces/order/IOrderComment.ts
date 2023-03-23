export interface IOrderComment {
  comment_id: string;
  text: string;
  created_at: Date;
  sender: { id: string; name: string };
}
