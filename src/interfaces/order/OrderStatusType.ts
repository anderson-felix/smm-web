export const orderStatusArray = <const>['todo', 'doing', 'review', 'done'];

export type OrderStatusType = typeof orderStatusArray[number];
