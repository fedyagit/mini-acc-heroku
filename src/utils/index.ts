import { AddType, Get, GetById, GetByType, GetTypes, Delete, DeleteType, Update, Insert } from "./crud";
export const Database = {
  AddType,
  Get,
  GetById,
  GetByType,
  GetTypes,
  Delete,
  DeleteType,
  Update,
  Insert,
};
import { AddTransaction, GetTransactionById, GetTransactionsByToday, PrintCheck } from "./transaction";
export const Transaction = {
  AddTransaction,
  GetTransactionById,
  GetTransactionsByToday,
  PrintCheck,
};
