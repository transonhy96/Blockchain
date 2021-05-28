
import Vue from 'vue';
import Vuex from 'vuex';
import getWeb3 from '@/utils/getWeb3';
import netUtils from '@/utils/getUrl';
import axios from 'axios';
Vue.use(Vuex);



export default new Vuex.Store({
  state: { 
          web3: null,
          account: null,
          balance: null,
          token: null,
          addressShort :null,
          transactions:[],
          type:0,
          networkIcon:"",
          searchAdress:null,
          searchedData:{
            account:null,
            balance:null,
            transactions:[],
            isAddress:false
          }
         },
  mutations: {
    setWeb3(state, payload) {
      state.web3 = payload.web3;
    },
    setSearchAddress(state, payload) {
      state.searchAdress = payload.searchAdress;
    },
    setSearchData(state, payload) {
      state.searchedData = payload.searchedData;
    },
    setType(state, payload) {
      state.type = payload.type;
    },
    setNetworkIcon(state, payload) {
      state.networkIcon = payload.networkIcon;
    },
    setTransactions(state, payload) {
      state.transactions = payload.transactions;
    },
    setAccount(state, payload) {
      let str  = payload.account;
      state.account = str;
      state.addressShort = str.slice(0,6) + "..." + str.slice(-4);
    },
    setToken(state, payload) {
      state.token = payload.token;
    },
    setNewAmount(state, payload) {
      state.balance = state.balance - payload.amount;
    },
    setBalance(state, payload) {
      let eth = state.web3.utils.fromWei(payload.balance,"ether");
      // cho vao util
      state.balance = Math.round((Number(eth) + Number.EPSILON) * 100) / 100;
    }
  },
  actions: {
    async setWeb3({ commit }) {

      const web3 = await getWeb3();
      let type = 0;
      web3.eth.getNodeInfo().then(console.log);
      web3.eth.getChainId().then(s=>{
        type = s;
        commit("setType",{type:s});
        commit("setNetworkIcon",{networkIcon:netUtils.getNetworkIcon(type)});
      });
      
      const accounts = await web3.eth.getAccounts();
      
      if (accounts.length > 0) {
        const account = accounts[0];
        if(!web3.utils.isAddress(account)) return;
        if(!web3.utils.checkAddressChecksum(account)) return;
        let url=netUtils.getUrl(type,account);
        await axios.get(url)
          .then(({data})=>{
            if(data && data.status=="1"){
              commit('setTransactions', { transactions: data.result});
            }
          });
        commit('setWeb3', { web3: web3 });
        commit('setAccount', { account: account });
      } else {
        console.log('Account not found');
      }
    },
    async setSearch({ commit,state }) {
      
      let type = state.type;
      const account = state.searchAdress;
      
      let url = netUtils.getUrl(type,account);

      let balance = await state.web3.eth.getBalance(account);
      await axios.get(url)
        .then(({data})=>{
          if(data && data.status=="1"){
            commit('setSearchData', { searchedData: {
                account:account,
                balance:balance,
                transactions:data.result,
                isAddress:true
            }});
          }
        });
    },
    async getBalance({ commit, state }) {
      const account = state.account;
      let balance = await state.web3.eth.getBalance(account);
      commit('setBalance', { balance: balance });
    },
   
  },
  getters: {
    balance: (state) => () => {
      return state.balance;
    },
    balanceWTokenName: (state, getters) => (prefix) => {
      return getters.balance + prefix;
    }
  }
});