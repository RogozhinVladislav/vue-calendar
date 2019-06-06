<template>
  <v-app id="app">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/add-event">Add event</router-link>
    </div>
  </v-app>
</template>

<style lang="scss">
.slide-leave-active,
.slide-enter-active {
  transition: .3s;
}
.slide-enter {
  transform: translate(100%, 0);
}
</style>
