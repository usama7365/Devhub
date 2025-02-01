import { useParams } from 'react-router-dom';
import { Bug, ThumbsUp, Check } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { dummyBugReports, dummyComments, dummyUsers } from '../lib/dummy-data';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function BugReportDetail() {
  const { id } = useParams<{ id: string }>();
  const bug = dummyBugReports.find(b => b.id === id);
  const comments = dummyComments.filter(c => c.post_id === id);
  const author = dummyUsers.find(u => u.id === bug?.user_id);

  if (!bug || !author) {
    return <div className="text-center py-12">Bug report not found</div>;
  }

  return (
    <div className="py-8">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={author.avatar_url}
                alt={author.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{author.username}</h2>
                <p className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(bug.created_at), { addSuffix: true })}
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

          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">{bug.title}</h1>

          <div className="prose dark:prose-invert max-w-none mb-6">
            <ReactMarkdown
              children={bug.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, '')}
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              {bug.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="inline-flex items-center text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{bug.upvotes}</span>
            </button>
          </div>

          <div className="border-t dark:border-gray-700 pt-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>

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
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{comment.user.username}</h4>
                        <span className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                    </div>
                    <div className="mt-2 flex items-center space-x-4">
                      <button className="text-sm text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400">
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

            <form className="mt-6">
              <textarea
                placeholder="Add a comment..."
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
                rows={4}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn"
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