import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  MessageSquare,
  BookOpen,
  Bug,
  Video,
  Pencil,
  Menu,
  X,
  Bell,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface NavLinkProps {
  to: string;
  Icon: React.ComponentType<{ className?: string }>;
  text: string;
}

interface MobileNavLinkProps extends NavLinkProps {
  setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavLink: React.FC<NavLinkProps> = ({ to, Icon, text }) => (
  <Link
    to={to}
    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[var(--accent)]"
  >
    <Icon className="w-4 h-4 mr-2" />
    {text}
  </Link>
);

const MobileNavLink: React.FC<MobileNavLinkProps> = ({
  to,
  Icon,
  text,
  setIsMobileMenuOpen,
}) => {
  const handleClick = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, [setIsMobileMenuOpen]);

  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded-md text-base font-medium text-[var(--accent)]"
      onClick={handleClick}
    >
      <Icon className="w-4 h-4 mr-2 inline" />
      {text}
    </Link>
  );
};

const NAVIGATION_ITEMS = [
  { to: '/discussions', Icon: MessageSquare, text: 'Discussions' },
  { to: '/knowledge-base', Icon: BookOpen, text: 'Knowledge Base' },
  { to: '/bug-reports', Icon: Bug, text: 'Bug Reports' },
  { to: '/blog', Icon: Pencil, text: 'Blog' },
  { to: '/meetings', Icon: Video, text: 'Meetings' },
];

const MobileMenu: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-full bg-[var(--bg-primary)] shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="px-4 pt-5 pb-3 flex justify-between">
          <Link
            to="/"
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
            onClick={onClose}
          >
            DevHub
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="px-2 pt-2 pb-3 space-y-1">
          {NAVIGATION_ITEMS.map((item) => (
            <MobileNavLink
              key={item.to}
              {...item}
              setIsMobileMenuOpen={onClose}
            />
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}
    </>
  );
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleMobileMenuClose = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <nav className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] text-[var(--text-primary)] fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side (Logo & Desktop Menu) */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
            >
              DevHub
            </Link>
            <div className="hidden sm:flex sm:ml-6 sm:space-x-8 text-[var(--accent)]">
              {NAVIGATION_ITEMS.map((item) => (
                <NavLink key={item.to} {...item} />
              ))}
            </div>
          </div>

          {/* Right Side (Icons & Mobile Menu Button) */}
          <div className="flex items-center space-x-4 text-[var(--accent)]">
            <Link
              to="/notifications"
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <Bell className="w-6 h-6 text-[var(--accent)]" />
            </Link>
            <ThemeToggle />
            <Link to="/profile/Feline_Predator" className="flex items-center">
              <Users className="w-6 h-6 text-[var(--accent)]" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="sm:hidden p-2 text-[var(--accent)]"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />
    </nav>
  );
}

export default Navbar;
