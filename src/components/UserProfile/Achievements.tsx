import React from 'react';

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

const Achievements: React.FC<{ achievements: typeof dummyAchievements }> = ({
  achievements,
}) => (
  <div className="mt-8 w-full">
    <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
      Achievements
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {achievements.map((achievement) => (
        <div
          key={achievement.id}
          className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg p-4 flex items-center space-x-3"
        >
          <span className="text-2xl">{achievement.icon}</span>
          <div>
            <h3 className="font-medium text-[var(--text-primary)]">
              {achievement.name}
            </h3>
            <p className="text-sm text-[var(--text-secondary)]">
              {achievement.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Achievements;
