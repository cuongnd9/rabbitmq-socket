// FIXME: define type.
export type CustomerServiceUser = {
  id?: string;
  status: string; // FIXME: define enum.
  socketId: string;
};

export type Task = {
  id: string;
  text: number;
  status?: string;
  count?: number;
}
