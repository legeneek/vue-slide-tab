# vue-slide-tab

mobile tab component use vue2

## install 

```
npm i vue-slide-tab
```

## demo 

run local serve to check the demo or check [online](https://legeneek.github.io/vue-slide-tab/index.html)

```
npm run start
```

## usage

```
// main.js
import VueSlideTab from 'vue-slide-tab'
// use as plugin
Vue.use(VueSlideTab)
// use as component
Vue.component('VueSlideTab', VueSlideTab.component)

// sfc.vue
<template>
  <VueSlideTab :tabs="tabs" :itemWidth="100" :current="cur" @tabClick="tabClick">
    <template v-slot:tab="{ tab, active }">
      <div :class="[active ? 'active' : '', 'list-tab']">{{ `tab:${tab.name}` }}</div>
    </template>
  </VueSlideTab>
</template>

```

scoped slot tab can get tab item data `tab` and select state `active` from scope

## props

| Property | Type | Required? | Description 
|:---|:---|:---|:---|
| tabs | Array | yes | tab data array
| itemWidth | Number | yes | tab item width 
| current | Number | no | current tab index start from 0 
| containerWidth | Number | no | tab container width 

## events

- tabClick: emit when tab clicked, receive clicked tab index