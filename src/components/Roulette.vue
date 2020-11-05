<style>
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

  .outer {
    transform: translate(-25%, -40%) scale(1.65);
  }

  .inner {
    transform: translate(-25%, -40%) scale(1);
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

  .bottle {
    left: 37.5%;
    top: 35%;
    z-index: 999;
  }

  .prize {
    position: absolute;
    z-index: 99;
    width: 5em;
    height: 55em;
    left: 3.5em;
    top: 2.5em;
  }

  .prize img {
      position: absolute;
      width: 7em;
      height: 7em;
      z-index: 99;
  }

  .prize div {
    position: absolute;
    left: 3.5em;
    top: 2.5em;
    border-radius: 100px;
    z-index: 80;
    box-shadow: 0 0 40px 20px #fff, 0 0 200px 100px #ff0;
  }

  .red-bg {
    background: linear-gradient(135deg,  #a90329 0%,#8f0222 44%,#6d0019 100%);
  }

  .grey-bg {
    background: radial-gradient(ellipse at center,  #7d7e7d 0%,#000000 70%,#0e0e0e 100%);
  }

  .highlight {
    filter: brightness(2.5);
  }

  @keyframes vibrate {
    from {
        margin-left:0px;
        animation-timing-function: cubic-bezier(0.25, 0.01, 0.55, 0.16);
    }
    10% {
        margin-left:4px;
        animation-timing-function: cubic-bezier(0.52, 0.44, 0.47, 0.44);
    }
    20% {
        margin-left:-4px;
        animation-timing-function: cubic-bezier(0.53, 0.56, 0.48, 0.56);
    }
    30% {
        margin-left:0px;
        animation-timing-function: cubic-bezier(0.45, 0.84, 0.75, 0.99);
    }
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 40px 20px #fff, 0 0 200px 100px #ff0;
    }
    50% {
      box-shadow: 0 0 40px 20px #fff, 0 0 150px 75px #ff0;
    }
    to {
      box-shadow: 0 0 40px 20px #fff, 0 0 200px 100px #ff0;
    }
  }
</style>

<template>
  <div>
    <div class="prize" ref="box" :style="boxStyle">
      <v-scale-transition origin="">
        <img
          ref="prize"
          :style="prizeStyle"
          :src="prizeType"
          @click="draw()"
          v-if="prizeStatus !=='hidden' && prizeStatus !== 'opening'" 
        />
      </v-scale-transition>
      <v-scale-transition origin="">
        <div v-if="prizeStatus === 'end'" ref="glow"></div>
      </v-scale-transition>
    </div>
    <div class="spinner outer" ref="outer">
      <div class="pie-container">
        <div class="pie-background"></div>
        <div v-for="(item, key) in outerSlices" :class="item.hold.class" :id="'outer-' + item.hold.id" :style="item.hold.style" :key="key">
            <div :class="item.num.class" :style="item.num.style">
                {{ item.num.text }}
            </div>
            <div :class="item.pie.class" :style="item.pie.style"></div>
        </div>
      </div>
    </div>
    <div class="spinner inner" ref="inner">
          <v-icon class="bottle white--text text-h1" x-large>mdi-bottle-soda</v-icon>
      <transition>
        <div class="pie-container" ref="pie">
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
  </div>
</template>

<script>
  import animations from 'create-keyframe-animation'

  export default {
    name: 'Roulette',

    data: () => ({
      current: 0,
      spinTime: 10,
      numOrder: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      numRed: [1, 3, 5, 7, 9],
      numBlack: [2, 4, 6, 8, 10],
      outerNumLoc: [],
      outerDeg: [36, 36, 36, 36, 36, 36, 36, 36, 36, 36],
      outerSlices: [],
      innerNumLoc: [],
      innerDeg: [20, 25, 30, 33, 36, 36, 39, 42, 47, 52],
      innerSlices: [],
      boxStyle: '',
      prizeStatus: 'hidden',
      prizeStyle: '',
      prizeType: require('../assets/treasure.png'),
      jp: false
    }),

    mounted: function() {
      var outerPos = 0;
      var innerPos = 0;
      var innerNumPos = 10.7;
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
    },

    methods: {
      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      spin(innerResult) {
        var index = innerResult - 1;
        var randDeg = Math.floor(Math.random() * this.innerDeg[index]) + 1;
        var dest = -360 * this.spinTime + (360 - this.innerNumLoc[innerResult]) - randDeg;
        var msTime = this.spinTime * 1000 - 4000;

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
        animations.runAnimation(this.$refs.pie, 'pieRotation').then(() => {
          this.innerSlices[index]['pie']['class'].push('highlight');
        });
      },
      async whirl(outerResult, innerResult, prizeResult, isJP) {
        var dest = 360 * this.spinTime + this.outerNumLoc[outerResult];
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
        await this.sleep(3000);
        this.spin(innerResult);
        await this.sleep(9000);
        this.raffle(prizeResult, isJP);
      },
      raffle(prizeResult, isJP) {
        var dest = this.outerNumLoc[prizeResult] + 18;
        this.boxStyle = 'transform: rotate(' + dest + 'deg);';
        this.prizeStyle = 'transform: rotate(-' + dest + 'deg); animation: vibrate 0.5s infinite alternate';
        this.prizeStatus = 'show';
        this.jp = isJP
      },
      async draw() {
        this.prizeStatus = 'opening';
        await this.sleep(1000);
        this.prizeType = this.jp ? require('../assets/jp.png') : require('../assets/bag.png');
        this.prizeStatus = 'end';
        await this.sleep(100);
        this.$refs.prize.style['animation'] = '';
        this.$refs.glow.style['animation'] = 'glow 2s linear infinite alternate';
      }
    }
  }
</script>