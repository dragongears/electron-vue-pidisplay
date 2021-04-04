<template>
  <div class="forecast-daily">
    <template v-for="(day, index) in forecast.daily">
      <div v-if="index > 0 && index < 7" :key="index" class="forecast-day">
        <div>{{ dow[(Math.floor(day.dt / 86400) + 4) % 7] }}</div>
        <div>
          <weather-icon
            :condition="day.weather[0].icon"
            width="20"
            height="20"
            :color="iconColor"
          ></weather-icon>
        </div>
        <div class="forcast-day__precip">
          {{ Math.floor((day.pop * 100) / 5) * 5 }}%
        </div>
        <div>{{ Math.floor(day.temp.max) }}</div>
        <div>{{ Math.floor(day.temp.min) }}</div>
      </div>
    </template>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon';

export default {
  name: 'WeatherForecast',
  components: {
    weatherIcon: WeatherIcon,
  },
  props: {
    forecast: {
      type: Object,
      required: true,
    },
    iconColor: {
      type: String,
      default: '#000000',
    },
  },
  data() {
    return {
      dow: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    };
  },
};
</script>

<style lang="scss">
.forecast-daily {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .forecast-day {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .forcast-day__precip {
    margin-bottom: 4px;
  }
}
</style>
