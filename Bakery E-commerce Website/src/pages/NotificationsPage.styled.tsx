import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const Content = styled.div`
  max-width: 48rem;
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const HeaderInfo = styled.div``;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 0.5rem;
`;

export const UnreadCount = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export const NotificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const NotificationCard = styled.div<{ $unread?: boolean }>`
  background-color: ${({ $unread, theme }) =>
    $unread ? 'rgba(59, 130, 246, 0.05)' : theme.colors.card};
  border: 1px solid ${({ $unread }) =>
    $unread ? 'rgba(59, 130, 246, 0.2)' : 'rgba(217, 119, 87, 0.15)'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
`;

export const NotificationContent = styled.div`
  display: flex;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  margin-top: 0.25rem;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const NotificationBody = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NotificationHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.25rem;
`;

export const NotificationTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const NotificationActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const NotificationMessage = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

export const NotificationFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NotificationDate = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;

  svg {
    width: 4rem;
    height: 4rem;
    margin: 0 auto 1rem;
    color: ${({ theme }) => theme.colors.textLight};
  }

  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 1rem;
`;

export const LoadingIcon = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    rgba(217, 119, 87, 0.2),
    rgba(245, 230, 211, 0.3)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

