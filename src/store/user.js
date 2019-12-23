class User {
  constructor({ id, name, avatar }) {
    this.id = id;
    this.name = name;
    this.avatar = avatar;
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

      setTimeout(() => {
        if (email === 'test@test.test' && password === 'test') {
          commit('setUser', new User({ id: 1, name: 'Вася', avatar: '/img/avatar.png' }));
          commit('setLoading', false);
        } else {
          commit('setLoading', false);
          commit('setError', 'Неверные логин или пароль');
        }
      }, 2000)

      // try {
      //   const user = await fetch('api/login', {
      //     method: 'POST',
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({ email, password })
      //   });

      //   commit('setUser', new User(user.uid));
      //   commit('setLoading', false);
      // } catch (error) {
      //   commit('setLoading', false);
      //   commit('setError', error.message);
      //   throw error;
      // }
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
