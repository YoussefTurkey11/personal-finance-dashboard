"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useDeleteTransactionMutation } from "@/redux/apis/transactionApi";
import { Transaction } from "@/types/transactionType";
import EditTransaction from "./EditTransaction";

const ActionTransactions = ({
  transactions,
}: {
  transactions: Transaction;
}) => {
  const [open, setOpen] = useState(false);
  const [deleteTransaction, { isLoading }] = useDeleteTransactionMutation();

  const handleDelete = async () => {
    try {
      await deleteTransaction(transactions?.documentId as string).unwrap();
      toast.success("Transaction deleted successfully");
    } catch {
      toast.error("Failed to delete transaction");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDelete}
            className="text-destructive cursor-pointer"
            disabled={isLoading}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditTransaction
        open={open}
        setOpen={setOpen}
        transaction={transactions}
      />
    </>
  );
};

export default ActionTransactions;
