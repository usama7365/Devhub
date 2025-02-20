import React from 'react';
import { User } from '../../types';
import { Calendar } from 'lucide-react';

const AdditionalInfo: React.FC<{ user: User }> = ({ user }) => (
  <div className="space-y-4 flex flex-col items-center sm:items-start">
    <div className="flex items-center text-[var(--text-secondary)]">
      <Calendar className="w-5 h-5 mr-2" />
      Joined {new Date(user.created_at).toLocaleDateString()}
    </div>
  </div>
);

export default AdditionalInfo;
