import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CardHeader = styled.div<{ className?: string }>`
  display: grid;
  grid-template-columns: ${({ className }) => 
    className?.includes('flex-row') ? '1fr auto' : '1fr'};
  align-items: ${({ className }) => 
    className?.includes('items-center') ? 'center' : 'start'};
  gap: ${({ className }) => 
    className?.includes('space-y-0') ? '0' : '0.375rem'};
  padding: ${({ className }) => 
    className?.includes('pb-2') ? '1.5rem 1.5rem 0.5rem' : '1.5rem 1.5rem 0'};
  border-bottom: ${({ className, theme }) => 
    className?.includes('border-b') ? `1px solid ${theme.colors.border}` : 'none'};
`;

export const CardTitle = styled.h3<{ className?: string }>`
  font-size: ${({ className, theme }) => 
    className?.includes('text-sm') ? theme.fontSizes.sm : theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CardContent = styled.div<{ className?: string }>`
  padding: ${({ className }) => {
    if (className?.includes('p-16')) return '4rem';
    if (className?.includes('p-8')) return '2rem';
    if (className?.includes('p-6')) return '1.5rem';
    if (className?.includes('p-4')) return '1rem';
    return '1.5rem';
  }};
  text-align: ${({ className }) => 
    className?.includes('text-center') ? 'center' : 'left'};
`;

export const CardFooter = styled.div`
  padding: 0 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

