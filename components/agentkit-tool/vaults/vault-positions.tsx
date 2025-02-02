'use client'

import React from 'react'
import type { VaultPosition } from '@/agentkit-action-providers/morpho/types/vault'
import { formatUnits } from 'viem'
import { Card } from '@/components/ui/card'

interface Props {
    result: string
}

export const VaultPositions: React.FC<Props> = ({ result }) => {
    const body = JSON.parse(result) as {
        data: VaultPosition[] | null,
        message: string
    }

    if (!body.data) {
        return <div className="text-neutral-600 dark:text-neutral-400">{body.message}</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {body.data?.map((position) => (
                <Card className="flex flex-col gap-2 p-2" key={position.vault.address}>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <div className="flex flex-row items-center gap-2">
                                <img src={position.vault.metadata.image} alt={position.vault.name} className="size-6 rounded-full" />
                                <h3 className="text-lg font-bold truncate">{position.vault.name}</h3>
                                <span className="text-sm text-muted-foreground whitespace-nowrap">{position.vault.symbol}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Balance</span>
                                <span className="text-sm font-medium">
                                    {Number(formatUnits(BigInt(position.assets), position.vault.asset.decimals)).toLocaleString(undefined, { maximumFractionDigits: 2 })} {position.vault.asset.symbol}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Asset</span>
                                <span className="text-sm font-medium">
                                    {position.vault.asset.symbol}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-muted-foreground">Net APY</span>
                                <span className="text-sm font-medium text-green-500">
                                    {(position.vault.state.netApy * 100).toFixed(2)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
} 