<template>
  <b-navbar class="nav" type="is-dark is-fixed" id="navbars" :transparent="true">
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img class="rounded"
                    src="../assets/logo.png"
                >
            </b-navbar-item>
        </template>
        <template #start>
          <b-navbar-item tag="div" class="ml-5">
                <div><b-input icon="account" @keyup.native="search" v-model="inputSearch"  class="is-dark" placeholder="Search by Address ,Txhash" :loading="isLoading"></b-input></div>
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item tag="div">
              <div class="has-text-warning has-text-weight-semibold is-dark mr-3" rounded>
                <div class="is-size-5 mt-1"> {{balance}}</div>
              </div>
              <div class="columns is-dark has-text-weight-semibold is-size-4" @click="isCardModalActive= true">
                <div class="column mt-1">
                  <img class="image" :src="networkIcon">
                </div >
                <div class="column mr-2" id="addressS">{{addressShort}}</div>
              </div> 
            </b-navbar-item>
            <b-modal v-model="isCardModalActive"  scroll="keep">
              
              <div class="box modalX">
                <p class="has-text-left">
                  <strong>
                    Account
                  </strong></p>
                  <div class="box modalX">
                    <p> Balance : {{balance}}</p>
                   <p class="has-white-text has-text-weight-semibold p-3"> <strong>{{account}}</strong></p>
                   <input type="hidden" id="addText" :value="account">
                    <b-button class="mx-1" rounded @click="copyAddress()">{{copyText}}</b-button>
                    <b-button class="is-danger mx-1" rounded @click="disconnect()">Disconnect</b-button>
                  </div>
                  <p class="has-text-left">
                  <strong>
                    Transactions
                  </strong></p>
                  <div class="box modalX">
                      <table class="table is-striped is-narrow is-hoverable is-fullwidth " v-if="transactions.length > 0">
                      <thead>
                        <tr>
                          <th>Txn Hash</th>
                          <th>Block</th>
                          <th>Time</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Value</th>
                          <th>Txn Fee</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody class="b-tooltips">
                        <tr v-for="tnx in transactions" :key="tnx.id" >
                          <td @click="copyTnx(tnx.blockNumber)">
                            {{reduce(tnx.hash)}}
                            <input type="hidden" :value="tnx.hash" :id="'a'+tnx.blockNumber">
                          </td>
                          <td>{{tnx.blockNumber}}</td>
                          <td><small>{{age(tnx.timeStamp)}}</small></td>
                          <td >
                            <p >{{reduce(tnx.from)}}</p>
                          </td>
                          <td>{{reduce(tnx.to)}}</td>
                          <td>{{convertWeiToEth(tnx.value)}}</td>
                          <td ><small>{{convertWeiToEth(tnx.gasUsed)}}</small></td>
                          <td><b-tag :class="getStatusClass(tnx)" type="is-dark">{{getStatusText(tnx)}}</b-tag></td>
                        </tr>
                      </tbody>
                    </table>
                    <p v-else>Your transactions</p>
                  </div>
              </div>
            </b-modal>
        </template>
         
    </b-navbar>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import  moment  from "moment";
import stringUtils from "@/utils/stringUtils";
import w3Utils from "@/utils/web3Utils";
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
  name: 'Navbar',
  components:{
  },
  methods:{
  ...mapActions(["setSearch"]),
  ...mapMutations(["setSearchAddress","setSearchData"]),
    search(e){
        if(e.keyCode ==13 &&  this.inputSearch.trim()!=""){
          this.isLoading=true;
          var self = this;
          let searchText = this.inputSearch.trim().toLowerCase();
            // Is Address
            if(this.w3Util.isAddress(searchText)){
                this.setSearchAddress({searchAdress:searchText});
                this.setSearch().then(()=>{
                  self.isLoading = false;
                });
               
            }
            else{
              this.web3.eth.getTransaction(searchText, (err, tx)=>{
                this.setSearchAddress({searchAdress:searchText});
                this.setSearchData({ searchedData: {
                  account:searchText,
                  balance:1,
                  transactions:[tx],
                  isAddress:false
            }});
                self.isLoading = false;
            });
            }

        }
        else{
          this.isLoading=false;
          this.setSearchAddress({searchAdress:""});
        }
    },
    reduce:stringUtils.reduce,
    convertWeiToEth(wei){
      return this.w3Util.wei2Ether(wei);
    },
    checkInOutStatus(item){
      if(this.account){
        if(item.to == this.account.toLowerCase()){
           return 1; 
        }
        if(item.from == this.account.toLowerCase()){
          return 2;
        }
      }
      return 0;
    },
    getStatusText(item){
      if(this.checkInOutStatus(item)==1){
        return "IN";
      }
      else if(this.checkInOutStatus(item)==2){
        return "OUT";
      }
      else{
        return "ERR";
      }
    },
    getStatusClass(item){
      if(this.checkInOutStatus(item)==1){
        return "is-success";
      }
      else if(this.checkInOutStatus(item)==2){
        return "is-warning";
      }
      else{
        return "is-default";
      }
    },
    age(time){
      return moment(new Date(time * 1000)).format('YYYY-MM-DD HH:mm:ss');
    },
    async disconnect(){
      this.isCardModalActive = false;
     await window.ethereum.request({
        method: 'wallet_requestPermissions',
        params: [{
          eth_accounts: {},
        }]
      });
      
      window.location.reload();
    },  
    copyTnx(tnx){
      let testingCodeToCopy = document.querySelector('#a'+tnx)
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()
      try {
        document.execCommand('copy');
      } catch (err) {
        console.log('Failed');
      }
      Snackbar.open(
      {
        message: 'Transaction copied!',
        type: 'is-warning',
        position: 'is-top',
      });
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges();


    },
    copyAddress(){
      this.copyText = "Copied!";
      let testingCodeToCopy = document.querySelector('#addText')
      testingCodeToCopy.setAttribute('type', 'text')
      testingCodeToCopy.select()
      try {
        document.execCommand('copy');
      } catch (err) {
        console.log('Failed');
      }
      var self = this;
      setTimeout(function () { 
          self.copyText = "Copy Address";
        }, 300);
      testingCodeToCopy.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges();
      
      
    },
  },
  data() {
    return {
        isCardModalActive: false,
        isLoading:false,
        copyText:"Copy Address",
        inputSearch:"",
        w3Util:new w3Utils(),
    }
  },
  computed: { ...mapState(["web3","balance", "account","addressShort","transactions","networkIcon","searchedData"]) },
}
</script>
<style>
  @import url('https://fonts.googleapis.com/css2?family=BioRhyme:wght@300&family=Montserrat:wght@300&display=swap');
  #navbars{
    font-family: 'Montserrat', sans-serif;
    background-color:#3b303f2d;
  }
  #addressS{
    border-radius: 15px;
    border:1px solid rgba(255,255,255,.1);
    cursor: pointer;
    background-color: rgba(0, 0, 0, .1);
  }
  #addressS:hover{
    border:1px solid rgb(133, 106, 255);
  }
  .inputx{
    background-color: #2A222D!important;
  }
  input{
    background-color:#2A222D!important;
    color: whitesmoke!important;
    font-family: 'Montserrat', sans-serif!important;
    border-radius: 10px!important;
    width: calc(100vw/3)!important;
    height: 50px!important;
    padding: 50px;
    transition: width 0.5s ease-in-out;
    opacity: .1;
  }
  input:focus{
    opacity: .4;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: whitesmoke!important;
  opacity: .8; /* Firefox */
  font-family: 'Montserrat', sans-serif;
  }
</style>
