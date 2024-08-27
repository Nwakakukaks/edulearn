import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import "./global.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi";
import { Chain } from "viem/chains";
import { ContractProvider } from "./ContractContext";
import WagmiProvider from "./wagmiProvider";
import { OCConnect } from "@opencampus/ocid-connect-js";

import("buffer").then(({ Buffer }) => {
  window.Buffer = Buffer;
});

const projectId = "2c5136315963c8541beaca2234fedf25";

// Define Open Campus Codex Chain
const openCampusCodex: Chain = {
  id: 656476,
  name: "Open Campus Codex",
  rpcUrls: {
    default: { http: ['https://rpc.open-campus-codex.gelato.digital'] },
  },
  blockExplorers: {
    default: {
      name: "Codex Block Explorer",
      url: "https://explorer.open-campus-codex.gelato.digital"
    }
  },
  nativeCurrency: {
    name: "EDU",
    symbol: "EDU",
    decimals: 18
  },
  testnet: true,
};

// Create wagmiConfig
const metadata = {
  name: "Edulearn",
  description: "Edulearn built with love by Team3",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains: [Chain, ...Chain[]] = [openCampusCodex];
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// Create modal
createWeb3Modal({ wagmiConfig, projectId });

const chakraTheme = extendTheme({
  styles: { global: { img: { maxWidth: "unset" } } },
});
const emotionCache = createCache({
  key: "emotion-cache",
  prepend: true,
});

const container = document.getElementById("root");
const root = createRoot(container!);

const opts = {
  redirectUri: "http://localhost:8080/redirect",
};

root.render(
  <BrowserRouter>
    <OCConnect opts={opts} sandboxMode={true}>
      <ContractProvider>
        <CacheProvider value={emotionCache}>
          <ChakraProvider theme={chakraTheme}>
            <WagmiProvider>
              <App />
            </WagmiProvider>
          </ChakraProvider>
        </CacheProvider>
      </ContractProvider>
    </OCConnect>
  </BrowserRouter>
);

reportWebVitals();
