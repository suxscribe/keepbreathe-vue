<template lang="pug">
  .page
    Header
    router-view
</template>

<script>
import Header from '../components/app/Header.vue';

export default {
  name: 'header-layout',
  data: () => {
    return {};
  },
  async mounted() {},
  computed: {},
  watch: {},
  components: {
    Header,
  },
};
</script>

<style></style>
