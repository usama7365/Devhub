import React, { useState } from 'react';
import { Bug, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyBugReports } from '../lib/dummy-data';
import { BugReportCard } from '../components/BugReportCard';

export function BugReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showResolved, setShowResolved] = useState<boolean | null>(null);

  const allTags = Array.from(
    new Set(dummyBugReports.flatMap((bug) => bug.tags))
  );

  const filteredBugs = dummyBugReports.filter((bug) => {
    const matchesSearch =
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => bug.tags.includes(tag));
    const matchesResolved =
      showResolved === null || bug.is_resolved === showResolved;

    return matchesSearch && matchesTags && matchesResolved;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Bug Reports
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Report and track bugs, get help from the community
          </p>
        </div>
        <Link
          to="/bug-reports/new"
          className="btn bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] hover:bg-[var(--accent)]"
        >
          <Bug className="w-4 h-4 mr-2" />
          Report Bug
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 ">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center gap-2 text-[var(--text-primary)] font-semibold mb-3">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </div>
            <div className="space-y-4">
              {/* Status Filters */}
              <div>
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Status
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showResolved === false}
                      onChange={() =>
                        setShowResolved(showResolved === false ? null : false)
                      }
                      className="rounded text-[var(--accent)]"
                    />
                    <span className="ml-2 text-sm text-[var(--text-secondary)]">
                      Open
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showResolved === true}
                      onChange={() =>
                        setShowResolved(showResolved === true ? null : true)
                      }
                      className="rounded text-[var(--accent)]"
                    />
                    <span className="ml-2 text-sm text-[var(--text-secondary)]">
                      Resolved
                    </span>
                  </label>
                </div>
              </div>

              {/* Tags Filters */}
              <div>
                <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
                  Tags
                </h3>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="rounded text-[var(--accent)]"
                      />
                      <span className="ml-2 text-sm text-[var(--text-secondary)]">
                        {tag}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bug Reports Section */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bug reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
              />
              <Search className="w-5 h-5 text-[var(--text-secondary)] absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Bug Reports List */}
          <div className="space-y-6">
            {filteredBugs.map((bug) => (
              <BugReportCard key={bug.id} post={bug} />
            ))}
            {filteredBugs.length === 0 && (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                No bug reports found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
