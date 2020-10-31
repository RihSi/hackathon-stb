<style>
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/138980/184983947.jpg);
    margin: 0;
    overflow: hidden;
  }

  .pie-background {
    background-color: rgba(240, 240, 240, 1);
    position: absolute;
    width: 20em;
    height: 20em;
    border-radius: 99em;
    box-shadow: -1px 1px 3px #000;
  }

  .pie-container {
    top: -1%;
    position: absolute;
    width: 20em;
    height: 20em;
    transform: rotate(0deg);
    font-size: 1.25em;
  }

  .pie {
    border: solid 1em rgba(41, 25, 6, 1);
    box-shadow: inset 0 0 1em #000;
    position: absolute;
    width: 20em;
    height: 20em;
    border-radius: 99em;
    clip: rect(0em, 10em, 10em, 0px);
    z-index: 20;
  }

  .hold {
    position: absolute;
    clip: rect(0, 20em, 20em, 10em);
    width: 20em;
    height: 20em;
    border-radius: 99em;
  }

  .num {
      position: absolute;
      color: rgba(255, 255, 255, 1);
      z-index: 80;
      text-align: center;
      font-family: "Times Newx Roman", Times, serif;
      font-weight: 700;
  }

  .outer {
    transform: translate(-35%, -40%) scale(2.15);
  }

  .inner {
    transform: translate(-35%, -40%) scale(1.15);
  }

  .spinner {
    top: 50%;
    left: 50%;
    position: absolute;
    background-color: transparent;
    height: 25em;
    width: 25em;
    border-radius: 99em;
    font-size: 1em;
  }

  .bottle {
    left: 45%;
    top: 90%;
    z-index: 999;
  }

  .red-bg {
    background: linear-gradient(135deg,  #a90329 0%,#8f0222 44%,#6d0019 100%);
  }

  .grey-bg {
    background: radial-gradient(ellipse at center,  #7d7e7d 0%,#000000 70%,#0e0e0e 100%);
  }

  .highlight {
    filter: brightness(2);
  }
</style>

<template>
  <v-app>
    <AppBar :seatData="seatData" />
    <Seats :seatData="seatData" @seatNumber="onPurchase" />
    <div class="spinner outer" style="top: 50%; !important">
      <div id="outerCircle" class="pie-container">
        <div class="pie-background"></div>
        <div v-for="(item, key) in outerSlices" :class="item.hold.class" :id="'outer-' + item.hold.id" :style="item.hold.style" :key="key">
            <div :class="item.num.class" :style="item.num.style">
                {{ item.num.text }}
            </div>
            <div :class="item.pie.class" :style="item.pie.style"></div>
        </div>
      </div>
    </div>
    <div class="spinner inner">
          <v-icon class="bottle white--text" x-large>mdi-bottle-soda</v-icon>
      <transition>
        <div ref="innerCircle" class="pie-container">
            <div class="pie-background"></div>
            <div v-for="(item, key) in innerSlices" :class="item.hold.class" :id="'inner-' + item.hold.id" :style="item.hold.style" :key="key">
                <div :class="item.num.class" :style="item.num.style">
                    {{ item.num.text }}
                </div>
                <div :class="item.pie.class" :style="item.pie.style"></div>
            </div>
        </div>
      </transition>
    </div>
  </v-app>
</template>

<script>
import Seats from '../components/Seats';
import AppBar from '../components/AppBar';
import animations from 'create-keyframe-animation';
//import ScatterJS from 'scatterjs-core';
//import ScatterEOS from 'scatterjs-plugin-eosjs2';
//import { Api, JsonRpc } from 'eosjs'

//ScatterJS.plugins(new ScatterEOS());

export default {
  name: 'room',

  components: {
    Seats,
    AppBar ,
  },

  data: () => ({
    spinTime: 10,
    numOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    numRed: [1, 3, 5, 7, 9],
    numBlack: [2, 4, 6, 8, 10],
    outerNumLoc: [],
    innerNumLoc: [],
    outerDeg: [36, 36, 36, 36, 36, 36, 36, 36, 36, 36],
    innerDeg: [20, 25, 30, 33, 36, 36, 39, 42, 47, 52],
    outerSlices: [],
    innerSlices: [],
    current: 0,
    outerResult: 7,
    innerResult: 10,
    seatData: [
        { purchased: false, rtp: '1', aPool: '5.7', bPool: '6.65', cPool: '1', dPool: '200.0', price: '$100' },
        { purchased: true, rtp: '2', aPool: '4.75', bPool: '5.54', cPool: '1', dPool: '166.7', price: '$120' },
        { purchased: true, rtp: '3', aPool: '4.07', bPool: '4.75', cPool: '1', dPool: '142.9', price: '$140' },
        { purchased: true, rtp: '4', aPool: '3.56', bPool: '4.16', cPool: '1', dPool: '125.0', price: '$160' },
        { purchased: true, rtp: '5', aPool: '3.17', bPool: '3.69', cPool: '1', dPool: '111.1', price: '$180' },
        { purchased: true, rtp: '6', aPool: '2.85', bPool: '3.33', cPool: '1', dPool: '100.0', price: '$200' },
        { purchased: true, rtp: '7', aPool: '2.59', bPool: '3.02', cPool: '1', dPool: '90.9', price: '$220' },
        { purchased: true, rtp: '8', aPool: '2.38', bPool: '2.77', cPool: '1', dPool: '83.3', price: '$240' },
        { purchased: true, rtp: '9', aPool: '2.19', bPool: '2.56', cPool: '1', dPool: '76.9', price: '$260' },
        { purchased: true, rtp: '10', aPool: '2.04', bPool: '2.38', cPool: '1', dPool: '71.4', price: '$280' },
      ]
  }),

  mounted: async function () {
    var outerPos = 0;
    var innerPos = 0;
    var innerNumPos = 10.85;
    for(var i = 0; i < this.numOrder.length; i++) {
      this.outerNumLoc[this.numOrder[i]] = outerPos;
      this.innerNumLoc[this.numOrder[i]] = innerPos;
      outerPos = outerPos + this.outerDeg[i];
      innerPos = innerPos + this.innerDeg[i];
      var outerSlice = {
          'hold': {
              'id': 'outer-slice-' + (i+1),
              'class': ['hold'],
              'style': 'transform: rotate(' + this.outerNumLoc[this.numOrder[i]] + 'deg);'
          },
          'num': {
              'class': ['num'],
              'text': this.numOrder[i]
          },
          'pie': {
              'class': ['pie'],
              'style': 'transform: rotate(36deg);'
          }
      };
      var innerSlice = {
          'hold': {
              'id': 'inner-slice-' + (i+1),
              'class': ['hold'],
              'style': 'transform: rotate(' + this.innerNumLoc[this.numOrder[i]] + 'deg);'
          },
          'num': {
              'class': ['num'],
              'text': this.numOrder[i]
          },
          'pie': {
              'class': ['pie'],
              'style': 'transform: rotate(' + this.innerDeg[i] + 'deg);'
          }
      };
      if(this.numOrder[i] > 9) {
          outerSlice['num']['style'] = 'left: 11.75em; top: 2.5em; transform: scale(2) rotate(15deg) !important;';
          innerSlice['num']['style'] = 'left: ' + (innerNumPos - 0.77) + 'em; top: 3.5em; transform: scale(2) rotate(' + (this.innerDeg[i] * 0.43) + 'deg) !important;';
      }
      else {
          outerSlice['num']['style'] = 'left: 12.02em; top: 2.5em; transform: scale(2) rotate(15deg) !important;';
          innerSlice['num']['style'] = 'left: ' + innerNumPos + 'em; top: 3em; transform: scale(2) rotate(' + (this.innerDeg[i] * 0.43) + 'deg) !important;';
      }
      innerNumPos = innerNumPos + 0.27;
      if(this.numRed.includes(this.numOrder[i])) {
          outerSlice['pie']['class'].push('red-bg');
          innerSlice['pie']['class'].push('grey-bg');
      }
      else if(this.numBlack.includes(this.numOrder[i])) {
          outerSlice['pie']['class'].push('grey-bg');
          innerSlice['pie']['class'].push('red-bg');
      }
      this.outerSlices.push(outerSlice);
      this.innerSlices.push(innerSlice);
    }
    /*
    var network = ScatterJS.Network.fromJson({
      blockchain: 'eos',
      protocol: 'http',
      port: 8888,
      chainId: '8a34ec7df1b8cd06ff4a8abbaa7cc50300823350cadc59ab296cb00d104d2b8f',
      host: 'ahkui.com',
    });
    var rpc = new JsonRpc(network.fullhost());
    ScatterJS.connect('ahkui-steve', {network}).then(connected => {
        if(!connected){
            console.log('Could not connect to Scatter.');
            return;
        }
        ScatterJS.login().then(id => {
          if(!id) console.log('no id');
          var account = ScatterJS.account('eos');
          alert(JSON.stringify(account));
          var eos = ScatterJS.eos(network, Api, {rpc, beta3: true});
          rpc.get_currency_balance('eosio.token', 'steve', 'EOS').then(balance => console.log(balance));

          eos.transact({
            actions: [{
              account: 'eosio.token',
              name: 'accounts',
              authorization:[{
                actor: account.name,
                permission: account.authority
              }],
              data:{
                from: account.name,
              }
            }]
          }, {
              blocksBehind: 3,
              expireSeconds: 30,
          }).then(res => {
              console.log(res);
          });
        });

    });
    */
  },

  methods: {
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    onPurchase(key) {
      this.seatData[key]['purchased'] = true;
      this.checkGameStatus();
    },
    async checkGameStatus() {
      for(var i = 0; i < this.seatData.length; i++) {
        if(this.seatData[i].purchased === false) {
          return;
        }
      }
      this.sliceRotateTo(this.outerNumLoc[this.outerResult]);
      await this.sleep(3000);
      this.bgRotateTo();
    },
    bgRotateTo() {
      var index = this.innerResult - 1;
      var randDeg = Math.floor(Math.random() * this.innerDeg[index]) + 1;
      var dest = -360 * this.spinTime + (360 - this.innerNumLoc[this.innerResult]) - randDeg - 180;
      var msTime = (this.spinTime * 1000 - 4000);

      var animation = {
        0: {
          transform: 'rotate(0deg)'
        },
        100: {
          transform: 'rotate(' + dest + 'deg)'
        }
      };

      animations.registerAnimation({
        name: 'pieRotation',
        animation,
        presets: {
          duration: msTime,
          easing: 'ease-in-out'
        }
      });
      animations.runAnimation(this.$refs.innerCircle, 'pieRotation', () => {
        this.innerSlices[index]['pie']['class'].push('highlight');
      });
    },
    async sliceRotateTo(deg) {
      var dest = 360 * this.spinTime + deg;
      var start = 0;
      var msTime = this.spinTime * 1000;
      var timeRange = msTime / 25;
      for(var i = 0; i < timeRange; i++) {
        await this.sleep(25);
        if(start !== dest) {
          start = start + 36;
          this.outerSlices[this.current]['pie']['class'] = this.outerSlices[this.current]['pie']['class'].filter(item => item !== 'highlight');
          this.current = (this.current + 1) % this.outerSlices.length;
          this.outerSlices[this.current]['pie']['class'].push('highlight');
        }
        else {
          break;
        }
      }
    }
  }
}

</script>