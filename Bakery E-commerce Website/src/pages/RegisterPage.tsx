import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as S from './RegisterPage.styled';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name);
      onNavigate('home');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <S.Card>
          <S.CardHeader>
            <S.CardTitle>Create Account</S.CardTitle>
            <S.CardDescription>Sign up for a Sweet Bakery account</S.CardDescription>
          </S.CardHeader>
          <S.CardContent>
            <S.Form onSubmit={handleSubmit}>
              {error && (
                <S.Alert>{error}</S.Alert>
              )}

              <S.FormGroup>
                <S.Label>Full Name</S.Label>
                <S.Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Email</S.Label>
                <S.Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@example.com"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Password</S.Label>
                <S.Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </S.FormGroup>

              <S.FormGroup>
                <S.Label>Confirm Password</S.Label>
                <S.Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                />
              </S.FormGroup>

              <S.SubmitButton type="submit" $disabled={loading} disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </S.SubmitButton>
            </S.Form>

            <S.Footer>
              <S.FooterText>
                Already have an account?{' '}
                <S.FooterLink
                  onClick={() => onNavigate('login')}
                >
                  Login
                </S.FooterLink>
              </S.FooterText>
            </S.Footer>
          </S.CardContent>
        </S.Card>
      </S.FormWrapper>
    </S.Container>
  );
}
