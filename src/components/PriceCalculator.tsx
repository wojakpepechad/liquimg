import React, { useState } from 'react';
import bn from 'bignumber.js';

// Configure bignumber.js to handle precision
bn.config({ EXPONENTIAL_AT: 999999, DECIMAL_PLACES: 40 });

interface PriceCalculatorProps {
  sqrtPriceX96: string;
  Decimal0: number;
  Decimal1: number;
}

const PriceCalculator: React.FC<PriceCalculatorProps> = ({ sqrtPriceX96, Decimal0, Decimal1 }) => {
  const [calculatedPrice, setCalculatedPrice] = useState<string | null>(null);

  const calculatePrice = () => {
    const sqrtPriceX96BN = new bn(sqrtPriceX96);
    const price = sqrtPriceX96BN
      .dividedBy(new bn(2).exponentiatedBy(96)) // Divide by 2^96
      .multipliedBy(new bn(10).exponentiatedBy(Decimal0 - Decimal1)) // Adjust for decimals
      .toFixed(2); // Set the desired decimal places to 2

    setCalculatedPrice(price);
  };

  return (
    <div>
      <button onClick={calculatePrice}>Calculate Price</button>
      {calculatedPrice !== null && (
        <div>
          <p>Calculated Price (Token 0 to Token 1): {calculatedPrice}</p>
          <p>Calculated Price (Token 1 to Token 0): {1 / parseFloat(calculatedPrice)}</p>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
