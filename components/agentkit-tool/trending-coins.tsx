'use client'

import React from 'react'

import { Card } from '@/components/ui/card'

import type { TrendingToken } from '@/agentkit-action-providers/birdeye/types'

interface Props {
    result: string
}

const TrendingTokens: React.FC<Props> = ({ result }) => {

    const body = JSON.parse(result) as {
        tokens: TrendingToken[],
        message: string
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {body.tokens.map((token: TrendingToken) => (
                <TokenCard
                    key={token.address} 
                    token={token} 
                />
            ))}
        </div>
    )
}

const TokenCard = ({ token }: { token: TrendingToken }) => {

    
    return (
        <Card className="flex flex-col gap-2 p-2 justify-center">
            <div className="flex flex-row items-center gap-2">
                {
                    token.logoURI ? (
                        <img 
                            src={token.logoURI} 
                            alt={token.name} 
                            className="size-10 rounded-full"
                        />
                    ) : (
                        <div className="size-10 rounded-full bg-muted-foreground opacity-50" />
                    )
                }
                <div className="flex flex-col">
                    <p className="text-sm font-bold">{token.name} ({token.symbol})</p>
                    <p className="text-xs text-muted-foreground">${token.price.toLocaleString(undefined, { maximumFractionDigits: 5})} <span className={token.price24hChangePercent > 0 ? 'text-green-500' : 'text-red-500'}>({token.price24hChangePercent > 0 ? '+' : ''}{token.price24hChangePercent.toLocaleString(undefined, { maximumFractionDigits: 2 })}%)</span></p>
                </div>
            </div>
            <div className="flex flex-col">
                <p className="text-xs text-muted-foreground">24h Volume: ${token.volume24hUSD.toLocaleString()}</p>
            </div>
        </Card>
    )
}

export default TrendingTokens