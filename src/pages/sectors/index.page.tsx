import React from 'react';
import { GetServerSideProps } from 'next';

import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container } from './styles';

const Sectors: React.FC = () => {
  return <Container>SETORES</Container>;
};

export default Sectors;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const user = await getProfile();
    return { props: { user, selectedPage: 'sectors', pageTitle: 'Setores' } };
  } catch (err) {
    forceTokenToExpire(res);
    logError('sectors', err);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
