import React from 'react';
import { GetServerSideProps } from 'next';

import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container } from './styles';

const Customers: React.FC = () => {
  return <Container>CLIENTES</Container>;
};

export default Customers;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const user = await getProfile();
    return {
      props: { user, selectedPage: 'customers', pageTitle: 'Clientes' },
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
