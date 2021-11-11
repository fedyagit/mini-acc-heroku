import { AddType, Get, GetById, GetByType, GetTypes, Delete, DeleteByType, DeleteType, Update, Insert } from "./crud";
export const Database = {
  AddType,
  Get,
  GetById,
  GetByType,
  GetTypes,
  Delete,
  DeleteByType,
  DeleteType,
  Update,
  Insert,
};
import { AddTransaction, GetTransactionById, GetAllTransactions, GetTransactionCount, GetLastTransaction, GetTransactionsByToday, PrintCheck, PrintTodayResult } from "./transaction";
export const Transaction = {
  AddTransaction,
  GetTransactionById,
  GetAllTransactions,
  GetTransactionCount,
  GetLastTransaction,
  GetTransactionsByToday,
  PrintCheck,
  PrintTodayResult,
};
