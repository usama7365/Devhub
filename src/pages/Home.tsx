import React from 'react';
import { Button } from '../components/Button';
import { BookOpen, Bug, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dummyArticles, dummyPosts } from '../lib/dummy-data';
import { formatDistanceToNow } from 'date-fns';

export function Home() {
  return (
    <div className="max-w-7xl mx-auto space-y-24 py-12 px-2 sm:px-6">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-bold text-[var(--text-primary)] mb-6">
          Welcome to <span className="text-[var(--accent)]">DevHub</span>
        </h1>
        <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-8 px-4">
          Join our thriving community of developers to collaborate, share
          knowledge, and grow together.
        </p>
        <div className="flex flex-wrap justify-center gap-4 px-4">
          <Button href="/signup" variant="solid" withArrow>
            Join Community
          </Button>
          <Button href="/knowledge-base" variant="soft" leftIcon={BookOpen}>
            Explore Resources
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-2">
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
      <section className="px-2">
        <h2 className="text-3xl font-bold text-center mb-12">
          Latest Activity
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Recent Discussions</h3>
            <div className="space-y-4">
              {dummyPosts.slice(0, 3).map((post) => (
                <Link
                  key={post.id}
                  to={`/discussions/${post.id}`}
                  className="block hover:bg-[var(--hover-bg)] -mx-6 px-6 py-3"
                >
                  <h4 className="font-medium text-[var(--text-primary)]">
                    {post.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Latest Articles</h3>
            <div className="space-y-4">
              {dummyArticles.slice(0, 3).map((article) => (
                <Link
                  key={article.id}
                  to={`/knowledge-base/${article.id}`}
                  className="block hover:bg-[var(--hover-bg)] -mx-6 px-6 py-3"
                >
                  <h4 className="font-medium text-[var(--text-primary)]">
                    {article.title}
                  </h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    {article.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats Section */}
      <section className="text-center px-2">
        <h2 className="text-3xl font-bold mb-12">Our Growing Community</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="10K+" label="Developers" />
          <StatCard number="5K+" label="Discussions" />
          <StatCard number="1K+" label="Articles" />
          <StatCard number="500+" label="Solutions" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[var(--card-bg)] text-[var(--text-secondary)] -mx-4 sm:-mx-6 lg:-mx-8 px-6 sm:px-8 lg:px-10 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Join?</h2>
        <p className="mb-8 max-w-2xl mx-auto px-4">
          Start collaborating with developers from around the world. Join our
          community today!
        </p>
        <Button href="/signup" variant="brand" withArrow>
          Get Started
        </Button>
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
    <div className="bg-[var(--bg-secondary)] rounded-lg shadow-sm p-6">
      <div className="text-[var(--accent)] mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-[var(--text-secondary)]">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-[var(--accent)]">{number}</div>
      <div className="text-[var(--text-secondary)] mt-2">{label}</div>
    </div>
  );
}
