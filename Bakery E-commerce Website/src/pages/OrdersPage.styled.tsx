import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const HeaderIcon = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(217, 119, 87, 0.2);
  
  svg {
    height: 1.5rem;
    width: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export const HeaderText = styled.div``;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  margin-bottom: 0.25rem;
`;

export const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const LoadingCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(217, 119, 87, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 4rem;
  text-align: center;
`;

export const LoadingIcon = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, rgba(217, 119, 87, 0.2), rgba(245, 230, 211, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    height: 2.5rem;
    width: 2.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LoadingTitle = styled.h2`
  margin-bottom: 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2rem;
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const TabsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 28rem;
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.25rem;
`;

export const TabTrigger = styled.button<{ $active?: boolean }>`
  padding: 0.5rem 1rem;
  background: ${({ theme, $active }) => ($active ? theme.colors.white : 'transparent')};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  color: ${({ theme, $active }) => ($active ? theme.colors.text : theme.colors.textMuted)};
  
  &:hover {
    background: ${({ theme, $active }) => ($active ? theme.colors.white : 'rgba(0, 0, 0, 0.05)')};
  }
`;

export const TabContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OrderCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(217, 119, 87, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

export const OrderHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const OrderInfo = styled.div``;

export const OrderTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const OrderTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const StatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background: ${({ $status }) => {
    switch ($status) {
      case 'pending': return '#eab308';
      case 'processing': return '#3b82f6';
      case 'shipped': return '#a855f7';
      case 'delivered': return '#22c55e';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  }};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  text-transform: capitalize;
  
  svg {
    height: 1rem;
    width: 1rem;
  }
`;

export const OrderDate = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const OrderTotal = styled.div`
  text-align: right;
`;

export const TotalLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 0.25rem;
`;

export const TotalAmount = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

export const OrderItems = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(249, 241, 234, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ItemsLabel = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin-bottom: 0.75rem;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

export const ItemsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const OrderItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const ItemName = styled.span``;

export const ItemQuantity = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ItemPrice = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const OrderActions = styled.div`
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $variant?: 'primary' | 'outline' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.white : theme.colors.text};
  border: 1px solid ${({ theme, $variant }) => 
    $variant === 'primary' ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    ${({ theme, $variant }) => $variant === 'primary' ? `
      background: ${theme.colors.primaryDark};
    ` : `
      background: rgba(0, 0, 0, 0.05);
    `}
  }
  
  svg {
    margin-right: 0.5rem;
    height: 1rem;
    width: 1rem;
  }
`;

export const EmptyCard = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 3rem;
  text-align: center;
  
  svg {
    height: 3rem;
    width: 3rem;
    margin: 0 auto 1rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
  
  p {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const BrowseButton = styled.button`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

