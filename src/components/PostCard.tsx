import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-[var(--bg-primary)] rounded-lg shadow-sm p-6 mb-4">
      <div className="flex items-start justify-between">
        <div>
          <Link
            to={`/discussions/${post.id}`}
            className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
          >
            {post.title}
          </Link>
          <div className="mt-2 flex items-center space-x-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {post.is_resolved && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <Check className="w-4 h-4 mr-1" />
            Resolved
          </span>
        )}
      </div>
      <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">{post.content}</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)]">
            <ThumbsUp className="w-4 h-4 mr-1" />
            <span>{post.upvotes}</span>
          </button>
          <Link
            to={`/discussions/${post.id}`}
            className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)]"
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>Discuss</span>
          </Link>
        </div>
        <span className="text-sm text-[var(--text-secondary)]">
          {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
        </span>
      </div>
    </div>
  );
}