import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import styles from "@/styles/Home.module.css";

BigNumber.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

interface PriceCalculatorProps {
  sqrtPriceX96: string;
  Decimal0: number;
  Decimal1: number;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ sqrtPriceX96, Decimal0, Decimal1 }) => {
  const [price0, setPrice0] = useState<string | null>(null);
  const [price1, setPrice1] = useState<string | null>(null);
  const [tick, setTick] = useState<number | null>(null);

  const sqrtPriceX96ToTick = (sqrtPriceX96Value: BigNumber): number => {
    const Q96 = new BigNumber(2).exponentiatedBy(96);
    // Convert sqrtPriceX96Value/Q96 to a standard number for logarithm calculation
    // Note: This may lead to precision loss for very large numbers
    const ratio = sqrtPriceX96Value.dividedBy(Q96).toNumber();
    const logValue = Math.log(ratio * ratio) / Math.log(1.0001);

    return Math.floor(logValue);
  };


  const calculatePrice = () => {
    try {
      const sqrtPriceX96BN = new BigNumber(sqrtPriceX96);
      const calculatedTick = sqrtPriceX96ToTick(sqrtPriceX96BN);
      setTick(calculatedTick);

      const price0 = sqrtPriceX96BN
        .dividedBy(new BigNumber(2).exponentiatedBy(96))
        .pow(2)
        .dividedBy(new BigNumber(10).pow(Decimal1 - Decimal0))
        .toFixed(Decimal1);

      const price1 = new BigNumber(1).dividedBy(new BigNumber(price0)).toFixed(Decimal0);

      setPrice0(price0);
      setPrice1(price1);
    } catch (error) {
      console.error('Error calculating price:', error);
      setPrice0(null);
      setPrice1(null);
      setTick(null);
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={calculatePrice}>Calculate Price</button>
      {price0 && price1 && tick !== null && (
        <div>
          <div className={`${styles.infoRow}`}>
            <span className={styles.infoLabel}>Calculated Tick:</span>
            <div className={styles.value}>{tick}</div>
          </div>
          <div className={`${styles.infoRow}`}>
            <span className={styles.infoLabel}>Price 0:</span>
            <div className={styles.value}>{price0}</div>
          </div>
          <div className={`${styles.infoRow}`}>
            <span className={styles.infoLabel}>Price 1:</span>
            <div className={styles.value}>{price1}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
