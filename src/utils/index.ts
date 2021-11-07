import { Get, GetById, GetByType, GetTypes, Delete, Update, Insert } from "./crud";
export const Database = {
  Get,
  GetById,
  GetByType,
  GetTypes,
  Delete,
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
