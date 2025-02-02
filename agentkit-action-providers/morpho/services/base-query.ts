import { DocumentNode } from '@apollo/client';
import { morphoClient } from './apollo-client';
import { VaultsResponse, VaultHistoricalYield } from '../types';

export const executeVaultQuery = async <T extends Record<string, any>>(
  query: DocumentNode,
  variables: T
) => {
  try {
    const { data } = await morphoClient.query<VaultsResponse>({
      query,
      variables,
    });

    return data.vaults.items;
  } catch (error) {
    console.error('Error fetching vaults:', error);
    throw error;
  }
};

export const executeHistoricalYieldQuery = async <T extends Record<string, any>>(
  query: DocumentNode,
  variables: T
) => {
  try {
    const { data } = await morphoClient.query<VaultHistoricalYield>({
      query,
      variables,
    });

    return data;
  } catch (error) {
    console.error('Error fetching historical yield:', error);
    throw error;
  }
}; 