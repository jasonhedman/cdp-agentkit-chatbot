export type Erc20TokenBalanceWithPrice = {
  token_address?: string
  name: string
  symbol: string
  logo?: string | null
  thumbnail?: string | null
  decimals: number
  balance: string
  possible_spam: boolean
  verified_contract?: boolean
  usd_price: string | null
  usd_price_24hr_percent_change: string | null
  usd_price_24hr_usd_change: string | null
  usd_value_24hr_usd_change?: string | null
  usd_value: number | null
  portfolio_percentage: number
  balance_formatted: string
  native_token: boolean
  total_supply?: string
  total_supply_formatted?: string
  percentage_relative_to_total_supply?: number
}
