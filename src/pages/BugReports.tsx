import { useState } from 'react';
import { Bug, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyBugReports } from '../lib/dummy-data';
import { BugReportCard } from '../components/BugReportCard';

export function BugReports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showResolved, setShowResolved] = useState<boolean | null>(null);

  const allTags = Array.from(
    new Set(dummyBugReports.flatMap(bug => bug.tags))
  );

  const filteredBugs = dummyBugReports.filter(bug => {
    const matchesSearch = 
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bug.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = 
      selectedTags.length === 0 ||
      selectedTags.every(tag => bug.tags.includes(tag));
    const matchesResolved = 
      showResolved === null || bug.is_resolved === showResolved;
    
    return matchesSearch && matchesTags && matchesResolved;
  });

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Bug Reports</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Report and track bugs, get help from the community</p>
        </div>
        <Link to="/bug-reports/new" className="btn">
          <Bug className="w-4 h-4 mr-2" />
          Report Bug
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-semibold mb-3">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showResolved === false}
                      onChange={() => setShowResolved(showResolved === false ? null : false)}
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Open</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showResolved === true}
                      onChange={() => setShowResolved(showResolved === true ? null : true)}
                      className="rounded text-indigo-600"
                    />
                    <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Resolved</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags</h3>
                <div className="space-y-2">
                  {allTags.map(tag => (
                    <label key={tag} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="rounded text-indigo-600"
                      />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search bug reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="space-y-6">
            {filteredBugs.map((bug) => (
              <BugReportCard key={bug.id} post={bug} />
            ))}
            {filteredBugs.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No bug reports found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}