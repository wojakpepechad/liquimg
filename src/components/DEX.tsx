import React from 'react';
import { SwapWidget } from '@uniswap/widgets';
import '@uniswap/widgets/fonts.css';
import { MY_TOKEN_LIST } from '../utils/constants';
import styles from "@/styles/DEX.module.css";


const DextChartV3 = () => {
    return (
        <div>
            <h2>V3 Chart</h2>
            <iframe
                id="dextools-widget-v3"
                title="DEXTools Trading Chart V3"
                width="800"
                height="600"
                src="https://www.dextools.io/widget-chart/es/celo/pe-light/0x6b47e002a4ccfec5bb7dbb69da8603738ed4845b?theme=light&chartType=1&chartResolution=30&drawingToolbars=false"
            ></iframe>
        </div>
    );
};


export const DEX = () => {
    return (
        <div className={styles.dexContainer}>
            <h2 className={styles.dexHeading}>COOL DEX</h2>
            <div className={styles.chartSwapperContainer}>
                <DextChartV3 />
            </div>
        </div>
    );
};
export default DEX;