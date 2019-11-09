<template>
  <div id="app">
    <VueSlideTab :tabs="tabs" :itemWidth="100" :current="cur" @tabClick="tabClick">
      <template v-slot:tab="{ tab, active }">
        <div :class="[active ? 'active' : '', 'list-tab']">{{ `tab:${tab.name}` }}</div>
      </template>
    </VueSlideTab>
    <div>{{ `current tab: ${tabs[cur].name}` }}</div>
  </div>
</template>

<script>

import Vue from 'vue'
import VueSlideTab from "../src/index"

export default {
  name: "app",
  components: {
    VueSlideTab
  },
  data() {
    return {
      cur: 4,
      tabs: [{ name: "a" }, { name: "b" }, { name: "c" },{ name: "d" }, { name: "e" }, { name: "f" }],
    }
  },
  methods: {
    tabClick(index) {
      this.cur = index
    }
  }
};
</script>

<style lang="less">
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.list-tab {
  border: 1px solid #675ccc;
  &.active {
    color: #f00;
  }
}
</style>
