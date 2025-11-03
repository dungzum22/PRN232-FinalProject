import styled from 'styled-components';

export const Badge = styled.span<{ 
  $variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 0.125rem 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  width: fit-content;
  white-space: nowrap;
  border: 1px solid transparent;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  svg {
    height: 0.75rem;
    width: 0.75rem;
  }
  
  /* Custom className-based styling for status colors */
  ${({ className, theme }) => {
    if (className?.includes('bg-yellow-500')) {
      return `
        background: #eab308;
        color: ${theme.colors.white};
        border-color: transparent;
      `;
    }
    if (className?.includes('bg-blue-500')) {
      return `
        background: #3b82f6;
        color: ${theme.colors.white};
        border-color: transparent;
      `;
    }
    if (className?.includes('bg-purple-500')) {
      return `
        background: #a855f7;
        color: ${theme.colors.white};
        border-color: transparent;
      `;
    }
    if (className?.includes('bg-green-500')) {
      return `
        background: #22c55e;
        color: ${theme.colors.white};
        border-color: transparent;
      `;
    }
    if (className?.includes('bg-red-500')) {
      return `
        background: #ef4444;
        color: ${theme.colors.white};
        border-color: transparent;
      `;
    }
    if (className?.includes('bg-gray-500')) {
      return `
        background: #6b7280;
        color: ${theme.colors.white};
        border-color: transparent;
      `;
    }
    if (className?.includes('bg-pink-600')) {
      return `
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        border-color: transparent;
      `;
    }
    return '';
  }}
  
  /* Variant-based styling */
  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'secondary':
        return `
          background: ${theme.colors.secondary};
          color: ${theme.colors.text};
          border-color: transparent;
        `;
      case 'destructive':
        return `
          background: ${theme.colors.error};
          color: ${theme.colors.white};
          border-color: transparent;
        `;
      case 'outline':
        return `
          background: transparent;
          color: ${theme.colors.text};
          border-color: ${theme.colors.border};
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: ${theme.colors.white};
          border-color: transparent;
        `;
    }
  }}
`;

