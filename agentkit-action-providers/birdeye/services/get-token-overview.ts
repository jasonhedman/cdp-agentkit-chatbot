import { queryBirdeye } from "./base-query";
import type { Network, TokenOverview } from "../types";

export const getTokenOverview = async ({
    address,
    network,
    apiKey
}: {
    address: string,
    network: Network,
    apiKey: string
}): Promise<TokenOverview> => {
    return await queryBirdeye<TokenOverview>({
        endpoint: 'defi/token_overview',
        params: {
            address,
            network
        },
        apiKey,
        network
    });
} 