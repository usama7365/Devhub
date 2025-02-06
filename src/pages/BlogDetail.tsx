import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Eye, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { dummyBlogPosts } from '../lib/dummy-data';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function BlogDetail() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const post = dummyBlogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-12 text-[var(--text-secondary)]">
        Blog post not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blogs
        </button>
      </div>
      <div className="max-w-full mx-auto bg-[var(--card-bg)] text-[var(--text-primary)]">
        {/* Blog Post Section */}
        <article className="bg-[var(--bg-card)] dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {/* Cover Image */}
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-48 sm:h-64 md:h-96 object-cover"
          />

          {/* Blog Post Content */}
          <div className="p-6 sm:p-8">
            {/* Author Info and Metadata */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <img
                  src={post.author.avatar_url}
                  alt={post.author.username}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                    {post.author.username}
                  </h3>
                  <div className="flex items-center text-sm text-[var(--text-secondary)]">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-[var(--text-secondary)]">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views} views
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes} likes
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-4">
              {post.title}
            </h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none text-[var(--text-primary)]">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={vscDarkPlus}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  img({ node, ...props }) {
                    return (
                      <img className="w-full rounded-lg my-4" {...props} />
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
