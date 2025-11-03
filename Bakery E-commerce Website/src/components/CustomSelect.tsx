import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import * as S from './CustomSelect.styled';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export function CustomSelect({ value, onChange, options, placeholder = 'Select...', className }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <S.SelectContainer ref={selectRef} className={className}>
      <S.SelectTrigger onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <S.SelectValue>
          {selectedOption ? selectedOption.label : placeholder}
        </S.SelectValue>
        <S.SelectIcon $isOpen={isOpen}>
          <ChevronDown />
        </S.SelectIcon>
      </S.SelectTrigger>

      {isOpen && (
        <S.SelectDropdown>
          {options.map((option) => (
            <S.SelectOption
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $isSelected={option.value === value}
            >
              {option.label}
            </S.SelectOption>
          ))}
        </S.SelectDropdown>
      )}
    </S.SelectContainer>
  );
}

