import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        window: {
            width: 0,
            height: 0,
        }
    },
    mutations: {
        SET_WINDOW_SIZE(state, size) {
            state.window.width = size[0];
            state.window.height = size[1];
        }
    },
    actions: {
        changeWindowSize({commit}, size) {
            commit('SET_WINDOW_SIZE', size)
        }
    },
    getters: {
        windowSize: state => state.window
    }
});