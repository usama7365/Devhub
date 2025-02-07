import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Eye, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { dummyArticles, dummyUsers } from '../lib/dummy-data';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Types
interface CodeProps {
  node: any;
  inline: boolean;
  className: string;
  children: React.ReactNode;
  [key: string]: any;
}

// Code Block component
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

const markdownComponents = {
  code: CodeBlock,
};

export function KnowledgeBaseDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const articleData = React.useMemo(() => {
    const article = dummyArticles.find((a) => a.id === id);
    const author = dummyUsers.find((u) => u.id === article?.user_id);
    return { article, author };
  }, [id]);

  const handleBackClick = React.useCallback(() => {
    navigate('/knowledge-base');
  }, [navigate]);

  if (!articleData.article || !articleData.author) {
    return (
      <div className="text-center py-12 text-[var(--text-secondary)]">
        Article not found
      </div>
    );
  }

  const { article, author } = articleData;

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={handleBackClick}
          className="inline-flex items-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Knowledge Base
        </button>
      </div>
      <div className="max-w-full mx-auto bg-[var(--card-bg)]">
        <div className="bg-[var(--bg-card)] dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Author Info and Views */}
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
                  {formatDistanceToNow(new Date(article.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center text-[var(--text-secondary)]">
              <Eye className="w-4 h-4 mr-1" />
              {article.views} views
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
            {article.title}
          </h1>

          {/* Tags and Category */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
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
            <span className="text-sm text-[var(--text-secondary)]">
              {article.category}
            </span>
          </div>

          {/* Article Content */}
          <div className="prose dark:prose-invert max-w-none mb-6">
            <ReactMarkdown components={markdownComponents}>
              {article.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
