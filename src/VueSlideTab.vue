<template>
  <div class="slide-tab" :style="tabStyle" :dir="dir" >
    <div
      ref="wrapper"
      :class="[motion ? 'motion' : '', 'tab-wrapper']"
      :style="wrapperStyle"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        class="tab-item"
        @click="tabClick($event, index)"
      >
        <slot name="tab" :tab="tab" :index="index" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      require: true,
      type: Array
    },
    current: {
      require: true,
      type: Number
    },
    dir: {
      type: String,
      default: () => 'ltr'
    }
  },
  data() {
    return {
      tabWidth: 0,
      minLeft: 0,
      left: 0,
      motion: false,
      preX: 0,
      wrapperWidth: 0
    }
  },
  computed: {
    dirFlag() {
      return this.dir === 'ltr' ? 1 : -1
    },
    tabStyle() {
      return this.tabWidth ? `width: ${this.tabWidth}px;` : ''
    },
    wrapperStyle() {
      const l = this.left * this.dirFlag + 'px'
      return `transform: translate3d(${l}, 0, 0);`
    }
  },
  watch: {
    current(v) {
      this.setCurrentTab(v)
    }
  },
  mounted() {
    this.init()
    this.setCurrentTab(this.current)
  },
  updated() {
    this.init()
  },
  methods: {
    init() {
      this.tabWidth = this.$el.offsetWidth
      this.wrapperWidth = this.$refs.wrapper.offsetWidth
      const diff = this.wrapperWidth - this.tabWidth
      this.minLeft = diff > 0 ? diff * -1 : 0
    },
    setCurrentTab(index) {
      if (index >= 0 && index < this.tabs.length) {
        const dom = this.$refs.wrapper.children[index]
        if (dom) {
          this.setLeftByDom(dom)
        }
      }
    },
    setLeftByDom(dom) {
      const pos = this.dir === 'rtl' ? (this.wrapperWidth - dom.offsetLeft - dom.offsetWidth / 2) : (dom.offsetLeft + dom.offsetWidth / 2)
      const left = pos - this.tabWidth / 2
      if (left < 0) {
        this.left = 0
      } else if (left > Math.abs(this.minLeft)) {
        this.left = this.minLeft
      } else {
        this.left = left * -1
      }
    },
    touchStart(e) {
      this.motion = false
      this.preX = e.touches[0].pageX
    },
    touchMove(e) {
      const left = this.left + (e.touches[0].pageX - this.preX) * this.dirFlag
      if (left >= 0) {
        this.left = 0
      } else if (left <= this.minLeft) {
        this.left = this.minLeft
      } else {
        this.left = left
      }
      this.preX = e.touches[0].pageX
    },
    touchEnd() {
      this.motion = true
    },
    tabClick(e, index) {
      this.motion = true
      this.setCurrentTab(index)
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style lang="less">
.slide-tab {
  overflow: hidden;
  .tab-wrapper {
    display: inline-block;
    white-space: nowrap;
    will-change: transform;
    &.motion {
      transition: all 0.3s;
    }
    .tab-item {
      vertical-align: top;
      box-sizing: border-box;
      display: inline-block;
    }
  }
}
</style>
