import { z } from "zod";

/**
 * Input schema for getting trending tokens from Birdeye
 */
export const GetTrendingTokensSchema = z
  .object({
    offset: z
      .number()
      .int()
      .min(0)
      .optional()
      .default(0)
      .describe("The offset for pagination"),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .default(10)
      .describe("The number of tokens to return"),
  })
  .describe("Input schema for getting trending tokens from Birdeye");

/**
 * Input schema for searching tokens from Birdeye
 */
export const SearchTokensSchema = z
  .object({
    search: z.string().describe("The name, ticker, or contract address of the token to get data for"),
  })
  .describe("Input schema for searching tokens from Birdeye");
