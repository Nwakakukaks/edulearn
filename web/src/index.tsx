import '@rainbow-me/rainbowkit/styles.css';

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "./global.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
  Chain,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { OCConnect } from '@opencampus/ocid-connect-js';

// Define Open Campus Codex Chain
const openCampusCodex: Chain = {
  id: 656476,
  name: "Open Campus Codex",
  rpcUrls: {
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    default: {
      name: "Codex Block Explorer",
      url: "https://explorer.open-campus-codex.gelato.digital",
    },
  },
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18,
  },
  testnet: true,
};

// Configure wagmi and RainbowKit
const wagmiConfig = getDefaultConfig({
  appName: "EduLang",
  projectId: "2c5136315963c8541beaca2234fedf25",
  chains: [openCampusCodex],
});

// Create QueryClient
const queryClient = new QueryClient();

// Create Chakra UI theme
const chakraTheme = extendTheme({
  styles: { global: { img: { maxWidth: "unset" } } },
});
const emotionCache = createCache({
  key: "emotion-cache",
  prepend: true,
});

// Application root
const container = document.getElementById("root");
const root = createRoot(container!);

const opts = {
  redirectUri: "http://localhost:8080/redirect",
};

root.render(
  <BrowserRouter>
    <CacheProvider value={emotionCache}>
      <ChakraProvider theme={chakraTheme}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <App />
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </CacheProvider>
  </BrowserRouter>
);
