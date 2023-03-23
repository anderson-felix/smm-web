const pagingOrder = <const>['ASC', 'DESC'];

type PagingOrder = typeof pagingOrder[number];

export interface IPagingQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: PagingOrder;
  [key: string]: any;
}
