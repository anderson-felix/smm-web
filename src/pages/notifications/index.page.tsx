import React from 'react';
import { GetServerSideProps } from 'next';

import {
  updateApiTokenFromCookie,
  forceTokenToExpire,
  logError,
} from '../../utils';
import { getProfile } from '../../controllers/user';
import { Container } from './styles';

const Notifications: React.FC = () => {
  return <Container>EM BREVE</Container>;
};

export default Notifications;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    updateApiTokenFromCookie(req);

    const user = await getProfile();
    return {
      props: { user, selectedPage: 'notifications', pageTitle: 'Notificações' },
    };
  } catch (err) {
    forceTokenToExpire(res);
    logError('notifications', err);

    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    };
  }
};
