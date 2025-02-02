import { z } from "zod";

import { base, mainnet } from "viem/chains";

import Decimal from "decimal.js"

import { ActionProvider, morphoActionProvider as baseMorphoActionProvider, CreateAction, EvmWalletProvider } from "@coinbase/agentkit";
import { GetVaultsByChainSchema, GetVaultsByChainAndAssetSchema, DepositSchema, WithdrawSchema } from "./schemas";

import { searchVaultsByChain, searchVaultsByChainAndAsset } from "./services";
import { encodeFunctionData, parseEther } from "viem";
import { METAMORPHO_ABI } from "./constants";
import { approve } from "./utils";

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
export class MorphoActionProvider extends ActionProvider {

  /**
   * Constructor for the BirdeyeActionProvider class.
   */
  constructor() {
    super("morpho-extended", [baseMorphoActionProvider()]);
  }

  supportsNetwork(network: Network): boolean {
    const chainId = Number(network.chainId);
    return network.chainId !== undefined && (chainId === mainnet.id || chainId === base.id);
  }

  /**
   * Gets the balance of an ERC20 token.
   *
   * @param walletProvider - The wallet provider to get the balance from.
   * @param args - The input arguments for the action.
   * @returns A message containing the balance.
   */
 @CreateAction({
  name: "get_vaults_by_chain",
  description: `This tool will get the vaults by chain. It takes:

  - offset: The offset for pagination
  - limit: The number of tokens to fetch
  
After fetching the tokens, do not reiterate the tokens in your next message unless explicitly asked.`,
  schema: GetVaultsByChainSchema,
  })
  async getVaultsByChain(wallet: EvmWalletProvider, args: z.infer<typeof GetVaultsByChainSchema>): Promise<string> {
    try {
      const network = wallet.getNetwork();
      if (!network || !network.chainId) {
        throw new Error("Network is required");
      }

     if(Number(network.chainId) !== mainnet.id && Number(network.chainId) !== base.id) {
      throw new Error("Network is not supported");
     }

     const vaults = await searchVaultsByChain([Number(network.chainId)]);

      return JSON.stringify({
        vaults: vaults,
        message: "The user is shown the vaults in the UI. Do not reiterate the vaults in your return message."
      });
    } catch (error) {
      return `Error fetching vaults: ${error}`;
    }
  }

  /**
   * Gets vaults by chain and asset address.
   *
   * @param walletProvider - The wallet provider to get the vaults from.
   * @param args - The input arguments for the action.
   * @returns A message containing the vaults.
   */
  @CreateAction({
    name: "get_vaults_by_chain_and_asset",
    description: `This tool will get the vaults by chain and asset address. It takes:

    - tokenAddress: The address of the asset token to search vaults for
    
After fetching the vaults, do not reiterate the vaults in your next message, rather ask the user what they want to do next.`,
    schema: GetVaultsByChainAndAssetSchema,
  })
  async getVaultsByChainAndAsset(wallet: EvmWalletProvider, args: z.infer<typeof GetVaultsByChainAndAssetSchema>): Promise<string> {
    try {
      const network = wallet.getNetwork();
      if (!network || !network.chainId) {
        throw new Error("Network is required");
      }

      if(Number(network.chainId) !== mainnet.id && Number(network.chainId) !== base.id) {
        throw new Error("Network is not supported");
      }

      const vaults = await searchVaultsByChainAndAsset([Number(network.chainId)], [args.tokenAddress]);

      return JSON.stringify({
        vaults: vaults,
        message: "The user is shown the vaults in the UI. Do not reiterate the vaults in your return message, rather ask the user what they want to do next."
      });
    } catch (error) {
      return `Error fetching vaults: ${error}`;
    }
  }

  /**
   * Deposits assets into a Morpho Vault
   *
   * @param wallet - The wallet instance to execute the transaction
   * @param args - The input arguments for the action
   * @returns A success message with transaction details or an error message
   */
  @CreateAction({
    name: "deposit",
    description: `
This tool allows depositing assets into a Morpho Vault. 

It takes:
- vaultAddress: The address of the Morpho Vault to deposit to
- assets: The amount of assets to deposit in whole units
  Examples for WETH:
  - 1 WETH
  - 0.1 WETH
  - 0.01 WETH
- receiver: The address to receive the shares
- tokenAddress: The address of the token to approve

Important notes:
- Make sure to use the exact amount provided. Do not convert units for assets for this action.
- Please use a token address (example 0x4200000000000000000000000000000000000006) for the tokenAddress field.
`,
    schema: DepositSchema,
  })
  async deposit(wallet: EvmWalletProvider, args: z.infer<typeof DepositSchema>): Promise<string> {
    const assets = new Decimal(args.assets);

    if (assets.comparedTo(new Decimal(0.0)) != 1) {
      return "Error: Assets amount must be greater than 0";
    }

    try {
      const atomicAssets = parseEther(args.assets);

      const approvalResult = await approve(
        wallet,
        args.tokenAddress,
        args.vaultAddress,
        atomicAssets,
      );
      if (approvalResult.startsWith("Error")) {
        return `Error approving Morpho Vault as spender: ${approvalResult}`;
      }

      const data = encodeFunctionData({
        abi: METAMORPHO_ABI,
        functionName: "deposit",
        args: [atomicAssets, wallet.getAddress()],
      });

      const txHash = await wallet.sendTransaction({
        to: args.vaultAddress as `0x${string}`,
        data,
      });

      const receipt = await wallet.waitForTransactionReceipt(txHash);

      return `Deposited ${args.assets} to Morpho Vault ${args.vaultAddress} with transaction hash: ${txHash}\nTransaction receipt: ${JSON.stringify(receipt)}`;
    } catch (error) {
      return `Error depositing to Morpho Vault: ${error}`;
    }
  }

  /**
   * Withdraws assets from a Morpho Vault
   *
   * @param wallet - The wallet instance to execute the transaction
   * @param args - The input arguments for the action
   * @returns A success message with transaction details or an error message
   */
  @CreateAction({
    name: "withdraw",
    description: `
This tool allows withdrawing assets from a Morpho Vault. It takes:

- vaultAddress: The address of the Morpho Vault to withdraw from
- assets: The amount of assets to withdraw in atomic units (wei)
- receiver: The address to receive the shares
`,
    schema: WithdrawSchema,
  })
  async withdraw(wallet: EvmWalletProvider, args: z.infer<typeof WithdrawSchema>): Promise<string> {
    if (BigInt(args.assets) <= 0) {
      return "Error: Assets amount must be greater than 0";
    }

    try {
      const data = encodeFunctionData({
        abi: METAMORPHO_ABI,
        functionName: "withdraw",
        args: [BigInt(args.assets), wallet.getAddress(), wallet.getAddress()],
      });

      const txHash = await wallet.sendTransaction({
        to: args.vaultAddress as `0x${string}`,
        data,
      });

      const receipt = await wallet.waitForTransactionReceipt(txHash);

      return `Withdrawn ${args.assets} from Morpho Vault ${args.vaultAddress} with transaction hash: ${txHash}\nTransaction receipt: ${JSON.stringify(receipt)}`;
    } catch (error) {
      return `Error withdrawing from Morpho Vault: ${error}`;
    }
  }
  
}

export const morphoActionProvider = () => new MorphoActionProvider();