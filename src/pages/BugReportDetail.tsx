import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bug, ThumbsUp, Check, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { dummyBugReports, dummyComments, dummyUsers } from '../lib/dummy-data';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeProps {
  node: any;
  inline: boolean;
  className: string;
  children: React.ReactNode;
  [key: string]: any;
}

const CodeBlock: React.FC<CodeProps> = ({
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || '');

  if (!inline && match) {
    return (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

const markdownComponents: Components = {
  code: CodeBlock as any,
};

export function BugReportDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { bug, author, comments } = useMemo(() => {
    const foundBug = dummyBugReports.find((b) => b.id === id);
    const foundAuthor = dummyUsers.find((u) => u.id === foundBug?.user_id);
    const relatedComments = dummyComments.filter((c) => c.post_id === id);

    return {
      bug: foundBug,
      author: foundAuthor,
      comments: relatedComments,
    };
  }, [id]);

  const handleNavigateBack = () => {
    navigate('/bug-reports');
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // will handle comments through socket
  };

  if (!bug || !author) {
    return (
      <div className="text-center py-12 text-[var(--text-secondary)]">
        Bug report not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={handleNavigateBack}
          className="inline-flex items-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Bug reports
        </button>
      </div>
      <div className="max-w-full mx-auto bg-[var(--card-bg)] ">
        {/* Bug Report Section */}
        <div className="bg-[var(--bg-card)] dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Author Info and Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={author.avatar_url}
                alt={author.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  {author.username}
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  {formatDistanceToNow(new Date(bug.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {bug.is_resolved && (
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
            {bug.title}
          </h1>

          {/* Bug Content */}
          <div className="prose dark:prose-invert max-w-none mb-6">
            <ReactMarkdown components={markdownComponents}>
              {bug.content}
            </ReactMarkdown>
          </div>

          {/* Tags and Upvotes */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {bug.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="inline-flex items-center text-[var(--text-secondary)] hover:text-[var(--accent)] dark:hover:text-[var(--accent)]">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{bug.upvotes}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-[var(--text-primary)]">
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <img
                    src={comment.user.avatar_url}
                    alt={comment.user.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                        <h4 className="font-medium text-[var(--text-primary)]">
                          {comment.user.username}
                        </h4>
                        <span className="text-sm text-[var(--text-secondary)]">
                          {formatDistanceToNow(new Date(comment.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                      <p className="text-[var(--text-primary)] dark:text-[var(--text-secondary)]">
                        {comment.content}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <button className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] dark:hover:text-[var(--accent)]">
                        <ThumbsUp className="w-4 h-4 inline mr-1" />
                        {comment.upvotes}
                      </button>
                      {comment.is_accepted && (
                        <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
                          <Check className="w-4 h-4 mr-1" />
                          Solution
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Form */}
            <form className="mt-6" onSubmit={handleCommentSubmit}>
              <textarea
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border  rounded-lg  bg-[var(--bg-primary)] text-[var(--text-primary)]"
                rows={4}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] hover:bg-[var(--accent)]"
                >
                  Post Comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
