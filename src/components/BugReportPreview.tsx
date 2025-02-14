import React from 'react';
import { ArrowLeft, Bug, Check, ThumbsUp } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { dummyUsers } from '../lib/dummy-data';

interface BugReportPreviewProps {
  bugReport: {
    title: string;
    content: string;
    tags: string[];
    upvotes: number;
    is_resolved: boolean;
    created_at: string;
  };
  onBack: () => void;
}

export function BugReportPreview({ bugReport, onBack }: BugReportPreviewProps) {
  const author = dummyUsers[0];

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

      {/* Author Info and Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <img
            src={author?.avatar_url || ''}
            alt={author?.username || ''}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">
              {author?.username || 'Unknown User'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {formatDistanceToNow(new Date(bugReport?.created_at || ''), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {bugReport?.is_resolved && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Check className="w-4 h-4 mr-1" />
              Resolved
            </span>
          )}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <Bug className="w-4 h-4 mr-1" />
            Bug Report
          </span>
        </div>
      </div>

      {/* Bug Title */}
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
        {bugReport?.title || ''}
      </h1>

      {/* Bug Content */}
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
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
          {bugReport.content}
        </ReactMarkdown>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
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
          {bugReport.content}
        </ReactMarkdown>
      </div>

      {/* Tags and Upvotes */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {bugReport?.tags?.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <button className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] dark:hover:text-[var(--accent)]">
          <ThumbsUp className="w-4 h-4 mr-1" />
          <span>{bugReport?.upvotes || 0}</span>
        </button>
      </div>

      {bugReport.is_resolved && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 rounded-lg">
          <div className="flex items-center text-green-700 dark:text-green-200">
            <Check className="w-5 h-5 mr-2" />
            <span className="font-medium">This issue has been resolved</span>
          </div>
        </div>
      )}
    </div>
  );
}
