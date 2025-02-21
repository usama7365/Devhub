import React from 'react';
import { User } from '../../types';

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

export default ProfileHeader;
