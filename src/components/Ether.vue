<template>
  <div id="ether"> 
    <Navbar />
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import Navbar from "@/components/Navbar";
export default {
  name: "app",
  components: {
    Navbar
  },
  data() {
    return {  };
  },
  computed: { ...mapState(["balance", "account"]) },
  methods: {
    ...mapActions(["setWeb3", "getBalance"]),
  },
  async created() {
    await this.setWeb3();
    await this.getBalance();
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=BioRhyme:wght@300&family=Montserrat:wght@300&display=swap');
#ether {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color:#2A222D;
  height:100vh;
}

</style>