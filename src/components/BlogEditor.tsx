import React, { useState, useCallback, useEffect } from 'react';
import { Save, Image, Link as LinkIcon, Eye, Edit } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { BlogPreview } from './BlogPreview';
import TurndownService from 'turndown';
import { dummyUsers } from '../lib/dummy-data';

const turndownService = new TurndownService();

const loggedInUser = dummyUsers[0];

interface BlogEditorProps {
  onSave: (content: {
    title: string;
    content: string;
    tags: string[];
    coverImage?: string;
  }) => void;
}

export function BlogEditor({ onSave }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
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
      content,
      tags,
      coverImage: coverImage || undefined,
    });
  }, [title, content, tags, coverImage, onSave]);

  const togglePreview = useCallback(() => {
    setIsPreview((prev) => !prev);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[var(--card-bg)] rounded-lg shadow-[var(--box-shadow)] p-6 border border-[var(--border-color)]">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="w-full text-2xl font-bold mb-4 border border-[var(--border-color)] rounded-lg focus:ring-2 focus:ring-[var(--accent)] bg-[var(--bg-secondary)] text-[var(--text-primary)] p-2"
      />

      {/* Cover Image */}
      {coverImage && (
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <label className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center gap-2 p-3">
        <Image className="w-5 h-5" /> Upload Cover Image
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>

      {/* Tags */}
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
              <p>Preview Blog before post</p>
              <Eye className="w-5 h-5" />
            </div>
          )}
        </button>
      </div>

      {/* Content Editor / Preview */}
      {isPreview ? (
        <BlogPreview
          blog={{
            title,
            content: turndownService.turndown(content),
            tags,
            cover_image: coverImage || '',
            author: loggedInUser,
            created_at: new Date().toISOString(),
            views: 0,
            likes: 0,
          }}
          onBack={togglePreview}
        />
      ) : (
        <div className="mb-4 relative">
          <div className="rounded-lg overflow-hidden">
            <ReactQuill
              theme="snow"
              value={content}
              placeholder="Write your blog content here..."
              onChange={handleContentChange}
              className="custom-quill bg-[var(--bg-primary)] text-[var(--text-primary)] w-full"
              style={{ minHeight: '350px' }}
            />
          </div>
        </div>
      )}

      {/* Save Button */}
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
}
