import { notification } from 'antd';
import React, { createContext, useCallback, useContext } from 'react';
// import { Toaster, toast } from 'react-hot-toast';

export type ToastPosition =
  | 'bottom'
  | 'bottomRight'
  | 'bottomLeft'
  | 'top'
  | 'topRight'
  | 'topLeft';

export interface IToastProps {
  type: 'success' | 'error';
  title: string;
  description?: string;
  position?: ToastPosition;
}

interface ToastContextData {
  addToast(props: IToastProps): void;
}
interface IToastProvider {
  children: any;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
  const [toast, contextHolder] = notification.useNotification();
  // const addToast = useCallback(
  //   ({
  //     type,
  //     title,
  //     style = {
  //       marginTop: '4.5rem',
  //       boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.25)',
  //       background: '#000000',
  //     },
  //     ...config
  //   }: IToastProps) => toast[type](title, { style, ...config }),
  //   [],
  // );
  const addToast = useCallback(
    ({ type, title, description, position = 'topRight' }: IToastProps) =>
      toast[type]({ message: title, description, placement: position }),
    [toast],
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {contextHolder}
      {children}
      {/* <Toaster position="top-right" /> */}
    </ToastContext.Provider>
  );
};

function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };
