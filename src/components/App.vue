<template lang="pug">
component(:is='layout')
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue';
import BreathLayout from '../layouts/BreathLayout.vue';

import { setVh } from '../js/is-desktop';

export default {
  created() {
    setVh();
    window.addEventListener('resize', setVh);

    this.$store.dispatch('loadLocale');
    this.$store.dispatch('loadSoundState');
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
