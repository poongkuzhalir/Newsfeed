import Vue from "vue";
import Vuex from "vuex";
import newsfeed from './modules/newsfeed'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    newsfeed
  },
});
