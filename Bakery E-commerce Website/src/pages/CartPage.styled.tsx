import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: calc(100vh - 5rem);
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.background}, rgba(249, 241, 234, 0.2));
  padding: 3rem 0;
`;

export const EmptyContainer = styled.div`
  min-height: calc(100vh - 5rem);
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.background}, rgba(249, 241, 234, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

export const EmptyContent = styled.div`
  max-width: 28rem;
  margin: 0 auto;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  height: 6rem;
  width: 6rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, rgba(249, 241, 234, 0.5), rgba(245, 230, 211, 0.3));
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    height: 3rem;
    width: 3rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const EmptyTitle = styled.h2`
  margin-bottom: 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 2rem;
  max-width: 20rem;
  margin-left: auto;
  margin-right: auto;
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

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
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

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const CartItem = styled.div`
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1rem;
`;

export const ItemContent = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ItemImage = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ItemDetails = styled.div`
  flex: 1;
`;

export const ItemHeader = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const ItemInfo = styled.div``;

export const ItemName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 20rem;
`;

export const ItemCategory = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(244, 67, 54, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
  
  svg {
    height: 1rem;
    width: 1rem;
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const ItemFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const QuantityButton = styled.button<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    ${({ $disabled, theme }) => !$disabled && `
      background: rgba(217, 119, 87, 0.05);
      border-color: ${theme.colors.primary};
    `}
  }
  
  svg {
    height: 0.75rem;
    width: 0.75rem;
  }
`;

export const QuantityDisplay = styled.span`
  width: 2rem;
  text-align: center;
`;

export const ItemPricing = styled.div`
  text-align: right;
`;

export const UnitPrice = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textLight};
`;

export const TotalPrice = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primary};
`;

export const SummaryCard = styled.div`
  position: sticky;
  top: 6rem;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
`;

export const SummaryTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: ${({ theme }) => theme.fontSizes.xl};
`;

export const SummaryItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.textLight};
`;

export const Separator = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 1rem 0;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  
  span:last-child {
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

