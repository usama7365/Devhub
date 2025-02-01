import { Link } from 'react-router-dom';
import { Users, MessageSquare, BookOpen, Bug, Video, Pencil } from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  return (
<nav className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] fixed w-full z-30 top-0">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">DevHub</Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/discussions" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                <MessageSquare className="w-4 h-4 mr-2" />
                Discussions
              </Link>
              <Link to="/knowledge-base" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                <BookOpen className="w-4 h-4 mr-2" />
                Knowledge Base
              </Link>
              <Link to="/bug-reports" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                <Bug className="w-4 h-4 mr-2" />
                Bug Reports
              </Link>
              <Link to="/blog" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                <Pencil className="w-4 h-4 mr-2" />
                Blog
              </Link>
              <Link to="/meetings" className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100">
                <Video className="w-4 h-4 mr-2" />
                Meetings
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            <ThemeToggle />
            <Link to="/profile/Feline_Predator" className="flex items-center">
              <Users className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}