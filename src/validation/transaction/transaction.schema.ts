import { z } from "zod";

export const addTransactionScheme = z.object({
  transactionTitle: z.string().min(1, "Transaction title is required"),
  amount: z.number().positive("Amount must be a positive number"),
  date: z.string().min(1, "Date is required"),
  category: z.enum(
    [
      "Food & Dining",
      "Rent / Housing",
      "Transportation",
      "Shopping",
      "Bills & Utilities",
      "Entertainment",
      "Healthcare",
      "Education",
      "Travel",
      "Subscriptions",
      "Other",
    ],
    "Invalid category",
  ),
  type: z.enum(
    ["income", "expense"],
    "Type must be either 'income' or 'expense'",
  ),
  notes: z
    .string()
    .min(2, "Note must be at least 2 characters long")
    .max(200, "Note must be at most 200 characters long")
    .optional(),
});

export type AddTransactionFormSchema = z.infer<typeof addTransactionScheme>;
