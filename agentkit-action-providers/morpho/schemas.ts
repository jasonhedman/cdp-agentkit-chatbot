import { z } from "zod";

/**
 * Input schema for getting vaults by chain
 */
export const GetVaultsByChainSchema = z
  .object({})
  .describe("Input schema for getting vaults by chain");

/**
 * Input schema for getting vaults by chain and asset
 */
export const GetVaultsByChainAndAssetSchema = z
  .object({
    tokenAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
      .describe("The address of the assets token to approve for deposit"),
  })
  .describe("Input schema for getting vaults by chain and asset");

/**
 * Input schema for Morpho Vault deposit action.
 */
export const DepositSchema = z
  .object({
    assets: z
      .string()
      .regex(/^\d+(\.\d+)?$/, "Must be a valid integer or decimal value")
      .describe("The quantity of assets to deposit, in whole units"),
    tokenAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
      .describe("The address of the assets token to approve for deposit"),
    vaultAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
      .describe("The address of the Morpho Vault to deposit to"),
  })
  .describe("Input schema for Morpho Vault deposit action");

/**
 * Input schema for Morpho Vault withdraw action.
 */
export const WithdrawSchema = z
  .object({
    vaultAddress: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format")
      .describe("The address of the Morpho Vault to withdraw from"),
    assets: z
      .string()
      .regex(/^\d+$/, "Must be a valid whole number")
      .describe("The amount of assets to withdraw in atomic units e.g. 1"),
  })
  .strip()
  .describe("Input schema for Morpho Vault withdraw action");

export const GetVaultHistoricalYieldSchema = z
  .object({})
  .describe("Input schema for Morpho Vault historical yield action");