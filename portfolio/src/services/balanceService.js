import { ERC20_ABI } from '../utils/constants.js';
import { ethers } from 'ethers';

export const getBalance = async (address, rpc, contract) => {
  const provider = new ethers.JsonRpcProvider(rpc);

  let balance = 0;

  try {
    if (ethers.ZeroAddress === contract || !contract)
      balance = await provider.getBalance(address);
    else {
      const ethContract = new ethers.Contract(contract, ERC20_ABI, provider);
      balance = await ethContract.balanceOf(address);
    }

    console.log(`MATIC Balance: ${ethers.formatUnits(balance, 18)} MATIC`);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};
