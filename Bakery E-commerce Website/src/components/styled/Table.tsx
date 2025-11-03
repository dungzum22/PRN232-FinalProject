import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const TableHeader = styled.thead`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

export const TableRow = styled.tr`
  transition: background ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: rgba(249, 241, 234, 0.3);
  }
`;

export const TableHead = styled.th`
  padding: 0.75rem 1rem;
  text-align: left;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const TableCell = styled.td<{ className?: string }>`
  padding: 1rem;
  vertical-align: middle;
  color: ${({ className, theme }) => 
    className?.includes('text-gray-600') ? theme.colors.textMuted : theme.colors.text};
`;

