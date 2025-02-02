'use client'

import React from 'react'

import { GetTokenDataResultHeading } from './heading'
import { Stats } from './stats'
import { TwentyFourHrStats } from './24hr-stats'

import type { TokenOverview } from '@/agentkit-action-providers/birdeye/types'

interface Props {
    result: string
}

const SearchTokensResult: React.FC<Props> = ({ result }) => {

    const { token, message } = JSON.parse(result) as {
        token: TokenOverview,
        message: string
    }

    if(!token) {
        return (
            <p>{message}</p>
        )
    }

    return (
        <div className="flex flex-col gap-2 w-full">
            <GetTokenDataResultHeading token={token} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Stats
                    token={token}
                />
                <TwentyFourHrStats
                    token={token}
                />
            </div>
        </div>
    )
}



export default SearchTokensResult