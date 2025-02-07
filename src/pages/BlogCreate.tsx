import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogEditor } from '../components/BlogEditor';
import { supabase } from '../lib/supabase';

export function BlogCreate() {
  const navigate = useNavigate();

  const handleSave = async (content: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate('/signin');
        return;
      }

      const { error } = await supabase.from('blog_posts').insert([
        {
          title: content.title,
          content: content.content,
          tags: content.tags,
          user_id: user.id,
        },
      ]);

      if (error) throw error;

      navigate('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Create Blog Post
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Share your knowledge and experiences with the community
          </p>
        </div>

        <BlogEditor onSave={handleSave} />
      </div>
    </div>
  );
}
