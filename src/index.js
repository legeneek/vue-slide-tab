import VueSlideTab from './VueSlideTab.vue'

function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('VueSlideTab', VueSlideTab);
}

export default {
  install,
  component: VueSlideTab
}