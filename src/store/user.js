class User {
  constructor(id) {
    this.id = id;
  }
}

export default {
  state: {
    user: null,
  },
  mutations: {
    setUser(state, payLoad) {
      state.user = payLoad;
    },
  },
  actions: {
    async signin({ commit }, { email, password }) {
      commit('clearError');
      commit('setLoading', true);

      try {
        const user = await fetch('/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        commit('setUser', new User(user.uid));
        commit('setLoading', false);
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
