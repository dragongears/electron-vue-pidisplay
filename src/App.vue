<template>
  <main id="app">
    <section class="left-side">
      <date-and-time class="dat"> </date-and-time>
      <weather-panel
        :api-key="darkSkyApiKey"
        latitude="26.194221"
        longitude="-80.1447177"
        @updated="showUpdateDateTime"
      >
      </weather-panel>
      <div class="last-updated">
        <div v-if="lastUpdated">
          Last updated:
          {{ lastUpdated.toDateString('en-US', { weekday: 'long' }) }}
          {{
            lastUpdated.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
            })
          }}
        </div>
      </div>
    </section>
    <section class="right-side">
      <instagram-image
        :token="instagramToken"
        :slideshow-max-images="10"
      ></instagram-image>
    </section>
  </main>
</template>

<script>
import DateAndTime from './components/DateAndTime';
import InstagramImage from './components/InstagramImage';
import WeatherPanel from './components/Weather/WeatherPanel';

export default {
  name: 'ElectronVuePidisplay',
  components: {
    InstagramImage,
    WeatherPanel,
    DateAndTime,
  },
  data() {
    return {
      instagramToken: process.env.VUE_APP_INSTAGRAM_TOKEN,
      darkSkyApiKey: process.env.VUE_APP_OPENWEATHER,
      lastUpdated: null,
    };
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    showUpdateDateTime() {
      this.lastUpdated = new Date();
    },
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
@import '/src/assets/css/_variables.scss';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

main {
  align-items: flex-start;
  display: flex;
  font-family: 'Source Sans Pro', sans-serif;
  height: 100vh;
  justify-content: space-around;
  margin: auto;
  max-height: 480px;
  max-width: 800px;
  width: 100vw;

  > section {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  > .left-side {
    margin-left: 16px;
    margin-right: 8px;
    min-width: 220px;
    width: 568px;

    .dat {
      margin-top: 2px;
    }

    .last-updated {
      color: $primary-text-color;
      display: flex;
      flex-direction: column-reverse;
      flex-grow: 1;
      font-size: 0.75em;
      margin-bottom: 3px;
    }
  }

  > .right-side {
    margin-left: 8px;
    margin-right: 16px;
    width: 100%;
  }
}
</style>
