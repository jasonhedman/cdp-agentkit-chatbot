import { BaseResponse } from "../types";
import { Network } from "../types/networks";

export const queryBirdeye = async <T>({
  endpoint,
  network,
  params,
  apiKey
}: {
  endpoint: string,
  network: Network,
  apiKey: string,
  params?: Record<string, string | number>,
}): Promise<T> => {
  const url = new URL(`https://public-api.birdeye.so/${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  const response = await fetch(url.toString(), {
    headers: {
      'X-API-KEY': apiKey,
      'accept': 'application/json',
      'x-chain': network
    }
  });

  if (!response.ok) {
    throw new Error(`Birdeye API error: ${response.status}`);
  }

  const data: BaseResponse<T> = await response.json();

  if (!data.success) {
    throw new Error(`Birdeye API error`);
  }

  return data.data;
}