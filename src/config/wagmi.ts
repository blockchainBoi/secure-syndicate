import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';
import { config as envConfig } from './env';

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: envConfig.walletConnectProjectId,
    }),
  ],
  transports: {
    [sepolia.id]: http(envConfig.rpcUrl),
  },
});
