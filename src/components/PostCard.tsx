import { Link } from 'react-router-dom';
import { ThumbsUp, MessageSquare, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import type { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const renderTag = (tag: string) => (
  <span
    key={tag}
    className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full"
  >
    {tag}
  </span>
);

const ResolvedBadge = () => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2 sm:mt-0">
    <Check className="w-4 h-4 mr-1" />
    Resolved
  </span>
);

const UpvoteButton = ({ count }: { count: number }) => (
  <button className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)]">
    <ThumbsUp className="w-4 h-4 mr-1" />
    <span>{count}</span>
  </button>
);

const DiscussButton = ({ postId }: { postId: string }) => (
  <Link
    to={`/discussions/${postId}`}
    className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)]"
  >
    <MessageSquare className="w-4 h-4 mr-1" />
    <span>Discuss</span>
  </Link>
);

const TimeStamp = ({ date }: { date: string }) => (
  <span className="text-sm text-[var(--text-secondary)] mt-2 sm:mt-0">
    {formatDistanceToNow(new Date(date), { addSuffix: true })}
  </span>
);

export function PostCard({ post }: PostCardProps) {
  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-6 mb-4">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div>
          <Link
            to={`/discussions/${post.id}`}
            className="text-lg font-semibold text-[var(--text-primary)] hover:text-[var(--accent)]"
          >
            {post.title}
          </Link>
          <div className="mt-2 flex flex-wrap gap-2">
            {post.tags.map(renderTag)}
          </div>
        </div>
        {post.is_resolved && <ResolvedBadge />}
      </div>
      <p className="mt-2 text-sm text-[var(--text-secondary)] line-clamp-2">
        {post.content}
      </p>
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div className="flex items-center space-x-4">
          <UpvoteButton count={post.upvotes} />
          <DiscussButton postId={post.id} />
        </div>
        <TimeStamp date={post.created_at} />
      </div>
    </div>
  );
}
