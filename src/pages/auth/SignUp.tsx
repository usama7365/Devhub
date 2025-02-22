import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import LOGO from '../../assets/images/logo-dark.png';
import { Button } from '../../components/Button';
export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: { data: { username: formData.username } },
      });

      if (signUpError) throw signUpError;

      const { error: profileError } = await supabase
        .from('users')
        .insert([{ username: formData.username, email: formData.email }]);

      if (profileError) throw profileError;

      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignUp = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="mt-[4rem] mb-[7rem] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 bg-[var(--bg-primary)] border-b border-[var(--border-color)]">
      <div className="max-w-md w-full space-y-8">
        {/* Add Logo here */}
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
            Create your account
          </h2>
          <p className="text-center text-sm text-[var(--text-secondary)]">
            or{' '}
            <Link
              to="/signin"
              className="font-medium text-[var(--accent)] hover:text-[var(--accent)]/90"
            >
              sign in
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="space-y-2">
            {['username', 'email', 'password'].map((field) => (
              <input
                key={field}
                name={field}
                type={field === 'password' ? 'password' : 'text'}
                required
                value={formData[field as keyof typeof formData]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-[var(--border-color)] rounded bg-[var(--bg-primary)] text-[var(--text-primary)] focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              />
            ))}
          </div>

          <Button type="submit" fullWidth variant="brand" leftIcon={Mail} isLoading={loading}  >
  Sign up with Email
</Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[var(--text-secondary)]">or continue with</p>
          <Button variant="social" fullWidth leftIcon={Github} onClick={handleGithubSignUp}>
  Sign up with GitHub
</Button>
        </div>
      </div>
    </div>
  );
}
