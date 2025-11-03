import styled from 'styled-components';

export const SidebarContainer = styled.aside`
  width: 16rem;
  min-height: 100vh;
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(249, 241, 234, 0.3);
`;

export const SidebarContent = styled.div`
  padding: 1.5rem;
`;

export const SidebarTitle = styled.h2`
  margin-bottom: 1.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const NavButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: ${({ $active, theme }) => 
    $active ? theme.colors.primary : 'transparent'};
  color: ${({ $active, theme }) => 
    $active ? theme.colors.white : theme.colors.textLight};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ $active, theme }) => 
      $active ? theme.colors.primaryDark : 'rgba(217, 119, 87, 0.1)'};
    color: ${({ $active, theme }) => 
      $active ? theme.colors.white : theme.colors.text};
  }
  
  svg {
    height: 1.25rem;
    width: 1.25rem;
  }
`;

