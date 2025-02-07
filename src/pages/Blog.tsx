import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Search, Calendar, Eye, Heart } from 'lucide-react';
import { dummyBlogPosts } from '../lib/dummy-data';
import { formatDistanceToNow } from 'date-fns';
import type { BlogPost } from '../types';

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onTagSelect: (tag: string) => void;
}

const TagButton = ({ tag, isSelected, onTagSelect }: TagButtonProps) => (
  <button
    onClick={() => onTagSelect(tag)}
    className={`block w-full text-left px-2 py-1 rounded ${
      isSelected
        ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
    }`}
  >
    {tag}
  </button>
);

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => (
  <article className="bg-[var(--card-bg)] rounded-lg shadow-sm overflow-hidden">
    <img
      src={post.cover_image}
      alt={post.title}
      className="w-full h-48 md:h-64 object-cover"
    />
    <div className="p-6">
      <Link to={`/blog/${post.id}`}>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)]">
          {post.title}
        </h2>
      </Link>

      {/* Author Info */}
      <div className="mt-4 flex items-center space-x-4">
        <img
          src={post.author.avatar_url}
          alt={post.author.username}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {post.author.username}
          </p>
          <div className="flex items-center text-sm text-[var(--text-secondary)]">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {post.views}
          </span>
          <span className="flex items-center">
            <Heart className="w-4 h-4 mr-1" />
            {/* {post.likes} */}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </article>
);

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    return Array.from(new Set(dummyBlogPosts.flatMap((post) => post.tags)));
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const handleTagSelect = useCallback((tag: string) => {
    setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  }, []);

  const filteredPosts = useMemo(() => {
    return dummyBlogPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchTerm, selectedTag]);

  const renderEmptyState = () => (
    <div className="text-center py-12 text-[var(--text-secondary)]">
      No blog posts found matching your criteria
    </div>
  );

  const renderTagsList = () => (
    <div className="space-y-2">
      {allTags.map((tag) => (
        <TagButton
          key={tag}
          tag={tag}
          isSelected={selectedTag === tag}
          onTagSelect={handleTagSelect}
        />
      ))}
    </div>
  );

  const renderSearchBar = () => (
    <div className="relative">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-[var(--card-bg)] w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
      />
      <Search className="w-5 h-5 text-[var(--text-secondary)] absolute left-3 top-2.5" />
    </div>
  );

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 w lg:px-8 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Blog
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Share your knowledge and experiences
          </p>
        </div>
        <Link
          to="/blog/new"
          className="btn bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] hover:bg-[var(--accent)]"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Write Post
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Section */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-[var(--card-bg)] rounded-lg shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              Popular Tags
            </h3>
            {renderTagsList()}
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="flex-1">
          <div className="mb-6">{renderSearchBar()}</div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
            {filteredPosts.length === 0 && renderEmptyState()}
          </div>
        </div>
      </div>
    </div>
  );
}
