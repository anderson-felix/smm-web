type FuncType = (url: string, privateObject?: boolean) => string;

export const getFileNameFromUrl: FuncType = (url, privateObject) => {
  const array = privateObject ? url.split('?')[0]?.split('/') : url.split('/');

  return array.slice(-1).toString();
};
