<template>
  <div class="slide-tab" :style="tabStyle">
    <div :class="[motion ? 'motion' : '', 'tab-wrapper']" :style="wrapperStyle" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <div v-for="(tab, index) in tabs" :key="index" class="tab-item" @click="tabClick(index)">
        <slot name="tab" :tab="tab" :active="cur === index">{{ tab.name }}</slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      require: true,
      type: Array,
      default: () => []
    },
    current: {
      type: Number,
      default: () => 0
    },
    itemWidth: {
      require: true,
      type: Number,
      default: () => 0
    },
    containerWidth: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      tabWidth: 0,
      minLeft: 0,
      left: 0,
      motion: false,
      preX: 0,
      cur: 0
    }
  },
  computed: {
    tabStyle() {
      return `width: ${this.tabWidth}px;`
    },
    wrapperWidth() {
      return this.tabs.length * this.itemWidth
    },
    wrapperStyle() {
      const l = this.left + 'px'
      return `width: ${this.wrapperWidth}px; transform: translate3d(${l}, 0, 0);`
    }
  },
  mounted() {
    this.tabWidth = this.containerWidth || this.$el.offsetWidth || window.innerWidth
    this.minLeft = (this.wrapperWidth - this.tabWidth) * -1
    const cur = (this.current >= 0 && this.current < this.tabs.length) ? this.current : 0
    this.cur = cur
    this.setLeftByIndex(cur)
  },
  methods: {
    setLeftByIndex(index) {
      // 被点击tab的中点向整个tab的中点靠拢
      const halfItem = this.itemWidth / 2
      const halfTab = this.tabWidth / 2
      const pos = halfItem + index * this.itemWidth
      let left = pos - halfTab
      if (left < 0) {
        // 点击的item中点在tab中点的左侧时不用处理
        this.left = 0
      } else if (left > Math.abs(this.minLeft)) {
        // 超出可移动动的范围时不用处理
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
      let left = this.left + e.touches[0].pageX - this.preX
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
    tabClick(index) {
      this.motion = true
      this.cur = index
      this.setLeftByIndex(index)
      this.$emit('tabClick', index)
    }
  }
};
</script>

<style lang="less">
.slide-tab {
  overflow: hidden;
  .tab-wrapper {
    display: flex;
    &.motion {
      transition: all .3s;
    }
    .tab-item {
      box-sizing: border-box;
      flex: 1;
    }
  }
}
</style>