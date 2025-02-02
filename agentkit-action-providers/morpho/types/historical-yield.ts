export enum TimeInterval {
    HOUR = 'HOUR',
    DAY = 'DAY',
    WEEK = 'WEEK',
    MONTH = 'MONTH'
}
  
export interface TimeseriesOptions {
    startTimestamp: number;
    endTimestamp: number;
    interval: TimeInterval;
}
  
export interface TimeseriesData {
    x: string; // timestamp
    y: string; // APY value
}
  
export interface VaultHistoricalYield {
    weeklyHourlyMarketApys: {
        uniqueKey: string;
        historicalState: {
            supplyApy: TimeseriesData[];
            borrowApy: TimeseriesData[];
        };
    };
}