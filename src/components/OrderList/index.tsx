import { Space } from 'antd';
import React from 'react';
import { FiUsers } from 'react-icons/fi';
import { MessageOutlined } from '@ant-design/icons';

import { HiOutlineCollection } from 'react-icons/hi';
import { IOrder } from '../../interfaces/order';
import { ImageCarousel } from '../ImageCarousel';
import { ItemMeta, StyledList, ListItem } from './styles';
import { Tags } from '../Tags';

interface IOrderListProps {
  orders: IOrder[];
  onOrderClick: (order: IOrder) => void;
}

export const OrderList: React.FC<IOrderListProps> = ({
  orders,
  onOrderClick,
}) => (
  <StyledList
    itemLayout="vertical"
    size="large"
    dataSource={orders}
    renderItem={(item: IOrder) => (
      <ListItem
        key={item.id}
        onClick={() => onOrderClick(item)}
        actions={[
          <IconText
            title="Comentários"
            icon={MessageOutlined}
            text={`${item.comments.length}`}
            key="comments_quantity"
          />,
          <IconText
            title="Setores"
            icon={HiOutlineCollection}
            text={`${item.sectors.length}`}
            key="sectors_quantity"
          />,
          <IconText
            title="Colaboradores"
            icon={FiUsers}
            text={`${item.collaborators.length}`}
            key="collaborators_quantity"
          />,
          <Tags key="flags" flags={item.flags} />,
        ]}
        extra={
          <ImageCarousel
            images={item.files.map(f => f.link)}
            maxWidth="250px"
          />
        }
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
