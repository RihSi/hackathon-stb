<template>
  <v-navigation-drawer permanent app dark width="auto">
    <v-list-item v-for="(item, key) in seatData" :key="key">
      <v-container>
        <v-row class="mb-6" :key="1">
          <v-col>
            <v-list-item-title class="font-weight-bold">
              座位：
              <span class="amber--text font-weight-bold">{{ item.rtp }}號</span>
            </v-list-item-title>
          </v-col>
        </v-row>
        <v-row class="mb-6" :key="2">
          <v-col>
            <v-list-item-title class="font-weight-bold">
              賠率： A池<span class="red--text font-weight-bold">{{
                item.aPool
              }}</span>
              / B池<span class="red--text font-weight-bold">{{
                item.bPool
              }}</span>
            </v-list-item-title>
          </v-col>
        </v-row>
        <v-row class="mb-6" :key="3">
          <v-col>
            <v-list-item-title class="font-weight-bold">
              門票費：
              <span class="amber--text font-weight-bold">{{ item.price }}</span>
            </v-list-item-title>
          </v-col>
          <v-col>
            <v-btn
              class="amber font-weight-bold"
              @click="buySeat(key)"
              v-if="!item.purchased"
              >尚未購買</v-btn
            >
            <v-btn class="amber font-weight-bold" v-else>已被購買</v-btn>
          </v-col>
        </v-row>
        <v-divider dark></v-divider>
      </v-container>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "seats",

  props: ["seatData"],

  methods: {
    buySeat(key) {
      this.$emit("onPurchase", key);
    },
  },
};
</script>
