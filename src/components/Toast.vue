<template>
  <v-snackbar v-model="toast" timeout="-1">
    <span class="font-weight-bold">此局已結束，請點此回到大廳</span>
    <template v-slot:action="{ attrs }">
      <v-btn
        color="amber"
        href="/hackathon-stb/#/"
        icon
        rounded
        v-bind="attrs"
      >
      <v-icon large>mdi-home</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  export default {
    name: 'Toast',

    data: () => ({
      toast: false
    }),

    methods: {
      show() {
        this.toast = true;
      }
    }
  }
</script>