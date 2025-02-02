"use client"

import React from 'react'
import { AreaChart, Area, CartesianGrid, XAxis } from "recharts"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { VaultData } from "@/agentkit-action-providers/morpho/types"
import { Address } from '@/components/address'

interface Props {
  result: string
}

const chartConfig = {
  apy: {
    label: "APY",
    color: "hsl(var(--chart-1))",
  },
  netApy: {
    label: "Net APY",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export const Vault: React.FC<Props> = ({ result }) => {
  const { message, data } = JSON.parse(result) as {
    message: string
    data: VaultData | null;
  }

  if (!data) {
    return <div>{message}</div>
  }

  const chartData = data?.historicalState.apy.map((apyPoint, index) => {
    return {
      timestamp: new Date(Number.parseInt(apyPoint.x) * 1000).toLocaleDateString(),
      apy: Number.parseFloat(apyPoint.y) * 100, // Convert to percentage
      netApy: Number.parseFloat(data.historicalState.netApy[index].y) * 100, // Convert to percentage
    }
  }).reverse()

  // Get current (latest) APY values
  const currentApy = chartData[chartData.length - 1].apy.toFixed(2)
  const currentNetApy = chartData[chartData.length - 1].netApy.toFixed(2)

  return (
    <div className="size-full max-w-full space-y-2">
      <div className="flex flex-col space-y-2">
        {/* Header with Asset Logo and Name */}
        <div className="flex items-center gap-2 bg-card p-2 rounded-md">
          <img src={data.asset.logoURI} alt={data.asset.symbol} className="size-8 rounded-full" />
          <h1 className="text-2xl font-semibold">{data.name} <span className="text-sm text-muted-foreground">({data.symbol})</span></h1>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="p-2 rounded-md bg-card">
            <div className="text-sm text-muted-foreground">Current Net APY</div>
            <div className="text-2xl font-bold mt-1">{currentNetApy}%</div>
          </div>
          <div className="p-2 rounded-md bg-card">
            <div className="text-sm text-muted-foreground">Current APY</div>
            <div className="text-2xl font-bold mt-1">{currentApy}%</div>
          </div>
          <div className="p-2 rounded-md bg-card">
            <div className="text-sm text-muted-foreground">TVL</div>
            <div className="text-2xl font-bold mt-1">${Number.parseFloat(data.state.totalAssetsUsd).toLocaleString(undefined, { maximumFractionDigits: 2, notation: 'compact' })}</div>
          </div>
          <div className="p-2 rounded-md bg-card">
            <div className="text-sm text-muted-foreground">Management Fee</div>
            <div className="text-2xl font-bold mt-1">{(data.state.fee).toFixed(2)}%</div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-2 gap-2">
          {/* Left Column */}
          <div className="space-y-2">
            <div className="p-2 rounded-lg bg-card">
              <h2 className="text-lg font-semibold mb-2">Vault Info</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token</span>
                  <div className="flex items-center gap-2">
                    <img src={data.asset.logoURI} alt={data.asset.symbol} className="size-5 rounded-full" />
                    <span>{data.asset.symbol}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span>{data.chain.network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vault Address</span>
                  <Address address={data.address} />
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Timelock</span>
                  <span>{data.state.timelock > 0 ? `${data.state.timelock} seconds` : "None"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Description */}
          {data.metadata.description && (
            <div className="p-2 rounded-lg bg-card">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-sm text-muted-foreground">{data.metadata.description}</p>
            </div>
          )}
        </div>

        {/* Chart Section */}
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-card">
            <h2 className="text-lg font-semibold">Historical APY</h2>
            <ChartContainer config={chartConfig}>
              <AreaChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="timestamp" />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="apy"
                  type="monotone"
                  fill="var(--color-apy)"
                  fillOpacity={0.4}
                  stroke="var(--color-apy)"
                  strokeWidth={2}
                  name="APY"
                />
                <Area
                  dataKey="netApy"
                  type="monotone"
                  fill="var(--color-netApy)"
                  fillOpacity={0.4}
                  stroke="var(--color-netApy)"
                  strokeWidth={2}
                  name="Net APY"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>
      </div>
    </div>
  )
}