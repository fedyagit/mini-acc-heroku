export enum Actions {
  Get = "Get",
  GetById = "GetById",
  GetByType = "GetByType",
  GetTypes = "GetTypes",
  Insert = "Insert",
  Update = "Update",
  Delete = "Delete",
  DeleteType = "DeleteType",
  DeleteByType = "DeleteByType",
  AddType = "AddType",
}

export enum TransactionActions {
  Add = "Add",
  GetById = "GetById",
  GetByToday = "GetByToday",
  GetAll = "GetAll",
  GetRange = "GetRange",
  GetCount = "GetCount",
  GetRangeCount = "GetRangeCount",
  GetLastId = "GetLastId",
  Print = "Print",
  PrintToday = "PrintToday",
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

export interface Pagination {
  result: TransactionInput[] | Message;
  nbHits: number;
}

export interface PaginationInput {
  page: string | string[];
  pageSize?: string | string[];
}

export interface DateRange {
  fromDate?: string | string[];
  toDate?: string | string[];
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

export interface TotalInput {
  date?: string;
  creationDate?: string;
  nbChecks?: string;
  sum?: string;
  avg?: string;
}
