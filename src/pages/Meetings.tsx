import React, { useState } from "react";
import { MeetingRoom } from "../components/MeetingRoom";
import {
  Video,
  Users,
  Calendar,
  Globe,
  Shield,
  Zap,
  Clock,
  Monitor,
} from "lucide-react";

const sampleParticipants = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
  },
  {
    id: "2",
    name: "Jane Smith",
    avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
  },
  {
    id: "3",
    name: "feline Doe",
    avatar: "https://ui-avatars.com/api/?name=feline+Doe&background=random",
  },
  {
    id: "4",
    name: "usama Smith",
    avatar: "https://ui-avatars.com/api/?name=usama+Smith&background=random",
  },
  {
    id: "5",
    name: "code Doe",
    avatar: "https://ui-avatars.com/api/?name=code+Doe&background=random",
  },
  {
    id: "6",
    name: "alex Smith",
    avatar: "https://ui-avatars.com/api/?name=alex+Smith&background=random",
  },
];

export function Meetings() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const handleInvite = (email: string) => {
    console.log("Inviting:", email);
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

      {/* Meeting Rooms Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12">Available Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <RoomCard
            title="Code Review Room"
            description="Perfect for code reviews and technical discussions."
            image="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop"
            participants={4}
            duration="1 hour"
            onJoin={() => setSelectedRoom("code-review")}
          />
          <RoomCard
            title="Pair Programming"
            description="Collaborative coding sessions with screen sharing."
            image="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop"
            participants={2}
            duration="2 hours"
            onJoin={() => setSelectedRoom("pair-programming")}
          />
          <RoomCard
            title="Team Standup"
            description="Quick daily meetings and progress updates."
            image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=400&fit=crop"
            participants={8}
            duration="30 mins"
            onJoin={() => setSelectedRoom("standup")}
          />
        </div>
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
          <button className="btn">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Now
          </button>
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

function RoomCard({
  title,
  description,
  image,
  participants,
  duration,
  onJoin,
}: {
  title: string;
  description: string;
  image: string;
  participants: number;
  duration: string;
  onJoin: () => void;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {participants} participants
          </span>
          <span className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {duration}
          </span>
        </div>
        <button onClick={onJoin} className="btn w-full">
          <Video className="w-4 h-4 mr-2" />
          Join Room
        </button>
      </div>
    </div>
  );
}
