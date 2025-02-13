import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BugReportEditor } from '../components/BugReportEditor';
import { supabase } from '../lib/supabase';

export function BugReportCreate() {
  const navigate = useNavigate();

  const handleSave = async (content: {
    title: string;
    content: string;
    tags: string[];
    coverImage?: string;
  }) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate('/signin');
        return;
      }

      const { error } = await supabase.from('bug_reports').insert([
        {
          title: content.title,
          content: content.content,
          tags: content.tags,
          user_id: user.id || '',
          cover_image: content.coverImage,
          is_resolved: false,
          upvotes: 0,
        },
      ]);

      if (error) throw error;

      navigate('/bug-reports');
    } catch (error) {
      console.error('Error creating blog post:', error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <div className="max-w-7xl py-8 px-4 sm:px-6 lg:px-8 text-[var(--text-primary)] flex-1 w-full border border-[var(--bg-primary)]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">
            Create Bug Report
          </h1>
          <p className="mt-2 text-[var(--text-secondary)]">
            Document and troubleshoot technical issues with the community
          </p>
        </div>
        <BugReportEditor onSave={handleSave} />
      </div>
    </div>
  );
}
