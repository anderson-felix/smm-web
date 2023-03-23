import React from 'react';

import { InputProps } from '../interfaces';
import { StyledInput } from './styles';

export const TextInput: React.FC<InputProps> = ({
  value,
  onInputChange,
  error,
  placeholder,
  onKeyDown,
  style,
}) => {
  return (
    <StyledInput
      placeholder={error || placeholder}
      onKeyDown={onKeyDown}
      status={error ? 'error' : undefined}
      onChange={e => onInputChange(e.target.value)}
      value={value}
      style={style}
    />
  );
};
