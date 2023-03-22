import { IToastProps } from '../hooks/Toast';

export const showErrorToClient = (
  error: any,
  addToast: (data: IToastProps) => void,
) => {
  const message =
    error?.response?.data?.validation?.body?.message ||
    error?.response?.data?.message ||
    error?.message ||
    'Ocorreu um erro, tente novamente';

  addToast({
    type: 'error',
    title: message.toString(),
  });
};
