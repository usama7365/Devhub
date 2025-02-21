import React from 'react';

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
}) {
  return (
    <div className="bg-[var(--bg-primary)] text-[var(--text-primary)] rounded-lg p-4">
      <div className="flex items-center space-x-3">
        <div className="text-[var(--accent)]">{icon}</div>
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-sm text-[var(--text-secondary)]">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
