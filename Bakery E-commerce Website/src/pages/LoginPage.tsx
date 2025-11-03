import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as S from './LoginPage.styled';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onNavigate('home');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.PageContainer>
      <S.Container>
        <S.FormWrapper>
          <S.Card>
            <S.CardHeader>
              <S.IconContainer>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </S.IconContainer>
              <S.CardTitle>Welcome Back</S.CardTitle>
              <S.CardDescription>Login to your Sweet Bakery account</S.CardDescription>
            </S.CardHeader>
            <S.CardContent>
              <S.Form onSubmit={handleSubmit}>
                {error && (
                  <S.Alert>{error}</S.Alert>
                )}

                <S.FormGroup>
                  <S.Label>Email</S.Label>
                  <S.Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                  />
                </S.FormGroup>

                <S.FormGroup>
                  <S.Label>Password</S.Label>
                  <S.Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </S.FormGroup>

                <S.SubmitButton type="submit" $disabled={loading} disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </S.SubmitButton>
              </S.Form>

              <S.Footer>
                <S.FooterText>
                  Don't have an account?{' '}
                  <S.FooterLink
                    onClick={() => onNavigate('register')}
                  >
                    Sign up
                  </S.FooterLink>
                </S.FooterText>
              </S.Footer>

              <S.DemoCredentials>
                <S.DemoTitle>Demo Credentials:</S.DemoTitle>
                <S.DemoList>
                  <S.DemoItem>
                    <span>Admin:</span> admin@bakery.com / admin123
                  </S.DemoItem>
                  <S.DemoItem>
                    <span>Customer:</span> customer@example.com / any password
                  </S.DemoItem>
                </S.DemoList>
              </S.DemoCredentials>
            </S.CardContent>
          </S.Card>
        </S.FormWrapper>
      </S.Container>
    </S.PageContainer>
  );
}
