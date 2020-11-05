<template>
  <router-view />
</template>

<script>
import ScatterJS from "scatterjs-core";
import { JsonRpc } from "eosjs";

export default {
  name: "App",

  data: () => ({
    network: null,
    rpc: null,
    account: null,
    currency: null,
    isConnected: false,
    isLogin: false,
    rounds: {},
    liveRoundList: [],
  }),
  methods: {
    async connect() {
      this.isConnected = await ScatterJS.connect("ahkui-steve", {
        network: this.network,
      });
      if (!this.isConnected) throw new Error("Could not connect to Scatter.");
    },
    async login() {
      if (this.isConnected) {
        this.isLogin = await ScatterJS.login();
        if (!this.isLogin) throw new Error("login error");
        this.account = ScatterJS.account("eos");
        this.getBalance();
        this.balanceInterval = setInterval(this.getBalance, 1000);
      }
    },
    async getBalance() {
      if (this.isConnected && this.isLogin)
        this.currency = (
          await this.rpc.get_currency_balance(
            "eosio.token",
            this.account.name,
            "EOS"
          )
        )[0];
    },
  },

  mounted: async function () {
    this.network = ScatterJS.Network.fromJson({
      blockchain: "eos",
      protocol: "https",
      port: 443,
      chainId:
        "8a34ec7df1b8cd06ff4a8abbaa7cc50300823350cadc59ab296cb00d104d2b8f",
      host: "eos.ahkui.com",
    });
    this.rpc = new JsonRpc(this.network.fullhost());

    try {
      await this.connect();
      await this.login();
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
