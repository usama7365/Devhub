import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Book, Search, Tag, Eye, Calendar } from 'lucide-react';
import { dummyArticles } from '../lib/dummy-data';
import { formatDistanceToNow } from 'date-fns';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  views: number;
  updated_at: string;
}

export function KnowledgeBase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Memoize categories to prevent unnecessary recalculation
  const categories = useMemo(() => {
    return Array.from(
      new Set(dummyArticles.map((article) => article.category))
    );
  }, []);

  // Extract search handler
  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Extract category selection handler
  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  }, []);

  // Memoize filtered articles
  const filteredArticles = useMemo(() => {
    return dummyArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        !selectedCategory || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Extract category item renderer
  const renderCategoryItem = useCallback(
    (category: string) => (
      <li
        key={category}
        className={`cursor-pointer ${
          selectedCategory === category
            ? 'text-indigo-600 dark:text-indigo-400 font-medium'
            : 'text-[var(--text-secondary)] hover:text-indigo-600 dark:hover:text-indigo-400'
        }`}
        onClick={() => handleCategorySelect(category)}
      >
        {category}
      </li>
    ),
    [selectedCategory, handleCategorySelect]
  );

  // Extract article renderer
  const renderArticle = useCallback(
    (article: Article) => (
      <article
        key={article.id}
        className="bg-[var(--card-bg)] rounded-lg shadow-sm p-6"
      >
        <Link to={`/knowledge-base/${article.id}`}>
          <h2 className="text-xl font-semibold text-[var(--text-primary)] hover:text-indigo-600 dark:hover:text-indigo-400">
            {article.title}
          </h2>
        </Link>
        <p className="mt-2 text-[var(--text-secondary)]">
          {article.description}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[var(--text-secondary)]" />
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {article.views} views
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDistanceToNow(new Date(article.updated_at), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </article>
    ),
    []
  );

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Knowledge Base
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Explore our community-driven knowledge base of tech stacks and best
            practices.
          </p>
        </div>
        <Link
          to="/knowledge-base/new"
          className="btn bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] hover:bg-[var(--accent)]"
        >
          <Book className="w-4 h-4 mr-2" />
          Write Article
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              Categories
            </h3>
            <ul className="space-y-2">{categories.map(renderCategoryItem)}</ul>
          </div>
        </div>

        {/* Articles Section */}
        <div className="flex-1 w-full">
          {/* Search Bar */}
          <div className="mb-6 relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-[var(--bg-input)] text-[var(--text-primary)]"
            />
            <Search className="w-5 h-5 text-[var(--text-secondary)] absolute left-3 top-2.5" />
          </div>

          {/* Articles List */}
          <div className="space-y-6">
            {filteredArticles.map(renderArticle)}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                No articles found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
