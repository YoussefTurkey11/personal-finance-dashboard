"use client";

import { DatePickerInput } from "@/components/shared/DatePickerInput";
import ErrorPage from "@/components/shared/ErrorPage";
import FieldInputForm from "@/components/shared/FieldInputForm";
import FieldSelectForm from "@/components/shared/FieldSelectForm";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  categoryOptions,
  typeOptions,
} from "@/data/transactions/selectTransaction";
import { useUpdateTransactionMutation } from "@/redux/apis/transactionApi";
import { Transaction } from "@/types/transactionType";
import { convertToRichText } from "@/utils/convertToRichText";
import { parseRichTextToString } from "@/utils/parseRichTextToString";
import {
  AddTransactionFormSchema,
  addTransactionScheme,
} from "@/validation/transaction/transaction.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  transaction: Transaction;
};

const EditTransaction = ({ open, setOpen, transaction }: Props) => {
  const [updateTransaction, { isLoading, isError }] =
    useUpdateTransactionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<AddTransactionFormSchema>({
    resolver: zodResolver(addTransactionScheme),
  });

  useEffect(() => {
    if (transaction) {
      reset({
        transactionTitle: transaction.transactionTitle,
        amount: transaction.amount,
        date: transaction.date,
        category: transaction.category,
        type: transaction.type,
        notes: parseRichTextToString(transaction.notes ?? []),
      });
    }
  }, [transaction, reset]);

  const onSubmit = async (data: AddTransactionFormSchema) => {
    try {
      await updateTransaction({
        documentId: transaction.documentId as string,
        body: {
          ...data,
          notes: convertToRichText(data.notes as string),
        },
      }).unwrap();
      toast.success("Transaction updated Successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update transaction:", error);
      toast.error("Transaction Update Failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>

        {isError && <ErrorPage />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FieldInputForm
            label="Transaction Title"
            id="transactionTitle"
            type="text"
            placeholder="e.g. Groceries"
            register={register}
            errors={errors}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FieldInputForm
              label="Amount"
              id="amount"
              type="number"
              placeholder="e.g. 100"
              register={register}
              errors={errors}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <FieldSelectForm
                  label="Type"
                  id="type"
                  errors={errors}
                  field={field}
                  options={typeOptions}
                  placeholder="Select transaction type"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <FieldSelectForm
                  label="Category"
                  id="category"
                  errors={errors}
                  field={field}
                  options={categoryOptions}
                  placeholder="Select category"
                />
              )}
            />

            <Controller
              name="date"
              control={control}
              key="date-controller"
              render={({ field }) => (
                <DatePickerInput errors={errors} field={field} />
              )}
            />
          </div>

          <Field>
            <FieldLabel
              htmlFor="notes"
              className={`capitalize cursor-pointer ${errors.notes ? "text-destructive" : ""}`}
            >
              Notes
            </FieldLabel>
            <Textarea id="notes" {...register("notes")} />
            {errors.notes && (
              <p className="mt-1 text-sm text-red-600">
                {errors.notes.message}
              </p>
            )}
          </Field>

          <Button
            type="submit"
            className="w-full py-5"
            disabled={isSubmitting || isLoading}
          >
            {isLoading ? "Updating..." : "Update Transaction"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditTransaction;
