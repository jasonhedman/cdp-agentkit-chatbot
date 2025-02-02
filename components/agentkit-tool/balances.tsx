import React from 'react'

import { Card } from '@/components/ui/card'

import type { Erc20TokenBalanceWithPrice } from "@/agentkit-action-providers/moralis/types";

interface Props {
    result: string
}

const Balances: React.FC<Props> = ({ result }) => {
    const body = JSON.parse(result) as {
        tokens: Erc20TokenBalanceWithPrice[],
        message: string
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {body.tokens.map((token: Erc20TokenBalanceWithPrice) => (
                <TokenCard
                    key={token.token_address} 
                    token={token} 
                />
            ))}
        </div>
    )
}

const TokenCard = ({ token }: { token: Erc20TokenBalanceWithPrice }) => {

    return (
        <Card className="flex flex-col gap-2 p-2 justify-center">
            <div className="flex flex-row items-center gap-2">
                {
                    token.logo ? (
                        <img 
                            src={token.logo} 
                            alt={token.name} 
                            className="size-10 rounded-full"
                        />
                    ) : (
                        <div className="size-10 rounded-full bg-muted-foreground opacity-50" />
                    )
                }
                <div className="flex flex-col">
                    <p className="text-sm font-bold">{token.name} ({token.symbol})</p>
                    {
                        token.usd_price ? (
                            <p className="text-xs text-muted-foreground flex flex-row items-center gap-1">
                                ${Number(token.usd_price).toLocaleString(undefined, { maximumFractionDigits: 5})}  
                                <span className={Number(token.usd_price_24hr_percent_change) > 0 ? 'text-green-500' : 'text-red-500'}>
                                    {" "}({Number(token.usd_price_24hr_percent_change) > 0 ? '+' : ''}{Number(token.usd_price_24hr_percent_change).toLocaleString(undefined, { maximumFractionDigits: 2 })}%)
                                </span>
                            </p>
                        ) : null
                    }
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-xs text-muted-foreground">Balance: {Number(token.balance_formatted).toLocaleString(undefined, { maximumFractionDigits: 5 })} {token.symbol}</p>
                {token.usd_value ? (
                    <p className="text-xs text-muted-foreground">Value: ${token.usd_value.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                ) : null}
                {token.portfolio_percentage ? (
                    <p className="text-xs text-muted-foreground">Portfolio %: {token.portfolio_percentage.toLocaleString(undefined, { maximumFractionDigits: 2 })}%</p>
                ) : null}
            </div>
        </Card>
    )
}

export default Balances

