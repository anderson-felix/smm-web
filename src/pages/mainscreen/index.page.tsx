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
import { createOrder, listOrders, updateOrder } from '../../controllers/order';
import { IOrder } from '../../interfaces/order';
import { OrderModalContent } from '../../components/OrderModalContent';
import { listSectors } from '../../controllers/sector';
import { ISector } from '../../interfaces/sector';
import { listCustomers } from '../../controllers/customer';
import { ICustomer } from '../../interfaces/customer';
import { IUser } from '../../interfaces/user';
import { ISubmitCommentParams } from '../../interfaces/comment';
import { submitComment } from '../../controllers/comment';
import { useLoading, useToast } from '../../hooks';
import { OrderList } from '../../components/OrderList';

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
  description: null,
  created_by: '',
  customer_id: null,
  collaborators: [],
  comments: [],
  files: [],
  flags: [],
  sectors: [],
  customer: null,
};

const Mainscreen: React.FC<IProps> = ({
  user,
  orders: _orders,
  sectors,
  customers,
}) => {
  const [orders, setOrders] = useState(_orders);
  const [openModal, setOpenModal] = useState(false);
  const [targetOrder, setTargetOrder] = useState<IOrder>(defaultOrderObject);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { addToast } = useToast();
  const { setLoadingConfig } = useLoading();

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

  const handleSubmitComment = useCallback(
    async (params: ISubmitCommentParams) => {
      try {
        await submitComment(params);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Falha ao enviar comentário',
          description: err?.message,
        });
      }
    },
    [addToast],
  );

  const handleSave = useCallback(async () => {
    setLoadingConfig(config => ({ ...config, isLoading: true }));
    try {
      if (!targetOrder.display_name) {
        setErrors({ display_name: 'Insira um nome' });
        return;
      }
      setErrors({});

      const orderDTO = {
        collaborator_ids: targetOrder.collaborators.map(c => c.id),
        customer_id: targetOrder.customer_id || null,
        description: targetOrder.description || null,
        display_name: targetOrder.display_name,
        status: targetOrder.status || 'todo',
        files: targetOrder.files,
        flags: targetOrder.flags,
        sectors: targetOrder.sectors.map(s => ({
          estimated_hours: s.estimated_hours || null,
          sector_id: s.id,
        })),
      };

      if (!targetOrder.id) {
        await createOrder(orderDTO);
        setOrders(e => [targetOrder, ...e]);
        setOpenModal(false);
        return;
      }

      await updateOrder({
        id: targetOrder.id,
        ...orderDTO,
      });
      setOrders(e =>
        e.map(order => (order.id === targetOrder.id ? targetOrder : order)),
      );
      setOpenModal(false);
      setTargetOrder(defaultOrderObject);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao atualizar job',
        description: err?.message,
      });
    } finally {
      setLoadingConfig(config => ({ ...config, isLoading: false }));
    }
  }, [addToast, setLoadingConfig, targetOrder]);

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
        onConfirm={handleSave}
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
          onSubmitComment={handleSubmitComment}
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
