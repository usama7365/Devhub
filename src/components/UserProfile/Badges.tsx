import React from 'react';

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

const Badges: React.FC<{ badges: typeof dummyBadges }> = ({ badges }) => (
  <div className="mt-8 w-full">
    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
      Badges
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="bg-[var(--bg-primary)] text-[var(--text-secondary)] rounded-lg p-4"
        >
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{badge.icon}</span>
            <h3 className="font-medium text-[var(--text-primary)]">
              {badge.name}
            </h3>
          </div>
          <p className="text-sm ">{badge.description}</p>
          <div className="mt-2 h-2 bg-[var(--card-bg)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full"
              style={{
                width: `${Math.min((badge.current_count / badge.requirement_count) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Badges;
