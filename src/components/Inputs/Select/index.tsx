import React from 'react';
import { Select } from 'antd';

import { ISelectInputParams, SelectOption } from '../interfaces';

export const SelectInput: React.FC<ISelectInputParams> = ({
  options,
  onChange,
  disabled,
  style,
  value,
  placeholder,
  isMulti,
  tagRender,
}) => {
  const handleChange = (selected: string[] | string) => {
    if (isMulti)
      onChange(
        options.filter(opt => (selected as string[]).includes(opt.value)),
      );
    else
      onChange([
        options.find(e => e.value === (selected as string)) as SelectOption,
      ]);
  };

  return (
    <Select
      placeholder={placeholder}
      value={value}
      tagRender={tagRender as any}
      disabled={disabled}
      style={style}
      onChange={handleChange}
      options={options}
      mode={isMulti ? 'multiple' : undefined}
    />
  );
};
