import { Button } from 'antd';
import React from 'react';

import { IoTrashOutline } from 'react-icons/io5';
import { ItemMeta, StyledList, ListItem } from './styles';
import { ICustomer } from '../../../../interfaces/customer';

interface ICustomerListProps {
  customers: ICustomer[];
  onCustomerClick: (customer: ICustomer) => void;
  onRemoveClick: (customer: ICustomer) => void;
}

export const CustomerList: React.FC<ICustomerListProps> = ({
  customers,
  onCustomerClick,
  onRemoveClick,
}) => (
  <StyledList
    itemLayout="horizontal"
    size="large"
    dataSource={customers}
    renderItem={(item: ICustomer) => (
      <ListItem
        key={item.id}
        onClick={() => onCustomerClick(item)}
        actions={[
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
