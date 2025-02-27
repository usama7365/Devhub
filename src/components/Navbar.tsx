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
import LOGO from '../assets/images/main-logo.svg';

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
    className="inline-flex items-center px-1 pt-1 text-sm font-medium text-[var(--accent)] hover:text-[var(--text-hover)] rounded-md transition-all duration-200 ease-in-out"
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
        <div className="px-4 pt-5 pb-3 flex flex-col items-center">
          <Link
            to="/"
            className="text-xl font-bold text-[var(--text-secondary)] flex flex-col items-center"
            onClick={onClose}
          >
            <img src={LOGO} alt="DevHub Logo" style={{ height: '4.5rem' }} />
            <p className="text-lg mt-1">
              <span className="font-extrabold">DEV</span>
              <span className="font-normal">HUB</span>
            </p>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] absolute right-4 top-4"
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
    // fixed inset-x-0 top-0 z-50 border-b border-slate-200/10 backdrop-blur  //  we need to add this property properly and make sure it doesn't effect on open side bar
    <nav className="bg-[var(--bg-primary)] border-b border-[var(--border-color)] text-[var(--text-primary)] fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-19">
          {/* Left Sidebar (Logo & Desktop Menu) */}
          <div className="flex items-center ">
            <Link to="/" className="flex flex-col items-center">
              <img
                className="text-xl font-bold "
                src={LOGO}
                alt="DevHub Logo"
                style={{ height: '2.5rem' }}
              />
              <p className="text-lg text-[var(--text-primary)]">
                <span className="font-extrabold">DEV</span>
                <span className="font-normal">HUB</span>
              </p>
            </Link>
            <div className="hidden sm:flex sm:ml-6 sm:space-x-8 text-[var(--accent)]">
              {NAVIGATION_ITEMS.map((item) => (
                <NavLink key={item.to} {...item} />
              ))}
            </div>
          </div>

          {/* Right Side (Icons & Mobile Menu Button) */}
          <div className="flex items-center space-x-4 text-[var(--accent)] hover:text-[var(--text-hover)] rounded-md transition-all duration-200 ease-in-out">
            <Link
              to="/notifications"
              className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              <Bell className="w-6 h-6 text-[var(--accent)] hover:text-[var(--text-hover)] rounded-md transition-all duration-200 ease-in-out" />
            </Link>
            <ThemeToggle />
            <Link to="/profile/Feline_Predator" className="flex items-center">
              <Users className="w-6 h-6 text-[var(--accent)] hover:text-[var(--text-hover)] rounded-md transition-all duration-200 ease-in-out" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMobileMenuToggle}
              className="sm:hidden p-2 text-[var(--accent)] hover:text-[var(--text-hover)] rounded-md transition-all duration-200 ease-in-out"
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
