import React from 'react';
import Cookies from 'js-cookie';
import { AppProps } from 'next/app';

import { ConfigProvider, theme } from 'antd';
import GlobalStyle from '../styles/global';
import { api } from '../services/api';
import {
  ToastProvider,
  LoadingProvider,
  CustomRouterProvider,
  ThemesProvider,
} from '../hooks';
import { PageContainer } from '../components/Layouts/PageContainer';
import { IUser } from '../interfaces/user';

export interface AppPropsType {
  user?: IUser;
  selectedPage?: string;
  pageTitle?: string;
  headerTitle?: string;
}

const MyApp: React.FC<AppProps<AppPropsType>> = ({ Component, pageProps }) => {
  const token = Cookies.get('token');
  api.user.defaults.headers.authorization = `Bearer ${token}`;

  const Page: any = Component;

  return (
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <ThemesProvider>
        <LoadingProvider changeSignal={{}}>
          <CustomRouterProvider>
            <ToastProvider>
              <PageContainer {...pageProps}>
                <Page {...pageProps} />
              </PageContainer>
            </ToastProvider>
          </CustomRouterProvider>
        </LoadingProvider>
        <GlobalStyle />
      </ThemesProvider>
    </ConfigProvider>
  );
};

export default MyApp;
