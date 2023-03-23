import React, { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container, StyledButton, TopContent } from './styles';
import { Modal } from '../../components/Modal';
import { OrderList } from '../../components/OrderList';
import { listOrders } from '../../controllers/order';
import { IOrder } from '../../interfaces/order';
import { OrderModalContent } from '../../components/OrderModalContent';
import { listSectors } from '../../controllers/sector';
import { ISector } from '../../interfaces/sector';
import { listCustomers } from '../../controllers/customer';
import { ICustomer } from '../../interfaces/customer';
import { IUser } from '../../interfaces/user';

interface IProps {
  orders: IOrder[];
  sectors: ISector[];
  customers: ICustomer[];
  user: IUser;
}

const defaultOrderObject: IOrder = {
  id: '',
  status: '' as any,
  display_name: '',
  description: '',
  created_by: '',
  customer_id: '',
  collaborators: [],
  comments: [],
  files: [],
  flags: [],
  sectors: [],
  customer: null,
};

const Mainscreen: React.FC<IProps> = ({ user, orders, sectors, customers }) => {
  const [openModal, setOpenModal] = useState(false);
  const [targetOrder, setTargetOrder] = useState<IOrder>(defaultOrderObject);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleConfirm = useCallback(async () => {
    if (!targetOrder.display_name) {
      setErrors({ display_name: 'Insira um nome' });
      return;
    }
    setErrors({});
    setOpenModal(false);
  }, [targetOrder.display_name]);

  const handleCancel = () => {
    setOpenModal(false);
    setTargetOrder(defaultOrderObject);
  };

  const handleOrderClick = (order: IOrder) => {
    setTargetOrder(order);
    setOpenModal(true);
  };

  const handleNewOrder = () => {
    setTargetOrder(defaultOrderObject);
    setOpenModal(true);
  };

  return (
    <Container>
      <TopContent>
        <StyledButton onClick={handleNewOrder}>
          <AiOutlinePlusCircle style={{ fontSize: '1.3rem' }} />
          Adicionar
        </StyledButton>
      </TopContent>
      <OrderList orders={orders} onOrderClick={handleOrderClick} />
      <Modal
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        title={`${targetOrder.id ? 'Editar' : 'Adicionar novo'} job`}
        show={openModal}
        width="40rem"
      >
        <OrderModalContent
          order={targetOrder}
          setOrder={setTargetOrder}
          errors={errors}
          sectors={sectors}
          customers={customers}
          user={user}
        />
      </Modal>
    </Container>
  );
};

export default Mainscreen;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const [user, orders, sectors, customers] = await Promise.all([
      getProfile(),
      listOrders(),
      listSectors(),
      listCustomers(),
    ]);

    return {
      props: {
        user,
        orders: orders.results,
        sectors: sectors.results,
        customers: customers.results,
        selectedPage: 'mainscreen',
        pageTitle: 'Jobs',
      },
    };
  } catch (err) {
    forceTokenToExpire(res);
    logError('mainscreen', err);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
