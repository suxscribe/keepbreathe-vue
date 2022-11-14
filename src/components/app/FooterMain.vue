<template lang="pug">
footer.footer 
  .footer__version {{$store.getters.getAppVersion}}
</template>

<script>
export default {
  name: 'footer-main',
  data: () => {
    return {};
  },
  async mounted() {},
  computed: {
    appVersion() {
      return this.$store.getters.getAppVersion;
    },
  },
  watch: {},
  components: {},
};
</script>

<style></style>
