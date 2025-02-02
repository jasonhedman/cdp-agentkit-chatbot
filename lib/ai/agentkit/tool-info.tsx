import { Coins, GalleryHorizontalEnd, Wallet } from "lucide-react";
import Image from "next/image";

const imageProps = {
    width: 64,
    height: 64,
    className: "rounded-full h-4 w-4",
};

const toolInfo = {
    // CDP

    // CDP API
    "address_reputation": {
        loading: "Getting address reputation...",
        title: "Fetched address reputation",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
    },
    "request_faucet_funds": {
        loading: "Requesting faucet funds...",
        title: "Requested faucet funds",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
    },

    // CDP Wallet
    "trade": {
        loading: "Trading on Coinbase...",
        title: "Traded on Coinbase",
        icon: <Wallet {...imageProps} />,
    },
    "deploy_token": {
        loading: "Deploying token...",
        title: "Deployed token",
        icon: <Wallet {...imageProps} />,
    },
    "deploy_contract": {
        loading: "Deploying contract...",
        title: "Deployed contract",
        icon: <Wallet {...imageProps} />,
    },

    // Wallet
    "get_wallet_details": {
        loading: "Getting wallet details...",
        title: "Fetched wallet details",
        icon: <Wallet {...imageProps} />,
    },
    "native_transfer": {
        loading: "Transferring native token...",
        title: "Transferred native token",
        icon: <Wallet {...imageProps} />,
    },

    // Pyth
    "fetch_price_feed": {
        loading: "Fetching price feed...",
        title: "Fetched price feed",
        icon: <Image src="/images/pyth.png" alt="Pyth" {...imageProps} />,
    },
    "fetch_price": {
        loading: "Fetching price...",
        title: "Fetched price",
        icon: <Image src="/images/pyth.png" alt="Pyth" {...imageProps} />,
    },

    // ERC721
    "mint": {
        loading: "Minting token...",
        title: "Minted token",
        icon: <GalleryHorizontalEnd {...imageProps} />,
    },
    "transfer_erc721": {
        loading: "Transferring ERC721 token...",
        title: "Transferred ERC721 token",
        icon: <GalleryHorizontalEnd {...imageProps} />,
    },
    "get_balance_erc721": {
        loading: "Getting ERC721 token balance...",
        title: "Fetched ERC721 token balance",
        icon: <GalleryHorizontalEnd {...imageProps} />,
    },

    // ERC20
    "get_balance": {
        loading: "Getting ERC20 token balance...",
        title: "Fetched ERC20 token balance",
        icon: <Coins {...imageProps} />,
    },
    "transfer": {
        loading: "Transferring ERC20 token...",
        title: "Transferred ERC20 token",
        icon: <Coins {...imageProps} />,
    },

    // Morpho
    "deposit": {
        loading: "Depositing to Morpho...",
        title: "Deposited to Morpho",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "withdraw": {
        loading: "Withdrawing from Morpho...",
        title: "Withdrew from Morpho",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "get_vaults_by_chain": {
        loading: "Getting Morpho Vaults...",
        title: "Fetched Morpho Vaults",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "get_vaults_by_chain_and_asset": {
        loading: "Getting Morpho Vaults...",
        title: "Fetched Morpho Vaults",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "get_vault_data": {
        loading: "Getting Morpho Vault Data...",
        title: "Fetched Morpho Vault Data",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "get_vault_positions": {
        loading: "Getting Morpho Vault Positions...",
        title: "Fetched Morpho Vault Positions",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },

    // Weth
    "wrap_eth": {
        loading: "Depositing WETH...",
        title: "Deposited WETH",
        icon: <Image src="/images/weth.png" alt="Weth" {...imageProps} />,
    },

    // Birdeye
    "get_trending_tokens": {
        loading: "Fetching trending tokens...",
        title: "Fetched trending tokens",
        icon: <Image src="/images/birdeye.png" alt="Birdeye" {...imageProps} />,
    },
    "search_tokens": {
        loading: "Searching tokens...",
        title: "Searched tokens",
        icon: <Image src="/images/birdeye.png" alt="Birdeye" {...imageProps} />,
    },
    "get_token_address": {
        loading: "Getting token address...",
        title: "Fetched token address",
        icon: <Image src="/images/birdeye.png" alt="Birdeye" {...imageProps} />,
    },

    // Moralis
    "get_token_balances": {
        loading: "Getting token balances...",
        title: "Fetched token balances",
        icon: <Image src="/images/moralis.png" alt="Moralis" {...imageProps} />,
    },
} as const;

export const getToolInfo = (toolName: string) => {
    if (toolName in toolInfo) {
        return toolInfo[toolName as keyof typeof toolInfo];
    }
    return null;
}