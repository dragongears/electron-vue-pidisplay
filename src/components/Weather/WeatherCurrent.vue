<template>
  <div class="current-weather">
    <div>
      {{ capitalize(weather.current.weather[0].description) }}
    </div>
    <div class="temps-today">
      <div class="precip">
        <weather-icon
          :condition="weather.current.weather[0].icon"
          width="40"
          height="40"
          :color="iconColor"
        ></weather-icon>
        <div class="precip-percent">
          {{ Math.floor((weather.daily[0].pop * 100) / 5) * 5 }}%
        </div>
      </div>
      <div class="current-temp">{{ Math.floor(weather.current.temp) }}°</div>
      <div class="hi-lo-today">
        <div>Hi {{ Math.floor(weather.daily[0].temp.max) }}°</div>
        <div>Lo {{ Math.floor(weather.daily[0].temp.min) }}°</div>
      </div>
    </div>
  </div>
</template>

<script>
import WeatherIcon from './WeatherIcon';
import capitalize from '../../mixins/capitalize';

export default {
  name: 'WeatherCurrent',
  components: {
    weatherIcon: WeatherIcon,
  },
  props: {
    weather: {
      type: Object,
      required: true,
    },
    iconColor: {
      type: String,
      default: '#000000',
    },
  },
  mixins: [capitalize],
};
</script>

<style lang="scss">
.current-weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 28px;

  .temps-today {
    display: flex;
    flex-direction: row;
    align-items: center;

    .current-temp {
      font-size: 2em;
    }

    .hi-lo-today {
      margin-left: 22px;
      font-size: 0.75em;
    }

    .precip {
      display: flex;
      flex-direction: column;
      margin-right: 22px;
    }
    .precip-percent {
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>
