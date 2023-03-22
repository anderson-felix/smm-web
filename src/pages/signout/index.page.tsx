import React from 'react';
import { GetServerSideProps } from 'next';

import { forceTokenToExpire } from '../../utils/forceTokenToExpire';

const Signout: React.FC = () => null;

export default Signout;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  forceTokenToExpire(res);
  return { redirect: { destination: `/signin`, permanent: false } };
};
