<template>
  <div>
    <calendar-header :dayOnCurrentScroll="dayOnCurrentScroll" />
    <div class="wrapper">
      <div ref="days" class="days">
        <div
          :id="'day-' + day.id"
          class="day"
          :class="{ 'current-day': day.dayPositionRelativeToCurrent == 0 }"
          v-for="day in days"
          :key="day.number + day.month+day.year"
        >
          <div class="inner-day day-name">{{day.dayOfWeek}}</div>
          <div class="inner-day day-number" :class="{ holiday: isHoliday(day) }" >{{day.number}}</div>
        </div>
      </div>
      <div class="events">
        <div class="events-row" v-for="event in events" :key="event.id">
          <event-cell
            v-for="(day, index) in days"
            :key="day.number + day.month+day.year"
            :day="day"
            :previousDay="days[index - 1]"
            :nextDay="days[index + 1]"
            :event="event"
          ></event-cell>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarHeader from '../components/CalendarHeader'
import EventCell from '../components/EventCell'

import { events, monthNames } from "../utils/constants";
import { getDaysOfMonth } from "../utils/helpers";
import { onScroll } from "../utils/derictives";

export default {
  data() {
    return {
      events: events,
      dayOnCurrentScroll: {},
    };
  },
  methods: {
    getMonthFromMiddleElement() {
      const daysElement = this.$refs.days;
      const centerX = daysElement.offsetLeft + daysElement.offsetWidth / 2;
      const centerY = daysElement.offsetTop + daysElement.offsetHeight / 2;
      const middleDayElement = document.elementFromPoint(centerX, centerY);
      if (middleDayElement.parentNode.classList.contains("day")) {
        const id = middleDayElement.parentNode.id.split('day-')[1]
        this.dayOnCurrentScroll = this.days[id]
      }
    },
    isHoliday(day) {
      return day.dayOfWeek === 'сб' || day.dayOfWeek === 'вс'
    }
  },
  mounted() {
    this.getMonthFromMiddleElement();
    document.querySelector(".wrapper").addEventListener("scroll", () => {
      this.getMonthFromMiddleElement();
    });

    document.querySelector('.wrapper').scrollLeft = document.querySelector('.current-day').offsetLeft
  },
  computed: {
    days() {
      const arrDays = [];
      for (let yearNumber = 2019; yearNumber < 2020; yearNumber++) {
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
  },
  directives: {
    onScroll
  },
  components: {
    CalendarHeader,
    EventCell
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-x: auto;
}

.days {
  display: grid;

  .day {
    grid-row: 1;
    min-width: 70px;
  }

  .inner-day {
    text-align: left;
    padding: 6px 8px;
    border: 1px solid #e7e7e7;
    border-top: none;
    border-left: none;
  }

  .day-name {
    background-color: #f4f4f4;
    font-weight: 700;
  }

  .day-number {
    border-bottom: none;
  }

  .holiday {
    background-color: #f4f4f4;
  }
}

.events {
  .events-row {
    display: flex;
  }

  // .event-cell:not(.event-cell-fill) + .event-cell-fill {
  //     border-radius: 15px 0 0 15px;
  // }
}
</style>
