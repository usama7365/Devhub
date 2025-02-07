import React, { useState, useCallback } from 'react';
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

export function MeetingRoom({
  roomId,
  participants,
  onInvite,
}: MeetingRoomProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inviteEmail.trim()) {
        onInvite(inviteEmail.trim());
        setInviteEmail('');
      }
    },
    [inviteEmail, onInvite]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInviteEmail(e.target.value);
    },
    []
  );

  const handleJoinCall = useCallback(() => {
    setIsCallActive(true);
  }, []);

  const handleCloseCall = useCallback(() => {
    setIsCallActive(false);
  }, []);

  const renderParticipant = useCallback(
    (participant: Participant) => (
      <div
        key={participant.id}
        className="flex items-center space-x-2 bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full px-3 py-1"
      >
        <img
          src={participant.avatar}
          alt={participant.name}
          className="w-6 h-6 rounded-full"
        />
        <span className="text-sm">{participant.name}</span>
      </div>
    ),
    []
  );

  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] bg-[var(--card-bg)] rounded-lg shadow-sm">
      {isCallActive ? (
        <VideoCall roomId={roomId} onClose={handleCloseCall} />
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Meeting Room</h2>
            <button
              onClick={handleJoinCall}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] transition-all duration-300 rounded-lg text-sm font-medium "
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
              {participants.map(renderParticipant)}
            </div>
          </div>

          <form onSubmit={handleInvite} className="flex gap-2">
            <input
              type="email"
              value={inviteEmail}
              onChange={handleEmailChange}
              placeholder="Invite by email..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-[var(--bg-primary)] text-[var(--text-primary)]"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)]"
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
