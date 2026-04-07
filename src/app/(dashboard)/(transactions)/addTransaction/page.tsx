"use client";

import { DatePickerInput } from "@/components/shared/DatePickerInput";
import ErrorPage from "@/components/shared/ErrorPage";
import FieldInputForm from "@/components/shared/FieldInputForm";
import FieldSelectForm from "@/components/shared/FieldSelectForm";
import Title from "@/components/shared/Title";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  categoryOptions,
  typeOptions,
} from "@/data/transactions/selectTransaction";
import { useCreateTransactionMutation } from "@/redux/apis/transactionApi";
import { convertToRichText } from "@/utils/convertToRichText";
import {
  AddTransactionFormSchema,
  addTransactionScheme,
} from "@/validation/transaction/transaction.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const AddTransition = () => {
  const [createTransaction, { isLoading, isError }] =
    useCreateTransactionMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<AddTransactionFormSchema>({
    resolver: zodResolver(addTransactionScheme),
    mode: "onSubmit",
    defaultValues: {
      transactionTitle: "",
      amount: 0,
      date: "",
      category: "Food & Dining",
      type: "income",
      notes: "",
    },
  });

  const onSubmit = async (data: AddTransactionFormSchema) => {
    try {
      const payload = {
        data: {
          transactionTitle: data.transactionTitle,
          amount: data.amount,
          date: data.date,
          category: data.category,
          type: data.type,
          notes: convertToRichText(data.notes ?? ""),
        },
      };
      await createTransaction(payload).unwrap();
      reset();
      toast.success("Transaction Added Successfully");
    } catch (error) {
      console.error("Failed to create transaction:", error);
      toast.error("Transaction Added Failed");
    }
  };

  return (
    <div className="p-5">
      <Title
        title="Transactions Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      {isError && <ErrorPage />}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 max-w-4xl border mx-auto my-10 p-5 rounded-lg bg-card"
      >
        <div className="mb-5">
          <h2 className="text-4xl font-bold">Add Transaction</h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to add a new transaction.
          </p>
        </div>

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
            <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>
          )}
        </Field>

        <Button
          type="submit"
          className="w-full py-5"
          disabled={isSubmitting || isLoading}
        >
          {isLoading ? "Adding..." : "Add Transaction"}
        </Button>
      </form>
    </div>
  );
};

export default AddTransition;
