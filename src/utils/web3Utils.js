import Web3 from 'web3';

export default class w3Utils{
    constructor(w3S){
        if(w3S){
            this.w3 = w3S;
        }
        else{
            this.w3 = new Web3();
        }
    }
    isAddress(address){
       return this.w3.utils.isAddress(address);
    }
    checkAddressChecksum(address){
        return this.w3.utils.checkAddressChecksum(address);
    }
    wei2Ether(amountW){
        return this.w3.utils.fromWei(amountW,"ether")
    }
}