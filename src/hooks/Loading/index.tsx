import React, { useContext, useState, useEffect } from 'react';

import Loading from '../../components/Loading';

import { Container, PercentageContainer, PercentageValue } from './styles';

export interface ILoadingConfig {
  isLoading: boolean;
  percentage?: number;
  showPercentage?: boolean;
}

interface ILoadingContext {
  loadingConfig: ILoadingConfig;
  setLoadingConfig: React.Dispatch<React.SetStateAction<ILoadingConfig>>;
}

const defaultConfig: ILoadingConfig = {
  isLoading: false,
  percentage: 0,
  showPercentage: false,
};

const LoadingContext = React.createContext<ILoadingContext>({
  loadingConfig: { ...defaultConfig },
  setLoadingConfig: () => ({}),
});

interface ILoadingProps {
  changeSignal?: any;
}

export const LoadingProvider: React.FC<ILoadingProps> = ({
  children,
  changeSignal,
}) => {
  const [loadingConfig, setLoadingConfig] = useState({ ...defaultConfig });

  useEffect(() => {
    setLoadingConfig({ ...defaultConfig });
  }, [changeSignal]);

  const size = loadingConfig.percentage ? 80 : 50;

  return (
    <LoadingContext.Provider value={{ loadingConfig, setLoadingConfig }}>
      {children}
      {loadingConfig.isLoading ? (
        <Container>
          {loadingConfig.showPercentage ? (
            <PercentageContainer size={size}>
              <PercentageValue>{loadingConfig.percentage}%</PercentageValue>
            </PercentageContainer>
          ) : null}
          <Loading size={size} />
        </Container>
      ) : null}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
