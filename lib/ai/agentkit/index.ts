import { 
    AgentKit, 
    ViemWalletProvider, 
    cdpApiActionProvider, 
    erc721ActionProvider, 
    pythActionProvider, 
    walletActionProvider 
} from "@coinbase/agentkit";
import { createWalletClient, http } from "viem";
import { baseSepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

import { getVercelAITools } from "./get-vercel-ai-tools";

/**
 * Initialize the agent with CDP Agentkit and Vercel AI SDK tools
 *
 * @returns Object containing initialized tools
 * @throws Error if initialization fails
 */
export async function initializeAgent() {
    try {
      const account = privateKeyToAccount(
        "0x4c0883a69102937d6231471b5dbb6208ffd70c02a813d7f2da1c54f2e3be9f38",
      );
  
      const client = createWalletClient({
        account,
        chain: baseSepolia,
        transport: http(),
      });
  
      const walletProvider = new ViemWalletProvider(client);
  
      // Initialize action providers
      const cdp = cdpApiActionProvider({
        apiKeyName: process.env.CDP_API_KEY_NAME,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
      });
      const erc721 = erc721ActionProvider();
      const pyth = pythActionProvider();
      const wallet = walletActionProvider();
  
      const agentKit = await AgentKit.from({ 
        walletProvider,
        actionProviders: [cdp, erc721, pyth, wallet],
      });
  
      const tools = getVercelAITools(agentKit);
      return { tools };
    } catch (error) {
      console.error("Failed to initialize agent:", error);
      throw error;
    }
  }