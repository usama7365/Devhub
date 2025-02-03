import React, { useState } from 'react';
import { MessageSquare, Search, Filter } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { dummyPosts } from '../lib/dummy-data';

export function Discussions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showResolved, setShowResolved] = useState<boolean | null>(null);

  const filteredPosts = dummyPosts.filter((post) => {
    const matchesSearch =
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

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Discussions
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Join the conversation with fellow developers
          </p>
        </div>
        <button className="btn">
          <MessageSquare className="w-4 h-4 mr-2" />
          New Discussion
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-semibold mb-3">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </div>
            <div className="space-y-4">
              {/* Category Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Categories
                </h3>
                <div className="space-y-2">
                  {['Frontend', 'Backend', 'DevOps'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() =>
                          setSelectedCategory(
                            selectedCategory === category ? null : category
                          )
                        }
                        className="rounded text-indigo-600"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filters */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
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
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                      Resolved
                    </span>
                  </label>
                </div>
              </div>
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
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No discussions found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
