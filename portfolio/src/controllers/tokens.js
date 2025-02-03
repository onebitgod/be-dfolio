import ether from 'ethers';

export const getWalletData = async (req, res) => {
  const { address } = req.params;

  const provider = new ethers.JsonRpcProvider(process.env.RPC_1);

  const ERC20_ABI = [
    'function balanceOf(address owner) view returns (uint256)',
  ];

  try {
    const contract = new ethers.Contract(
      '0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0',
      ERC20_ABI,
      provider
    );
    const balance = await contract.balanceOf(address);

    // Convert balance from Wei to MATIC
    console.log(`MATIC Balance: ${ethers.formatUnits(balance, 18)} MATIC`);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }

  sendResponse(res, 200, 'success');
};
