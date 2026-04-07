import { ApiResponsePagination } from "./paginationType";

export type ApiResponseAllTransactions = {
  data: Transaction[];
  meta: ApiResponsePagination;
};

export type ApiResponseTransaction = {
  data: Transaction;
};

export type Transaction = {
  id?: number;
  documentId?: string;
  transactionTitle: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategories;
  date: string;
  notes?: {
    type: string;
    children: {
      type: string;
      text: string;
    }[];
  }[];
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

export type TransactionType = "income" | "expense";

export type TransactionCategories =
  | "Food & Dining"
  | "Rent / Housing"
  | "Transportation"
  | "Shopping"
  | "Bills & Utilities"
  | "Entertainment"
  | "Healthcare"
  | "Education"
  | "Travel"
  | "Subscriptions"
  | "Other";

export type UpdateTransactionPayload = {
  documentId: string;
  body: Partial<Transaction>;
};

export type CreateTransaction = {
  data: Partial<Transaction>;
};
