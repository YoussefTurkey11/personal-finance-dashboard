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
  amount: string;
  type: TransactionType;
  category: TransactionCategories;
  date: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

// export type TransactionNotes = {
//   type: string;
//   children: { type: string; text: string }[];
// };

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
