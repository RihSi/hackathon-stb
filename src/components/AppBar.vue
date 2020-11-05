<style>

  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

  .jackpot-value {
    position: relative;
    width: 15%;
    left: 15%;
    top: 55%;
    z-index: 997;
  }

  .odds-table {
    position: fixed;
    right: 24px;
    top: 75px;
    margin-bottom: 0;
    padding-top: 15px;
    z-index: 997;
  }
</style>

<template>
  <header>
    <v-app-bar app dark dense flat>
      <v-toolbar-title>
        <v-icon x-large class="amber--text">mdi-account-circle-outline</v-icon>
        {{ account.name }}
        /
        <v-icon x-large class="amber--text">mdi-currency-usd-circle-outline</v-icon>
        {{ currency }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        class="amber--text"
        href="/hackathon-stb/#/"
        icon
        rounded
        x-large
      >
        <v-icon large>mdi-home</v-icon>
      </v-btn>
      <v-btn large class="font-weight-bold amber--text" @click="expandTable = !expandTable">
        座位 & 賠率表
        <v-icon class="white--text" x-large v-if="expandTable">
          mdi-chevron-up
        </v-icon>
        <v-icon class="white--text" x-large v-else>
          mdi-chevron-down
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-card
      class="mx-auto"
      width="20%"
      elevation="0"
      dark
      style="position: fixed; left: 340px; top: 60px; z-index: 80; border-radius: 15px !important; border: 1px solid orange;"
    >
      <v-img
        contain
        :src="require('../assets/jackpot.png')"
      >
        <vns
          class="jackpot-value text-h3 font-weight-bold white--text text-right"
          style="font-family: 'Lobster', cursive !important; letter-spacing: 12px !important;"
          :start="0"
          :end="funds"
          :times="69"
          :speed="25"
        />
      </v-img>
    </v-card>
    <v-expand-transition>
      <v-simple-table class="odds-table" dark dense v-show="expandTable">
        <thead>
          <th class="text-center font-weight-bold">購買</th>
          <th class="text-center font-weight-bold">RTP</th>
          <th class="text-center font-weight-bold">A池</th>
          <th class="text-center font-weight-bold">B池</th>
          <th class="text-center font-weight-bold">C池</th>
          <th class="text-center font-weight-bold">D池</th>
        </thead>
        <tbody>
          <tr v-for="(item, key) in seatData" :key="key">
            <td>
              <v-icon class="red--text" v-if="item.purchased">mdi-close</v-icon>
              <v-icon class="teal--text" v-else>mdi-check</v-icon>
            </td>
            <td class="font-weight-bold">{{ item.rtp }}</td>
            <td class="font-weight-bold">{{ item.aPool }}</td>
            <td class="font-weight-bold">{{ item.bPool }}</td>
            <td class="font-weight-bold">{{ item.cPool }}</td>
            <td class="font-weight-bold">{{ item.dPool }}</td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-expand-transition>
  </header>
</template>

<script>
  import vns from 'vue-number-scroll'

  export default {
    name: 'AppBar',

    components: {
      vns
    },

    data: () => ({
      expandJP: true,
      expandTable: true,
    }),

    props: [
      'seatData',
      'account',
      'currency',
      'funds'
    ]
  }


</script>