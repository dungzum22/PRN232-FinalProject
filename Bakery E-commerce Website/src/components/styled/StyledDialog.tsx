import React from 'react';
import * as S from './Dialog';
import { Button } from './Button';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
}

interface DialogHeaderProps {
  children: React.ReactNode;
}

interface DialogTitleProps {
  children: React.ReactNode;
}

interface DialogFooterProps {
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  if (!open) return null;
  
  return (
    <S.DialogOverlay onClick={() => onOpenChange(false)}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </S.DialogOverlay>
  );
}

export function DialogContent({ children }: DialogContentProps) {
  return <S.DialogContent>{children}</S.DialogContent>;
}

export function DialogHeader({ children }: DialogHeaderProps) {
  return <S.DialogHeader>{children}</S.DialogHeader>;
}

export function DialogTitle({ children }: DialogTitleProps) {
  return <S.DialogTitle>{children}</S.DialogTitle>;
}

export function DialogFooter({ children }: DialogFooterProps) {
  return <S.DialogFooter>{children}</S.DialogFooter>;
}

