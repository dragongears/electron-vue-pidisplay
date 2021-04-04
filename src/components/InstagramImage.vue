<template>
  <ul v-if="images.length > 0" class="slides">
    <li
      v-for="(image, index) in images"
      :key="image.media_url"
      class="slide"
      :class="{ showing: index === showing }"
    >
      <img :src="image.media_url" alt="" />
    </li>
  </ul>
  <div v-else>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'InstagramImage',
  props: {
    slideshowInterval: {
      type: Number,
      default: 3600,
    },
    slideshowMaxImages: {
      type: Number,
      default: 10,
    },
    updateInterval: {
      type: Number,
      default: 3600,
    },
    token: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showing: 0,
      images: [],
      max: 0,
      message: 'Waiting for Instagram data',
    };
  },
  computed: {},
  methods: {
    getImage() {
      const fields = 'media_url';
      const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${this.token}`;

      this.$http
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            const edges = response.data.data;

            if (edges.length) {
              this.images = edges;

              if (
                this.slideshowMaxImages > this.images.length ||
                this.slideshowMaxImages == 0
              ) {
                this.max = this.images.length;
              } else {
                this.max = this.slideshowMaxImages;
              }
              this.showing = this.max - 1;

              this.$emit('updated', Date.now());
            }
          } else {
            this.message = `${response.status}: ${response.statusText}`;
          }

          if (this.updateInterval) {
            setTimeout(this.getImage, this.updateInterval * 1000);
          }
        })
        .catch((e) => {
          this.message = `${e.message} - ${new Date().toString()}`;

          if (this.updateInterval) {
            setTimeout(this.getImage, this.updateInterval * 1000);
          }
        });
    },
    startSlideshow() {
      setInterval(() => {
        this.showing = this.showing <= 0 ? this.max - 1 : this.showing - 1;
      }, this.slideshowInterval);
    },
  },
  mounted() {
    this.getImage();
    this.startSlideshow();
  },
};
</script>

<style lang="scss">
.slides {
  position: relative;
  height: 300px;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}

.slide {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 1;

  -webkit-transition: opacity 1s;
  -moz-transition: opacity 1s;
  -o-transition: opacity 1s;
  transition: opacity 1s;
}

.showing {
  opacity: 1;
  z-index: 2;
}
</style>
