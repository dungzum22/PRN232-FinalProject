import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: calc(100vh - 5rem);
  background: linear-gradient(135deg, rgba(217, 119, 87, 0.05), ${({ theme }) => theme.colors.background}, rgba(245, 230, 211, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const FormWrapper = styled.div`
  max-width: 28rem;
  margin: 0 auto;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(217, 119, 87, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

export const CardHeader = styled.div`
  padding: 2rem 2rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const IconContainer = styled.div`
  height: 4rem;
  width: 4rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  box-shadow: 0 10px 25px rgba(217, 119, 87, 0.2);
  
  svg {
    height: 2rem;
    width: 2rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const CardTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CardContent = styled.div`
  padding: 0 2rem 2rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Alert = styled.div`
  padding: 0.75rem 1rem;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid rgba(244, 67, 54, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid rgba(217, 119, 87, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.1);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SubmitButton = styled.button<{ $disabled?: boolean }>`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $disabled }) => 
    $disabled ? theme.colors.textMuted : theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    ${({ theme, $disabled }) => !$disabled && `
      background: ${theme.colors.primaryDark};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    `}
  }
`;

export const Footer = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

export const FooterText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const FooterLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:hover {
    text-decoration: underline;
  }
`;

export const DemoCredentials = styled.div`
  margin-top: 1.5rem;
  padding: 1.25rem;
  background: linear-gradient(135deg, rgba(249, 241, 234, 0.5), rgba(245, 230, 211, 0.3));
  border: 1px solid rgba(217, 119, 87, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

export const DemoTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const DemoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const DemoItem = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  
  span {
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

