"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Transaction } from "@/types/transactionType";
import { Skeleton } from "./skeleton";

// Chart configuration for Shadcn UI - using Tailwind HSL colors
const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  conversion: {
    label: "Conversion Rate",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const ChartFinancial = ({
  totalBalance,
  totalIncome,
  totalExpenses,
  transactions = [],
  loading,
}: {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  transactions: Transaction[];
  loading: boolean;
}) => {
  // Calculate total sales and average conversion
  const avgConversion = (totalIncome + totalExpenses) / totalBalance;

  // Get current year dynamically
  const currentYear = new Date().getFullYear();

  const chartData = React.useMemo(() => {
    return transactions.map((trans, index) => ({
      name: trans?.transactionTitle,
      amount: Number(trans.amount),
    }));
  }, [transactions]);

  return (
    <section>
      <Card className="w-full mx-auto">
        <CardHeader className="px-6">
          <CardTitle className="text-xl font-semibold">
            Personal Transaction Overview
          </CardTitle>
          <CardDescription>
            Monthly transaction volume and conversion rate trends for the first
            half of {currentYear}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 px-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </p>
                <TrendingUp className="size-4 text-green-500" />
              </div>
              <p className="text-2xl font-bold mt-2">${totalBalance}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Last 6 months
              </p>
            </div>

            <div className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Avg Conversion
                </p>
                <span className="size-2 rounded-full bg-primary animate-pulse" />
              </div>
              <p className="text-2xl font-bold mt-2">{avgConversion}%</p>
              <p className="text-xs text-muted-foreground mt-1">
                Conversion rate
              </p>
            </div>
          </div>

          {/* Combined Bar + Line Chart */}
          {loading ? (
            <Skeleton className="h-55 w-full rounded-lg" />
          ) : (
            <div className="w-full">
              <ChartContainer config={chartConfig} className="h-75 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ top: 20, bottom: 20 }}
                    accessibilityLayer
                  >
                    <defs>
                      <linearGradient
                        id="salesGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--chart-1)"
                          stopOpacity={0.5}
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--chart-1)"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="hsl(var(--border))"
                      vertical={false}
                      opacity={0.5}
                    />

                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
                      tickMargin={10}
                    />

                    <YAxis
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(1)}k`
                      }
                      width={50}
                    />

                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
                      tickFormatter={(value) => `${value}%`}
                      width={45}
                    />

                    <ChartTooltip
                      cursor={{ fill: "var(--muted)", opacity: 0.2 }}
                      content={
                        <ChartTooltipContent
                          formatter={(value, name) => {
                            if (name === "conversion") {
                              return [
                                `${Number(value).toFixed(1)}%`,
                                "Conversion Rate",
                              ];
                            }
                            return [
                              `$${Number(value).toLocaleString()}`,
                              "Sales",
                            ];
                          }}
                        />
                      }
                    />

                    <ChartLegend
                      content={<ChartLegendContent />}
                      iconType="circle"
                    />

                    {/* Bar chart for Sales */}
                    <Bar
                      yAxisId="left"
                      dataKey="amount"
                      fill="var(--chart-1)"
                      radius={[8, 8, 0, 0]}
                      maxBarSize={60}
                    >
                      {chartData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill="url(#salesGradient)"
                        />
                      ))}
                    </Bar>

                    {/* Line chart for Conversion Rate */}
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="conversion"
                      stroke="var(--chart-3)"
                      strokeWidth={3}
                      dot={{
                        fill: "var(--chart-3)",
                        strokeWidth: 2,
                        r: 6,
                        stroke: "var(--background)",
                      }}
                      activeDot={{
                        r: 8,
                        fill: "var(--chart-3)",
                        stroke: "var(--background)",
                        strokeWidth: 3,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          )}

          {/* Footer Info */}
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2 border-t">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              <span>Showing data for January - June {currentYear}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ChartFinancial;
