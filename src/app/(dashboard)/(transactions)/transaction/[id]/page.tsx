"use client";

import EditTransaction from "@/components/dashboard/transactions/EditTransaction";
import ErrorPage from "@/components/shared/ErrorPage";
import Title from "@/components/shared/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSingleTransactionQuery } from "@/redux/apis/transactionApi";
import { BadgeDollarSign, Dot } from "lucide-react";
import { use, useState } from "react";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const Transition = ({ params }: Props) => {
  const { id } = use(params);
  const [open, setOpen] = useState(false);

  const {
    data: singleTransaction,
    isLoading: isTransactionLoading,
    isFetching: isTransactionFetching,
    isError: isTransactionError,
  } = useGetSingleTransactionQuery(id);

  const transaction = singleTransaction?.data;

  const loading = isTransactionLoading || isTransactionFetching;

  if (loading)
    return (
      <div className="rounded-lg shadow bg-background p-5 space-y-5 m-10">
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-12 rounded-lg" />
          <Skeleton className="h-6 w-14 rounded-md" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    );

  return (
    <section className="p-5">
      <div className="flex items-center justify-between">
        <Title
          title={`${transaction?.transactionTitle} Transaction`}
          subTitle="Preview your transaction"
        />

        <Button className={"px-5 text-md"} onClick={() => setOpen(true)}>
          Edit
        </Button>
      </div>

      {isTransactionError && <ErrorPage />}

      <div className="border rounded-lg bg-secondary/5 p-5 my-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BadgeDollarSign
              size={50}
              className="bg-muted p-2 rounded-full border border-muted group-hover:border-primary transition-colors"
            />
            <p className="text-xl font-semibold transition-all">
              {transaction?.transactionTitle}
            </p>
          </div>

          <div className="flex flex-col items-end">
            <p
              className={`text-3xl font-semibold ${
                transaction?.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              ${Number(transaction?.amount).toFixed(2)}
            </p>
            <Badge
              variant="outline"
              className={`${
                transaction?.type === "income"
                  ? "border-green-300 text-green-600"
                  : "border-red-300 text-red-600"
              } text-md`}
            >
              {transaction?.type === "income" ? "Income" : "Expense"}
            </Badge>
          </div>
        </div>

        <div className="my-5 space-y-5">
          <p>
            Date:{" "}
            <strong className="text-md font-bold">
              {transaction?.date &&
                new Date(transaction?.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
            </strong>
          </p>

          <p>
            Category:{" "}
            <strong className="text-md font-bold">
              {transaction?.category}
            </strong>
          </p>
        </div>

        {transaction?.notes?.length ? (
          transaction?.notes.map((note, idx) => (
            <div className="my-5" key={idx}>
              <h3>Note</h3>
              <p className="border rounded-lg p-5 bg-background">
                {note.children?.map((child: any) => child.text).join("")}
              </p>
            </div>
          ))
        ) : (
          <div className="my-5">No Notes!</div>
        )}
      </div>

      {transaction && (
        <EditTransaction
          open={open}
          setOpen={setOpen}
          transaction={transaction}
        />
      )}
    </section>
  );
};

export default Transition;
