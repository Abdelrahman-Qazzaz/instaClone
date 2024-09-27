export type PostComment = {
  parent_id: number | null;
  post_id: number;
  user_id: number;
  caption: string | null;
  urls: string[];
};
