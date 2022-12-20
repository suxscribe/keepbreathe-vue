<template lang="pug">
footer.footer 
  .footer__version {{appVersion}}
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
