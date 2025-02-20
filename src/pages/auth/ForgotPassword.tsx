import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LOGO from '../../assets/images/logo-dark.png';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      setMessage('Password reset link sent to your email.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-[4rem] mb-[7rem]  flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center mb-6">
          <img
            src={LOGO}
            alt="DevHub Logo"
            className="mx-auto"
            style={{ height: '8rem' }}
          />
        </div>

        <div>
          <h2 className="text-center text-3xl font-extrabold text-[var(--text-primary)]">
            Forgot Password
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div className="space-y-2">
            <p className=" text-center text-sm text-[var(--text-secondary)]">
              Enter your email to receive a password reset link.
            </p>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-[var(--accent)] focus:border-[var(--accent)]"
              placeholder="Email"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center py-2 px-4 bg-[var(--accent)] text-[var(--bg-primary)] rounded hover:bg-[var(--accent)]/90"
          >
            <Mail className="w-4 h-4 mr-2" />
            Send Reset Link
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[var(--text-secondary)]">
            Remember your password?{' '}
            <Link
              to="/signin"
              className="font-medium text-[var(--accent)] hover:text-[var(--accent)]/90"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
