import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { NextUIProvider } from '@nextui-org/react';

import { WagmiConfig } from "wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import {
	arbitrum,
	avalanche,
	bsc,
	fantom,
	gnosis,
	mainnet,
	optimism,
	polygon,
	celo
} from "wagmi/chains";

const chains = [
	mainnet,
	celo,
	polygon,
	bsc,
	/*avalanche,
	arbitrum,
	optimism,
	gnosis,
	fantom,*/
];

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";

const metadata = {
	name: "Positions Manager",
	description: "The UNI v3 Liquidity Manager",
	url: "https://ogpepe.io",
	icons: ["https://ogpepe.io/logo.png"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }: AppProps) {
	const [ready, setReady] = useState(false);

	useEffect(() => {
		setReady(true);
	}, []);
	return (
		<>
			{ready ? (
				<WagmiConfig config={wagmiConfig}>
					<NextUIProvider>
						<Component {...pageProps} />
					</NextUIProvider>
				</WagmiConfig>
			) : null}
		</>
	);
}
