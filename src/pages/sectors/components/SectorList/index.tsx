import { Button, Space } from 'antd';
import React from 'react';
import { FiUsers } from 'react-icons/fi';

import { IoTrashOutline } from 'react-icons/io5';
import { ItemMeta, StyledList, ListItem } from './styles';
import { ISector } from '../../../../interfaces/sector';

interface IOrderListProps {
  sectors: ISector[];
  onSectorClick: (sector: ISector) => void;
  onRemoveClick: (sector: ISector) => void;
}

export const SectorList: React.FC<IOrderListProps> = ({
  sectors,
  onSectorClick,
  onRemoveClick,
}) => (
  <StyledList
    itemLayout="horizontal"
    size="large"
    dataSource={sectors}
    renderItem={(item: ISector) => (
      <ListItem
        key={item.id}
        onClick={() => onSectorClick(item)}
        actions={[
          <IconText
            title="Colaboradores"
            icon={FiUsers}
            text={`${item.collaborators.length}`}
            key="collaborators_quantity"
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
        <ItemMeta title={item.display_name} description={item.description} />
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
