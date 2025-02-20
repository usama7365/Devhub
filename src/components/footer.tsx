import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import LOGO from '../assets/images/logo-dark.png';

export function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
          <div className="col-span-1 sm:col-span-2 text-center sm:text-left">
            <Link
              to="/"
              className="inline-flex sm:flex items-center justify-center sm:justify-start"
            >
              <img src={LOGO} alt="DevHub Logo" style={{ height: '5.5rem' }} />
            </Link>
            <p className="mt-4 text-[var(--text-secondary)]">
              A community platform for developers to share knowledge, discuss
              ideas, and grow together.
            </p>
            <div className="mt-6 flex space-x-4 justify-center sm:justify-start">
              <a
                href="https://github.com"
                className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  to="/knowledge-base"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  Knowledge Base
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/discussions"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  to="/bug-reports"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  Bug Reports
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              Contact
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="mailto:support@devhub.com"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)] inline-flex items-center justify-center sm:justify-start"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  support@devhub.com
                </a>
              </li>
              <li>
                <Link
                  to="/meetings"
                  className="text-[var(--text-secondary)] hover:text-[var(--accent)]"
                >
                  Schedule Meeting
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border-color)]">
          <p className="text-center text-[var(--text-secondary)] flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by DevHub
            Team
          </p>
        </div>
      </div>
    </footer>
  );
}
