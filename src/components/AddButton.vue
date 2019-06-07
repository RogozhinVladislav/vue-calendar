<template>
  <div>
    <div class="event-type-buttons-overlay" v-show="showButtons"></div>
    <div class="button-container" v-on-clickaway="onClickAway">
      <v-btn
        absolute
        dark
        fab
        color="pink"
        class="event-add-btn"
        v-show="!showButtons"
        @click="showButtons = !showButtons"
      >
        <v-icon>add</v-icon>
      </v-btn>

      <div class="event-type-buttons" v-show="showButtons">

        <router-link to="/add-event/Перерыв" class="event-type-btn-wrap" tag="div">
          <div class="event-type-btn-title">Перерыв</div>
          <v-btn fab class="event-type-btn">
            <v-icon color="pink">access_time</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/add-event/Отгул" class="event-type-btn-wrap" tag="div">
          <div class="event-type-btn-title">Отгул</div>
          <v-btn fab class="event-type-btn">
            <v-icon color="pink">calendar_today</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/add-event/Заболел" class="event-type-btn-wrap" tag="div">
          <div class="event-type-btn-title">Заболел</div>
          <v-btn fab class="event-type-btn">
            <v-icon color="pink">calendar_today</v-icon>
          </v-btn>
        </router-link>

        <router-link to="/add-event/Отпуск" class="event-type-btn-wrap" tag="div">
          <div class="event-type-btn-title">В отпуск</div>
          <v-btn fab class="event-type-btn">
            <v-icon color="pink">calendar_today</v-icon>
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway';
export default {
    mixins: [ clickaway ],
    data() {
        return {
            showButtons: false,
        }
    },
    methods: {
      onClickAway: function() {
        if (this.showButtons) {
            this.showButtons = !this.showButtons
        }
      },
  },
};
</script>

<style lang="scss" scoped>
.event-add-btn {
  bottom: 9px;
  right: 8px;
}

.event-type-buttons {
  position: absolute;
  bottom: 1px;
  right: 0;
  z-index: 2;
}

.event-type-buttons-overlay {
  position: absolute;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.9;
}

.event-type-btn-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.event-type-btn-title {
  margin-right: 4px;
  font-size: 13px;
  font-weight: 700;
}
</style>