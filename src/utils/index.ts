import { AddTypes, Get, GetById, GetByType, GetTypes, Delete, Update, Insert } from "./crud";
export const Database = {
  AddTypes,
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
