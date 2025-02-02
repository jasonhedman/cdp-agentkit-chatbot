import type { z } from "zod";

import { ActionProvider, CreateAction, EvmWalletProvider } from "@coinbase/agentkit";
import { GetTrendingTokensSchema, SearchTokensSchema } from "./schemas";
import { getTrendingTokens, searchTokens } from "./services";
import { chainIdToNetwork } from "./utils";
import { getTokenOverview } from "./services/get-token-overview";

export interface Network {
  /**
   * The protocol family of the network.
   */
  protocolFamily: string;

  /**
   * The network ID of the network.
   */
  networkId?: string;

  /**
   * The chain ID of the network.
   */
  chainId?: string;
}

/**
 * BirdeyeActionProvider is an action provider for Birdeye data.
 */
export class BirdeyeActionProvider extends ActionProvider {

  private birdeyeApiKey: string;

  /**
   * Constructor for the BirdeyeActionProvider class.
   */
  constructor(apiKey: string) {
    super("birdeye", []);
    this.birdeyeApiKey = apiKey;
  }

  supportsNetwork(network: Network): boolean {
    return network.chainId ? chainIdToNetwork(network.chainId) !== undefined : false;
  }

 /**
   * Gets the balance of an ERC20 token.
   *
   * @param walletProvider - The wallet provider to get the balance from.
   * @param args - The input arguments for the action.
   * @returns A message containing the balance.
   */
 @CreateAction({
  name: "get_trending_tokens",
  description: `This tool will get the trending tokens. It takes:

  - offset: The offset for pagination
  - limit: The number of tokens to fetch
  
After fetching the tokens, do not reiterate the tokens in your next message unless explicitly asked.`,
  schema: GetTrendingTokensSchema,
  })
  async getTrendingTokens(wallet: EvmWalletProvider, args: z.infer<typeof GetTrendingTokensSchema>): Promise<string> {
    try {
      const network = wallet.getNetwork();
      if (!network || !network.chainId) {
        throw new Error("Network is required");
      }

      const birdeyeNetwork = chainIdToNetwork(network.chainId);
      if (!birdeyeNetwork) {
        throw new Error("Network is not supported");
      }

      const trendingTokens = await getTrendingTokens({
        network: birdeyeNetwork,
        offset: args.offset,
        limit: args.limit,
        apiKey: this.birdeyeApiKey
      });

      return JSON.stringify({
        tokens: trendingTokens.tokens,
        message: "The user is shown the tokens in the UI. Do not reiterate the tokens in your return message. Ask the user what they want to do next."
      });
    } catch (error) {
      return `Error fetching trending tokens: ${error}`;
    }
  }

  @CreateAction({
    name: "search_tokens",
    description: `This tool will search for tokens. It takes:

    - keyword: The keyword to search for
    `,
    schema: SearchTokensSchema,
  })
  async searchTokens(wallet: EvmWalletProvider, args: z.infer<typeof SearchTokensSchema>): Promise<string> {
    try {
      const network = wallet.getNetwork();
      if (!network || !network.chainId) {
        throw new Error("Network is required");
      }

      const birdeyeNetwork = chainIdToNetwork(network.chainId);
      if (!birdeyeNetwork) {
        throw new Error("Network is not supported");
      }

      const { items } = await searchTokens({
        keyword: args.search,
        network: birdeyeNetwork,
        apiKey: this.birdeyeApiKey
      });

      const token = items?.[0]?.result?.[0];

      if (!token) {
        return JSON.stringify({
          message: `No token found for ${args.search}`,
          token: null
        });
      }

      return JSON.stringify({
        token: await getTokenOverview({
          address: token.address,
          network: birdeyeNetwork,
          apiKey: this.birdeyeApiKey
        }),
        message: "The user is shown the token in the UI. Do not reiterate the token details in your return message. Ask the user what they want to do next."
      });
    } catch (error) {
      return JSON.stringify({
        message: `Error searching tokens: ${error}`,
        token: null
      });
    }
  }

  @CreateAction({
    name: "get_token_address",
    description: `This tool will get the token address. It takes:

    - keyword: The keyword to search for which can be a name or symbol
    `,
    schema: SearchTokensSchema,
  })
  async getTokenAddress(wallet: EvmWalletProvider, args: z.infer<typeof SearchTokensSchema>): Promise<string> {
    try {
      const network = wallet.getNetwork();
      if (!network || !network.chainId) {
        throw new Error("Network is required");
      }

      const birdeyeNetwork = chainIdToNetwork(network.chainId);
      if (!birdeyeNetwork) {
        throw new Error("Network is not supported");
      }

      const { items } = await searchTokens({
        keyword: args.search,
        network: birdeyeNetwork,
        apiKey: this.birdeyeApiKey
      });

      const token = items?.[0]?.result?.[0];

      if(!token) {
        return `No token found for ${args.search}`;
      }

      return token.address;
    } catch (error) {
      return `Error fetching token address: ${error}`;
    }
  }
}

export const birdeyeActionProvider = (apiKey: string) => new BirdeyeActionProvider(apiKey);
