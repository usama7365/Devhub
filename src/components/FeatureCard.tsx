import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = React.memo(
  ({ icon, title, description }) => {
    return (
      <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] bg-[var(--card-bg)] rounded-lg shadow-sm p-6 text-center">
        <div className="flex justify-center mb-4 text-[var(--accent)]">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="">{description}</p>
      </div>
    );
  }
);
