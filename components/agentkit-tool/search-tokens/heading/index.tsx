import Link from 'next/link'

import { ArrowUpRightIcon } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { Address } from '@/components/address'

import Links from './links'

import { cn } from '@/lib/utils'

import type { TokenOverview } from '@/agentkit-action-providers/birdeye/types'

export const GetTokenDataResultHeading = ({ token }: { token: TokenOverview }) => {
    return (
        <Card className="p-2 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
                <img 
                    src={token.logoURI} 
                    alt={token.name} 
                    className="size-10 rounded-full" 
                />
                <div className="flex flex-col">
                    <div className="flex flex-col md:flex-row md:items-center md:gap-2">
                        <h1 className="text-xl font-bold">{token.name} ({token.symbol})</h1>
                        <Address address={token.address} />
                        <Link href={`/token/${token.address}`}>
                            <Button variant="ghost" className="p-1 size-fit">
                                <ArrowUpRightIcon className="size-4" />
                            </Button>
                        </Link>
                    </div>
                    <p className="text-sm font-semibold flex items-center gap-1">
                        ${token.price.toLocaleString(undefined, { maximumFractionDigits: 5 })} 
                        {
                            token.priceChange24hPercent && (
                                <span 
                                    className={cn(
                                        "text-xs",
                                        token.priceChange24hPercent > 0 ? "text-green-500" : "text-red-500"
                                    )}
                                >
                                    {token.priceChange24hPercent ? `(${token.priceChange24hPercent > 0 ? "+" : ""}${token.priceChange24hPercent.toFixed(2)}%)` : ""}
                                </span>
                            )
                        }
                    </p>
                </div>
            </div>
            <Links token={token} />
        </Card>
    )
}