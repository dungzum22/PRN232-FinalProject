import styled from 'styled-components';

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SelectTrigger = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1rem;
  border: 2px solid ${({ theme, $isOpen }) => 
    $isOpen ? theme.colors.primary : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme, $isOpen }) => 
    $isOpen ? 'rgba(217, 119, 87, 0.03)' : theme.colors.white};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  box-shadow: ${({ $isOpen }) => 
    $isOpen 
      ? '0 0 0 4px rgba(217, 119, 87, 0.15), 0 2px 8px rgba(217, 119, 87, 0.2)' 
      : '0 1px 3px rgba(0, 0, 0, 0.05)'};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: rgba(217, 119, 87, 0.03);
    box-shadow: 0 2px 6px rgba(217, 119, 87, 0.15);
    transform: translateY(-1px);
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const SelectValue = styled.span`
  flex: 1;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
`;

export const SelectIcon = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  transition: transform ${({ theme }) => theme.transitions.fast};
  transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
    stroke-width: 2.5;
  }
`;

export const SelectDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  right: 0;
  z-index: 50;
  background-color: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 10px 25px rgba(217, 119, 87, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 16rem;
  overflow-y: auto;
  animation: slideDown 0.2s ease-out;
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    
    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
  }
`;

export const SelectOption = styled.div<{ $isSelected: boolean }>`
  padding: 0.875rem 1rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme, $isSelected }) => 
    $isSelected ? theme.fontWeights.semibold : theme.fontWeights.normal};
  color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.white : theme.colors.text};
  background-color: ${({ theme, $isSelected }) => 
    $isSelected 
      ? theme.colors.primary 
      : theme.colors.white};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background-color: ${({ theme, $isSelected }) => 
      $isSelected 
        ? theme.colors.primaryDark 
        : 'rgba(217, 119, 87, 0.1)'};
    color: ${({ theme, $isSelected }) => 
      $isSelected ? theme.colors.white : theme.colors.primary};
    padding-left: 1.25rem;
  }
  
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  &:last-child {
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

