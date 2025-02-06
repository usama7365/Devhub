import React, { useState, useCallback } from 'react';
import { Save, Image, Link as LinkIcon } from 'lucide-react';

interface BlogEditorProps {
  onSave: (content: { title: string; content: string; tags: string[] }) => void;
}

interface BlogContent {
  title: string;
  content: string;
  tags: string[];
}

export function BlogEditor({ onSave }: BlogEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

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

    const blogContent: BlogContent = {
      title,
      content,
      tags,
    };

    onSave(blogContent);
  }, [title, content, tags, onSave]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="Title"
        className="w-full text-3xl font-bold mb-4 bg-transparent border-none focus:outline-none focus:ring-0"
      />

      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(index)}
                className="ml-2 text-indigo-600 dark:text-indigo-400"
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
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
        />
      </div>

      <div className="mb-4 border-b dark:border-gray-700 pb-2">
        <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <Image className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <LinkIcon className="w-5 h-5" />
        </button>
      </div>

      <textarea
        value={content}
        onChange={handleContentChange}
        placeholder="Write your story..."
        className="w-full min-h-[400px] bg-transparent border-none focus:outline-none focus:ring-0 resize-none"
      />

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Save
        </button>
      </div>
    </div>
  );
}
