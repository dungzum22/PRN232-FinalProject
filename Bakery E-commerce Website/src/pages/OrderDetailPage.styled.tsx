import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const OrderHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const OrderHeaderTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const OrderTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
`;

export const OrderDate = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export const StatusTracker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 2rem 0;
  padding: 0 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: 10%;
    right: 10%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.border};
    z-index: 0;
  }
`;

export const StatusStep = styled.div<{ $completed?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
  flex: 1;
`;

export const StatusIcon = styled.div<{ $completed?: boolean }>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${({ $completed, theme }) =>
    $completed ? theme.colors.primary : theme.colors.secondary};
  color: ${({ $completed, theme }) =>
    $completed ? '#ffffff' : theme.colors.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const StatusLabel = styled.span<{ $completed?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ $completed, theme }) =>
    $completed ? theme.fontWeights.medium : theme.fontWeights.normal};
  color: ${({ $completed, theme }) =>
    $completed ? theme.colors.text : theme.colors.textMuted};
  text-align: center;
`;

export const TwoColumnGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 2fr 1fr;
  }
`;

export const OrderItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const OrderItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ProductName = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
`;

export const ProductQuantity = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ProductPrice = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: auto;
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
`;

export const SummaryLabel = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export const SummaryValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

export const TotalRow = styled(SummaryRow)`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  border-top: 2px solid ${({ theme }) => theme.colors.border};
  padding-top: 1rem;
  margin-top: 0.5rem;

  ${SummaryValue} {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AddressInfo = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const AddressIcon = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.primary};

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const AddressText = styled.div`
  flex: 1;

  p {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.6;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 1rem;

  p {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-bottom: 1rem;
  }
`;

