<template>
  <div
    class="event-cell"
    :class="{
        'event-cell-holiday': day.dayOfWeek == 'сб' || day.dayOfWeek == 'вс',
        //'event-cell-left-edge': !event.dates.find(date => { return date.day == previousDay.number && monthNames[date.month - 1] == previousDay.month && date.year == previousDay.year })
    }"
    :style="isFill()"
  ></div>
</template>

<script>
import { events, monthNames } from '../utils/constants';

export default {
  props: {
    eventRow: Array,
    day: Object,
    previousDay: Object,
    nextDay: Object,
  },
  data() {
    return {
      monthNames,
    };
  },
  methods: {
    isFill() {
      //event.dates.find(date => { return date.day == day.number && monthNames[date.month - 1] == day.month && date.year == day.year }),
      
      const { day } = this

      let flag = {}

      this.eventRow.forEach(event => {
        //if (day.monthNumber >= event.startDate.month && day.monthNumber <= event.finishDate.month) {
          if (day.number >= event.startDate.day && day.number <= event.finishDate.day) {
            flag = { 'background-color': event.color }
          }
        //}
      });

      return flag
    }
  }
};
</script>

<style lang="scss" scoped>
.event-cell {
  min-width: 70px;
  padding: 10px 0;
  border-right: 1px solid #e7e7e7;

  &.event-cell-fill {
    background-color: #c6e4cb!important;

    &.event-cell-left-edge {
        border-radius: 3px 0 0 3px;
    }

    // &:first-child {
    //   border-radius: 3px 3px;
    // }

    // &:last-child {
    //   border-radius: 13px;
    // }
  }

  &.event-cell-holiday {
    background-color: #f4f4f4;
  }
}
</style>
