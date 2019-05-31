<template>
  <header class="header-calendar">
    <div
      class="arrow-wrap arrow-prev-wrap"
      v-scroll-to="{
        el: `#day-${+currentScrollDay.id - 30}`,
        container: '.wrapper',
        x: true,
        y: false
    }"
    >
      <div class="arrow-for-month arrow-prev-month"></div>
    </div>
    <h2 class="title-month-year">
      <span class="title-month">{{currentScrollDay.month}} </span>
      <span class="title-year">{{currentScrollDay.year}}</span>
    </h2>
    <div
      class="arrow-wrap arrow-next-wrap"
      v-scroll-to="{
        el: `#day-${+currentScrollDay.id + 30}`,
        container: '.wrapper',
        x: true,
        y: false
    }"
    >
      <div class="arrow-for-month arrow-next-month"></div>
    </div>
  </header>
</template>

<script>
import VueScrollTo from 'vue-scrollto';

export default {
  props: {
    currentScrollDay: Object,
  },
  directives: {
    scrollTo: VueScrollTo,
  },
};
</script>

<style lang="scss" scoped>
.header-calendar {
  height: 11vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-month {
  font-size: 18px;
  font-weight: 700;
}

.title-year {
  font-size: 18px;
  font-weight: 400;
}

.arrow-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20px;
}

.arrow-for-month {
  width: 11px;
  height: 11px;
  border-bottom: 1px solid red;
  border-left: 1px solid red;
}

.arrow-prev-month {
  transform: rotate(45deg);
}

.arrow-prev-wrap{
  margin-right: 65px;
}

.arrow-next-wrap{
  margin-left: 65px;
}

.arrow-next-month {
  transform: rotate(225deg);
}
</style>
