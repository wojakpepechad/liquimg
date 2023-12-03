import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useAccount, useConnect, useContractRead } from 'wagmi';
import Link from 'next/link';
import { ABIWojak } from '../contracts/ABIS';
import { formatUnits, BigNumberish } from "ethers";
import UniswapV3Manager from '@/components/UniswapV3Manager';

export default function Home() {

	return (
		<>
			<Head>
				<title>Liquidity Manager</title>
				<meta
					name="description"
					content="Liquidity Manager for Uniswap V3"
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<header>
				<div className={styles.header}>
					<div className={styles.logoContainer}>
						<Image
							src="/logo.jfif"
							alt="DEXER Logo"
							height="60"  // Increased size for more prominence
							width="60"
						/>
						<div className={styles.logoTextContainer}>
							<h1 className={styles.logoTitle}>Liquidity Manager</h1>
							<p className={styles.logoSubtitle}>for Uniswap v3</p>
						</div>
					</div>
					<div className={styles.buttons}>
						<w3m-network-button />
						<w3m-button />
					</div>
				</div>
			</header>
			<main className={styles.main}>
				<div className={styles.spacer} /> {/* New spacer element */}
				<UniswapV3Manager />

				<div className={styles.spacer} /> {/* New spacer element */}



				<footer className={styles.footer}>
					<a href="https://twitter.com/ogpeperc20" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Twitter</a>
					<a href="https://t.me/OgPeperc20" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Telegram</a>
					<a href="https://www.dextools.io/app/es/ether/pair-explorer/0xa84181f223a042949e9040e42b44c50021802db6" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Dextools</a>
					<a href="https://app.uniswap.org/#/swap?outputCurrency=0x4dFae3690b93c47470b03036A17B23C1Be05127C" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Uniswap</a>
					<a href="https://the-og-pepe.medium.com/" target="_blank" rel="noopener noreferrer" className={styles.footerLink}>Medium</a>
				</footer>
			</main>
		</>
	);
}
