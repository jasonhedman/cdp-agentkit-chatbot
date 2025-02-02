import { queryBirdeye } from "./base-query";

import type { Network, SearchResponse } from "../types";

interface SearchTokensParams {
    keyword: string;
    network: Network;
    apiKey: string;
    verifyToken?: boolean;
    offset?: number;
    limit?: number;
}

export const searchTokens = async ({
    keyword,
    network,
    apiKey,
    verifyToken,
    offset = 0,
    limit = 20
}: SearchTokensParams): Promise<SearchResponse> => {
    const params: Record<string, string | number> = {
        keyword,
        chain: network,
        target: "token",
        sort_by: "liquidity",
        sort_type: "desc",
        offset,
        limit
    };

    if (verifyToken !== undefined) {
        params.verify_token = verifyToken.toString();
    }

    return queryBirdeye<SearchResponse>({
        endpoint: 'defi/v3/search',
        network,
        params,
        apiKey
    });
} 