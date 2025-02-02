import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Eye, Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { dummyBlogPosts } from '../lib/dummy-data';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const post = dummyBlogPosts.find((p) => p.id === id);

  if (!post) {
    return <div className="text-center py-12">Blog post not found</div>;
  }

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-96 object-cover"
          />

          <div className="p-8">
            <div className="flex items-center space-x-4 mb-6">
              <img
                src={post.author.avatar_url}
                alt={post.author.username}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {post.author.username}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDistanceToNow(new Date(post.created_at), {
                    addSuffix: true,
                  })}
                </div>
              </div>
              <div className="flex items-center space-x-4 ml-auto text-sm text-gray-500 dark:text-gray-400">
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

            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="prose dark:prose-invert max-w-none">
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
