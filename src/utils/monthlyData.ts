import { Transaction } from "@/types/transactionType";

export const monthlyData = (transactions: Transaction[]) => {
  transactions.reduce((acc: any, trans: any) => {
    const date = new Date(trans.date);
    const month = date.toLocaleString("en-US", { month: "short" });

    if (!acc[month]) {
      acc[month] = {
        month,
        sales: 0,
        conversion: 0,
      };
    }

    acc[month].sales += Number(trans.amount);

    return acc;
  }, {});
};
