export interface User {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  bio?: string;
  github_username?: string;
  created_at: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  user_id: string;
  category: string;
  tags: string[];
  upvotes: number;
  is_resolved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  post_id: string;
  is_accepted: boolean;
  upvotes: number;
  created_at: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  description: string;
  user_id: string;
  category: string;
  tags: string[];
  views: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  cover_image?: string;
  author: User;
  tags: string[];
  likes: number;
  views: number;
  created_at: string;
  updated_at: string;
}
