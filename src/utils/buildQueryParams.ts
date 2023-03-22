export const buildQueryParams = (
  data: Record<string, any>,
  encodeURI?: boolean,
): any =>
  Object.entries(data)
    .map(
      item => `${item[0]}=${encodeURI ? encodeURIComponent(item[1]) : item[1]}`,
    )
    .join('&');
