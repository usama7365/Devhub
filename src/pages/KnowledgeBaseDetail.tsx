import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Tag, Eye, Calendar, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { dummyArticles, dummyUsers } from '../lib/dummy-data';

export function KnowledgeBaseDetail() {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const article = dummyArticles.find((a) => a.id === id);
  const author = dummyUsers.find((u) => u.id === article?.user_id);

  if (!article || !author) {
    return <div className="text-center py-12">Article not found</div>;
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => navigate('/knowledge-base')}
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Knowledge Base
        </button>
      </div>
      <div className="max-w-4xl mx-auto">
        {/* Article Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sm:p-8">
          {/* Author Info and Views */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <img
                src={author.avatar_url}
                alt={author.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {author.username}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDistanceToNow(new Date(article.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            </div>
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <Eye className="w-4 h-4 mr-1" />
              {article.views} views
            </div>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {article.title}
          </h1>

          {/* Tags and Category */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {article.category}
            </span>
          </div>

          {/* Article Content */}
          <div className="prose dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {article.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
