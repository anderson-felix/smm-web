import React from 'react';
import { GetServerSideProps } from 'next';

import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container } from './styles';

const Collaborators: React.FC = () => {
  return <Container>COLABORADORES</Container>;
};

export default Collaborators;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const user = await getProfile();
    return {
      props: {
        user,
        selectedPage: 'collaborators',
        pageTitle: 'Colaboradores',
      },
    };
  } catch (err) {
    forceTokenToExpire(res);
    logError('collaborators', err);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
