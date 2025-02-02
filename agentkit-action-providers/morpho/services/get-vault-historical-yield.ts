import { gql } from '@apollo/client';
import { executeHistoricalYieldQuery } from './base-query';

import { TimeseriesOptions, VaultHistoricalYield } from '../types';

const GET_VAULT_HISTORICAL_YIELD_QUERY = gql`
  query MarketApys($vaultAddress: String!, $options: TimeseriesOptions!) {
    weeklyHourlyMarketApys: marketByUniqueKey(
      uniqueKey: $vaultAddress
    ) {
      uniqueKey
      historicalState {
        supplyApy(options: $options) {
          x
          y
        }
        borrowApy(options: $options) {
          x
          y
        }
      }
    }
  }
`;

export const getVaultHistoricalYield = async (
  vaultAddress: string,
  options: TimeseriesOptions
): Promise<VaultHistoricalYield> => {
  return executeHistoricalYieldQuery(GET_VAULT_HISTORICAL_YIELD_QUERY, {
    vaultAddress,
    options,
  });
}; 