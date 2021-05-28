import apiKey from "@/apiKey.json";
export default {
    getUrl:(networkID,address) =>{
        switch (networkID) {
            //Eth mainnet
            case 1:
                return "https://api.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey="+apiKey.Key;
                //Kovan
            case 42:
                return "";
                //Ropsten
            case 3:
                return "https://api-ropsten.etherscan.io/api?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey="+apiKey.Key;
                //BSC Test net
            case 97:
                return "https://api-testnet.bscscan.com/api?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey="+apiKey.Key;  
                //BSC mainnet
            case 56:
                return "https://api.bscscan.com/api?module=account&action=txlist&address="+address+"&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey="+apiKey.Key;
            default:
                //UE4 contract address
                return "0x1148d983adc0f30f9d47e1fcb5346ce06f4f1b68";
        }
    },
    getNetworkIcon:(networkID) =>{
        switch (networkID) {
            //Eth mainnet
            case 1:
            case 42:
            case 3:
                return "https://i.imgur.com/0lU3Pgc.png";
            case 97:
            case 56:
                return "https://i.imgur.com/dMfzp8J.png";
            default:
                return "none";
        }
    },


}