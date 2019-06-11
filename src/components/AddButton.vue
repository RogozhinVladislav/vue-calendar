<template>
  <div>
    <div class="event-type-buttons-overlay" v-show="showButtons"></div>
    <div class="button-container" v-on-clickaway="onClickAway">
      <v-btn
        absolute
        dark
        fab
        color="accent"
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
            <icon-base icon-name="clock" width="23" height="23" iconColor="#ed1c24"><icon-clock /></icon-base>
          </v-btn>
        </router-link>

        <router-link to="/add-event/Отгул" class="event-type-btn-wrap" tag="div">
          <div class="event-type-btn-title">Отгул</div>
          <v-btn fab class="event-type-btn">
            <icon-base icon-name="calendar" width="24" height="25" iconColor="#ed1c24"><icon-calendar /></icon-base>
          </v-btn>
        </router-link>

        <router-link to="/add-event/Заболел" class="event-type-btn-wrap" tag="div">
          <div class="event-type-btn-title">Заболел</div>
          <v-btn fab class="event-type-btn">
            <icon-base icon-name="bottle" width="17" height="26" iconColor="#ed1c24"><icon-bottle /></icon-base>
          </v-btn>
        </router-link>

        <router-link to="/add-event/Отпуск" class="event-type-btn-wrap" tag="div">
          <div class="event-type-btn-title">В отпуск</div>
          <v-btn fab class="event-type-btn">
            <icon-base icon-name="sun" width="29" height="29" iconColor="#ed1c24"><icon-sun /></icon-base>
          </v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

import { mixin as clickaway } from 'vue-clickaway';
import IconBase from './IconBase.vue'

import IconCalendar from './icons/IconCalendar.vue'
import IconClock from './icons/IconClock.vue'
import IconBottle from './icons/IconBottle.vue'
import IconSun from './icons/IconSun.vue'

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
  components: {
    IconBase,
    IconClock,
    IconCalendar,
    IconBottle,
    IconSun
  }
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