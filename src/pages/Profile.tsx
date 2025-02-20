import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Award, Star, Trophy, Target, Zap, Heart } from 'lucide-react';
import { dummyUsers, dummyPosts } from '../lib/dummy-data';
import ProfileHeader from '../components/UserProfile/ProfileHeader';
import ContactInfo from '../components/UserProfile/ContactInfo';
import AdditionalInfo from '../components/UserProfile/AdditionalInfo';
import RecentActivity from '../components/UserProfile/RecentActivity';
import StatCard from '../components/UserProfile/StatCard';
import Achievements from '../components/UserProfile/Achievements';
import Badges from '../components/UserProfile/Badges';

const dummyAchievements = [
  {
    id: '1',
    name: 'Bug Hunter',
    description: 'Fixed 10 bugs',
    category: 'bugs',
    icon: '🔍',
    earned_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Prolific Writer',
    description: 'Published 10 blog posts',
    category: 'blogs',
    icon: '✍️',
    earned_at: '2024-02-15T00:00:00Z',
  },
];

const dummyBadges = [
  {
    id: '1',
    name: 'Bug Fixer Silver',
    description: 'Fixed 25 bugs',
    category: 'bugs',
    level: 'silver',
    icon: '🥈',
    current_count: 27,
    requirement_count: 30,
    earned_at: '2024-02-10T00:00:00Z',
  },
  {
    id: '2',
    name: 'Content Creator Gold',
    description: 'Created 50 pieces of content',
    category: 'content',
    level: 'gold',
    icon: '🥇',
    current_count: 52,
    requirement_count: 60,
    earned_at: '2024-02-20T00:00:00Z',
  },
];

const dummyStats = {
  bugs_resolved: 27,
  blogs_written: 15,
  discussions_started: 32,
  discussions_participated: 84,
  kb_articles_written: 8,
  total_upvotes_received: 156,
  contribution_streak: 7,
  level: 3,
};

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
            {/* Contribution Stats */}
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-0 mt-5">
              Contributions
            </h2>
            <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                icon={<Trophy className="w-6 h-6" />}
                label="Content Creator"
                value={dummyStats.level}
              />
              <StatCard
                icon={<Heart className="w-6 h-6" />}
                label="Likes"
                value={dummyStats.total_upvotes_received}
              />
              <StatCard
                icon={<Target className="w-6 h-6" />}
                label="Bugs Resolved"
                value={dummyStats.bugs_resolved}
              />
              <StatCard
                icon={<Award className="w-6 h-6" />}
                label="Blog Posts"
                value={dummyStats.blogs_written}
              />
              <StatCard
                icon={<Star className="w-6 h-6" />}
                label="Discussions"
                value={dummyStats.discussions_started}
              />
              <StatCard
                icon={<Zap className="w-6 h-6" />}
                label="Contribution Streak"
                value={`${dummyStats.contribution_streak} days`}
              />
            </div>
            {/* Achievements */}
            <div className="mt-8 w-full">
              <Achievements achievements={dummyAchievements} />
            </div>{' '}
            {/* Badges */}
            <div className="mt-8 w-full">
              <Badges badges={dummyBadges} />
            </div>{' '}
            <RecentActivity posts={userPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
