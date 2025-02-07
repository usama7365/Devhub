import React, { useState, useEffect, useCallback } from 'react';
import { MeetingRoom } from '../components/MeetingRoom';
import {
  Video,
  Users,
  Calendar,
  Globe,
  Shield,
  Zap,
  Clock,
  Monitor,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { format, parseISO } from 'date-fns';
import { dummyMeeting } from '../lib/dummy-data';
import { Meeting } from '../types';

const sampleParticipants = [
  {
    id: '1',
    name: 'John Doe',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=random',
  },
  {
    id: '3',
    name: 'feline Doe',
    avatar: 'https://ui-avatars.com/api/?name=feline+Doe&background=random',
  },
  {
    id: '4',
    name: 'usama Smith',
    avatar: 'https://ui-avatars.com/api/?name=usama+Smith&background=random',
  },
  {
    id: '5',
    name: 'code Doe',
    avatar: 'https://ui-avatars.com/api/?name=code+Doe&background=random',
  },
  {
    id: '6',
    name: 'alex Smith',
    avatar: 'https://ui-avatars.com/api/?name=alex+Smith&background=random',
  },
];

const MEETING_SELECT_QUERY = `
  id,
  title,
  description,
  start_time,
  duration,
  max_participants,
  room_id,
  host:users (
    username,
    avatar_url
  )
`;

// Meeting Card
interface MeetingCardProps {
  meeting: Meeting;
  onJoin: (roomId: string) => void;
}

const MeetingCard: React.FC<MeetingCardProps> = React.memo(
  ({ meeting, onJoin }) => {
    return (
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] bg-[var(--card-bg)] rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{meeting.title}</h3>
          <p className="mb-4">{meeting.description}</p>

          <div className="flex items-center mb-4">
            <img
              src={meeting.host.avatar_url}
              alt={meeting.host.username}
              className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 mr-3"
            />
            <div>
              <p className="text-sm font-medium">
                Hosted by {meeting.host.username}
              </p>
              <p className="text-xs">{meeting.host.email}</p>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-[var(--accent)]" />
              {format(parseISO(meeting.start_time), 'MMM d, h:mm a')}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1 text-[var(--accent)]" />
              {meeting.max_participants} participants
            </div>
          </div>

          <button
            onClick={() => onJoin(meeting.room_id)}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] transition-all duration-300 rounded-lg text-sm font-medium"
          >
            <Video className="w-4 h-4" />
            Join Meeting
          </button>
        </div>
      </div>
    );
  }
);

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] bg-[var(--card-bg)] rounded-lg shadow-sm p-6 text-center">
      <div className="flex justify-center mb-4 text-[var(--accent)] ">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="">{description}</p>
    </div>
  );
}

export function Meetings() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMeetings = useCallback(async () => {
    try {
      const { data: meetings, error } = await supabase
        .from('meetings')
        .select(MEETING_SELECT_QUERY)
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;

      const processedMeetings =
        meetings.length > 0 ? meetings.map(processMeetingData) : [dummyMeeting];

      setUpcomingMeetings(processedMeetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setUpcomingMeetings([dummyMeeting]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const processMeetingData = useCallback(
    (meeting: any): Meeting => ({
      ...meeting,
      host: {
        ...meeting.host[0],
        id: meeting.host[0]?.id || '',
        username: meeting.host[0]?.username || '',
        email: meeting.host[0]?.email || '',
        created_at: meeting.host[0]?.created_at || '',
      },
    }),
    []
  );

  // Extract invite handling logic
  const handleInvite = useCallback(
    async (email: string) => {
      if (!selectedRoom) return;

      try {
        const { error } = await supabase.from('meeting_invitations').insert([
          {
            meeting_id: selectedRoom,
            email,
          },
        ]);

        if (error) throw error;
      } catch (error) {
        console.error('Error sending invitation:', error);
      }
    },
    [selectedRoom]
  );

  // Extract room selection handler
  const handleRoomSelect = useCallback((roomId: string) => {
    setSelectedRoom(roomId);
  }, []);

  // Extract meeting card rendering logic
  const renderMeetingCard = useCallback(
    (meeting: Meeting) => (
      <MeetingCard
        key={meeting.id}
        meeting={meeting}
        onJoin={handleRoomSelect}
      />
    ),
    [handleRoomSelect]
  );

  return (
    <div className="space-y-16 py-8 bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Hero Section */}
      <section className="relative -mt-20 mb-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=1920&h=600&fit=crop"
            alt="Video meeting"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Virtual Meeting Spaces
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Connect with developers worldwide in our high-quality, secure
            virtual meeting rooms. Perfect for code reviews, pair programming,
            and team collaborations.
          </p>
        </div>
      </section>

      {/* Upcoming Meetings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-bold mb-8">Upcoming Meetings</h2>

        {loading ? (
          <div className="text-center py-12 text-lg">Loading...</div>
        ) : upcomingMeetings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {upcomingMeetings.map(renderMeetingCard)}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No upcoming meetings. Why not schedule one?
          </div>
        )}
      </section>

      {/* Active Meeting Room */}
      {selectedRoom && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MeetingRoom
            roomId={selectedRoom}
            participants={sampleParticipants}
            onInvite={handleInvite}
          />
        </section>
      )}

      {/* Schedule Section */}
      <section className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 bg-[var(--card-bg)] text-[var(--text-primary)] w">
        <div className="max-w-7xl mx-auto text-center ">
          <h2 className="text-3xl font-bold mb-8">Schedule a Meeting</h2>
          <p className=" mb-8 max-w-2xl mx-auto">
            Plan ahead and schedule meetings with your team. Send automatic
            invitations and reminders.
          </p>
          <Link to="/meetings/schedule">
            <button className="btn  bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] hover:bg-[var(--accent)]">
              <Calendar className="w-4 h-4 mr-2 " />
              Schedule Now
            </button>
          </Link>
        </div>
      </section>
      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meeting Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          <FeatureCard
            icon={<Globe className="w-8 h-8" />}
            title="Global Access"
            description="Connect with developers from any timezone, anywhere in the world."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8" />}
            title="Secure Rooms"
            description="End-to-end encrypted video calls for maximum privacy and security."
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Low Latency"
            description="High-performance video and audio for smooth collaboration."
          />
          <FeatureCard
            icon={<Monitor className="w-8 h-8" />}
            title="Screen Sharing"
            description="Share your screen for code reviews and pair programming."
          />
        </div>
      </section>
    </div>
  );
}
