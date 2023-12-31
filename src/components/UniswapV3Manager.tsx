import React, { useState, useEffect } from 'react';
import { useContractWrite, useContractRead, useContractReads, useAccount, useConnect, usePrepareContractWrite, } from 'wagmi';
import { ethers } from 'ethers';
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { ABIWojak, ABILiquidityController, ABIINonfungiblePositionManager, ABIFactory, ABIPoolv3 } from '../contracts/ABIS';
import { formatUnits, BigNumberish } from "ethers";
import { Pool, Position, NonfungiblePositionManager } from '@uniswap/v3-sdk';
import { Token, CurrencyAmount, Price, TradeType } from '@uniswap/sdk-core';
import UserLiquidity from './UserLiquidity';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure
} from "@nextui-org/react";
import PriceCalculator from './PriceCalculator';

const UniswapV3Manager = () => {
  // State for user's positions and other relevant data
  const [loading, setLoading] = useState(false);
  const [fail, setFail] = useState('');

  const { connector: activeConnector, isConnected, address } = useAccount()
  const { connect, connectors, error, pendingConnector } = useConnect()

  const [totalSupply, setTotalSupply] = useState(0);
  const [lowerTick, setLowerTick] = useState('53580');
  const [upperTick, setUpperTick] = useState('59460');
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');
  const [amount0Min, setAmount0Min] = useState('0');
  const [amount1Min, setAmount1Min] = useState('0');
  const [fee, setFee] = useState('3000');
  const [poolResult, setPoolResult] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [logText, setLogText] = useState('');

  // Define your token constants
  const tokenAAddress = '0x471EcE3750Da237f93B8E339c536989b8978a438'; // Replace with your TokenA address
  const tokenBAddress = '0x765DE816845861e75A25fCA122bb6898B8B1282a'; // Replace with your TokenB address
  const tokenADecimals = 18; // Replace with your TokenA decimals
  const tokenBDecimals = 18; // Replace with your TokenB decimals
  const chainId = 42220; // Replace with the chainId for your tokens
  const [sqrtPriceX96, setSqrtPriceX96] = useState<string>('');
  const Decimal0 = 18; // Decimal places for token 0
  const Decimal1 = 18; // Decimal places for token 1

  // Function to handle changes in the input field
  const handleSqrtPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSqrtPriceX96(event.target.value);
  };


  const amount0Desired = '0'; // Replace with the amount of Token0 desired
  const amount1Desired = '99999999999999999996'; // Replace with the amount of Token1 desired
  // const amount0Min = 0; // Replace with the minimum amount of Token0
  // const amount1Min = 99999999999999999999996;
  const [tokenAAllowance, setTokenAAllowance] = useState(0);
  const [tokenBAllowance, setTokenBAllowance] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();



  const [userBalance, setUserBalance] = useState<number>(0);
  // Fetch user balance
  const userBalanceResult = useContractRead({
    address: "0xB62c22347cb7335f6aE02EbA4D2e4e086ab0b883",
    abi: ABIWojak,
    functionName: 'balanceOf',
    args: [address],
  });

  useEffect(() => {
    if (userBalanceResult.data) {
      const formattedUserBalance = parseFloat(formatUnits(userBalanceResult.data.toString(), 'ether'));
      setUserBalance(formattedUserBalance);
    }
  }, [userBalanceResult.data]);

  // TokenSupplyComponent - Fetch and set total supply
  const totalSupplyResult = useContractRead({
    address: "0xB62c22347cb7335f6aE02EbA4D2e4e086ab0b883",
    abi: ABIWojak,
    functionName: 'totalSupply',
  });

  useEffect(() => {
    if (totalSupplyResult.data) {
      const formattedTotalSupply = parseFloat(formatUnits(totalSupplyResult.data.toString(), 'ether'));
      setTotalSupply(formattedTotalSupply);
    }
  }, [totalSupplyResult.data]);


  // Use useContractRead to fetch pool data
  const getPoolResult = useContractRead({
    address: "0xAfE208a311B21f13EF87E33A90049fC17A7acDEc",
    abi: ABIFactory,
    functionName: 'getPool',
    args: [tokenAAddress, tokenBAddress, fee] // Assuming these are the arguments for getPool
  });

  useEffect(() => {
    // Check if getPoolResult.data is defined and is a string
    if (getPoolResult.data && typeof getPoolResult.data === 'string') {
      console.log("Pool address:", getPoolResult.data);
      setPoolResult(getPoolResult.data);
    } else {
      // Handle the case where getPoolResult.data is not a string
      console.log("Pool data is not available or not a string:", getPoolResult.data);
      // Optionally set a default value or handle the error as required
      setPoolResult(''); // Setting to an empty string or another default value
    }
  }, [getPoolResult.data]);

  const poolAddress = poolResult as `0x${string}`;


  const poolDataResult = useContractRead({
    address: poolAddress,
    abi: ABIPoolv3,
    functionName: 'slot0', // Replace with the function you want to call
    // args: [], // Include this if the function requires arguments
  });

  const [formattedPoolData, setFormattedPoolData] = useState<Slot0Response | null>(null);

  interface Slot0Response {
    sqrtPriceX96: BigNumberish;
    tick: number;
    observationIndex: number;
    observationCardinality: number;
    observationCardinalityNext: number;
    feeProtocol: number;
    unlocked: boolean;
  }

  const processPoolData = (data: any): Slot0Response | null => {
    if (Array.isArray(data) && data.length === 7) {
      const [
        sqrtPriceX96,
        tick,
        observationIndex,
        observationCardinality,
        observationCardinalityNext,
        feeProtocol,
        unlocked
      ] = data;

      return {
        sqrtPriceX96: BigInt(sqrtPriceX96),
        tick,
        observationIndex,
        observationCardinality,
        observationCardinalityNext,
        feeProtocol,
        unlocked
      };
    } else {
      console.error('Invalid slot0 data structure:', data);
      return null;
    }
  };



  useEffect(() => {
    if (poolDataResult.data) {
      const processedData = processPoolData(poolDataResult.data);
      if (processedData) {
        setFormattedPoolData(processedData);
      }
    }
  }, [poolDataResult.data, processPoolData]); // Include processPoolData as a dependency



  function TokenBalanceComponent() {
    const { data, isError, isLoading } = useContractRead({
      address: "0xB62c22347cb7335f6aE02EbA4D2e4e086ab0b883", // Your contract's address
      abi: ABIWojak, // Your contract's ABI
      functionName: 'balanceOf', // Replace with your contract's relevant function
      args: [address], // Arguments for the function call
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading balance</div>;

    // Assuming the balance is returned as a BigNumber, convert it as needed
    const balanceInWei = data || 0;
    const formattedBalance: string = formatUnits(balanceInWei.toString(), 'ether');

    return (
      <div>
        Token A Balance: {parseFloat(formattedBalance).toFixed(3)}
      </div>
    );
  }


  const LIQUIDITY_CONTROLLER_ADDRESS = "0x8dA740364cCa222EB2fA9100D6CA9EdA8c5152CA"; // Replace with your contract address
  // Fetch allowance for tokenA
  const tokenAResult = useContractRead({
    address: tokenAAddress,
    abi: ABIWojak, // Replace with the ABI of tokenA
    functionName: 'allowance',
    args: [address, LIQUIDITY_CONTROLLER_ADDRESS],
  });

  // Fetch allowance for tokenB
  const tokenBResult = useContractRead({
    address: tokenBAddress,
    abi: ABIWojak, // Replace with the ABI of tokenB
    functionName: 'allowance',
    args: [address, LIQUIDITY_CONTROLLER_ADDRESS],
  });

  // Update tokenA allowance
  useEffect(() => {
    if (tokenAResult.data) {
      const formattedAllowance = parseFloat(formatUnits(tokenAResult.data.toString(), 'ether'));
      setTokenAAllowance(formattedAllowance);
    }
  }, [tokenAResult.data]);

  // Update tokenB allowance
  useEffect(() => {
    if (tokenBResult.data) {
      const formattedAllowance = parseFloat(formatUnits(tokenBResult.data.toString(), 'ether'));
      setTokenBAllowance(formattedAllowance);
    }
  }, [tokenBResult.data]);


  const INonfungiblePositionManagerAddress = "0x3d79EdAaBC0EaB6F08ED885C05Fc0B014290D95A";


  const mintParams = {
    // Replace these values with the actual parameters for your mint function
    token0: '0x471EcE3750Da237f93B8E339c536989b8978a438',
    token1: '0xB62c22347cb7335f6aE02EbA4D2e4e086ab0b883',
    fee: 3000,
    tickLower: 53580,
    tickUpper: 59460,
    amount0Desired: amount0,
    amount1Desired: amount1,
    amount0Min: amount0Min,
    amount1Min: amount1Min,
    recipient: '0x5E118C112300DE181CC3aBc65846a4FC2C21Ab95',
    deadline: Math.floor(Date.now() / 1000) + 3600, // Deadline 1 hour from now
  };

  // Prepare mintParams for the mint function in the Nonfungible Position Manager
  const { config: mintConfig } = usePrepareContractWrite({
    address: INonfungiblePositionManagerAddress,
    abi: ABIINonfungiblePositionManager,
    functionName: 'mint',
    args: [mintParams],
  });

  // Contract write hook for the mint function in the Nonfungible Position Manager
  const { write: mint, isLoading: isMintLoading } = useContractWrite(mintConfig);

  // Prepare mintParams for the mintNewPosition function in the Liquidity Controller
  const mintParamsController = {
    _lowerTick: lowerTick,
    _upperTick: upperTick,
    amount0ToMint: amount0,
    amount1ToMint: amount1,
    amount0ToMintMin: amount0Min,
    amount1ToMintMin: amount1Min,
  };

  const { config: mintNewPositionConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'mintNewPosition',
    args: [mintParamsController._lowerTick, mintParamsController._upperTick, mintParamsController.amount0ToMint, mintParamsController.amount1ToMint, mintParamsController.amount0ToMintMin, mintParamsController.amount1ToMintMin],
  });

  // Contract write hook for the mintNewPosition function in the Liquidity Controller
  const { write: mintNewPosition } = useContractWrite(mintNewPositionConfig);

  const handleMint = () => {
    if (mint) {  // Check if the function is defined
      mint();
      console.log('Minting => Manager...' + mintParams);

    } else {
      // Handle the case where mint is not available
      console.error('Mint function is not available');
    }
  };

  const handleMintNewPosition = () => {
    if (mintNewPosition) {  // Check if the function is defined
      mintNewPosition();
      console.log('Minting => Controller...' + mintParamsController);

    } else {
      // Handle the case where mint is not available
      console.error('mintNewPosition function is not available' + mintParamsController);
    }
  };


  // Prepare Contract Write Configurations
  const { config: retrieveNFTConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'retrieveNFT',
    args: [tokenId],
  });

  const { config: withdrawConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'withdraw',
  });

  const { config: fundContractConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'fundContract',
    args: [amount0Desired, amount1Desired],
  });

  const { config: collectAllFeesConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'collectAllFees',
    args: [tokenId],
  });

  const [decreaseLiquidityAmount, setDecreaseLiquidity] = useState('');


  const { config: decreaseLiquidityConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'decreaseLiquidity',
    args: [tokenId, decreaseLiquidityAmount, amount0, amount1],
  });

  const { config: decreaseLoopLiquidityConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'loopDecrease',
    args: [tokenId, decreaseLiquidityAmount, amount0, amount1],
  });

  const { config: increaseLiquidityCurrentRangeConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'increaseLiquidityCurrentRange',
    args: [tokenId, amount0Desired, amount1Desired, amount0Min, amount1Min],
  });

  const { config: increaseLoopLiquidityConfig } = usePrepareContractWrite({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'loopIncrease',
    args: [tokenId, decreaseLiquidityAmount, amount0, amount1],
  });


  // Contract Write Hooks
  const { write: retrieveNFT } = useContractWrite(retrieveNFTConfig);
  const { write: withdraw } = useContractWrite(withdrawConfig);
  const { write: fundContract } = useContractWrite(fundContractConfig);
  const { write: collectAllFees } = useContractWrite(collectAllFeesConfig);
  const { write: decreaseLiquidity } = useContractWrite(decreaseLiquidityConfig);
  const { write: decreaseLoopLiquidity } = useContractWrite(decreaseLoopLiquidityConfig);
  const { write: increaseLiquidityCurrentRange } = useContractWrite(increaseLiquidityCurrentRangeConfig);
  const { write: increaseLoopLiquidity } = useContractWrite(increaseLoopLiquidityConfig);

  // Handler Functions
  const handleRetrieveNFT = () => {
    if (retrieveNFT) {
      retrieveNFT();
    } else {
      console.error('retrieveNFT function is not available');
    }
  };

  const handleWithdraw = () => {
    if (withdraw) {
      withdraw();
    } else {
      console.error('withdraw function is not available');
    }
  };

  const handleFundContract = () => {
    if (fundContract) {
      fundContract();
    } else {
      console.error('fundContract function is not available');
    }
  };

  const handleCollectAllFees = () => {
    if (collectAllFees) {
      collectAllFees();
    } else {
      console.error('collectAllFees function is not available');
    }
  };

  const handleDecreaseLiquidity = () => {
    if (decreaseLiquidity) {
      decreaseLiquidity();
    } else {
      console.error('decreaseLiquidity function is not available');
    }
  };

  const handleIncreaseLiquidityCurrentRange = () => {
    if (increaseLiquidityCurrentRange) {
      increaseLiquidityCurrentRange();
    } else {
      console.error('increaseLiquidityCurrentRange function is not available');
    }
  };



  // Define the maximum allowance value (2^256 - 1)
  const maxAllowance = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
  // Prepare contract write configuration for tokenA
  const { config: approveTokenAConfig } = usePrepareContractWrite({
    address: tokenAAddress,
    abi: ABIWojak, // Replace with the ABI of tokenA
    functionName: 'approve',
    args: [LIQUIDITY_CONTROLLER_ADDRESS, maxAllowance],
  });


  // Contract write hook for approving tokenA
  const { write: approveTokenA, isLoading: isApprovingTokenA } = useContractWrite(approveTokenAConfig);

  // Prepare contract write configuration for tokenB
  const { config: approveTokenBConfig } = usePrepareContractWrite({
    address: tokenBAddress,
    abi: ABIWojak, // Replace with the ABI of tokenB
    functionName: 'approve',
    args: [LIQUIDITY_CONTROLLER_ADDRESS, maxAllowance],
  });

  // Contract write hook for approving tokenB
  const { write: approveTokenB, isLoading: isApprovingTokenB } = useContractWrite(approveTokenBConfig);


  // Fetch allowance for tokenB
  const positionsResult = useContractRead({
    address: tokenBAddress,
    abi: ABIINonfungiblePositionManager, // Replace with the ABI of tokenB
    functionName: 'getAllTokenIds',
    args: [address, LIQUIDITY_CONTROLLER_ADDRESS],
  });

  const [positionsBalance, setPositionsBalance] = useState(0);

  const [positionTokenId, setPositionTokenId] = useState(0);
  //get position by id info
  const positionDataResult = useContractRead({
    address: INonfungiblePositionManagerAddress,
    abi: ABIINonfungiblePositionManager, // Replace with the ABI of tokenB
    functionName: 'positions',
    args: [positionTokenId],
  });

  // Define the structure of your position data
  interface PositionResponse {
    nonce: number;
    operator: string;
    token0: string;
    token1: string;
    fee: number;
    tickLower: number;
    tickUpper: number;
    liquidity: BigNumberish;
    feeGrowthInside0LastX128: BigNumberish;
    feeGrowthInside1LastX128: BigNumberish;
    tokensOwed0: BigNumberish;
    tokensOwed1: BigNumberish;
  }

  // Create a function to process the position data
  const processPositionData = (data: any): PositionResponse | null => {
    if (Array.isArray(data) && data.length === 12) {
      const [
        nonce,
        operator,
        token0,
        token1,
        fee,
        tickLower,
        tickUpper,
        liquidity,
        feeGrowthInside0LastX128,
        feeGrowthInside1LastX128,
        tokensOwed0,
        tokensOwed1,
      ] = data;

      return {
        nonce: Number(nonce),
        operator,
        token0,
        token1,
        fee: Number(fee),
        tickLower: Number(tickLower),
        tickUpper: Number(tickUpper),
        liquidity: Number(liquidity),
        feeGrowthInside0LastX128: Number(feeGrowthInside0LastX128),
        feeGrowthInside1LastX128: Number(feeGrowthInside1LastX128),
        tokensOwed0: Number(tokensOwed0),
        tokensOwed1: Number(tokensOwed1),
      };
    } else {
      console.error('Invalid position data structure:', data);
      return null;
    }
  };

  // Use useEffect to process and set the position data when it's available
  const [formattedPositionData, setFormattedPositionData] = useState<PositionResponse | null>(
    null
  );

  useEffect(() => {
    if (positionDataResult.data) {
      const processedData = processPositionData(positionDataResult.data);
      if (processedData) {
        setFormattedPositionData(processedData);
      }
    }
  }, [positionDataResult.data]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (tokenId: number) => {
    setPositionTokenId(tokenId); // Set the selected position ID
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [positions, setPositions] = useState<string[]>([]); // An array of strings

  const { data: tokenIdsData } = useContractRead({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'getAllTokenIds',
    args: [address],
  });

  useEffect(() => {
    if (tokenIdsData && Array.isArray(tokenIdsData)) {
      const ids = tokenIdsData.map((tokenId: BigNumberish) => tokenId.toString());
      setPositions(ids);
    }
  }, [tokenIdsData]);


  const [positionsController, setPositionsController] = useState<string[]>([]); // An array of strings

  const { data: tokenIdsDataController } = useContractRead({
    address: LIQUIDITY_CONTROLLER_ADDRESS,
    abi: ABILiquidityController,
    functionName: 'getAllTokenIds',
    args: [LIQUIDITY_CONTROLLER_ADDRESS],
  });

  useEffect(() => {
    if (tokenIdsDataController && Array.isArray(tokenIdsDataController)) {
      const ids = tokenIdsDataController.map((tokenId: BigNumberish) => tokenId.toString());
      setPositionsController(ids);
    }
  }, [tokenIdsDataController]);




  const openModalWithPositionId = (positionId: number) => {
    setPositionTokenId(positionId);
    //onOpen();
  };

  const PositionInfo = () => {
    if (formattedPositionData) {
      return (
        <div>
          <h2>Position Information</h2>
          <p>=======</p>
          <p>Nonce: {formattedPositionData.nonce}</p>
          <p>Operator: {formattedPositionData.operator}</p>
          <p>Token0: {formattedPositionData.token0}</p>
          <p>Token1: {formattedPositionData.token1}</p>
          <p>Fee: {formattedPositionData.fee}</p>
          <p>Lower Tick: {formattedPositionData.tickLower}</p>
          <p>Upper Tick: {formattedPositionData.tickUpper}</p>
          <p>Liquidity: {formattedPositionData.liquidity.toString()}</p>
          <p>Fee Growth Inside 0 (Last X128): {formattedPositionData.feeGrowthInside0LastX128.toString()}</p>
          <p>Fee Growth Inside 1 (Last X128): {formattedPositionData.feeGrowthInside1LastX128.toString()}</p>
          <p>Tokens Owed 0: {formattedPositionData.tokensOwed0.toString()}</p>
          <p>Tokens Owed 1: {formattedPositionData.tokensOwed1.toString()}</p>
        </div>
      );
    } else {
      return <p>No position data available</p>;
    }
  };

  const PoolInfo = () => {
    if (formattedPoolData) {
      return (
        <div>
          <h2>Pool Information</h2>
          <p>=======</p>
          <p>Square Root Price X96: {formattedPoolData.sqrtPriceX96.toString()}</p>
          <p>Tick: {formattedPoolData.tick}</p>
          <p>Observation Index: {formattedPoolData.observationIndex}</p>
          <p>Observation Cardinality: {formattedPoolData.observationCardinality}</p>
          <p>Observation Cardinality Next: {formattedPoolData.observationCardinalityNext}</p>
          <p>Fee Protocol: {formattedPoolData.feeProtocol}</p>
          <p>Unlocked: {formattedPoolData.unlocked ? 'Yes' : 'No'}</p>
        </div>
      );
    } else {
      return <p>No pool data available</p>;
    }
  };

  const Positions = () => {
    if (positions) {
      return (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div className={styles.positionList}>
                {loading && <p className={styles.loading}>Loading...</p>}
                {error && <p className={styles.error}>Error: {fail}</p>}
                <div>
                  <h2>Positions User</h2>
                  {positions.map((position, index) => (
                    <Button
                      key={index}
                      onClick={() => openModalWithPositionId(parseInt(position))}
                      className={styles.position}
                    >
                      {/* Render position details */}
                      <p>Position {index + 1}: {JSON.stringify(position)}</p>
                    </Button>
                  ))}
                </div>
                <div>
                  <h2>Positions Controller</h2>
                  {positionsController.map((position, index) => (
                    <Button
                      key={index}
                      onClick={() => openModalWithPositionId(parseInt(position))}
                      className={styles.position}
                    >
                      {/* Render position details */}
                      <p>Position {index + 1}: {JSON.stringify(position)}</p>
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalContent>
                <ModalHeader>Position Details</ModalHeader>
                <ModalBody>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onClick={onClose}>
                    Close
                  </Button>
                  {/* Add other modal buttons as needed */}
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      );
    } else {
      return <p>No pool data available</p>;
    }
  };

  const Info = () => {
    if (formattedPoolData) {
      return (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.container}>

              <div>
                {/* Render your formatted pool data here */}
                {formattedPoolData ? (
                  <div>
                    <span className={styles.infoLabel}>Pool Result:</span>
                    <div className={styles.value}>
                      {poolResult && (
                        <a
                          href={`https://celoscan.io/address/${poolResult}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {poolResult}
                        </a>
                      )}
                    </div>

                    <span className={styles.infoLabel}>Token0 Address:</span>
                    <div className={styles.value}>
                      {formattedPositionData && (
                        <a
                          href={`https://celoscan.io/address/${formattedPositionData.token0}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formattedPositionData.token0}
                        </a>
                      )}
                    </div>

                    <span className={styles.infoLabel}>Token1 Address:</span>
                    <div className={styles.value}>
                      {formattedPositionData && (
                        <a
                          href={`https://celoscan.io/address/${formattedPositionData.token1}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {formattedPositionData.token1}
                        </a>
                      )}
                    </div>

                    <span className={styles.infoLabel}>Liquidity Controller:</span>
                    <div className={styles.value}>
                      {LIQUIDITY_CONTROLLER_ADDRESS && (
                        <a
                          href={`https://celoscan.io/address/${LIQUIDITY_CONTROLLER_ADDRESS}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {LIQUIDITY_CONTROLLER_ADDRESS}
                        </a>
                      )}
                    </div>

                    <span className={styles.infoLabel}>PositionManager Address:</span>
                    <div className={styles.value}>
                      {INonfungiblePositionManagerAddress && (
                        <a
                          href={`https://celoscan.io/address/${INonfungiblePositionManagerAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {INonfungiblePositionManagerAddress}
                        </a>
                      )}
                    </div>

                    Formatted Pool Data:
                    <pre className={styles.logCode}>
                      {PoolInfo()}
                    </pre>
                    <pre className={styles.logCode}>
                      {PositionInfo()}
                    </pre>
                    <div>
                      {/* Input field to set sqrtPriceX96 */}
                      <div>
                        <div className={styles.spacer} />

                        <span className={styles.infoLabel}>sqrtPriceX96:</span>
                        <input
                          type="text"
                          id="sqrtPriceX96"
                          value={sqrtPriceX96}
                          onChange={handleSqrtPriceChange}
                          className={styles.inputField}
                        />
                      </div>

                      {/* Use the PriceCalculator component and pass the required props */}
                      <PriceCalculator sqrtPriceX96={sqrtPriceX96} Decimal0={Decimal0} Decimal1={Decimal1} />
                    </div>
                  </div>
                ) : (
                  <p>Loading pool data...</p>
                )}
              </div>
            </div>
          </div>

        </div>
      );
    } else {
      return <p>No pool data available</p>;
    }
  };

  const UserInfo = () => {
    if (formattedPoolData) {
      return (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.container}>

              <div className={styles.content}>
                <h2 className={styles.blockchainInfo}>Blockchain Info</h2>
                <div className={`${styles.infoRow} ${styles.balanceRow}`}>
                  <span className={styles.infoLabel}>Balance:</span>
                  <div className={styles.value}>{userBalance.toFixed(2)} Token A</div>
                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>Total Supply:</span>
                  <div className={styles.value}>{totalSupply.toFixed(2)}</div>
                </div>
                <h2 className={styles.blockchainInfo}>Allowances to LiquidityController:</h2>


                <a href={`https://celoscan.io/address/${LIQUIDITY_CONTROLLER_ADDRESS}`} target="_blank" rel="noopener noreferrer">
                  {LIQUIDITY_CONTROLLER_ADDRESS}
                </a>
                <div className={`${styles.infoRow} ${styles.balanceRow}`}>
                  <span className={styles.infoLabel}>TokenA Allowance:</span>
                  <div className={styles.value}>{tokenAAllowance}</div>
                  <button className={styles.button} onClick={approveTokenA} disabled={isApprovingTokenA}>Approve Token A</button>

                </div>
                <div className={styles.infoRow}>
                  <span className={styles.infoLabel}>TokenB Allowance:</span>
                  <div className={styles.value}>{tokenBAllowance}</div>
                  <button className={styles.button} onClick={approveTokenB} disabled={isApprovingTokenB}>Approve Token B</button>

                </div>
              </div>

            </div>

          </div>

        </div>
      );
    } else {
      return <p>No pool data available</p>;
    }
  };

  const Mint = () => {
    if (formattedPoolData) {
      return (
        <div>
          <div className={styles.wrapper}>
            <div className={styles.container}>
              <div>
                <h3>2. Mint</h3>
                {/* Buttons related to Mint */}
                <button className={styles.button} onClick={handleMint} disabled={isMintLoading}>Mint in Position Manager</button>
                <button className={styles.button} onClick={handleMintNewPosition}>Mint in Controller</button>
                {/* Add other buttons related to Mint */}
              </div>
              {/* Label for lower tick input */}
              <label htmlFor="lowerTick" className={styles.label}>
                Enter lower tick
              </label>
              <input
                type="number"
                id="lowerTick"
                value={lowerTick}
                onChange={(e) => setLowerTick(e.target.value)}
                placeholder="Enter lower tick"
                className={styles.inputField}
              />

              {/* Label for upper tick input */}
              <label htmlFor="upperTick" className={styles.label}>
                Enter upper tick
              </label>
              <input
                type="number"
                id="upperTick"
                value={upperTick}
                onChange={(e) => setUpperTick(e.target.value)}
                placeholder="Enter upper tick"
                className={styles.inputField}
              />

              {/* Label for amount0ToMint input */}
              <label htmlFor="amount0" className={styles.label}>
                Enter amount for Token 0
              </label>
              <input
                type="number"
                id="amount0"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
                placeholder="Enter amount for Token 0"
                className={styles.inputField}
              />

              {/* Label for amount1ToMint input */}
              <label htmlFor="amount1" className={styles.label}>
                Enter amount for Token 1
              </label>
              <input
                type="number"
                id="amount1"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
                placeholder="Enter amount for Token 1"
                className={styles.inputField}
              />

              {/* Label for amount0ToMint input */}
              <label htmlFor="amount0" className={styles.label}>
                Enter amount for Token 0 Min
              </label>
              <input
                type="number"
                id="amount0Min"
                value={amount0Min}
                onChange={(e) => setAmount0Min(e.target.value)}
                placeholder="Enter amount for Token 0 Min"
                className={styles.inputField}
              />

              {/* Label for amount1ToMint input */}
              <label htmlFor="amount1" className={styles.label}>
                Enter amount for Token 1 Min
              </label>
              <input
                type="number"
                id="amount1Min"
                value={amount1Min}
                onChange={(e) => setAmount1Min(e.target.value)}
                placeholder="Enter amount for Token 1 Min"
                className={styles.inputField}
              />

              {/* Spacer */}
              <div className={styles.spacer} />
              <button className={styles.button} onClick={handleIncreaseLiquidityCurrentRange}>Increase Liquidity Current Range</button>

              {/* Label for Token ID input */}
              <label htmlFor="tokenId" className={styles.label}>
                Enter Token ID
              </label>
              <input
                type="text"
                id="tokenId"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                placeholder="Enter Token ID"
                className={styles.inputField}
              />

              <button className={styles.button} onClick={handleCollectAllFees}>Collect All Fees</button>
              <button className={styles.button} onClick={handleRetrieveNFT}>Retrieve NFT</button>
              <div className={styles.spacer} />

              <label htmlFor="tokenId" className={styles.label}>
                Decrease Liquidity
              </label>
              <input
                type="number"
                id="decreaseLiquidityAmount"
                value={decreaseLiquidityAmount}
                onChange={(e) => setDecreaseLiquidity(e.target.value)}
                placeholder="Enter decreaseLiquidityAmount"
                className={styles.inputField}
              />
              <button className={styles.button} onClick={handleDecreaseLiquidity}>Decrease Liquidity</button>
            </div>
          </div>

        </div>
      );
    } else {
      return <p>No pool data available</p>;
    }
  };

  return (
    <div className={styles.dapp}>
      <h2 className={styles.heading}>Uniswap V3 Positions Manager</h2>
      <div className={styles.dapp}>
        {isConnected ? (<><div>
        </div>
        <UserInfo />
        <Info />
        <Positions />
        <Mint />
          <div className={styles.wrapperliquidity}>

            <div className={styles.liquidity}><UserLiquidity />
            </div>
          </div>
        </>
        ) : (
          <div className={styles.content}>
            <h2 className={styles.connectInfo}>Connect to Blockchain</h2>
            <p className={styles.connectInfoText}>Please connect to view blockchain information.</p>
            {/* Render connect button or logic */}
          </div>
        )}

      </div>
    </div>
  );
};

export default UniswapV3Manager;
