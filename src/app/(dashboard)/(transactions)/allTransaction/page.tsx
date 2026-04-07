"use client";

import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { Landmark, TrendingDown, TrendingUp } from "lucide-react";
import { useGetAllTransactionsQuery } from "@/redux/apis/transactionApi";
import ErrorPage from "@/components/shared/ErrorPage";
import { TableTransactions } from "@/components/dashboard/transactions/TableTransaction";

const AllTransition = () => {
  const {
    data: allTransactions,
    isLoading: isTransactionLoading,
    isFetching: isTransactionFetching,
    isError: isTransactionError,
  } = useGetAllTransactionsQuery();

  const transaction = allTransactions?.data;

  const totalBalance =
    transaction?.reduce((sum, trans) => sum + Number(trans.amount), 0) ?? 0;

  const totalIncome =
    transaction?.reduce(
      (sum, trans) =>
        sum + (trans.type === "income" ? Number(trans.amount) : 0),
      0,
    ) ?? 0;

  const totalExpenses =
    transaction?.reduce(
      (sum, trans) =>
        sum + (trans.type === "expense" ? Number(trans.amount) : 0),
      0,
    ) ?? 0;

  const loading = isTransactionLoading || isTransactionFetching;

  return (
    <div className="p-5">
      <Title
        title="Transactions Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      {isTransactionError && <ErrorPage />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        <StatsCards
          icon={<Landmark size={25} />}
          precentage={12.5}
          title={"Total Balance"}
          count={totalBalance}
          loading={loading}
          color="bg-blue-200 text-blue-600"
        />

        <StatsCards
          icon={<TrendingUp size={25} />}
          precentage={12.5}
          title={"Total Income"}
          count={totalIncome}
          loading={loading}
          color="bg-green-200 text-green-600"
        />

        <StatsCards
          icon={<TrendingDown size={25} />}
          precentage={-12.5}
          title={"Total Expenses"}
          count={totalExpenses}
          loading={loading}
          color="bg-red-200 text-red-600"
        />
      </div>

      <div className="bg-background rounded-lg border p-5">
        <TableTransactions
          transactions={transaction}
          isFetching={isTransactionFetching}
        />
      </div>
    </div>
  );
};

export default AllTransition;
