<template>
  <div>
    <calendar-header :dayOnCurrentScroll="dayOnCurrentScroll" />
    <div class="wrapper" ref="wrapper">
      <div ref="days" class="days">
        <div
          :data-id="day.id"
          class="day"
          :class="{ 'current-day': day.dayPositionRelativeToCurrent == 0 }"
          v-for="day in arrayDays"
          :key="day.id"
        >
          <div class="inner-day day-name">{{day.dayOfWeek}}</div>
          <div class="inner-day day-number" :class="{ holiday: isHoliday(day) }" >{{day.number}}</div>
        </div>
      </div>
      <div class="events">
        <div class="events-row" v-for="event in events" :key="event.id">
          <event-cell
            v-for="(day, index) in arrayDays"
            :key="day.id"
            :day="day"
            :previousDay="arrayDays[index - 1]"
            :nextDay="arrayDays[index + 1]"
            :event="event"
          ></event-cell>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import _ from 'lodash';

import { setTimeout } from 'timers';
import CalendarHeader from '../components/CalendarHeader';
import EventCell from '../components/EventCell';

import { events, monthNames } from '../utils/constants';
import { getDaysOfMonth } from '../utils/helpers';
import { onScroll } from '../utils/derictives';

export default {
  data() {
    return {
      arrayDays: {},
      events,
      dayOnCurrentScroll: {},
    };
  },
  methods: {
    getMonthFromMiddleElement() {
      const daysElement = this.$refs.days;
      const centerX = daysElement.offsetLeft + daysElement.offsetWidth / 2;
      const centerY = daysElement.offsetTop + daysElement.offsetHeight / 2;
      const middleDayElement = document.elementFromPoint(centerX, centerY);
      if (middleDayElement.parentNode.classList.contains('day')) {
        const { id } = middleDayElement.parentNode.dataset;
        this.dayOnCurrentScroll = this.arrayDays[id];
      }
    },
    isHoliday(day) {
      return day.dayOfWeek === 'сб' || day.dayOfWeek === 'вс';
    },
    addDaysToCalendar(year, month, pos) {
      const arrDaysOfMonth = getDaysOfMonth(year, month);
      if (pos === 'after') {
        this.arrayDays = { ...this.arrayDays, ...arrDaysOfMonth };
      } else if (pos === 'before') {
        this.arrayDays = { ...arrDaysOfMonth, ...this.arrayDays };
      }
    },
    triggerAddDaysToCalendar(action) {
      const nextDate = moment(this.dayOnCurrentScroll.id, 'YYYY-M-D').startOf('month')[action](1, 'months');
      if (!this.arrayDays[nextDate.format('YYYY-M-D')]) {
        this.addDaysToCalendar(nextDate.year(), nextDate.month(), action === 'add' ? 'after' : 'before');

        // this.$nextTick(function () {
        //   this.$refs.wrapper.scrollLeft = document.querySelector(`*[data-id='${moment(this.dayOnCurrentScroll.id).format('YYYY-M-D')}]`).offsetLeft
        // })
      }
    },
  },
  mounted() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    this.addDaysToCalendar(year, month - 1, 'after');
    this.addDaysToCalendar(year, month, 'after');
    this.addDaysToCalendar(year, month + 1, 'after');

    this.$nextTick(() => {
      this.$refs.wrapper.addEventListener('scroll', _.throttle(() => {
        this.getMonthFromMiddleElement();
      }, 100));
      this.$refs.wrapper.scrollLeft = document.querySelector('.current-day').offsetLeft;
    });
  },
  watch: {
    dayOnCurrentScroll(newVal, oldVal) {
      if (newVal.monthNumber > oldVal.monthNumber) {
        this.triggerAddDaysToCalendar('add');
      }
      if (newVal.monthNumber < oldVal.monthNumber) {
        this.triggerAddDaysToCalendar('subtract');
      }
    },
  },
  computed: {

  },
  directives: {
    onScroll,
  },
  components: {
    CalendarHeader,
    EventCell,
  },
};
</script>

<style lang="scss" scoped>

.wrapper {
  overflow-x: auto;
  //overflow-anchor: auto;
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
