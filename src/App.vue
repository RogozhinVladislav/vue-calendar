<template>
  <v-app id="app">
    <transition name="slide" mode="out-in">
      <router-view></router-view>
    </transition>
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
