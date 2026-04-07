import { api } from "../baseApi";
import {
  ApiResponseAllTransactions,
  ApiResponseTransaction,
  CreateTransaction,
  UpdateTransactionPayload,
} from "@/types/transactionType";

export const transactionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get All Transactions
    getAllTransactions: builder.query<ApiResponseAllTransactions, void>({
      query: () => `/api/transactions?populate=*`,
      providesTags: [{ type: "Transactions", id: "LIST" }],
    }),

    // Get Single Transaction
    getSingleTransaction: builder.query<ApiResponseTransaction, string>({
      query: (documentId) => `/api/transactions/${documentId}?populate=*`,
      providesTags: [{ type: "Transactions", id: "LIST" }],
    }),

    // Create Transaction
    createTransaction: builder.mutation<
      ApiResponseTransaction,
      CreateTransaction
    >({
      query: (body) => ({
        url: `/api/transactions`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),

    // Update Transaction
    updateTransaction: builder.mutation<
      ApiResponseTransaction,
      UpdateTransactionPayload
    >({
      query: ({ documentId, body }) => ({
        url: `/api/transactions/${documentId}`,
        method: "PUT",
        body: {
          data: body,
        },
      }),
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),

    // Delete Transaction
    deleteTransaction: builder.mutation<ApiResponseTransaction, string>({
      query: (documentId) => ({
        url: `/api/transactions/${documentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Transactions", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllTransactionsQuery,
  useGetSingleTransactionQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApi;
