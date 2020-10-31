<style>
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');

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
    <v-app-bar app dark height="auto" flat>
      <v-spacer></v-spacer>
      <pre
        class="text-h3 amber--text font-weight-bold"
        style="font-family: 'Lobster', cursive !important; letter-spacing: 10px !important;"
      >JackPot:  </pre>
      <vns
        class="text-h3 font-weight-bold"
        style="font-family: 'Lobster', cursive !important; letter-spacing: 20px !important;"
        :start="0"
        :end="1000000"
        :times="69"
        :speed="25"
      />
      <v-spacer></v-spacer>
      <v-btn large class="font-weight-bold" @click="expand = !expand">
        <v-icon large class="amber--text">
          mdi-spin mdi-star
        </v-icon>
        座位 & 賠率表
      </v-btn>
    </v-app-bar>
    <v-expand-transition>
      <v-simple-table dark class="odds-table" v-show="expand">
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
              <v-icon class="font-weight-bold teal--text" v-if="item.purchased">mdi-check</v-icon>
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
      expand: true,
    }),

    props: [
      'seatData'
    ]
  }


</script>