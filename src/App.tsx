import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { motion } from 'framer-motion';
import startupLoader from './assets/gif-Loader/startupLoader.gif';
import planLoader from './assets/gif-Loader/PlanLoader.gif';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { KnowledgeBase } from './pages/KnowledgeBase';
import { KnowledgeBaseDetail } from './pages/KnowledgeBaseDetail';
import { Discussions } from './pages/Discussions';
import { DiscussionDetail } from './pages/DiscussionDetail';
import { BugReports } from './pages/BugReports';
import { BugReportDetail } from './pages/BugReportDetail';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Meetings } from './pages/Meetings';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { ResetPassword } from './pages/auth/ResetPassword';
import { useTheme } from './lib/theme';
import './lib/theme.css';
import { Footer } from './components/footer';
import { BlogCreate } from './pages/BlogCreate';
import { MeetingSchedule } from './pages/MeetingSchedule';
import { CodeEditor } from './pages/CodeEditor';
import { Notifications } from './pages/Notifications';
import { BugReportCreate } from './pages/BugReportCreate';

import 'react-quill/dist/quill.snow.css';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const root = document.documentElement;
    const themes = [
      'theme-light',
      'theme-dark',
      'theme-sepia',
      'theme-nord',
      'theme-dracula',
    ];
    themes.forEach((t) => root.classList.remove(t));
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(isDark ? 'theme-dark' : 'theme-light');
    } else {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  if (loading && location.pathname === '/') {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-[var(--bg-primary)]">
        <img src={startupLoader} alt="Startup Loader" className="w-32 h-32" />
        <motion.p
          className="mt-4 text-lg font-semibold text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          WELCOME TO DEVHUB COMMUNITY
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full text-[var(--text-primary)] bg-[var(--bg-primary)]">
      <Navbar />
      <main className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center h-screen">
              <img src={planLoader} alt="Loading..." className="w-20 h-20" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/discussions/:id" element={<DiscussionDetail />} />
            <Route path="/knowledge-base" element={<KnowledgeBase />} />
            <Route
              path="/knowledge-base/:id"
              element={<KnowledgeBaseDetail />}
            />
            <Route path="/bug-reports" element={<BugReports />} />
            <Route path="/bug-reports/:id" element={<BugReportDetail />} />
            <Route path="/bug-reports/new" element={<BugReportCreate />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/new" element={<BlogCreate />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/meetings/schedule" element={<MeetingSchedule />} />
            <Route path="/CodeEditor" element={<CodeEditor />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </React.Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
