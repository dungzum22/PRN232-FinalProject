import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import * as S from './Select';

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  displayValue: string;
  setDisplayValue: (value: string) => void;
}>({
  value: '',
  onValueChange: () => {},
  isOpen: false,
  setIsOpen: () => {},
  displayValue: '',
  setDisplayValue: () => {},
});

export function Select({ value, onValueChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [displayValue, setDisplayValue] = useState('');
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, isOpen, setIsOpen, displayValue, setDisplayValue }}>
      <div style={{ position: 'relative' }}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children }: SelectTriggerProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);
  
  return (
    <S.SelectTrigger onClick={() => setIsOpen(!isOpen)}>
      {children}
      <ChevronDown />
    </S.SelectTrigger>
  );
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { displayValue } = React.useContext(SelectContext);
  
  return <S.SelectValue>{displayValue || placeholder}</S.SelectValue>;
}

export function SelectContent({ children }: SelectContentProps) {
  const { isOpen, setIsOpen } = React.useContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);
  
  if (!isOpen) return null;
  
  return <S.SelectContent ref={ref}>{children}</S.SelectContent>;
}

export function SelectItem({ value, children }: SelectItemProps) {
  const { value: selectedValue, onValueChange, setIsOpen, setDisplayValue } = React.useContext(SelectContext);
  
  const handleClick = () => {
    onValueChange(value);
    setDisplayValue(children?.toString() || '');
    setIsOpen(false);
  };
  
  return (
    <S.SelectItem 
      onClick={handleClick}
      data-selected={selectedValue === value}
    >
      {children}
    </S.SelectItem>
  );
}

