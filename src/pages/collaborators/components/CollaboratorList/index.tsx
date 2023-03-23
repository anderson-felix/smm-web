import { Button, Space } from 'antd';
import React from 'react';

import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlineCollection } from 'react-icons/hi';
import { ItemMeta, StyledList, ListItem } from './styles';
import { ICollaborator } from '../../../../interfaces/collaborator';

interface ICollaboratorListProps {
  collaborators: ICollaborator[];
  onCollaboratorClick: (collaborator: ICollaborator) => void;
  onRemoveClick: (collaborator: ICollaborator) => void;
}

export const CollaboratorList: React.FC<ICollaboratorListProps> = ({
  collaborators,
  onCollaboratorClick,
  onRemoveClick,
}) => (
  <StyledList
    itemLayout="horizontal"
    size="large"
    dataSource={collaborators}
    renderItem={(item: ICollaborator) => (
      <ListItem
        key={item.id}
        onClick={() => onCollaboratorClick(item)}
        actions={[
          <IconText
            title="Setores"
            icon={HiOutlineCollection}
            text={`${item.sectors.length}`}
            key="sectors_quantity"
          />,
          <Button
            key="remove-button"
            onClick={e => {
              e.stopPropagation();
              onRemoveClick(item);
            }}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <IoTrashOutline
              style={{
                textAlign: 'center',
                fontSize: '1.1rem',
              }}
            />
          </Button>,
        ]}
      >
        <ItemMeta title={item.name} description={item.email}>
          {item.description}
        </ItemMeta>
      </ListItem>
    )}
  />
);

const IconText = ({
  icon,
  text,
  title,
}: {
  icon: React.FC;
  text: string;
  title: string;
}) => (
  <Space title={title}>
    {React.createElement(icon)}
    {text}
  </Space>
);
