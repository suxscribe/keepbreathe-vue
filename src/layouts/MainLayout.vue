<template lang="pug">
.page
  HeaderMain
  router-view
  FooterMain
</template>

<script>
import HeaderMain from './parts/HeaderMain.vue';
import FooterMain from './parts/FooterMain.vue';

export default {
  name: 'main-layout',
  data: () => {
    return {};
  },
  async mounted() {},
  computed: {},
  watch: {},
  components: {
    HeaderMain,
    FooterMain,
  },
};
</script>

<style></style>
