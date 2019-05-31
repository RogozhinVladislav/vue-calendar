<template>
  <div>
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

    <div class="event-type-buttons" v-show="showButtons" v-on-clickaway="away">
      <div class="event-type-btn-wrap">
        <div class="event-type-btn-title">Перерыв</div>
        <v-btn fab color="pink" class="event-type-btn">
          <v-icon>access_time</v-icon>
        </v-btn>
      </div>

      <div class="event-type-btn-wrap">
        <div class="event-type-btn-title">Отгул</div>
        <v-btn fab color="pink" class="event-type-btn">
          <v-icon>calendar_today</v-icon>
        </v-btn>
      </div>

      <div class="event-type-btn-wrap">
        <div class="event-type-btn-title">Заболел</div>
        <v-btn fab color="pink" class="event-type-btn">
          <v-icon>calendar_today</v-icon>
        </v-btn>
      </div>

      <div class="event-type-btn-wrap">
        <div class="event-type-btn-title">В отпуск</div>
        <v-btn fab color="pink" class="event-type-btn">
          <v-icon>calendar_today</v-icon>
        </v-btn>
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
    away: function() {
        
        if (this.showButtons) {
            console.log('hi')
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