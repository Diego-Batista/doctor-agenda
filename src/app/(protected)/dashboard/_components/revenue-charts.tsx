"use client";

import dayjs from "dayjs";
import { DollarSign } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrencyInCents } from "@/helpers/currency";

export const description = "An area chart with gradient fill";

const chartConfig = {
  appointments: {
    label: "Agendamentos",
    color: "#0B68F7",
  },
  revenue: {
    label: "Faturamento",
    color: "#10B981",
  },
} satisfies ChartConfig;

interface RevenueChartsProps {
  dailyAppointments: {
    date: Date;
    appointments: number;
    revenue: number;
  }[];
}

export function RevenueCharts({ dailyAppointments }: RevenueChartsProps) {
  const chartDays = Array.from({ length: 21 }).map((_item, index) =>
    dayjs()
      .subtract(10 - index, "days")
      .format("yyyy-MM-DD"),
  );

  const chartData = chartDays.map((date) => {
    const dataForDay = dailyAppointments.find(
      (d) => dayjs(d.date).format("yyyy-MM-DD") === date,
    );

    return {
      date: dayjs(date).format("DD/MM"),
      fullDate: date,
      appointments: dataForDay?.appointments || 0,
      revenue: dataForDay?.revenue || 0,
    };
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <DollarSign />
        <CardTitle>Agendamentos e Faturamento</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatCurrencyInCents(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return (
                        <>
                          <div className="h-3 w-3 rounded bg-[#10B981]" />
                          <span className="text-muted-foreground">
                            Faturamento
                          </span>
                          <span>{formatCurrencyInCents(Number(value))}</span>
                        </>
                      );
                    }
                    return (
                      <>
                        <div className="h-3 w-3 rounded bg-[#0B68F7]" />
                        <span className="text-muted-foreground">
                          Agendamentos
                        </span>
                        <span className="font-semibold">{value}</span>
                      </>
                    );
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return dayjs(payload[0].payload.fullDate).format(
                        "DD/MM/YYYY (dddd",
                      );
                    }
                    return label;
                  }}
                />
              }
            />
            {/* <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs> */}
            <Area
              yAxisId="left"
              dataKey="appointments"
              type="monotone"
              fill="var(--color-appointments)"
              fillOpacity={0.2}
              stroke="var(--color-appointments)"
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              dataKey="revenue"
              type="monotone"
              fill="var(--color-revenue)"
              stroke="var(--color-revenue)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
