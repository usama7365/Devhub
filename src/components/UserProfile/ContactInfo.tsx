import React from 'react';

import { User, Post } from '../../types';
import { Github, Mail } from 'lucide-react';

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

export default ContactInfo;
