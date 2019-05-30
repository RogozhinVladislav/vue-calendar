<template>
  <div>
    <header class="header-calendar">
      <div class="arrow-for-month arrow-prev-month" v-scroll-to="{
          el: `#day-${+currentScrollDay.id - 30}`,
          container: '.wrapper',
          x: true,
          y: false
      }"></div>
      <h2 class="title-month-year">
        <span class="title-month">{{currentScrollDay.month}}</span>
        <span class="title-year">{{currentScrollDay.year}}</span>
      </h2>
      <div
        class="arrow-for-month arrow-next-month"
        v-scroll-to="{
          el: `#day-${+currentScrollDay.id + 30}`,
          container: '.wrapper',
          x: true,
          y: false
      }"
      ></div>
    </header>

    <div class="wrapper">
      <div ref="days" class="days">
        <div
          :id="'day-' + day.id"
          class="day"
          v-for="day in days"
          :key="day.number + day.month+day.year"
          :data-month="day.month"
          :data-year="day.year"
        >
          <div class="inner-day day-name">{{day.dayOfWeek}}</div>
          <div class="inner-day day-number">{{day.number}}</div>
        </div>
      </div>
      <div class="events">
        <div class="events-row" v-for="event in events" :key="event.id">
          <div
            class="event"
            :class="{ 'event-fill': event.dates.find(date => date.day == day.number) }"
            v-for="day in days"
            :key="day.number + day.month+day.year"
          >-</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { events } from "../utils/constants";
import { getDaysOfMonth } from "../utils/helpers";
import { onScroll } from "../utils/derictives";
import VueScrollTo from "vue-scrollto";

export default {
  data() {
    return {
      events: events,
      currentScrollDay: 0,
    };
  },
  directives: {
    scrollTo: VueScrollTo,
    onScroll
  },
  methods: {
    getMonthFromMiddleElement() {
      const daysElement = this.$refs.days;
      const centerX = daysElement.offsetLeft + daysElement.offsetWidth / 2;
      const centerY = daysElement.offsetTop + daysElement.offsetHeight / 2;
      const middleDayElement = document.elementFromPoint(centerX, centerY);
      //console.log("middleDayElement", middleDayElement);
      if (middleDayElement.classList.contains("day-number")) {
        const id = middleDayElement.parentNode.id.split('day-')[1]
        console.log('id', id)
        this.currentScrollDay = this.days[id]
      }
    }
  },
  mounted() {
    this.getMonthFromMiddleElement();
    document.querySelector(".wrapper").addEventListener("scroll", () => {
      this.getMonthFromMiddleElement();
    });
  },
  computed: {
    days() {
      const arrDays = [];
      for (let yearNumber = 2018; yearNumber < 2020; yearNumber++) {
        for (let monthNumber = 0; monthNumber < 12; monthNumber++) {
          const date = new Date(yearNumber, monthNumber, 1);
          const year = date.getFullYear();
          const month = date.getMonth();
          const arr = getDaysOfMonth(year, month);
          arrDays.push(...arr);
          arrDays.forEach((item, index) => item['id'] = index)
        }
      }
      return arrDays;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 80vw;
  margin: 0 auto;
  overflow-x: auto;
}

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

.arrow-for-month {
  width: 11px;
  height: 11px;
  border-bottom: 1px solid red;
  border-left: 1px solid red;
}

.arrow-prev-month {
  margin-right: 100px;
  transform: rotate(45deg);
}

.arrow-next-month {
  margin-left: 100px;
  transform: rotate(225deg);
}

.days {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  .day {
    grid-row: 1;
    min-width: 65px;
    margin: 0 10px;
  }
}

.events {
  .events-row {
    display: flex;
  }

  .event {
    margin: 10px;
    min-width: 65px;
    padding: 10px 0;
    border: 1px solid #ccc;

    &.event-fill {
      background-color: greenyellow;
    }
  }
}
</style>
