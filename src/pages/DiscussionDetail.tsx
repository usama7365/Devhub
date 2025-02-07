import React, { useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageSquare, ThumbsUp, Check, ArrowLeft } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { dummyPosts, dummyComments, dummyUsers } from '../lib/dummy-data';

const CommentItem = React.memo(
  ({ comment }: { comment: (typeof dummyComments)[0] }) => (
    <div className="flex space-x-4">
      <img
        src={comment.user.avatar_url}
        alt={comment.user.username}
        className="w-8 h-8 rounded-full"
      />
      <div className="flex-1">
        <div className="rounded-lg p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
            <h4 className="font-medium">{comment.user.username}</h4>
            <span className="text-sm">
              {formatDistanceToNow(new Date(comment.created_at), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-[var(--text-primary)]">{comment.content}</p>
        </div>
        <div className="mt-2 flex items-center space-x-4">
          <button className="text-sm">
            <ThumbsUp className="w-4 h-4 inline mr-1" />
            {comment.upvotes}
          </button>
          {comment.is_accepted && (
            <span className="text-sm text-green-600 dark:text-green-400 flex items-center">
              <Check className="w-4 h-4 mr-1" />
              Accepted Answer
            </span>
          )}
        </div>
      </div>
    </div>
  )
);

const PostTag = React.memo(({ tag }: { tag: string }) => (
  <span className="px-3 py-1 text-sm font-medium bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] rounded-full">
    {tag}
  </span>
));

export function DiscussionDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { post, author, comments } = useMemo(() => {
    const foundPost = dummyPosts.find((p) => p.id === id);
    const foundAuthor = dummyUsers.find((u) => u.id === foundPost?.user_id);
    const relatedComments = dummyComments.filter((c) => c.post_id === id);

    return {
      post: foundPost,
      author: foundAuthor,
      comments: relatedComments,
    };
  }, [id]);

  // Event handlers
  const handleNavigateBack = useCallback(() => {
    navigate('/discussions');
  }, [navigate]);

  const handleCommentSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    // Add comment submission logic here
  }, []);

  if (!post || !author) {
    return <div className="text-center py-12">Discussion not found</div>;
  }

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={handleNavigateBack}
          className="inline-flex items-center text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Discussions
        </button>
      </div>
      <div className="max-w-full mx-auto bg-[var(--card-bg)] text-[var(--text-primary)]">
        {/* Post Section */}
        <div className="bg-[var(--bg-card)] dark:bg-gray-800 rounded-lg shadow-sm p-6">
          {/* Author Info and Resolved Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <img
                src={author.avatar_url}
                alt={author.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-semibold">{author.username}</h2>
                <p className="text-sm ">
                  {formatDistanceToNow(new Date(post.created_at), {
                    // please wrap this in useMemo
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            {post.is_resolved && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mt-4 sm:mt-0">
                <Check className="w-4 h-4 mr-1" />
                Resolved
              </span>
            )}
          </div>

          {/* Post Title */}
          <h1 className="text-2xl font-bold mb-4">{post.title}</h1>

          {/* Post Content */}
          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="">{post.content}</p>
          </div>

          {/* Tags and Upvotes */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <PostTag key={tag} tag={tag} />
              ))}
            </div>
            <button className="inline-flex items-center ">
              <ThumbsUp className="w-4 h-4 mr-1" />
              <span>{post.upvotes}</span>
            </button>
          </div>

          {/* Comments Section */}
          <div className="border-t  pt-6">
            <h3 className="text-lg font-semibold mb-4">
              {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
            </h3>

            {/* Comments List */}
            <div className="space-y-6 bg-[var(--bg-primary)] rounded-xl p-2">
              {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="mt-6">
              <textarea
                placeholder="Add a comment..."
                className="w-full px-3 py-2 rounded-lg border bg-[var(--bg-primary)] text-[var(--text-primary)]"
                rows={4}
              />
              <div className="mt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn bg-[var(--accent)] text-[var(--bg-primary)] dark:bg-[var(--accent)] dark:text-[var(--bg-primary)] hover:bg-[var(--accent)]"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
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
