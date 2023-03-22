import React from 'react';
import { GetServerSideProps } from 'next';

import { getProfile } from '../controllers/user';
import { updateApiTokenFromCookie } from '../utils/updateApiTokenFromCookie';

const Home: React.FC = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  updateApiTokenFromCookie(req);

  try {
    await getProfile();

    return {
      redirect: { destination: `/mainscreen`, permanent: false },
    };
  } catch (err) {
    return { redirect: { destination: '/signin', permanent: false } };
  }
};

export default Home;
