'use client'

import React from 'react'
import type { Vault } from '@/agentkit-action-providers/morpho/types/vault'
import VaultCard from './vault-card'

interface Props {
    result: string
}

export const VaultsByChainAndAsset: React.FC<Props> = ({ result }) => {
    const { vaults, message } = JSON.parse(result) as {
        vaults: Vault[],
        message: string
    }

    if (vaults.length === 0) {
        return (
            <div className="text-neutral-600 dark:text-neutral-400">
               {message}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {vaults.map((vault: Vault) => (
                <VaultCard
                    key={vault.address} 
                    vault={vault} 
                />
            ))}
        </div>
    )
}