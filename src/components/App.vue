<template lang="pug">
component(:is='layout')
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import BreathLayout from '../layouts/BreathLayout.vue';

export default {
  created() {
    this.$store.dispatch('loadLocale');
  },
  computed: {
    layout() {
      console.log(this.$route);
      console.log(this.$route.meta);
      console.log(this.$route.meta.layout);
      return this.$route.meta.layout + '-layout';
    },
  },
  async mounted() {},
  components: {
    MainLayout,
    BreathLayout,
  },
};
</script>

<style></style>
