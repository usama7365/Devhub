import React, { useState, useEffect } from 'react';
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
  Plus,
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

export function Meetings() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [upcomingMeetings, setUpcomingMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      const { data: meetings, error } = await supabase
        .from('meetings')
        .select(
          `
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
        `
        )
        .gte('start_time', new Date().toISOString())
        .order('start_time', { ascending: true });

      if (error) throw error;

      // If no meetings are found, use the dummy meeting
      setUpcomingMeetings(
        meetings.length > 0
          ? meetings.map((meeting) => ({
              ...meeting,
              host: meeting.host.map((h) => ({
                ...h,
                id: '',
                username: '',
                email: '',
                created_at: '',
              })),
            }))
          : [dummyMeeting]
      );
    } catch (error) {
      console.error('Error fetching meetings:', error);
      setUpcomingMeetings([dummyMeeting]); // Fallback to dummy meeting on error
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (email: string) => {
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
  };

  return (
    <div className="space-y-16 py-8">
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Upcoming Meetings
        </h2>

        {loading ? (
          <div className="text-center py-12 text-lg text-gray-500 dark:text-gray-400">
            Loading...
          </div>
        ) : upcomingMeetings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Meeting Title */}
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {meeting.title}
                  </h3>

                  {/* Meeting Description */}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {meeting.description}
                  </p>

                  {/* Host Information */}
                  <div className="flex items-center mb-4">
                    <img
                      src={meeting.host.avatar_url}
                      alt={meeting.host.username}
                      className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                        Hosted by {meeting.host.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {meeting.host.email}
                      </p>
                    </div>
                  </div>

                  {/* Meeting Details */}
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-indigo-500" />
                      {format(parseISO(meeting.start_time), 'MMM d, h:mm a')}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-indigo-500" />
                      {meeting.max_participants} participants
                    </div>
                  </div>

                  {/* Join Meeting Button */}
                  <button
                    onClick={() => setSelectedRoom(meeting.room_id)}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 rounded-lg text-sm font-medium"
                  >
                    <Video className="w-4 h-4" />
                    Join Meeting
                  </button>
                </div>
              </div>
            ))}
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
      <section className="bg-gray-50 dark:bg-gray-800/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Schedule a Meeting</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Plan ahead and schedule meetings with your team. Send automatic
            invitations and reminders.
          </p>
          <Link to="/meetings/schedule">
            <button className="btn">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Now
            </button>
          </Link>
        </div>
      </section>
      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Meeting Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
      <div className="text-indigo-600 dark:text-indigo-400 flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
