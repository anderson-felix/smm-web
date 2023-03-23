import React from 'react';
import { Space, Tag } from 'antd';
import { ITagsProps, tagColorOptionsArray } from './interfaces';

export const Tags: React.FC<ITagsProps> = ({ flags }) => {
  flags ||= tagColorOptionsArray.map(color => ({
    display_name: color,
    color,
  }));

  return (
    <Space>
      {flags.map(flag => (
        <Tag key={flag.display_name} color={flag.color}>
          {flag.display_name}
        </Tag>
      ))}
    </Space>
  );
};
