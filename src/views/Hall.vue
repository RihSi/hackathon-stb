<style>
.dark-bg {
  background: #363636;
}
</style>

<template>
  <v-app>
    <v-navigation-drawer app dark color="#1E1E1E">
      <v-sheet class="pa-4" dark>
        <v-avatar class="mb-4" color="grey darken-1" size="64"></v-avatar>
        <div class="font-weight-bold">
          {{ $parent.account ? $parent.account.name : "" }}
        </div>
        <div class="font-weight-bold">
          {{ $parent.currency }}
        </div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon class="amber--text" large>mdi-history</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold text-h6"
              >歷史紀錄</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="dark-bg">
      <v-container class="py-8 px-6" fluid>
        <v-row dark>
          <v-col cols="12">
            <v-card dark>
              <v-subheader class="white--text font-weight-bold text-h5"
                >當前房間</v-subheader
              >
              <v-list two-line>
                <template v-for="(round, roundIdx) in rounds">
                  <v-list-item :key="roundIdx">
                    <v-list-item-content>
                      <v-list-item-title class="text-h4">
                        房間 #{{ round.id }}
                        <v-btn
                          class="amber font-weight-bold"
                          :to="{ name: 'room', params: { id: round.id } }"
                          rounded
                          >進入房間</v-btn
                        >
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
                              已被購買<v-icon class="red--text"
                                >mdi-close</v-icon
                              >
                              / 可購買<v-icon class="teal--text"
                                >mdi-check</v-icon
                              >
                            </td>
                            <td
                              class="text-center font-weight-bold"
                              v-for="(item, key) in round.seats"
                              :key="key"
                            >
                              <v-icon class="red--text" v-if="item.status"
                                >mdi-close</v-icon
                              >
                              <v-icon class="teal--text" v-else
                                >mdi-check</v-icon
                              >
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
export default {
  name: "Hall",
  data: () => ({
    rounds: {},
    liveRoundList: [],
  }),
  computed: {},
  methods: {
    async fetchLiveRoom() {
      const data = await this.$parent.rpc.get_table_rows({
        json: true,
        code: "stb",
        scope: "stb",
        table: "liverounds",
        limit: 5,
      });
      this.liveRoundList = data.rows.map((x) => x.id);
    },
    async fetchRoom() {
      const data = await Promise.all(
        this.liveRoundList.map((id) => {
          return this.$parent.rpc.get_table_rows({
            json: true,
            code: "stb",
            scope: "stb",
            table: "rounds",
            lower_bound: id,
            limit: 1,
          });
        })
      );
      this.rounds = data.reduce((obj, item) => {
        return {
          ...obj,
          [item.rows[0].id]: item.rows[0],
        };
      }, {});
    },
  },

  mounted: async function () {
    if (this.liveInterval != undefined) {
      clearInterval(this.liveInterval);
      this.liveInterval = undefined;
    }
    this.liveInterval = setInterval(this.fetchLiveRoom, 1000);

    if (this.fetchRoomInterval != undefined) {
      clearInterval(this.fetchRoomInterval);
      this.fetchRoomInterval = undefined;
    }
    this.fetchRoomInterval = setInterval(this.fetchRoom, 1000);
  },
};
</script>
