/** @format */

export type EventType = {
  payload: any;
  possibleDestinations: { [name: string]: boolean }[];
  strategy?: 'ALL' | 'ANY' | 'function(possibleDestinations) { return true; }';
};
