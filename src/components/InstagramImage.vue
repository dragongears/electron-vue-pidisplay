<template>
  <ul v-if="images.length > 0" class="slides">
    <li
      v-for="(image, index) in images"
      :key="image.media_url"
      class="slide"
      :class="{ showing: index === showing }"
    >
      <video
        v-if="isVideo(image.media_type)"
        :ref="`refImg${index}`"
        muted
        @ended="videoEnded"
      >
        <source :src="image.media_url" type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>

      <img v-else :ref="`refImg${index}`" :src="image.media_url" alt="" />
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
      videoTimeout: null,
    };
  },
  watch: {
    images(newVal, oldVal) {
      if (oldVal.length === 0) {
        this.startSlideshow();
      }
    },
  },
  mounted() {
    this.getImages();
  },
  methods: {
    getImages() {
      const fields =
        'caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username';
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
                this.slideshowMaxImages === 0
              ) {
                this.max = this.images.length;
              } else {
                this.max = this.slideshowMaxImages;
              }

              if (this.showing > this.max) {
                this.showing = this.max - 1;
              }

              this.$emit('updated', Date.now());
            }
          } else {
            this.message = `${response.status}: ${response.statusText}`;
          }

          if (this.updateInterval) {
            setTimeout(this.getImages, this.updateInterval * 1000);
          }
        })
        .catch((e) => {
          this.message = `${e.message} - ${new Date().toString()}`;

          if (this.updateInterval) {
            setTimeout(this.getImages, this.updateInterval * 1000);
          }
        });
    },
    isVideo(type) {
      return type === 'VIDEO';
    },
    nextSlide() {
      this.showing = this.showing <= 0 ? this.max - 1 : this.showing - 1;
      const typeShowing = this.images[this.showing].media_type;
      const imgRef = `refImg${this.showing}`;

      if (this.isVideo(typeShowing)) {
        this.videoTimeout = setTimeout(this.videoEnded, 3 * 60 * 1000);
        this.$refs[imgRef][0].play();
      } else {
        setTimeout(this.nextSlide, this.slideshowInterval);
      }
    },
    startSlideshow() {
      this.nextSlide();
    },
    videoEnded() {
      clearTimeout(this.videoTimeout);
      this.nextSlide();
    },
  },
};
</script>

<style lang="scss">
.slides {
  list-style-type: none;
  position: relative;
}

.slide {
  left: 0px;
  opacity: 0;
  position: absolute;
  text-align: center;
  top: 0px;
  transition: opacity 1s;
  width: 100%;
  z-index: 1;

  img {
    height: auto;
    margin-top: 20px;
    max-height: 440px;
    max-width: 100%;
  }

  video {
    margin-top: 20px;
    max-height: 440px;
    max-width: 100%;
    width: 100%;
  }
}

.showing {
  opacity: 1;
  z-index: 2;
}
</style>
