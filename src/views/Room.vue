<style>
body.room {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/184983947.jpg");
  margin: 0;
  overflow: hidden;
}
</style>

<template>
  <v-app>
    <AppBar
      :seatData="seatData"
      :account="$parent.account"
      :currency="$parent.currency"
      :funds="funds"
    />
    <Seats :seatData="seatData" @onPurchase="onPurchase" />
    <Roulette ref="spinner" />
    <Dialog />
    <Toast ref="popup" />
  </v-app>
</template>

<script>
import AppBar from "../components/AppBar";
import Seats from "../components/Seats";
import Roulette from "../components/Roulette";
import Dialog from "../components/Dialog";
import Toast from "../components/Toast";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs2";

ScatterJS.plugins(new ScatterEOS());

export default {
  name: "Room",

  components: {
    Seats,
    AppBar,
    Roulette,
    Dialog,
    Toast,
  },

  data: () => ({
    eos: null,
    a: null,
    b: null,
    c: null,
    d: null,
    seatData: [
      {
        purchased: 0,
        rtp: "1",
        aPool: "5.7",
        bPool: "6.65",
        cPool: "1",
        dPool: "200.0",
        price: "1.0000 EOS",
      },
      {
        purchased: 0,
        rtp: "2",
        aPool: "4.75",
        bPool: "5.54",
        cPool: "1",
        dPool: "166.7",
        price: "1.2000 EOS",
      },
      {
        purchased: 0,
        rtp: "3",
        aPool: "4.07",
        bPool: "4.75",
        cPool: "1",
        dPool: "142.9",
        price: "1.4000 EOS",
      },
      {
        purchased: 0,
        rtp: "4",
        aPool: "3.56",
        bPool: "4.16",
        cPool: "1",
        dPool: "125.0",
        price: "1.6000 EOS",
      },
      {
        purchased: 0,
        rtp: "5",
        aPool: "3.17",
        bPool: "3.69",
        cPool: "1",
        dPool: "111.1",
        price: "1.8000 EOS",
      },
      {
        purchased: 0,
        rtp: "6",
        aPool: "2.85",
        bPool: "3.33",
        cPool: "1",
        dPool: "100.0",
        price: "2.0000 EOS",
      },
      {
        purchased: 0,
        rtp: "7",
        aPool: "2.59",
        bPool: "3.02",
        cPool: "1",
        dPool: "90.9",
        price: "2.2000 EOS",
      },
      {
        purchased: 0,
        rtp: "8",
        aPool: "2.38",
        bPool: "2.77",
        cPool: "1",
        dPool: "83.3",
        price: "2.4000 EOS",
      },
      {
        purchased: 0,
        rtp: "9",
        aPool: "2.19",
        bPool: "2.56",
        cPool: "1",
        dPool: "76.9",
        price: "2.6000 EOS",
      },
      {
        purchased: 0,
        rtp: "10",
        aPool: "2.04",
        bPool: "2.38",
        cPool: "1",
        dPool: "71.4",
        price: "2.8000 EOS",
      },
    ],
    funds: 0,
    gameStatus: 0,
  }),

  beforeCreate: function () {
    document.body.className = "room";
  },

  mounted: function () {
    setInterval(async () => {
      if (!this.$parent.rpc) return;

      this.$parent.rpc
        .get_table_rows({
          json: true,
          code: "stb",
          scope: "stb",
          table: "jp",
          limit: 1,
          reverse: true,
        })
        .then((data) => {
          this.funds = data["rows"][0]["funds"];
          this.funds = this.funds.replace(" EOS", "");
          this.funds = parseFloat(this.funds) * 10000;
        });

      if (this.gameStatus < 4) {
        await this.$parent.rpc
          .get_table_rows({
            json: true,
            code: "stb",
            scope: "stb",
            table: "rounds",
            lower_bound: parseInt(this.$route.params.id),
            limit: 1,
          })
          .then(async (data) => {
            this.gameStatus = data["rows"][0]["status"];
            for (var i = 0; i < 10; i++) {
              this.seatData[i]["purchased"] =
                data["rows"][0]["seats"][i]["status"];
            }

            await data["rows"][0]["seats"].forEach((seat, idx) => {
              if (seat["win"] > 0) {
                var win = seat["win"].toString(2);
                while (win.length < 4) {
                  win = "0" + win;
                }
                if (win[3] === "1") this.a = idx + 1;

                if (win[2] === "1") this.b = idx + 1;
                if (win[1] === "1") {
                  this.c = idx + 1;
                  this.d = false;
                }
                if (win[0] === "1") {
                  this.c = idx + 1;
                  this.d = true;
                }
              }
            });
            if (
              this.gameStatus > 0 &&
              (this.a !== null ||
                this.b !== null ||
                this.c !== null ||
                this.d !== null)
            ) {
              this.gameStatus = 4;
              await this.$refs.spinner.whirl(this.a, this.b, this.c, this.d);
              this.$refs.popup.show();
            }
          });
      }
    }, 1000);
  },

  destroyed: function () {
    document.body.className = "";
  },

  methods: {
    onPurchase(key) {
      this.$parent.eos.transact(
        {
          actions: [
            {
              account: "eosio.token",
              name: "transfer",
              authorization: [
                {
                  actor: this.$parent.account.name,
                  permission: this.$parent.account.authority,
                },
              ],
              data: {
                from: this.$parent.account.name,
                to: "stb",
                quantity: this.seatData[key].price,
                memo: `Round ${this.$route.params.id};Seat ${key}`,
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    },
  },
};
</script>
