import { http, createConfig } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const openCampusCodex = {
    id: 656476,
    name: 'Open Campus Codex',
    rpcUrls: {
      default: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
    },
    blockExplorers: {
      default: { name: 'Codex Block Explorer', url: 'https://explorer.open-campus-codex.gelato.digital' },
    },
    nativeCurrency: {
      name: 'EDU',
      symbol: 'EDU',
      decimals: 18,
    },
    testnet: true,
  };

export const config = createConfig({
  chains: [openCampusCodex],
  transports: {
    [openCampusCodex.id]: http(),
    
  },
})