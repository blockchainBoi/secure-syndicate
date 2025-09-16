# Vercel Deployment Guide for Secure Syndicate

This guide provides step-by-step instructions for deploying the Secure Syndicate FHE Investment Platform to Vercel.

## Prerequisites

- GitHub account with access to the `blockchainBoi/secure-syndicate` repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step-by-Step Deployment Instructions

### 1. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" and choose "Continue with GitHub"
3. Authorize Vercel to access your GitHub account

### 2. Import Project

1. In your Vercel dashboard, click "New Project"
2. Find and select the `blockchainBoi/secure-syndicate` repository
3. Click "Import"

### 3. Configure Project Settings

#### Framework Preset
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in the Vercel dashboard:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
VITE_RPC_URL_ALT=https://1rpc.io/sepolia
VITE_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important**: Replace `VITE_CONTRACT_ADDRESS` with your actual deployed contract address after deployment.

### 4. Advanced Configuration

#### Custom Domain (Optional)
1. In your project settings, go to "Domains"
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

#### Build Settings
- **Node.js Version**: 18.x (recommended)
- **Build Command**: `npm run build`
- **Development Command**: `npm run dev`

### 5. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-5 minutes)
3. Your application will be available at the provided Vercel URL

### 6. Post-Deployment Configuration

#### Update Contract Address
1. Deploy your smart contract to Sepolia testnet
2. Update the `VITE_CONTRACT_ADDRESS` environment variable in Vercel
3. Redeploy the application

#### Smart Contract Deployment Commands
```bash
# Install Foundry
curl -L https://foundry.paradigm.xyz | bash
foundryup

# Deploy contract
forge build
forge create --rpc-url $SEPOLIA_RPC_URL --private-key $PRIVATE_KEY contracts/SecureSyndicate.sol:SecureSyndicate --constructor-args $VERIFIER_ADDRESS
```

### 7. Monitoring and Maintenance

#### Performance Monitoring
- Vercel provides built-in analytics
- Monitor Core Web Vitals in the Vercel dashboard
- Set up alerts for build failures

#### Automatic Deployments
- Every push to the `main` branch triggers automatic deployment
- Preview deployments are created for pull requests
- Use branch protection rules in GitHub for production safety

### 8. Troubleshooting

#### Common Issues

**Build Failures**
- Check Node.js version compatibility
- Verify all dependencies are properly installed
- Review build logs in Vercel dashboard

**Environment Variables**
- Ensure all `VITE_` prefixed variables are set
- Check for typos in variable names
- Verify values are correctly formatted

**Wallet Connection Issues**
- Verify WalletConnect Project ID is correct
- Check RPC URL accessibility
- Ensure contract address is properly set

#### Debug Commands
```bash
# Local testing
npm run dev

# Build testing
npm run build
npm run preview

# Check environment variables
echo $VITE_CHAIN_ID
```

### 9. Security Considerations

#### Environment Variables
- Never commit sensitive keys to the repository
- Use Vercel's environment variable encryption
- Rotate API keys regularly

#### Content Security Policy
The application includes security headers configured in `vercel.json`:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block

### 10. Performance Optimization

#### Build Optimization
- Enable Vercel's automatic optimizations
- Use Vercel's Edge Functions for API routes
- Implement proper caching strategies

#### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist
```

## Deployment Checklist

- [ ] Vercel account created and connected to GitHub
- [ ] Project imported from GitHub repository
- [ ] Framework preset set to Vite
- [ ] Environment variables configured
- [ ] Build settings verified
- [ ] Initial deployment successful
- [ ] Smart contract deployed to Sepolia
- [ ] Contract address updated in environment variables
- [ ] Final deployment with contract integration
- [ ] Custom domain configured (if applicable)
- [ ] Performance monitoring set up

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Wagmi Documentation](https://wagmi.sh)
- [Zama FHE Documentation](https://docs.zama.ai)

## Contact

For deployment issues or questions:
- Create an issue in the GitHub repository
- Check Vercel's status page for service issues
- Review the application logs in Vercel dashboard
