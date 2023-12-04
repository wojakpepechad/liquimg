import React, { useState } from 'react';
import BigNumber from 'bignumber.js';
import styles from "@/styles/Home.module.css";
import { BigNumberish } from 'ethers';

BigNumber.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

interface PriceCalculatorProps {
  sqrtPriceX96: string;
  Decimal0: number;
  Decimal1: number;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ sqrtPriceX96, Decimal0, Decimal1 }) => {
  const [calculatedPrice, setCalculatedPrice] = useState<string | null>(null);

  const calculatePrice = () => {
    try {
      const sqrtPriceX96BN = new BigNumber(sqrtPriceX96);
      const price0 = sqrtPriceX96BN
        .dividedBy(new BigNumber(2).exponentiatedBy(96))
        .pow(2)
        .dividedBy(new BigNumber(10).pow(Decimal1 - Decimal0))
        .toFixed(Decimal1);

      const price1 = new BigNumber(1).dividedBy(new BigNumber(price0)).toFixed(Decimal1);

      setCalculatedPrice(`Token 0 to Token 1: ${price0}, Token 1 to Token 0: ${price1}`);
    } catch (error) {
      console.error('Error calculating price:', error);
      setCalculatedPrice(null);
    }
  };

  return (
    <div>
      <button className={styles.button} onClick={calculatePrice}>Calculate Price</button>
      {calculatedPrice && (
        <div>
          <p>Calculated Prices: {calculatedPrice}</p>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
