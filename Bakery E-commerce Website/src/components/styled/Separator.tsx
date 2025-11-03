import styled from 'styled-components';

export const Separator = styled.hr<{ className?: string }>`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: ${({ className }) => 
    className?.includes('my-6') ? '1.5rem 0' : 
    className?.includes('my-4') ? '1rem 0' : 
    '0.5rem 0'};
`;

