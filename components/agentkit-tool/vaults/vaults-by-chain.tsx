'use client'

import React from 'react'
import type { Vault } from '@/agentkit-action-providers/morpho/types/vault'
import VaultCard from './vault-card'

interface Props {
    result: string
}

export const VaultsByChain: React.FC<Props> = ({ result }) => {
    const body = JSON.parse(result) as {
        vaults: Vault[] | null,
        message: string
    }

    if (!body.vaults) {
        return <div className="text-neutral-600 dark:text-neutral-400">{body.message}</div>
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {body.vaults.map((vault: Vault) => (
                <VaultCard
                    key={vault.address} 
                    vault={vault} 
                />
            ))}
        </div>
    )
}