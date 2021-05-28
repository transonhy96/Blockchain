<template>
  <div id="home"> 
    <div id="centerD" class="is-primary">
          <div id="centerBlock" class="columns">
            <div class="column father" @click="connect(1)">
              <figure class="image is-128x128 centerX">
                  <img src="../assets/bsc.svg">
                  <p class="has-white-text has-text-weight-bold mt-5">
                    Binance smart chain
                  </p>
                </figure>
            </div>
            <div class="column father" @click="connect(2)">
                <figure class="image is-128x128 centerX">
                  <img src="../assets/ethereum.png">
                  <p class="has-white-text has-text-weight-bold mt-5">ERC-20</p>
                </figure>
            </div>
            
          </div>
          <p class="has-white-text has-text-weight-bold">Select network</p>
        </div>
  </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "home",
  components: {
  },
  data() {
    return { 

     };
  },
  computed: { ...mapState(["type"]) },
  methods: {
    ...mapActions(["setWeb3"]),
    ...mapMutations(["setType"]),
    connect(type){
      let path = { path: 'bsc'};
      //BSC
      if(type==1){
        this.setType({type:1});
      }
      //Ether
      else if(type==2){
        this.setType({type:2});
        path = { path: 'ether'};
      }
      self.$router.push(path);
    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=BioRhyme:wght@300&family=Montserrat:wght@300&display=swap');

html, body {
  font-family: 'Montserrat', sans-serif;
}

#home {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color:#2A222D;
  height:100vh;
  background-image: url("../assets/Wave.svg");
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
}
#centerD{
  position: relative;
}
#centerBlock{
  height: 40vh;
  width: 30vw;
  margin-top: 40vh;
  top: 50%;
  left: 35%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  position: absolute;
}
.father{
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin:10px;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
   rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px,
     rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px,
       rgba(0, 0, 0, 0.07) 0px 32px 64px;
}
.father:hover{
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
  
}
.centerX{
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translateX(-50%);
  transform: translateY(-50%);
  border-radius: 50%;
  padding: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}
.centerX:hover{
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px,
   rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px,
     rgba(0, 0, 0, 0.07) 0px 8px 16px,
      rgba(0, 0, 0, 0.07) 0px 16px 32px,
       rgba(0, 0, 0, 0.07) 0px 32px 64px;
  color: #cfcbcb;
}
</style>