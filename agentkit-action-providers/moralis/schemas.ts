import { z } from "zod";

/**
 * Input schema for getting token balances from Moralis
 */
export const GetTokenBalancesSchema = z
  .object({})
  .describe("Input schema for getting token balances from Moralis");