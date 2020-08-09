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
      default: 3600
    },
    username: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      imgSrc: '',
      message: 'Waiting for Instagram data'
    };
  },
  computed: {},
  methods: {
    getImage() {
      this.$http
        .get(`https://www.instagram.com/${this.username}/?__a=1`)
        .then((response) => {
          if (response.status === 200) {
            const edges =
              response.data.graphql.user.edge_owner_to_timeline_media.edges;

            if (edges.length) {
              this.imgSrc = edges[0].node.display_url;
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
    }
  },
  mounted() {
    this.getImage();
  }
};
</script>

<style></style>
