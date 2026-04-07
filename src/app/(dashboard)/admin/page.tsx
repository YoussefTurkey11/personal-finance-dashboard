"use client";
import StatsCards from "@/components/shared/StatsCards";
import Title from "@/components/shared/Title";
import { useGetAllTransactionsQuery } from "@/redux/apis/transactionApi";
import {
  Box,
  DollarSign,
  TruckElectric,
  UserRound,
  Wallet,
} from "lucide-react";

const Admin = () => {
  const {
    data: allTransactions,
    isLoading: isTransactionLoading,
    isFetching: isTransactionFetching,
    isError: isTransactionError,
  } = useGetAllTransactionsQuery();

  const transaction = allTransactions?.data;

  const totalBalance =
    transaction?.reduce((sum, trans) => sum + Number(trans.amount), 0) ?? 0;

  const loading = isTransactionLoading || isTransactionFetching;

  return (
    <div className="p-5">
      <Title
        title="Finance Overview"
        subTitle="Monitoring 240+ assets across North Africa"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10">
        <StatsCards
          icon={<DollarSign size={25} />}
          precentage={12.5}
          title={"Total Balance"}
          count={totalBalance ?? 0}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Admin;
