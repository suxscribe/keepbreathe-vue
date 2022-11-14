<template lang="pug">
.page
  HeaderMain
  router-view
  FooterMain
</template>

<script>
import HeaderMain from '../components/app/HeaderMain.vue';
import FooterMain from '../components/app/FooterMain.vue';

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
