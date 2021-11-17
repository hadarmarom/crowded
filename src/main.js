import Vue from 'vue'
import App from './App.vue'

// import './style/main.scss'

const debug = process.env.NODE_ENV !== 'production';
Vue.config.productionTip = debug;

Vue.mixin({
  methods: {
    $clone: require('rfdc')({ proto: true }),
  }
})

new Vue({
  render: h => h(App)
}).$mount('#app')
