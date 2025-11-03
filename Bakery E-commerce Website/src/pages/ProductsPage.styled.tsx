import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, ${({ theme }) => theme.colors.background}, rgba(249, 241, 234, 0.2));
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 3rem 2rem;
`;

export const Header = styled.div`
  margin-bottom: 2.5rem;
`;

export const Badge = styled.div`
  display: inline-block;
  margin-bottom: 0.75rem;
  padding: 0.25rem 0.75rem;
  background: rgba(217, 119, 87, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  
  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const Title = styled.h1`
  margin-bottom: 0.75rem;
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.lg};
`;

export const FiltersCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid rgba(217, 119, 87, 0.1);
  padding: 1.5rem;
  margin-bottom: 2.5rem;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

export const FiltersGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    height: 1rem;
    width: 1rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid rgba(217, 119, 87, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.md};
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

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 2.75rem 0.875rem 1rem;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.white};
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23d97757' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(217, 119, 87, 0.03);
    box-shadow: 0 2px 6px rgba(217, 119, 87, 0.15);
    transform: translateY(-1px);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(217, 119, 87, 0.15), 0 2px 8px rgba(217, 119, 87, 0.2);
    background-color: ${({ theme }) => theme.colors.white};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  /* Enhanced option styling - Note: Browser support is limited */
  option {
    padding: 0.75rem 1rem;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.fontWeights.normal};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 1.5;

    &:hover {
      background-color: rgba(217, 119, 87, 0.1);
      color: ${({ theme }) => theme.colors.primary};
    }

    &:checked,
    &:active {
      background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.primaryDark});
      color: ${({ theme }) => theme.colors.white};
      font-weight: ${({ theme }) => theme.fontWeights.semibold};
    }
  }

  /* Firefox specific styling */
  @-moz-document url-prefix() {
    option:checked {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

export const FilterInfo = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FilterText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ClearButton = styled.button`
  padding: 0.25rem 0.75rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(217, 119, 87, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.sm};
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const LoadingContainer = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

export const LoadingIcon = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(249, 241, 234, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
`;

export const LoadingSpinner = styled.div`
  height: 1.5rem;
  width: 1.5rem;
  border: 3px solid rgba(217, 119, 87, 0.3);
  border-top-color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const EmptyContainer = styled.div`
  text-align: center;
  padding: 5rem 0;
`;

export const EmptyIcon = styled.div`
  height: 5rem;
  width: 5rem;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(249, 241, 234, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  
  svg {
    height: 2.5rem;
    width: 2.5rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const EmptyText = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 1.5rem;
`;

export const EmptyButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background: rgba(217, 119, 87, 0.05);
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

