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
          <div class="date-lines">
            <div class="date-line" :class="{ 'line-disabled': allDay }">
              <div class="start-date" @click="onClickDateLine('start')">{{startDate | formatDate}}</div>
              <div class="start-time" @click="onClickTimeLine('start')">{{startTime}}</div>
            </div>
            <div class="date-line" :class="{ 'line-disabled': allDay }">
              <div
                class="finish-date"
                @click="onClickDateLine('finish')"
              >{{finishDate | formatDate}}</div>
              <div class="finish-time" @click="onClickTimeLine('finish')">{{finishTime}}</div>
            </div>
          </div>
          <v-textarea
            name
            label="Описание события"
            v-model="eventDesc"
            rows="1"
            class="event-description"
          ></v-textarea>
          <div class="submit-btn-wrap text-xs-center">
            <v-btn class="submit-btn" color="error" dark>Добавить</v-btn>
          </div>
        </v-layout>

        <div class="add-event-overlay" v-show="showDatePicker">
          <div class="event-picker-wrap" v-on-clickaway="onClickAwayDatePicker">
            <v-date-picker
              :header-date-format="headerDateFormat"
              :title-date-format="titleDateFormat"
              header-color="white"
              v-model="datePickerValue"
              class="event-datepicker elevation-0"
              locale="ru"
            ></v-date-picker>
            <div class="event-picker-buttons">
              <v-btn flat small @click="showDatePicker = false">Отмена</v-btn>
              <v-btn flat small @click="saveDate">Ок</v-btn>
            </div>
          </div>
        </div>

        <div class="add-event-overlay" v-show="showTimePicker">
          <div class="event-picker-wrap" v-on-clickaway="onClickAwayTimePicker">
            <v-time-picker
              header-color="white"
              v-model="timePickerValue"
              class="event-timepicker elevation-0"
              locale="ru"
            ></v-time-picker>
            <div class="event-picker-buttons">
              <v-btn flat @click="showTimePicker = false">Отмена</v-btn>
              <v-btn flat @click="saveTime">ОК</v-btn>
            </div>
          </div>
        </div>
      </v-form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mixin as clickaway } from "vue-clickaway";
import { capitalize } from "@/utils/helpers";
import { setTimeout } from "timers";

export default {
  mixins: [clickaway],
  data() {
    return {
      eventName: "",
      eventDesc: "",
      allDay: false,
      showDatePicker: false,
      showTimePicker: false,
      datePickerValue: moment().format("YYYY-MM-DD"),
      timePickerValue: "09:00",
      startDate: moment().format("YYYY-MM-DD"),
      startTime: "09:00",
      finishDate: moment().format("YYYY-MM-DD"),
      finishTime: "12:00",
      activeDatePicker: "start",
      activeTimePicker: "start",
      valid: false
    };
  },
  methods: {
    headerDateFormat(date, locale) {
      return capitalize(moment(date).format("MMMM YYYY"));
    },
    titleDateFormat(date, locale) {
      const formatDate = moment(date).format("ddd[,] D MMMM");
      return capitalize(formatDate);
    },
    onSwitch(payload) {
      this.allDay = payload;
      if (payload) {
        this.startTime = "0:00";
        this.finishTime = "23:59";
        this.finishDate = this.startDate;
      } else {
        this.startTime = "9:00";
        this.finishTime = "12:00";
      }
    },
    onClickDateLine(dateline) {
      this.activeDatePicker = dateline;
      setTimeout(() => {
        this.showDatePicker = true;
      }, 50);
    },
    onClickTimeLine(timeline) {
      this.activeTimePicker = timeline;
      setTimeout(() => {
        this.showTimePicker = true;
      }, 50);
    },
    saveDate() {
      this.activeDatePicker === "start"
        ? (this.startDate = this.datePickerValue)
        : (this.finishDate = this.datePickerValue);
      this.showDatePicker = false;
    },
    saveTime() {
      this.activeTimePicker === "start"
        ? (this.startTime = this.timePickerValue)
        : (this.finishTime = this.timePickerValue);
      this.showTimePicker = false;
    },
    onClickAwayDatePicker() {
      if (this.showDatePicker) {
        this.showDatePicker = false;
      }
    },
    onClickAwayTimePicker() {
      if (this.showTimePicker) {
        this.showTimePicker = false;
      }
    }
  },
  filters: {
    formatDate(date) {
      const formatDate = moment(date).format("ddd[,] D MMMM YYYY г.");
      return capitalize(formatDate);
    }
  }
};
</script>

<style lang="scss">
.add-event-header {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 27px;
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
  width: 22px;
  height: 22px;
}
.close:hover {
}
.close:before,
.close:after {
  position: absolute;
  left: 10px;
  content: "";
  height: 25px;
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

  .date-lines {
    margin-bottom: 20px;
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

  .event-description {
    margin-bottom: 20px;
  }

  .add-event-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .event-picker-wrap {
    position: absolute;
    bottom: 45px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 3px;

    .v-picker {
      border-radius: 3px;

      table {
        .v-btn--floating {
          border-radius: 3px;
        }

        .v-btn--active {
          height: 25px;
          width: 25px;
          transform: rotate(45deg);

          .v-btn__content {
            transform: rotate(-45deg);
          }
        }
      }
    }

    .event-picker-buttons {
      display: flex;
      justify-content: flex-end;

      .v-btn {
        min-width: 60px;
        text-transform: none;
        font-weight: 400;
        color: #ed1c24;
      }
    }
  }

  .event-datepicker {
    .v-picker__title {
      color: #000;
    }
  }

  .event-timepicker {
    .v-time-picker-title {
      color: #000;
    }
  }
}

.submit-btn-wrap {
  .v-btn {
    width: 159px;
  }

  .v-btn__content {
    text-transform: none;
    font-weight: 400;
  }
}
</style>