import React, { useCallback, useState } from 'react';
import { GetServerSideProps } from 'next';

import { AiOutlinePlusCircle } from 'react-icons/ai';
import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
  validateEmail,
  validatePhone,
  validateDocument,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container, StyledButton, TopContent } from './styles';
import { Modal } from '../../components/Modal';
import {
  createCustomer,
  listCustomers,
  updateCustomer,
  removeCustomer,
} from '../../controllers/customer';
import { IUser } from '../../interfaces/user';
import { useLoading, useToast } from '../../hooks';
import { CustomerList } from './components/CustomerList';
import { CustomerModalContent } from './components/CustomerModalContent';
import { ICustomer } from '../../interfaces/customer';

interface IProps {
  customers: ICustomer[];
  user: IUser;
}

const defaultCustomerObject: ICustomer = {
  id: '',
  created_by: '',
  name: '',
  description: null,
  federal_document: '',
  email: '',
  phone: '',
  address: null,
};

const Customers: React.FC<IProps> = ({ user, customers: _customers }) => {
  const [customers, setCustomer] = useState(_customers);
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [targetCustomer, setTargetCustomer] = useState<ICustomer>(
    defaultCustomerObject,
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { addToast } = useToast();
  const { setLoadingConfig } = useLoading();

  const handleCancel = () => {
    setOpenModal(false);
    setTargetCustomer(defaultCustomerObject);
  };

  const handleCustomerClick = (customer: ICustomer) => {
    setTargetCustomer(customer);
    setOpenModal(true);
  };

  const handleNewCustomer = () => {
    setTargetCustomer(defaultCustomerObject);
    setOpenModal(true);
  };

  const handleRemoveClick = (customer: ICustomer) => {
    setTargetCustomer(customer);
    setOpenConfirmModal(true);
  };

  const handleSave = useCallback(async () => {
    setLoadingConfig(config => ({ ...config, isLoading: true }));
    try {
      const { name, email, federal_document, phone } = targetCustomer;
      setErrors({});

      if (!name) {
        setErrors({ name: 'Insira um nome' });
        return;
      }
      if (!email || !validateEmail(email)) {
        setErrors({ email: 'Insira um e-mail válido' });
        return;
      }
      if (!federal_document || !validateDocument(federal_document)) {
        setErrors({ federal_document: 'Insira um documento válido' });
        return;
      }
      if (!phone || !validatePhone(phone)) {
        setErrors({ phone: 'Insira um número de telefone válido' });
        return;
      }

      setErrors({});

      const customerDTO = {
        name: targetCustomer.name,
        description: targetCustomer.description || null,
        federal_document: targetCustomer.federal_document,
        email: targetCustomer.email,
        phone: targetCustomer.phone,
        address: targetCustomer.address || null,
      };

      if (!targetCustomer.id) {
        await createCustomer(customerDTO);
        setCustomer(e => [targetCustomer, ...e]);
        setOpenModal(false);
        return;
      }

      delete customerDTO.federal_document;

      await updateCustomer({
        id: targetCustomer.id,
        ...customerDTO,
      });

      setCustomer(e =>
        e.map(customer =>
          customer.id === targetCustomer.id ? targetCustomer : customer,
        ),
      );
      setOpenModal(false);
      setTargetCustomer(defaultCustomerObject);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao atualizar cliente',
        description: err?.message,
      });
    } finally {
      setLoadingConfig(config => ({ ...config, isLoading: false }));
    }
  }, [addToast, setLoadingConfig, targetCustomer]);

  const handleRemove = useCallback(async () => {
    setLoadingConfig(config => ({ ...config, isLoading: true }));

    try {
      if (!targetCustomer.id) return;

      await removeCustomer(targetCustomer.id);
      setCustomer(e => e.filter(sector => sector.id !== targetCustomer.id));
      setOpenConfirmModal(false);
      setTargetCustomer(defaultCustomerObject);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao remover cliente',
        description: err?.message,
      });
    } finally {
      setLoadingConfig(config => ({ ...config, isLoading: false }));
    }
  }, [addToast, setLoadingConfig, targetCustomer]);

  return (
    <Container>
      <TopContent>
        <StyledButton onClick={handleNewCustomer}>
          <AiOutlinePlusCircle style={{ fontSize: '1.3rem' }} />
          Adicionar
        </StyledButton>
      </TopContent>
      <CustomerList
        customers={customers}
        onCustomerClick={handleCustomerClick}
        onRemoveClick={handleRemoveClick}
      />
      <Modal
        onCancel={handleCancel}
        onConfirm={handleSave}
        title={`${targetCustomer.id ? 'Editar' : 'Adicionar novo'} cliente`}
        show={openModal}
        width="30rem"
      >
        <CustomerModalContent
          customer={targetCustomer}
          setCustomer={setTargetCustomer}
          errors={errors}
          user={user}
        />
      </Modal>
      <Modal
        onCancel={() => setOpenConfirmModal(false)}
        onConfirm={handleRemove}
        title="Tem certeza disso?"
        show={openConfirmModal}
        width="30rem"
      >
        Tem certeza que deseja remover o cliente? Essa é uma ação irreversível.
      </Modal>
    </Container>
  );
};

export default Customers;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const [user, customers] = await Promise.all([
      getProfile(),
      listCustomers(),
    ]);

    return {
      props: {
        user,
        customers: customers.results,
        selectedPage: 'customers',
        pageTitle: 'Clientes',
      },
    };
  } catch (err) {
    forceTokenToExpire(res);
    logError('customers', err);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
