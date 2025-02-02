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
    "CdpApiActionProvider_address_reputation": {
        loading: "Getting address reputation...",
        title: "Fetched address reputation",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
    },
    "CdpApiActionProvider_request_faucet_funds": {
        loading: "Requesting faucet funds...",
        title: "Requested faucet funds",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
    },

    // CDP Wallet
    "CdpWalletActionProvider_trade": {
        loading: "Trading on Coinbase...",
        title: "Traded on Coinbase",
        icon: <Wallet {...imageProps} />,
    },
    "CdpWalletActionProvider_deploy_token": {
        loading: "Deploying token...",
        title: "Deployed token",
        icon: <Wallet {...imageProps} />,
    },
    "CdpWalletActionProvider_deploy_contract": {
        loading: "Deploying contract...",
        title: "Deployed contract",
        icon: <Wallet {...imageProps} />,
    },

    // Wallet
    "WalletActionProvider_get_wallet_details": {
        loading: "Getting wallet details...",
        title: "Fetched wallet details",
        icon: <Wallet {...imageProps} />,
    },
    "WalletActionProvider_native_transfer": {
        loading: "Transferring native token...",
        title: "Transferred native token",
        icon: <Wallet {...imageProps} />,
    },

    // Pyth
    "PythActionProvider_fetch_price_feed": {
        loading: "Fetching price feed...",
        title: "Fetched price feed",
        icon: <Image src="/images/pyth.png" alt="Pyth" {...imageProps} />,
    },
    "PythActionProvider_fetch_price": {
        loading: "Fetching price...",
        title: "Fetched price",
        icon: <Image src="/images/pyth.png" alt="Pyth" {...imageProps} />,
    },

    // ERC721
    "Erc721ActionProvider_mint": {
        loading: "Minting token...",
        title: "Minted token",
        icon: <GalleryHorizontalEnd {...imageProps} />,
    },
    "Erc721ActionProvider_transfer": {
        loading: "Transferring ERC721 token...",
        title: "Transferred ERC721 token",
        icon: <GalleryHorizontalEnd {...imageProps} />,
    },
    "Erc721ActionProvider_get_balance": {
        loading: "Getting ERC721 token balance...",
        title: "Fetched ERC721 token balance",
        icon: <GalleryHorizontalEnd {...imageProps} />,
    },

    // ERC20
    "ERC20ActionProvider_get_balance": {
        loading: "Getting ERC20 token balance...",
        title: "Fetched ERC20 token balance",
        icon: <Coins {...imageProps} />,
    },
    "ERC20ActionProvider_transfer": {
        loading: "Transferring ERC20 token...",
        title: "Transferred ERC20 token",
        icon: <Coins {...imageProps} />,
    },

    // Morpho
    "MorphoActionProvider_deposit": {
        loading: "Getting Morpho details...",
        title: "Fetched Morpho details",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "MorphoActionProvider_withdraw": {
        loading: "Withdrawing from Morpho...",
        title: "Withdrew from Morpho",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "MorphoActionProvider_get_vaults_by_chain": {
        loading: "Getting Morpho vaults...",
        title: "Fetched Morpho vaults",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },
    "MorphoActionProvider_get_vaults_by_chain_and_asset": {
        loading: "Getting Morpho vaults...",
        title: "Fetched Morpho vaults",
        icon: <Image src="/images/morpho.png" alt="Morpho" {...imageProps} />,
    },

    // Weth
    "WethActionProvider_wrap_eth": {
        loading: "Depositing WETH...",
        title: "Deposited WETH",
        icon: <Image src="/images/weth.png" alt="Weth" {...imageProps} />,
    },

    // Birdeye
    "BirdeyeActionProvider_get_trending_tokens": {
        loading: "Fetching trending tokens...",
        title: "Fetched trending tokens",
        icon: <Image src="/images/birdeye.png" alt="Birdeye" {...imageProps} />,
    },
    "BirdeyeActionProvider_search_tokens": {
        loading: "Searching tokens...",
        title: "Searched tokens",
        icon: <Image src="/images/birdeye.png" alt="Birdeye" {...imageProps} />,
    },
    "BirdeyeActionProvider_get_token_address": {
        loading: "Getting token address...",
        title: "Fetched token address",
        icon: <Image src="/images/birdeye.png" alt="Birdeye" {...imageProps} />,
    },
} as const;

export const getToolInfo = (toolName: string) => {
    if (toolName in toolInfo) {
        return toolInfo[toolName as keyof typeof toolInfo];
    }
    return null;
}