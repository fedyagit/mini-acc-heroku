export enum Actions {
  Get = "Get",
  GetById = "GetById",
  GetByType = "GetByType",
  GetTypes = "GetTypes",
  Insert = "Insert",
  Update = "Update",
  Delete = "Delete",
}
export interface RecordInput {
  id?: string;
  name?: string;
  type?: string;
  cost?: string | number;
}

export interface IMenuItem extends RecordInput {
  count: number;
}
export type Action = {
  action: string;
};
export interface BaseApiInput extends Action, RecordInput {}
export interface Message {
  message: string;
  id?: string;
}
