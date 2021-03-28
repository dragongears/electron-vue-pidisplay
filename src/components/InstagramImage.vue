<template>
  <img v-if="imgSrc" :src="imgSrc" alt="" />
  <div v-else>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'instagram-image',
  props: {
    updateInterval: {
      type: Number,
      default: 3600,
    },
    username: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      imgSrc: '',
      message: 'Waiting for Instagram data',
    };
  },
  computed: {},
  methods: {
    getImage() {
      const token =
        'IGQVJWWEU2Y0pIb29pUHlKQW0ybENRdDBKRngzbGZAWWHBPdEszQlpraWFoeGxTMW4zeUpHbVpGdnNUUERyY0RaOWNkaTI0dTdHZAjkwLXhnVVV3a05uRnFzd1Q0RTdQNnVfQnVjb2dQOE9EeXl2Sm9NSQZDZD';
      const fields = 'media_url';
      const url = `https://graph.instagram.com/me/media?fields=${fields}&access_token=${token}`;

      this.$http
        .get(url)
        .then((response) => {
          if (response.status === 200) {
            const edges = response.data.data;

            if (edges.length) {
              this.imgSrc = edges[0].media_url;
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
  },
  mounted() {
    this.getImage();
  },
};
</script>

<style></style>
