import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { Avatar, Card as AntCard, Skeleton, Switch } from 'antd';
import React from 'react';

const { Meta } = AntCard;

interface ICardProps {
  title: string;
  description?: string;
  loading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export const Card: React.FC<ICardProps> = ({
  loading = false,
  title,
  description,
  onDelete,
  onEdit,
}) => {
  const actions = [];
  if (onEdit) actions.push(<EditOutlined key="edit" onClick={onEdit} />);
  if (onDelete)
    actions.push(<DeleteOutlined key="delete" onClick={onDelete} />);
  return (
    <>
      <AntCard style={{ width: 300, marginTop: 16 }} actions={actions}>
        <Skeleton loading={loading} avatar active>
          <Meta title={title} description={description} />
        </Skeleton>
      </AntCard>
    </>
  );
};
