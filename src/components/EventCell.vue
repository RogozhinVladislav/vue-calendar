<template>
  <div class="event-cell-wrap" :class="{ 'event-cell-holiday': day.dayOfWeek == 'сб' || day.dayOfWeek == 'вс', }">
    <div
      v-if="isFill()"
      class="event-cell"
      :class="{
          'event-cell-fill': isFill(),
          'event-cell-fill-start': isStart,
          'event-cell-fill-finish': isFinish,
          //'event-cell-left-edge': !event.dates.find(date => { return date.day == previousDay.number && monthNames[date.month - 1] == previousDay.month && date.year == previousDay.year })
      }"
      :style="isFill()"
    >
      <img v-if="isStart" src="../assets/img/avatar.png" alt="" srcset="">
    </div>
    <div
      v-else
      class="event-cell"
    >
    </div>
  </div>
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
      isStart: false,
      isFinish: false,
    };
  },
  methods: {
    isFill() {
      //event.dates.find(date => { return date.day == day.number && monthNames[date.month - 1] == day.month && date.year == day.year }),
      
      const { day } = this

      let flag = false

      this.eventRow.forEach(event => {
        //if (day.monthNumber >= event.startDate.month && day.monthNumber <= event.finishDate.month) {
          if (day.number >= event.startDate.day && day.number <= event.finishDate.day) {
            if (day.number == event.startDate.day) {
              this.isStart = true
            }
            if (day.number == event.finishDate.day) {
              this.isFinish = true
            }
            flag = { 'background-color': event.color }
            //flag = true
          }
        //}
      });

      return flag
    }
  }
};
</script>

<style lang="scss" scoped>
.event-cell-wrap {
  padding-bottom: 10px;
  &.event-cell-holiday {
    background-color: #f4f4f4;
  }
}

.event-cell {
  min-width: 70px;
  padding: 10px 0;
  border-right: 1px solid #e7e7e7;
  height: 45px;

  &.event-cell-fill {
    background-color: #c6e4cb;
    
    display: flex;
    align-items: center;
    padding-left: 9px;
    border: 0;

    &.event-cell-fill-start {
        border-radius: 3px 0 0 3px;
    }

    &.event-cell-fill-finish {
        border-radius: 0 3px 3px 0;
    }

  }

}
</style>
