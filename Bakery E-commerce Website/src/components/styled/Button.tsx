import styled from 'styled-components';

export const Button = styled.button<{ 
  $variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  $size?: 'sm' | 'md' | 'lg' | 'icon';
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.normal};
  cursor: pointer;
  border: none;
  outline: none;
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  svg {
    height: 1rem;
    width: 1rem;
  }
  
  /* Size variants */
  ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return `
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
        `;
      case 'lg':
        return `
          padding: 0.75rem 2rem;
          font-size: 1rem;
        `;
      case 'icon':
        return `
          padding: 0.5rem;
          width: 2.5rem;
          height: 2.5rem;
        `;
      default:
        return `
          padding: 0.625rem 1.5rem;
        `;
    }
  }}
  
  /* Color variants */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.border};
          
          &:hover {
            background: rgba(217, 119, 87, 0.05);
            border-color: ${theme.colors.primary};
          }
        `;
      case 'ghost':
        return `
          background: transparent;
          color: ${theme.colors.text};
          
          &:hover {
            background: rgba(217, 119, 87, 0.1);
          }
        `;
      case 'destructive':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.white};
          
          &:hover {
            background: #dc2626;
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          
          &:hover {
            background: ${theme.colors.primaryDark};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.md};
          }
          
          &:active {
            transform: translateY(0);
          }
        `;
    }
  }}
`;

