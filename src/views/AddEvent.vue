<template>
  <div class="container">
    <div class="add-event-header">
      <div class="close" @click="$router.go(-1)"></div>
      <div class="add-event-header-title">{{ $route.params.type }}</div>
    </div>
    <div class="add-event-content">
      <v-form v-model="valid">
          <v-layout column>
            <v-text-field v-model="eventName" label="Название события" required></v-text-field>
            <div :v-if="$route.params.type !== 'Отпуск'" class="all-day-container">
              <div>Весь день</div>
              <v-switch :value="allDay" @change="onSwitch" class="all-day-switcher"></v-switch>
            </div>
            <div>
              <div class="date-line" :class="{ 'line-disabled': allDay }">
                <div class="start-date" @click="onClickDateLine('start')">{{startDate | formatDate}}</div>
                <div class="start-time" @click="onClickTimeLine('start')">{{startTime}}</div>
              </div>
              <div class="date-line" :class="{ 'line-disabled': allDay }">
                <div class="finish-date" @click="onClickDateLine('finish')">{{finishDate | formatDate}}</div>
                <div class="finish-time" @click="onClickTimeLine('finish')">{{finishTime}}</div>
              </div>
            </div>
            <v-textarea
              name=""
              label="Описание события"
              v-model="eventDesc"
              rows="1"
              class="event-description"
            ></v-textarea>
            <div class="text-xs-center">
              <v-btn color="error" dark>Добавить</v-btn>
            </div>
          </v-layout>

          <div class="add-event-overlay" v-show="showDatePicker">
            <div class="event-datepicker-wrap">
              <v-date-picker :header-date-format="dateFormat" header-color="white" :value="activeDate" @input="onInputDatePicker" class="event-datepicker elevation-0"></v-date-picker>
              <div>
                <v-btn flat @click="showDatePicker = false">Отмена</v-btn>
                <v-btn flat>Ок</v-btn>
              </div>
            </div>
          </div>

          <div class="add-event-overlay" v-show="showTimePicker">
            <div class="event-datepicker-wrap">
              <v-time-picker :value="activeTime" @input="onInputTimePicker"></v-time-picker>
              <div>
                <v-btn flat @click="showTimePicker = false">Отмена</v-btn>
                <v-btn flat>Ок</v-btn>
              </div>
            </div>
          </div>
          
      </v-form>
    </div>
  </div>
</template>

<script>

import moment from 'moment'
import { capitalize } from '@/utils/helpers'

export default {
  data() {
    return {
      eventName: '',
      eventDesc: '',
      allDay: false,
      showDatePicker: false,
      showTimePicker: false,
      startDate: '2019-06-05',
      startTime: '09:00',
      finishDate: '2019-06-05',
      finishTime: '12:00',
      activeDatePicker: 'start',
      activeTimePicker: 'start',
      valid: false
    };
  },
  methods: {
    dateFormat(date, locale) {
      return capitalize(moment(date).format('MMMM YYYY'))
    },
    onSwitch(e) {
      console.log('e', e)
      this.allDay = e;
      if (e) {
        this.startTime = '0:00';
        this.finishTime = '23:59';
      } else {
        this.startTime = '9:00';
        this.finishTime = '12:00';
      }
    },
    onClickDateLine(dateline) {
      this.activeDatePicker = dateline;
      this.showDatePicker = true;
    },
    onClickTimeLine(timeline) {
      this.activeTimePicker = timeline;
      this.showTimePicker = true;
    },
    onInputDatePicker(e) {
      this.activeDatePicker === 'start' ? this.startDate = e : this.finishDate = e;
    },
    onInputTimePicker(e) {
      this.activeTimePicker === 'start' ? this.startTime = e : this.finishTime = e;
    },
  },
  computed: {
    activeDate() {
      return this.activeDatePicker === 'start' ? this.startDate : this.finishDate;
    },
    activeTime() {
      return this.activeTimePicker === 'start' ? this.startTime : this.finishTime;
    },
  },
  filters: {
    formatDate(date) {
      const formatDate = moment(date).format('ddd[,] D MMMM YYYY г.');
      return capitalize(formatDate)
    }
  },
  mounted() {
    this.startDate = moment().format('YYYY-MM-DD');
    this.finishDate = moment().format('YYYY-MM-DD');
  }
};
</script>

<style lang="scss">

.add-event-header {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.add-event-header-title {
  line-height: 1;
  font-size: 18px;
  font-weight: 700;
}

.close {
  position: absolute;
  left: -3px;
  bottom: 0;
  width: 30px;
  height: 30px;
}
.close:hover {
}
.close:before,
.close:after {
  position: absolute;
  left: 15px;
  content: " ";
  height: 33px;
  width: 2px;
  background-color: #ed1c24;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

.add-event-content {
  .all-day-container {
    display: flex;
    align-items: center;
  }

  .all-day-switcher {
    flex: 0 0 auto;
    margin-left: auto;
  }

  .v-input--selection-controls__input {
    margin-right: 0;
  }

  .date-line {
    display: flex;
    justify-content: space-between;
    margin-bottom: 23px;

    &:last-child {
      margin-bottom: 0;
    }

    &.line-disabled {
      color: #9e9e9e;
      pointer-events: none;
    }
  }

  .add-event-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .event-datepicker-wrap {
    position: absolute;
    bottom: 45px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
  }

  .event-datepicker {

    .v-picker__title {
      color: #000;
    }
  }
}
</style>