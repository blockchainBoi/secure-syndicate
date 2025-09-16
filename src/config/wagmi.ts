import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { config as envConfig } from './env';

export const wagmiConfig = getDefaultConfig({
  appName: 'Secure Syndicate',
  projectId: envConfig.walletConnectProjectId,
  chains: [sepolia],
  ssr: false,
});
