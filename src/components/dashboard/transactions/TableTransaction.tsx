"use client";

import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  BadgeDollarSign,
  Dot,
  Search,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTableSort } from "@/hooks/useTableSort";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useTableFilter } from "@/hooks/useTableFilter";
import { useTablePagination } from "@/hooks/useTablePagination";
import { Skeleton } from "../../ui/skeleton";
import Link from "next/link";
import Image from "next/image";
import { Transaction } from "@/types/transactionType";
import ActionTransactions from "./ActionTransactions";
import { DatePickerInput } from "@/components/shared/DatePickerInput";
import { DateFilter } from "@/components/shared/DateFilter";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOptions } from "@/data/transactions/selectTransaction";

const TABS = [
  { label: "All", value: "all" },
  { label: "Income", value: "income" },
  { label: "Expenses", value: "expenses" },
];

const TABLE_HEAD = ["Recent Transactions", "View Ledger", "Action"];

type SortKey = "id" | "transactionTitle" | "category";

export function TableTransactions({
  transactions,
  isFetching,
}: {
  transactions: Transaction[] | undefined;
  isFetching: boolean;
}) {
  const rows = transactions ?? [];
  const skeletonRows = Array.from({ length: 3 });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  /* ---------------- search ---------------- */

  const { search, setSearch, filteredRowsSearch } = useTableSearch(rows, [
    "transactionTitle",
    "category",
    "id",
  ]);

  /* ---------------- filter ---------------- */
  const { filter, setFilter, filteredRowsFilter } = useTableFilter(
    filteredRowsSearch,
    (row, filter) => {
      const matchType =
        filter === "all"
          ? true
          : filter === "income"
            ? row.type === "income"
            : row.type === "expense";

      const matchDate = selectedDate
        ? new Date(row.date).toLocaleDateString("en-CA") === selectedDate
        : true;

      return matchType && matchDate;
    },
  );

  const filteredRowsByTypeAndDate = useMemo(() => {
    return filteredRowsSearch.filter((row) => {
      // filter by type
      if (filter !== "all") {
        if (filter === "income" && row.type !== "income") return false;
        if (filter === "expenses" && row.type !== "expense") return false;
      }

      // filter by date
      if (selectedDate) {
        const rowDate = new Date(row.date).toLocaleDateString("en-CA");
        if (rowDate !== selectedDate) return false;
      }

      // filter by category
      if (selectedCategory !== "all") {
        if (row.category !== selectedCategory) return false;
      }

      return true;
    });
  }, [filteredRowsSearch, filter, selectedDate, selectedCategory]);

  /* ---------------- sort ---------------- */

  const { sortedRows, handleSort, sortKey, sortDirection } =
    useTableSort<Transaction>(filteredRowsByTypeAndDate);

  /* ---------------- pagination ---------------- */

  const { paginatedRows, page, pageCount, nextPage, prevPage } =
    useTablePagination(sortedRows, 8);

  /* ---------------- helpers ---------------- */

  const getSortIcon = (columnKey: SortKey) => {
    if (sortKey !== columnKey) return <ArrowUpDown className="h-4 w-4" />;

    if (sortDirection === "asc") return <ArrowUp className="h-4 w-4" />;

    return <ArrowDown className="h-4 w-4" />;
  };

  return (
    <div className="w-full">
      {/* Header */}

      <div className="mb-8 flex items-center justify-between gap-8">
        <div>
          <h6 className="text-base font-semibold">Recent Transactions</h6>
          <p className="text-muted-foreground mt-1 text-sm">
            See information about all Transactions
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button
            size="sm"
            nativeButton={false}
            render={<Link href="/addTransaction">Add Transaction</Link>}
          />
        </div>
      </div>

      {/* Tabs + Search */}

      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Tabs
          value={filter}
          onValueChange={setFilter}
          className="w-full md:w-max"
        >
          <TabsList>
            {TABS.map(({ label, value }) => (
              <TabsTrigger key={value} value={value} className="cursor-pointer">
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <div className="flex items-center gap-5 w-full sm:w-auto">
            <DateFilter value={selectedDate} onChange={setSelectedDate} />
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value as string)}
            >
              <SelectTrigger className="w-full sm:w-45">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>

                {categoryOptions.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

            <Input
              placeholder="Search"
              className="pl-9 border border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border-border mt-4 w-full overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead className="border-border bg-muted border-b text-sm font-medium">
            <tr>
              {TABLE_HEAD.map((head, index) => {
                const sortKeys: (SortKey | null)[] = [
                  "transactionTitle",
                  "category",
                  null,
                ];

                const key = sortKeys[index];

                return (
                  <th
                    key={head}
                    className={`px-2.5 py-2 text-start font-medium ${
                      key ? "hover:bg-muted/80 cursor-pointer" : ""
                    }`}
                    onClick={() => key && handleSort(key)}
                  >
                    <div className="text-muted-foreground flex items-center justify-between gap-2">
                      {head}
                      {key && getSortIcon(key)}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="text-sm">
            {isFetching ? (
              skeletonRows.map((_, i) => (
                <tr key={i} className="border-border border-b">
                  <td className="p-3">
                    <Skeleton className="h-4 w-10" />
                  </td>

                  <td className="p-3">
                    <Skeleton className="h-4 w-32" />
                  </td>
                </tr>
              ))
            ) : paginatedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-6 text-muted-foreground"
                >
                  No transactions found
                </td>
              </tr>
            ) : (
              paginatedRows.map(
                ({
                  documentId,
                  transactionTitle,
                  category,
                  amount,
                  type,
                  date,
                }) => (
                  <tr
                    key={documentId}
                    className="border-border border-b last:border-0"
                  >
                    <td className="p-3">
                      <Link
                        href={`/transaction/${documentId}`}
                        className="flex items-center gap-3 group"
                      >
                        <BadgeDollarSign
                          size={50}
                          className="bg-muted p-2 rounded-full border border-muted group-hover:border-primary transition-colors"
                        />
                        <div>
                          <p className="text-md truncate max-w-40 group-hover:max-w-full font-semibold transition-all">
                            {transactionTitle}
                          </p>
                          <div className="flex items-center">
                            <span className="text-xs font-semibold text-muted-foreground">
                              {date &&
                                new Date(date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              <Dot size={20} />
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {category}
                            </span>
                          </div>
                        </div>
                      </Link>
                    </td>

                    <td className="p-3">
                      <div className="flex flex-col">
                        <p className="text-md font-semibold text-primary">
                          ${Number(amount).toFixed(2)}
                        </p>
                        <Badge
                          variant="outline"
                          className={`${
                            type === "income"
                              ? "border-green-300 text-green-600"
                              : "border-red-300 text-red-600"
                          }`}
                        >
                          {type === "income" ? "Income" : "Expense"}
                        </Badge>
                      </div>
                    </td>

                    <td className="p-3">
                      <ActionTransactions
                        transactions={{
                          documentId,
                          transactionTitle,
                          category,
                          amount,
                          type,
                          date,
                        }}
                      />
                    </td>
                  </tr>
                ),
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}

      <div className="border-border flex items-center justify-between border-t py-4">
        <span className="text-muted-foreground text-sm">
          Page {page} of {pageCount}
        </span>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={page === 1}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={page === pageCount}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
