import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatValue = styled.div<{ $primary?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ $primary, theme }) => 
    $primary ? theme.colors.primary : theme.colors.text};
`;

export const StatLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-top: 0.25rem;
`;

export const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.textMuted};
  
  svg {
    height: 1rem;
    width: 1rem;
  }
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const StatusItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StatusLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatusDot = styled.div<{ $color: string }>`
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 50%;
  background: ${({ $color }) => $color};
`;

export const StatusText = styled.span`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatusCount = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const LowStockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LowStockItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(249, 168, 37, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const EmptyState = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
  padding: 1rem 0;
`;

