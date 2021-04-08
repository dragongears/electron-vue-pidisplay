<template>
  <section class="items">
    <div class="time">{{ timeStr }}</div>
    <div class="date">{{ dateStr }}</div>
  </section>
</template>

<script>
export default {
  name: 'DateAndTime',
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    dateStr: function () {
      return this.date.toDateString('en-US', { weekday: 'long' });
    },
    timeStr: function () {
      return this.date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
      });
    },
  },
  mounted() {
    this.intervalFunc();
  },
  methods: {
    intervalFunc() {
      this.date = new Date();

      setTimeout(this.intervalFunc, 1000);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/css/_variables.scss';

.items {
  align-items: center;
  color: $primary-text-color;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-bottom: 6px;

  .time {
    font-size: 52px;
  }

  .date {
    font-size: 28px;
  }
}
</style>
