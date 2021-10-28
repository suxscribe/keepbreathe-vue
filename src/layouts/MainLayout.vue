<template lang="pug">
  .page
    HeaderMain
    router-view
</template>

<script>
import HeaderMain from '../components/app/HeaderMain.vue';

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
  },
};
</script>

<style></style>
