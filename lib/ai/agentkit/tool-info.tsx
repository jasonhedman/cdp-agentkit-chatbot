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
    "CdpApiActionProvider_get_wallet_balance": {
        loading: "Getting wallet balance...",
        title: "Fetched wallet balance",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
    },
    "CdpApiActionProvider_get_wallet_transactions": {
        loading: "Getting wallet transactions...",
        title: "Fetched wallet transactions",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
    },
    "CdpApiActionProvider_request_faucet_funds": {
        loading: "Requesting faucet funds...",
        title: "Requested faucet funds",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
    },

    // Wallet
    "WalletActionProvider_get_wallet_details": {
        loading: "Getting wallet details...",
        title: "Fetched wallet details",
        icon: <Image src="/images/coinbase.png" alt="Coinbase" {...imageProps} />,
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
    "Erc721ActionProvider_get_token_metadata": {
        loading: "Getting token metadata...",
        title: "Fetched token metadata",
        icon: <Image src="/images/erc721.png" alt="ERC721" {...imageProps} />,
    },
} as const;

export const getToolInfo = (toolName: string) => {
    if (toolName in toolInfo) {
        return toolInfo[toolName as keyof typeof toolInfo];
    }
    return null;
}