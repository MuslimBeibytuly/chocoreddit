import Vue from 'vue';
import Vuex from 'vuex';
import api from './api/api';

Vue.use(Vuex);

const gotUnhandledError = (error) => {
  console.log(error);
};


export default new Vuex.Store({
  state: {
    posts: [],
  },
  mutations: {
    setToken(state, data) {
      /**
       * @param {{
       * access_token: string,
       * }} data
       */
      localStorage.setItem('token', data.access_token);
    },
    setPosts(state, data) {
      // eslint-disable-next-line no-param-reassign
      state.posts = data.feed;
    },
  },
  actions: {
    login({ dispatch, commit }, code) {
      api.get(`/access_token/?code=${code}`).then((response) => {
        if (response.status === 200) {
          // TODO: set token expiration time
          commit('setToken', response.data);
          dispatch('feed');
        } else {
          gotUnhandledError(response.data);
        }
      }).catch((error) => {
        gotUnhandledError(error);
      });
    },
    feed({ commit }) {
      api.get('/feed/').then((response) => {
        if (response.status === 200) {
          commit('setPosts', response.data);
        } else {
          gotUnhandledError(response.data);
        }
      }).catch((error) => {
        gotUnhandledError(error);
      });
    },
    vote(context, data) {
      api.post('/vote/', data).then((response) => {
        if (response.status !== 201) {
          gotUnhandledError(response.data);
        }
      }).catch((error) => {
        gotUnhandledError(error);
      });
    },
    bookmark(context, data) {
      api.post('/bookmark/', data).then((response) => {
        if (response.status !== 201) {
          gotUnhandledError(response.data);
        }
      }).catch((error) => {
        gotUnhandledError(error);
      });
    },
  },
});
