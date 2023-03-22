/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { dark } from '../../styles/themes';

interface ThemeContextData {
  theme: DefaultTheme;
  toggleTheme(): void;
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData,
);

const ThemesProvider: React.FC<PropsWithChildren<React.ReactNode>> = ({
  children,
}) => {
  const theme = dark;

  async function toggleTheme() {
    // eslint-disable-next-line no-console
    console.log('toogle theme');
  }

  const providerValue = useMemo(
    () => ({ toggleTheme, theme }),
    [theme, toggleTheme],
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeProvider theme={theme}>{children as any}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

function useTheme(): ThemeContextData {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export { useTheme, ThemesProvider };
