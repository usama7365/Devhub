import React, { useState, useCallback, useEffect } from 'react';
import { Save, Image, Link as LinkIcon, Eye, Edit } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TurndownService from 'turndown';
import { dummyUsers } from '../lib/dummy-data';
import { BugReportPreview } from './BugReportPreview';

const turndownService = new TurndownService();

const loggedInUser = dummyUsers[0];

interface BugReportEditorProps {
  onSave: (content: { title: string; content: string; tags: string[] }) => void;
}

export const BugReportEditor = ({ onSave }: BugReportEditorProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPreview, setIsPreview] = useState(false);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleNewTagChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewTag(e.target.value);
    },
    []
  );

  const handleAddTag = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && newTag.trim()) {
        e.preventDefault();
        setTags((prevTags) => [...prevTags, newTag.trim()]);
        setNewTag('');
      }
    },
    [newTag]
  );

  const handleRemoveTag = useCallback((indexToRemove: number) => {
    setTags((prevTags) =>
      prevTags.filter((_, index) => index !== indexToRemove)
    );
  }, []);

  const handleSave = useCallback(() => {
    if (!title.trim() || !content.trim()) return;

    onSave({
      title,
      content: turndownService.turndown(content),
      tags,
    });
  }, [title, content, tags, onSave]);

  const togglePreview = useCallback(() => {
    setIsPreview((prev) => !prev);
  }, []);

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-[var(--box-shadow)] p-6 border border-[var(--border-color)]">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full text-2xl font-bold mb-4 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] bg-[var(--bg-secondary)] text-[var(--text-primary)] p-2"
          value={title}
          onChange={handleTitleChange}
        />

        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-sm bg-[var(--accent)] text-[var(--bg-primary)]"
              >
                {tag}
                <button
                  onClick={() => handleRemoveTag(index)}
                  className="ml-2 text-[var(--text-secondary)]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={newTag}
            onChange={handleNewTagChange}
            onKeyDown={handleAddTag}
            placeholder="Add tags..."
            className="w-full px-3 py-2 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          />
        </div>
        {/* Toolbar */}
        <div className="mb-4 border-b border-[var(--border-color)] pb-2 flex items-center gap-2">
          <button
            onClick={togglePreview}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            {isPreview ? (
              <Edit className="w-5 h-5" />
            ) : (
              <div className="flex items-center space-x-2">
                <p>Preview Bug Report before post</p>
                <Eye className="w-5 h-5" />
              </div>
            )}
          </button>
        </div>

        {/* Content Editor / Preview */}
        {isPreview ? (
          <BugReportPreview
            bugReport={{
              title,
              content: turndownService.turndown(content),
              tags,
              upvotes: 0,
              is_resolved: false,
              created_at: new Date().toISOString(),
            }}
            onBack={togglePreview}
          />
        ) : (
          <ReactQuill
            theme="snow"
            value={content}
            placeholder="Write your Bug Report here..."
            onChange={handleContentChange}
            className="custom-quill bg-[var(--bg-primary)] text-[var(--text-primary)] w-full"
            style={{ minHeight: '350px' }}
          />
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[var(--bg-primary)] bg-[var(--accent)] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]"
        >
          <Save className="w-4 h-4 mr-2" /> Save
        </button>
      </div>
    </div>
  );
};
