<style>
  .dark-bg {
    background: #363636;
  }
</style>

<template>
  <v-app>
    <v-navigation-drawer app dark color="#1E1E1E">
      <v-sheet class="pa-4" dark>
        <v-avatar
          class="mb-4"
          color="grey darken-1"
          size="64"
        ></v-avatar>
        <div class="font-weight-bold">
          {{ account.name }}
        </div>
        <div class="font-weight-bold">
          {{ currency }}
        </div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon class="amber--text" large>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-h6">歷史紀錄</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="dark-bg">
      <v-container class="py-8 px-6" fluid>
        <v-row dark>
          <v-col cols="12">
            <v-card dark>
              <v-subheader class="white--text font-weight-bold text-h5">當前房間</v-subheader>
              <v-list two-line>
                <template v-for="(round, roundIdx) in rounds">
                  <v-list-item :key="roundIdx">
                    <v-list-item-content>
                      <v-list-item-title class="text-h4">
                        房間 #{{ round.id }}
                        <v-btn class="amber font-weight-bold" :href="'/#/room?round=' + round.id" rounded>進入房間</v-btn>
                      </v-list-item-title>
                      <v-simple-table dark>
                        <thead>
                          <tr>
                            <th>座位狀況</th>
                            <th class="text-center font-weight-bold">1</th>
                            <th class="text-center font-weight-bold">2</th>
                            <th class="text-center font-weight-bold">3</th>
                            <th class="text-center font-weight-bold">4</th>
                            <th class="text-center font-weight-bold">5</th>
                            <th class="text-center font-weight-bold">6</th>
                            <th class="text-center font-weight-bold">7</th>
                            <th class="text-center font-weight-bold">8</th>
                            <th class="text-center font-weight-bold">9</th>
                            <th class="text-center font-weight-bold">10</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              已被購買<v-icon class="red--text">mdi-close</v-icon>
                              /
                              可購買<v-icon class="teal--text">mdi-check</v-icon>
                            </td>
                            <td
                              class="text-center font-weight-bold"
                              v-for="(item, key) in round.seatData"
                              :key="key"
                            >
                              <v-icon class="red--text" v-if="item.status">mdi-close</v-icon>
                              <v-icon class="teal--text" v-else>mdi-check</v-icon>
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider inset :key="`divider-${roundIdx}`"></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import ScatterJS from 'scatterjs-core';
  import { JsonRpc } from 'eosjs'

  export default {
    name: 'Hall',

    data: () => ({
      account: '',
      currency: '',
      rounds: [],
      temp:[]
    }),

    mounted: function() {
      var network = ScatterJS.Network.fromJson({
        blockchain: 'eos',
        protocol: 'https',
        port: 443,
        chainId: '8a34ec7df1b8cd06ff4a8abbaa7cc50300823350cadc59ab296cb00d104d2b8f',
        host: 'eos.ahkui.com',
      });
      var rpc = new JsonRpc(network.fullhost());
      ScatterJS.connect('ahkui-steve', {network}).then(connected => {

        if(!connected) console.error('Could not connect to Scatter.');

        ScatterJS.login().then(id => {

          if(!id) console.error('Could not find any ID.');

          this.account = ScatterJS.account('eos');

          setInterval(async () => {

            rpc.get_currency_balance('eosio.token', this.account.name, 'EOS').then(currency => {
              this.currency = currency[0];
            });

            rpc.get_table_rows({
              json: true,
              code: 'stb',
              scope: 'stb',
              table: 'liverounds',
              limit: 5,
            }).then(data => {
              data['rows'].forEach(round => {
                rpc.get_table_rows({
                  json: true,
                  code: 'stb',
                  scope: 'stb',
                  table: 'rounds',
                  lower_bound: round.id,
                  limit: 1
                }).then(seat => {
                  round['seatData'] = seat['rows'][0]['seats'];
                  this.temp.push(round);
                });
              });
              this.rounds = this.temp.slice();
              this.temp = [];
            });
          }, 2000);
        });
      });
    }
  }
</script>