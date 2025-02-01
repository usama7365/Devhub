import React, { useState } from 'react';
import { VideoCall } from './VideoCall';
import { Users, Video, Phone } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  avatar: string;
}

interface MeetingRoomProps {
  roomId: string;
  participants: Participant[];
  onInvite: (email: string) => void;
}

export function MeetingRoom({ roomId, participants, onInvite }: MeetingRoomProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteEmail.trim()) {
      onInvite(inviteEmail.trim());
      setInviteEmail('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {isCallActive ? (
        <VideoCall roomId={roomId} onClose={() => setIsCallActive(false)} />
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Meeting Room</h2>
            <button
              onClick={() => setIsCallActive(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Video className="w-4 h-4 mr-2" />
              Join Call
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Participants ({participants.length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                >
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm">{participant.name}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleInvite} className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Invite by email..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Phone className="w-4 h-4 mr-2" />
              Invite
            </button>
          </form>
        </div>
      )}
    </div>
  );
}