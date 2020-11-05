<style>
.dialog-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
}

.dialog-card {
  z-index: 999;
}
</style>

<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="amber dialog-btn" fab v-bind="attrs" v-on="on">
        <v-icon x-large>mdi-information-variant</v-icon>
      </v-btn>
    </template>
    <v-card class="dialog-card">
      <v-toolbar dark tabs>
        <template v-slot:extension>
          <v-tabs align-with-title v-model="tabs">
            <v-tab> 遊戲相關說明 </v-tab>
            <v-tab> 隨機數說明 </v-tab>
            <v-tabs-slider color="amber"></v-tabs-slider>
          </v-tabs>
        </template>
      </v-toolbar>
      <v-card-text>
        <v-tabs-items v-model="tabs">
          <v-tab-item>
            <v-card flat>
              <v-card-title>
                <span class="headline">遊戲介紹</span>
              </v-card-title>
              <v-card-text>
                此遊戲為10人對賭之遊戲，所有的購買金額將全數隨機分配給遊戲中玩家。
              </v-card-text>
              <v-card-title>
                <span class="headline">遊戲規則</span>
              </v-card-title>
              <v-card-text>
                每10分鐘為一局，每局為10位玩家參與，如提早滿人則直接開始，遊戲中有1~10號共10個位置以及四個彩金獎池，位置購買的費用分別不同，每個位置的獎池獲獎機率也不同，開始前玩家可以選擇購買1~10號的任意位置，已被購買的位置將不能再進行購買，遊戲開始後，四個獎池分別進行開獎，並依照各獎池比例進行獎金派發，每個位置都有機會獲得四個獎池中的彩金。
              </v-card-text>
              <v-card-title>
                <span class="headline">獎池介紹</span>
              </v-card-title>
              <v-card-text>
                <ol>
                  <li class="mb-5">
                    大輪盤獎池：外圈輪盤轉動，最後停止位置即為中獎位置。每局必開一個位置，位置1到10的中獎機率相同。
                  </li>
                  <li class="mb-5">
                    小輪盤獎池：外圈輪盤轉動，最後停止位置即為中獎位置。每局必開一個位置，位置1到10的中獎機率依照購買位置費用成等比級距。
                  </li>
                  <li class="mb-5">
                    寶箱獎池-錢袋：輪盤外圍有閃爍寶箱，點擊後如為錢袋即為中獎。非每局必開出，單局有機率同時多開中獎，獲得獎金為該位置的門票費用。
                  </li>
                  <li>
                    寶箱獎池-JP金幣寶箱：輪盤外圍有閃爍寶箱，點擊後如為金幣寶箱即為中獎。非每局必開出，單局只會有一個位置中獎，獲得獎金為Jackpot累積獎金，如沒有開出則獎金累積至下局。
                  </li>
                </ol>
              </v-card-text>
              <v-card-title> 彩池獎金分配 </v-card-title>
              <v-card-text>
                <div class="mb-5">大輪盤獎池：每局門票金額30%</div>
                <div class="mb-5">小輪盤獎池：每局門票金額35%</div>
                <div class="mb-5">寶箱獎池-錢袋：每局門票金額10%</div>
                <div class="mb-5">
                  寶箱獎池-JP金幣寶箱：每局門票金額20% (每局累積)
                </div>
                <div class="mb-5">開發團隊：每局門票金額5%</div>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-title>
                <span class="headline">取得交易Hash</span>
              </v-card-title>
              <v-card-text>
                當最後一個位置被購買之後，合約觸發開獎產生隨機數依照最後一筆購買位置的
                Transation Hash 進行運算。
              </v-card-text>
              <v-card-title>
                <span class="headline">Hash運算</span>
              </v-card-title>
              <v-card-text>
                取 Transaction Hash 前39個字串，
                每三個字串為一組開獎結果總共13組，
                將每組開獎結果進行16進位轉10進位運算，
                再除以最大值4096，計算後的數字將落在 0~1 之間，
                再依照各池的權重判斷分別是落在哪個區間範圍，即為中獎結果。
              </v-card-text>
              <v-card-title>
                <span class="headline">隨機數結果</span>
              </v-card-title>
              <v-card-text>
                <div class="mb-5">13組結果分別對應</div>
                <div class="mb-5">1組外輪盤</div>
                <div class="mb-5">1組內輪盤</div>
                <div class="mb-5">1-10共10組金幣袋</div>
                <div class="mb-5">1組JackPot獎金</div>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",

  data: () => ({
    dialog: false,
    tabs: null,
  }),
};
</script>
