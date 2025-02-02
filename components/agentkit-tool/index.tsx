'use client'

import React from 'react'

import { ChevronDown } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { Markdown } from '@/components/markdown'

import TrendingTokens from './trending-coins'
import SearchTokensResult from './search-tokens'
import { VaultsByChain, VaultsByChainAndAsset, Vault } from './vaults'
import { VaultPositions } from './vaults/vault-positions'

import { getToolInfo } from '@/lib/ai/agentkit/tool-info'

import type { ToolInvocation } from 'ai'
import { AnimatedShinyText } from '../ui/animated-shiny-text'
import Balances from './balances'

interface Props {
    toolInvocation: ToolInvocation
}

const getDefaultOpenState = (toolName: string) => {
    return [
        'get_trending_tokens',
        'search_tokens',
        'get_vaults_by_chain',
        'get_vaults_by_chain_and_asset',
        'get_vault_positions',
        'get_vault_data',
        'get_token_balances'
    ].includes(toolName);
}

const AgentkitTool: React.FC<Props> = ({ toolInvocation }) => {

    const { toolName, toolCallId, state } = toolInvocation;

    const parsedToolName = toolName.slice(toolName.indexOf('_') + 1);

    const toolInfo = getToolInfo(parsedToolName);

    if (state === 'result') {
    const { result } = toolInvocation;

    return (
        <Collapsible key={toolCallId} defaultOpen={getDefaultOpenState(parsedToolName)} className="flex flex-col gap-2">
            <CollapsibleTrigger className="flex flex-row items-center gap-2">
                {toolInfo?.icon}
                <p>{toolInfo?.title || toolName}</p>
                <ChevronDown className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />                
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="rounded-md pl-6">
                    {
                        parsedToolName === 'get_trending_tokens' ? (
                            <TrendingTokens result={result} />
                        ) : parsedToolName === 'search_tokens' ? (
                            <SearchTokensResult result={result} />
                        ) : parsedToolName === 'get_vaults_by_chain' ? (
                            <VaultsByChain result={result} />
                        ) : parsedToolName === 'get_vaults_by_chain_and_asset' ? (
                            <VaultsByChainAndAsset result={result} />
                        ) : parsedToolName === 'get_vault_data' ? (
                            <Vault result={result} />
                        ) : parsedToolName === 'get_vault_positions' ? (
                            <VaultPositions result={result} />
                        ) : parsedToolName === 'get_token_balances' ? (
                            <Balances result={result} />
                        ) : (
                            <Markdown>{result}</Markdown>
                        )
                    }
                </div>
            </CollapsibleContent>
        </Collapsible>
    );
    }
    return (
    <div
        key={toolCallId}
    >
        {toolInfo ? (
            <div className="flex flex-row items-center gap-2">
                {toolInfo.icon}
                <AnimatedShinyText className="text-md">{toolInfo.loading}</AnimatedShinyText>
            </div>
            ) : (
                <p>{toolName}</p>
            )
        }
    </div>
    );
}

export default AgentkitTool