import React from 'react';

import { InputProps } from '../interfaces';
import { StyledInput } from './styles';

export const TextAreaInput: React.FC<InputProps> = ({
  value,
  onInputChange,
  error,
  placeholder,
}) => {
  return (
    <StyledInput
      placeholder={error || placeholder}
      status={error ? 'error' : undefined}
      onChange={e => onInputChange(e.target.value)}
      value={value}
    />
  );
};
