import React from 'react';
import { GetServerSideProps } from 'next';

import { getProfile } from '../controllers/user';
import { updateApiTokenFromCookie } from '../utils/updateApiTokenFromCookie';
import { forceTokenToExpire, logError } from '../utils';

const Home: React.FC = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  updateApiTokenFromCookie(req);

  try {
    await getProfile();

    return {
      redirect: { destination: `/mainscreen`, permanent: false },
    };
  } catch (err) {
    forceTokenToExpire(res);
    logError('', err);

    return { redirect: { destination: '/signin', permanent: false } };
  }
};

export default Home;
