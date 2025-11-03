import styled from 'styled-components';

export const DialogOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
  background: ${({ theme }) => theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const DialogContent = styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  max-width: 32rem;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`;

export const DialogHeader = styled.div`
  padding: 1.5rem 1.5rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const DialogTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text};
`;

export const DialogBody = styled.div`
  padding: 1.5rem;
`;

export const DialogFooter = styled.div`
  padding: 1rem 1.5rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

