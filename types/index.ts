export enum Actions {
  Get = "Get",
  GetById = "GetById",
  GetByType = "GetByType",
  GetTypes = "GetTypes",
  Insert = "Insert",
  Update = "Update",
  Delete = "Delete",
}

export enum TransacationActions {
  Add = "Add",
  GetById = "GetById",
  GetByToday = "GetByToday",
  Print = "Print",
}

export interface RecordInput {
  id?: string;
  name?: string;
  type?: string;
  cost?: string | number;
}

export interface TransactionInput {
  id?: string;
  items?: string;
  costs?: string;
  sizes?: string;
  transactionDate?: string;
}

export interface CheckDate {
  fileDate: string;
  checkDate: string;
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
