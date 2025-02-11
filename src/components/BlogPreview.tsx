import React from 'react';
import { ArrowLeft, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { dummyUsers } from '../lib/dummy-data';

interface BlogPreviewProps {
  blog: {
    title: string;
    content: string;
    tags: string[];
    cover_image?: string;
    author?: { username: string; avatar_url: string };
    created_at?: string;
    views?: number;
    likes?: number;
  };
  onBack: () => void;
}

export function BlogPreview({ blog, onBack }: BlogPreviewProps) {
  const author = blog.author || dummyUsers[0];

  return (
    <div className="max-w-4xl mx-auto py-8 px-6  rounded-lg shadow-md bg-[var(--bg-primary)] text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center text-sm text-[var(--text-primary)] mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Editor
      </button>

      {/* Cover Image */}
      {blog.cover_image && (
        <img
          src={blog.cover_image}
          alt={blog.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {/* Author & Date */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={author.avatar_url}
          alt={author.username}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="text-lg font-semibold">{author.username}</h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4 mr-1 inline-block" />
            {blog.created_at
              ? formatDistanceToNow(new Date(blog.created_at), {
                  addSuffix: true,
                })
              : 'Just now'}
          </div>
        </div>
      </div>

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Blog Content (Markdown Rendering) */}
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
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
                <code
                  className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded"
                  {...props}
                >
                  {children}
                </code>
              );
            },
            ul: ({ node, ...props }) => (
              <ul className="list-disc ml-5" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="list-decimal ml-5" {...props} />
            ),
            li: ({ node, ...props }) => <li className="mb-1" {...props} />,
            img: ({ node, ...props }) => (
              <img className="w-full rounded-lg my-4" {...props} />
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {children}
              </a>
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
