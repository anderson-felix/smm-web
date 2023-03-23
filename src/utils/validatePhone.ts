/* eslint-disable no-useless-escape */
type FuncType = (phone: string) => boolean;

export const validatePhone: FuncType = phone => {
  const regex =
    /\(?\b([0-9]{2,3}|0((x|[0-9]){2,3}[0-9]{2}))\)?\s*[0-9]{4,5}[- ]*[0-9]{4}\b/;
  return regex.test(phone);
};
