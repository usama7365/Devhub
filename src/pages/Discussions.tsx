import React, { useState, useCallback, useMemo } from 'react';
import { MessageSquare, Search, Filter } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { dummyPosts } from '../lib/dummy-data';

const CATEGORIES = ['Frontend', 'Backend', 'DevOps'] as const;

export function Discussions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showResolved, setShowResolved] = useState<boolean | null>(null);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  const handleResolvedChange = useCallback((isResolved: boolean) => {
    setShowResolved((prev) => (prev === isResolved ? null : isResolved));
  }, []);

  const filteredPosts = useMemo(() => {
    return dummyPosts.filter((post) => {
      const matchesSearch =
        searchTerm === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        !selectedCategory || post.category === selectedCategory;
      const matchesResolved =
        showResolved === null || post.is_resolved === showResolved;

      return matchesSearch && matchesCategory && matchesResolved;
    });
  }, [searchTerm, selectedCategory, showResolved]);

  const renderCategoryFilters = useCallback(
    () => (
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
          Categories
        </h3>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => handleCategoryChange(category)}
                className="rounded text-indigo-600"
              />
              <span className="ml-2 text-sm text-[var(--text-secondary)]">
                {category}
              </span>
            </label>
          ))}
        </div>
      </div>
    ),
    [selectedCategory, handleCategoryChange]
  );

  const renderStatusFilters = useCallback(
    () => (
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-2">
          Status
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showResolved === false}
              onChange={() => handleResolvedChange(false)}
              className="rounded text-indigo-600"
            />
            <span className="ml-2 text-sm text-[var(--text-secondary)]">
              Open
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showResolved === true}
              onChange={() => handleResolvedChange(true)}
              className="rounded text-indigo-600"
            />
            <span className="ml-2 text-sm text-[var(--text-secondary)]">
              Resolved
            </span>
          </label>
        </div>
      </div>
    ),
    [showResolved, handleResolvedChange]
  );

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Discussions
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Join the conversation with fellow developers
          </p>
        </div>
        <button className="btn bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] hover:bg-[var(--accent)]">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Discussion
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 font-semibold mb-3 text-[var(--text-primary)]">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </div>
            <div className="space-y-4">
              {renderCategoryFilters()}
              {renderStatusFilters()}
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="flex-1">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-[var(--bg-input)] text-[var(--text-primary)]"
              />
              <Search className="w-5 h-5 text-[var(--text-secondary)] absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                No discussions found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
