import { queryBirdeye } from "./base-query";

import { Network, TrendingTokensResponse } from "../types";

export const getTrendingTokens = async ({
    apiKey,
    network,
    offset = 0,
    limit = 10
}: {
    apiKey: string,
    network: Network,
    offset?: number,
    limit?: number
}): Promise<TrendingTokensResponse> => {
    return queryBirdeye<TrendingTokensResponse>({
        endpoint: 'defi/token_trending',
        network,
        apiKey,
        params: {
            sort_by: 'rank',
            sort_type: 'asc',
            offset,
            limit
        }
    });
}
