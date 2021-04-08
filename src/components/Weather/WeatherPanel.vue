<template>
  <div class="weather">
    <div v-if="weather" class="weather-data">
      <weather-current
        :weather="weather"
        :icon-color="iconColor"
      ></weather-current>
      <weather-forecast
        :forecast="weather"
        :icon-color="iconColor"
      ></weather-forecast>
      <div class="weather-summary">
        {{ capitalize(weather.daily[0].weather[0].description) }}
      </div>
    </div>
    <div v-else>
      {{ message }}
    </div>
  </div>
</template>

<script>
import WeatherCurrent from './WeatherCurrent';
import WeatherForecast from './WeatherForecast';
import capitalize from '../../mixins/capitalize';

export default {
  name: 'WeatherPanel',
  components: {
    weatherCurrent: WeatherCurrent,
    weatherForecast: WeatherForecast,
  },
  props: {
    updateInterval: {
      type: Number,
      default: 3600,
    },
    apiKey: {
      type: String,
      required: true,
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      weather: null,
      message: 'Waiting for weather data',
      iconColor: '#35495e',
    };
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      this.$http
        .get(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${this.latitude}&lon=${this.longitude}&appid=${this.apiKey}&units=imperial&exclude=minutely,alerts`
        )
        .then((response) => {
          if (response.status === 200) {
            this.weather = response.data;
          } else {
            this.weather = null;
            this.message = `${response.status}: ${response.statusText}`;
          }
          this.$emit('updated', Date.now());
          if (this.updateInterval) {
            setTimeout(this.getWeather, this.updateInterval * 1000);
          }
        })
        .catch((e) => {
          this.weather = null;
          this.message = `${e.message} - ${new Date().toString()}`;
          if (this.updateInterval) {
            setTimeout(this.getWeather, this.updateInterval * 1000);
          }
        });
    },
  },
  mixins: [capitalize],
};
</script>

<style lang="scss">
@import '../../assets/css/_variables.scss';

.weather {
  color: $primary-text-color;
  font-weight: bold;
  margin-top: 14px;

  .weather-summary {
    margin-top: 12px;
  }
}
</style>
