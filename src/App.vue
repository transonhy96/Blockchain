<template>
  <div id="app"> 
    <div class="hero">
      <div class="hero-header">
        <Navbar/>
      </div>
      <div class="hero-body" v-if="this.searchAdress" >
          <div v-if="this.searchedData.isAddress">
            <div class="box modalX is-fullwidth">
          <p class="has-text-left">
            <strong>
              Account
            </strong></p>
            <div class="box modalX">
              <p> Balance : {{convertWeiToEth(this.searchedData.balance)}}</p>
              <p class="has-white-text has-text-weight-semibold p-3"> <strong>{{this.searchedData.account}}</strong></p>
            </div>
            <p class="has-text-left">
            <strong>
              Transactions
            </strong></p>
            <div class="box modalX">
                <table class="table is-striped is-narrow is-hoverable is-fullwidth" v-if="this.searchedData.transactions.length > 0">
                <thead>
                  <tr>
                    <th>Txn Hash</th>
                    <th>Block</th>
                    <th>Time</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Value</th>
                    <th>Txn Fee</th>
                  </tr>
                </thead>
                <tbody class="is-size-7">
                  <tr v-for="tnx in this.searchedData.transactions" :key="tnx.id" >
                    <td>
                      {{tnx.hash}}
                    </td>
                    <td>{{tnx.blockNumber}}</td>
                    <td><small>{{age(tnx.timeStamp)}}</small></td>
                    <td >
                      <p >{{tnx.from}}</p>
                    </td>
                    <td>{{tnx.to}}</td>
                    <td>{{convertWeiToEth(tnx.value)}}</td>
                    <td ><small>{{convertWeiToEth(tnx.gasUsed)}}</small></td>
                  </tr>
                </tbody>
              </table>
              <p v-else>Your transactions</p>
            </div>
            </div>
          </div>
          <div v-if="!this.searchedData.isAddress">
            <div class="box modalX">
            <p class="has-text-left">
              <strong>
                Transactions details
              </strong>
              </p>
              <div class="box modalX has-text-left">
                  <div class="columns">
                    <div class="column">
                      Transaction Hash:
                    </div>
                    <div class="column">
                      {{this.searchedData.transactions[0].hash}}
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      Block:
                    </div>
                    <div class="column">
                        {{this.searchedData.transactions[0].blockNumber}}
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      From:
                    </div>
                    <div class="column">
                      <button @click="searchShort(0)" class="button">{{this.searchedData.transactions[0].from}}</button>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      To:
                    </div>
                    <div class="column">
                      <button @click="searchShort(1)" class="button">{{this.searchedData.transactions[0].to}}</button>
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      Value:
                    </div>
                    <div class="column">
                      {{convertWeiToEth(this.searchedData.transactions[0].value)}}
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      Transaction Fee:
                    </div>
                    <div class="column">
                      {{convertWeiToEth(this.searchedData.transactions[0].gas)}}
                    </div>
                  </div>

                  <div class="columns">
                    <div class="column">
                      Gas Price:
                    </div>
                    <div class="column">
                      {{convertWeiToEth(this.searchedData.transactions[0].gasPrice)}}
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      Nonce :
                    </div>
                    <div class="column">
                      {{this.searchedData.transactions[0].nonce}}
                    </div>
                  </div>
                  <div class="columns">
                    <div class="column">
                      Input Data:
                    </div>
                    <div class="column">
                      {{this.searchedData.transactions[0].input}}
                    </div>
                  </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import w3Utils from "@/utils/web3Utils";
import  moment  from "moment";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "app",
  components: {
    Navbar
  },
  data() {
    return { 
        w3Util:new w3Utils(),
     };
  },
  computed: { ...mapState(["type","searchedData","searchAdress"]) },
  methods: {
    ...mapActions(["setWeb3","getBalance","setSearch"]),
    ...mapMutations(["setType","setSearchAddress"]),
    searchShort(type){
      let address= "";
      if(type==0){
        address= this.searchedData.transactions[0].from;
      }
      else{
        address= this.searchedData.transactions[0].to;
      }
      this.setSearchAddress({searchAdress:address});
        this.setSearch().then(()=>{
          self.isLoading = false;
        });
    },
     convertWeiToEth(wei){
       if(wei){
          return this.w3Util.wei2Ether(String(wei));
       }
       return 0;
      
    },
    age(time){
      return moment(new Date(time * 1000)).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  beforeUpdate(){

    console.log(this.searchedData.isAddress);
  },
  async created() {
    await this.setWeb3();
    await this.getBalance();
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=BioRhyme:wght@300&family=Montserrat:wght@300&display=swap');

html, body {
  font-family: 'Montserrat', sans-serif;
}

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color:#2A222D;
  height:100vh;
  background-image: url("./assets/Wave.svg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}

</style>