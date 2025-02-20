import React from 'react';
import { Post } from '../../types';
import { PostCard } from '../PostCard';

const RecentActivity: React.FC<{ posts: Post[] }> = ({ posts }) => (
  <div className="mt-12 p-6">
    <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
      Recent Activity
    </h2>
    <div className="space-y-6 bg-[var(--card-bg)] rounded-lg shadow-[0_4px_20px_-2px_var(--shadow-color)] p-6 transition-all duration-200">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <p className="text-[var(--text-secondary)] text-center py-8">
          No activity yet
        </p>
      )}
    </div>
  </div>
);

export default RecentActivity;
