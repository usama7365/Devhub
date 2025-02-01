import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">DevHub</Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              A community platform for developers to share knowledge, discuss ideas, and grow together.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/knowledge-base" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/discussions" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Discussions
                </Link>
              </li>
              <li>
                <Link to="/bug-reports" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Bug Reports
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="mailto:support@devhub.com" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  support@devhub.com
                </a>
              </li>
              <li>
                <Link to="/meetings" className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  Schedule Meeting
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-500 dark:text-gray-400 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by DevHub Team
          </p>
        </div>
      </div>
    </footer>
  );
}