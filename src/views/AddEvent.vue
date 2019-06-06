<template>
  <div class="container">
    <div class="add-event-header">
      <div class="close"></div>
      <div class="add-event-header-title">Отпуск</div>
    </div>
    <div class="add-event-content">
      <v-form v-model="valid">
        <v-container>
          <v-layout column>
            <v-text-field v-model="eventName" label="Название события" required></v-text-field>
            <div class="all-day-container">
              <div>Весь день</div>
              <v-switch v-model="allDay" class="all-day-switcher"></v-switch>
            </div>
            <div>
              <div class="date-line">
                <div class="start-date">Пт, 13 июня 2019 г.</div>
                <div class="start-time">9:00</div>
              </div>
              <div class="date-line">
                <div class="finish-date">Пт, 13 июня 2019 г.</div>
                <div class="finish-time">12:00</div>
              </div>
            </div>
            <v-textarea
              name=""
              label="Описание события"
              value=""
              rows="1"
            ></v-textarea>
          </v-layout>
        </v-container>
      </v-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventName: "",
      allDay: false,
      valid: false
    };
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
  }
}
</style>