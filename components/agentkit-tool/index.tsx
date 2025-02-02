'use client'

import React from 'react'

import { ChevronDown } from 'lucide-react'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

import { Markdown } from '@/components/markdown'

import TrendingTokens from './trending-coins'
import SearchTokensResult from './search-tokens'

import { getToolInfo } from '@/lib/ai/agentkit/tool-info'

import type { ToolInvocation } from 'ai'

interface Props {
    toolInvocation: ToolInvocation
}

const getDefaultOpenState = (toolName: string) => {
    return [
        'BirdeyeActionProvider_get_trending_tokens',
        'BirdeyeActionProvider_search_tokens'
    ].includes(toolName);
}

const AgentkitTool: React.FC<Props> = ({ toolInvocation }) => {

    const { toolName, toolCallId, state } = toolInvocation;

    const toolInfo = getToolInfo(toolName);

    if (state === 'result') {
    const { result } = toolInvocation;

    return (
        <Collapsible key={toolCallId} defaultOpen={getDefaultOpenState(toolName)} className="flex flex-col gap-2">
            <CollapsibleTrigger className="flex flex-row items-center gap-2">
                {toolInfo?.icon}
                <p>{toolInfo?.title || toolName}</p>
                <ChevronDown className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />                
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="rounded-md bg-neutral-100 p-2">
                    {
                        toolName === 'BirdeyeActionProvider_get_trending_tokens' ? (
                            <TrendingTokens result={result} />
                        ) : toolName === 'BirdeyeActionProvider_search_tokens' ? (
                            <SearchTokensResult result={result} />
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
                <p>{toolInfo.loading}</p>
            </div>
            ) : (
                <p>{toolName}</p>
            )
        }
    </div>
    );
}

export default AgentkitTool