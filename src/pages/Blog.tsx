import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Search, Calendar, Eye, Heart } from 'lucide-react';
import { dummyBlogPosts } from '../lib/dummy-data';
import { formatDistanceToNow } from 'date-fns';

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(dummyBlogPosts.flatMap((post) => post.tags))
  );

  const filteredPosts = dummyBlogPosts.filter(
    (post) =>
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )) &&
      (!selectedTag || post.tags.includes(selectedTag))
  );

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Blog
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Share your knowledge and experiences
          </p>
        </div>
        <Link
          to="/blog/new"
          className="btn bg-[var(--accent)] text-[var(--bg-primary)] hover:bg-[var(--accent)]/90"
        >
          <Pencil className="w-4 h-4 mr-2" />
          Write Post
        </Link>
      </div>

      <div className="flex gap-6">
        <div className="w-64 flex-shrink-0">
          <div className="bg-[var(--bg-primary)] rounded-lg shadow-sm p-4 mb-4">
            <h3 className="font-semibold text-[var(--text-primary)] mb-3">
              Popular Tags
            </h3>
            <div className="space-y-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`block w-full text-left px-2 py-1 rounded ${
                    selectedTag === tag
                      ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] focus:border-[var(--accent)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
              />
              <Search className="w-5 h-5 text-[var(--text-secondary)] absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-[var(--bg-primary)] rounded-lg shadow-sm overflow-hidden"
              >
                <img
                  src={post.cover_image}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <Link to={`/blog/${post.id}`}>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)] hover:text-[var(--accent)]">
                      {post.title}
                    </h2>
                  </Link>

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

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {post.views}
                      </span>
                      <span className="flex items-center">
                        <Heart className="w-4 h-4 mr-1" />
                        {post.likes}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-[var(--accent)]/10 text-[var(--accent)] rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 text-[var(--text-secondary)]">
                No blog posts found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
