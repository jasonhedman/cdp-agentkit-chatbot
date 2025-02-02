import type { z } from "zod";
import Moralis from 'moralis';

import { ActionProvider, CreateAction, type EvmWalletProvider } from "@coinbase/agentkit";
import { GetTokenBalancesSchema } from "./schemas";

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
 * MoralisActionProvider is an action provider for Moralis data.
 */
export class MoralisActionProvider extends ActionProvider {

  private moralisApiKey: string;

  /**
   * Constructor for the MoralisActionProvider class.
   */
  constructor(apiKey: string) {
    super("moralis", []);
    this.moralisApiKey = apiKey;
  }

  supportsNetwork(network: Network): boolean {
    return true;
  }

 /**
   * Gets the balance of an ERC20 token.
   *
   * @param walletProvider - The wallet provider to get the balance from.
   * @param args - The input arguments for the action.
   * @returns A message containing the balance.
   */
 @CreateAction({
  name: "get_token_balances",
  description: `This tool will get the token balances of the agent wallet.`,
  schema: GetTokenBalancesSchema,
  })
  async getTokenBalances(wallet: EvmWalletProvider, args: z.infer<typeof GetTokenBalancesSchema>): Promise<string> {
    try {
      await Moralis.start({
        apiKey: this.moralisApiKey
      });

      const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        "chain": Moralis.EvmUtils.EvmChain.BASE,
        "address": wallet.getAddress()
      });

      return JSON.stringify({
        tokens: response.result.filter(token => token.usdValue !== null),
        message: "The user is shown the tokens in the UI. Do not reiterate the tokens in your return message."
      });
    } catch (error) {
      return `Error fetching trending tokens: ${error}`;
    }
  }
}

export const moralisActionProvider = (apiKey: string) => new MoralisActionProvider(apiKey);