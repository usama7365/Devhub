import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MessageSquare, BookOpen, Bug } from 'lucide-react';
import { Navbar } from './components/Navbar';
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
import { useTheme } from './lib/theme';
import './lib/theme.css';
import { Footer } from './components/footer';
import { dummyArticles, dummyPosts } from './lib/dummy-data';
import { formatDistanceToNow } from 'date-fns';
import { BlogCreate } from './pages/BlogCreate';

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    const themes = [
      'theme-light',
      'theme-dark',
      'theme-sepia',
      'theme-nord',
      'theme-dracula',
    ];

    // Remove all previous theme classes
    themes.forEach((t) => root.classList.remove(t));

    // Apply new theme
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(isDark ? 'theme-dark' : 'theme-light');
    } else {
      root.classList.add(`theme-${theme}`);
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
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
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/new" element={<BlogCreate />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/meetings" element={<Meetings />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          Welcome to{' '}
          <span className="text-indigo-600 dark:text-indigo-400">DevHub</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
          Join our thriving community of developers to collaborate, share
          knowledge, and grow together.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/signup" className="btn">
            Join Community
          </Link>
          <Link to="/knowledge-base" className="btn-secondary">
            Explore Resources
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            title="Discussions"
            description="Engage in meaningful discussions about programming languages, frameworks, and tools."
            icon={<MessageSquare className="w-6 h-6" />}
          />
          <FeatureCard
            title="Knowledge Base"
            description="Access and contribute to our community-driven knowledge base of tech stacks and best practices."
            icon={<BookOpen className="w-6 h-6" />}
          />
          <FeatureCard
            title="Bug Reports"
            description="Get help with bugs and share solutions with fellow developers."
            icon={<Bug className="w-6 h-6" />}
          />
        </div>
      </section>

      {/* Latest Activity Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">
          Latest Activity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Discussions</h3>
            <div className="space-y-4">
              {dummyPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  to={`/discussions/${post.id}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700 -mx-6 px-6 py-3"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
            <div className="space-y-4">
              {dummyArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to={`/knowledge-base/${article.id}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700 -mx-6 px-6 py-3"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="text-center">
        <h2 className="text-3xl font-bold mb-12">Our Growing Community</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="10K+" label="Developers" />
          <StatCard number="5K+" label="Discussions" />
          <StatCard number="1K+" label="Articles" />
          <StatCard number="500+" label="Solutions" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 dark:bg-indigo-700 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Join?</h2>
        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
          Start collaborating with developers from around the world. Join our
          community today!
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="text-indigo-600 dark:text-indigo-400 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-400 mt-2">{label}</div>
    </div>
  );
}

export default App;
