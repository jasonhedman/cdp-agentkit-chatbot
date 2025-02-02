'use client'

import React from 'react'

import { Card } from '@/components/ui/card'

import type { Vault } from '@/agentkit-action-providers/morpho/types'

interface Props {
    vault: Vault
}

export const formatNumber = (num: string) => {
    return Number.parseFloat(num).toLocaleString(undefined, { 
        maximumFractionDigits: 2 
    })
}

const VaultCard: React.FC<Props> = ({ vault }) => {
    return (
        <Card className="flex flex-col gap-2 p-4">
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <div className="flex flex-row items-center gap-2">
                        <img src={vault.metadata.image} alt={vault.name} className="size-6 rounded-full" />
                        <h3 className="text-lg font-bold truncate">{vault.name}</h3>
                        <span className="text-sm text-muted-foreground whitespace-nowrap">{vault.symbol}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Asset</span>
                        <span className="text-sm font-medium">
                            {vault.asset.symbol}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Net APY</span>
                        <span className="text-sm font-medium text-green-500">
                            {(vault.state.netApy * 100).toFixed(2)}%
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Total Assets</span>
                        <span className="text-sm font-medium">
                            ${formatNumber(vault.state.totalAssetsUsd)}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fee</span>
                        <span className="text-sm font-medium">
                            {vault.state.fee}%
                        </span>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default VaultCard 