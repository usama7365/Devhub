import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Github, Mail, Calendar } from 'lucide-react';
import { dummyUsers, dummyPosts } from '../lib/dummy-data';
import { PostCard } from '../components/PostCard';
import { User, Post } from '../types';

const useUserData = (username: string | undefined) => {
  return useMemo(() => {
    if (!username) return null;
    return dummyUsers.find((u) => u.username === username);
  }, [username]);
};

const useUserPosts = (userId: string | undefined) => {
  return useMemo(() => {
    if (!userId) return [];
    return dummyPosts.filter((post) => post.user_id === userId);
  }, [userId]);
};

const ProfileHeader: React.FC<{ user: User }> = ({ user }) => (
  <div className="relative pt-8 sm:pt-6">
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
      <img
        src={user.avatar_url}
        alt={user.username}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[var(--bg-primary)] -mt-20"
      />
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
          {user.username}
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">{user.bio}</p>
      </div>
    </div>
  </div>
);

const ContactInfo: React.FC<{ user: User }> = ({ user }) => (
  <div className="space-y-4 flex flex-col items-center sm:items-start">
    <div className="flex items-center text-[var(--text-secondary)]">
      <Mail className="w-5 h-5 mr-2" />
      {user.email}
    </div>
    {user.github_username && (
      <div className="flex items-center text-[var(--text-secondary)]">
        <Github className="w-5 h-5 mr-2" />
        <a
          href={`https://github.com/${user.github_username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--accent)]"
        >
          {user.github_username}
        </a>
      </div>
    )}
  </div>
);

const AdditionalInfo: React.FC<{ user: User }> = ({ user }) => (
  <div className="space-y-4 flex flex-col items-center sm:items-start">
    <div className="flex items-center text-[var(--text-secondary)]">
      <Calendar className="w-5 h-5 mr-2" />
      Joined {new Date(user.created_at).toLocaleDateString()}
    </div>
  </div>
);

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

export function Profile() {
  const { username } = useParams<{ username: string }>();
  const user = useUserData(username);
  const userPosts = useUserPosts(user?.id);

  if (!user) {
    return <div className="text-center py-12">User not found</div>;
  }

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] text-[var(--text-primary)] flex-1 w-full">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[var(--card-bg)] rounded-lg">
          <div className="h-32 bg-[var(--accent)] rounded-t-lg opacity-90"></div>
          <div className="px-4 sm:px-6 lg:px-8 pb-8">
            <ProfileHeader user={user} />
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ContactInfo user={user} />
              <AdditionalInfo user={user} />
            </div>
            <RecentActivity posts={userPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
