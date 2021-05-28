import Web3 from 'web3';
const getWeb3 = async () => {
  let w3 = null;
  if (window.ethereum) {
    w3 = new Web3(window.ethereum);
    try {
      await window.ethereum.send('eth_requestAccounts');
    } catch (error) {
      console.error(error);
    }
  }
  window.ethereum.on('accountsChanged', function () {
    window.location.reload();
  })
  
  window.ethereum.on('networkChanged', function () {
    window.location.reload();
  })
  return w3;
};

export default getWeb3;