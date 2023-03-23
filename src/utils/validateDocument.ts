/* eslint-disable no-useless-escape */
type FuncType = (document: string) => boolean;

export const validateDocument: FuncType = document => {
  const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
  return regex.test(document);
};
